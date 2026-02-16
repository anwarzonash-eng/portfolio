"use client";
import { useEffect, useState, useMemo } from "react";
import "@/styles/printStyles/cvLatest.css";
import { useSearchParams } from "next/navigation";
import { store, useAppSelector } from "@/store";
import { setProfileUrlInfo, setProfileLoading } from "@/store/profileSlice";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { getRoutesDetails } from "@/hooks/url";
import { modifiedContent } from "@/hooks/modifiedContent";

import {
    CV3EducationP,
    CV3ExperiencesP,
    CV3HeaderP,
    CV3ProjectsP,
    CV3SkillsP,
    CV3SummaryP,
} from "@/components/PrintComponents/CV3PrintComponents";

import { preloadImages } from "@/utils/preLoadImages";
import { useSortedSkills } from "@/hooks/useSortedSkills";
import { Github, GithubIcon, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import PrintPageRenderer, { ComponentConfig } from "@/utils/printPageRenderer";
import { useFilteredYearExperiences } from "@/hooks/useFilteredYearExperiences";

// Helper functions moved outside component to avoid recreation on each render
function isUpworkExperience(exp: any) {
    const website = String(exp?.company_website || "").toLowerCase();
    const company = String(exp?.company_name || "").toLowerCase();
    return website.includes("upwork") || company.includes("upwork");
}

function parseDateSafe(d: any) {
    const t = new Date(d);
    return isNaN(t.getTime()) ? null : t;
}

const CV3 = ({ params }: { params: any }) => {
    const searchParams = useSearchParams();
    const [urlInfo, setURLInfo] = useState<any>(null);
    const [listOfdata, setListOfData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter skills based on listOfdata.skills_ids
    const [allSkills, setAllSkills] = useState([]);

    // Images preloading
    const [imagesReady, setImagesReady] = useState(false);
    const [imageProgress, setImageProgress] = useState({ loaded: 0, total: 0 });

    // Sorted Skills - must be called before any conditional returns
    const sortedSkills = useSortedSkills({
        skillsIdsWithOrder: listOfdata?.skills_ids,
        allSkills,
    });

    // Filtered Experiences
    const filteredExperiences = useFilteredYearExperiences(
        listOfdata?.experiences_ids,
        listOfdata?.no_of_experiences
    );

    const headerInfo = [
        listOfdata?.phone_no && { icon: Phone, value: listOfdata.phone_no },
        listOfdata?.email && { icon: Mail, value: listOfdata.email },
        listOfdata?.location && { icon: MapPin, value: listOfdata.location },
        listOfdata?.github && { icon: GithubIcon, value: listOfdata.github },
        listOfdata?.linkedin && { icon: Linkedin, value: listOfdata.linkedin },
    ].filter(Boolean);

    useEffect(() => {
        handleSkillsApiCall({ setListOfSkills: setAllSkills });
    }, []);

    // API Calls
    // Use getRoutesDetails
    useEffect(() => {
        // 🛑 Must wrap in an async function and call it 🛑
        const fetchRoutes = async () => {
            setURLInfo(await getRoutesDetails(params, searchParams));
        };
        fetchRoutes();
    }, [params, searchParams]);

    useEffect(() => {
        if (urlInfo) {
            reportsApiHandler({
                actionType: "cv",
                urlInfo,
                setLoading,
                setListOfData,
                setError,
            });
        }
    }, [urlInfo]);

    // Redux sync
    useEffect(() => {
        if (urlInfo) store.dispatch(setProfileUrlInfo(urlInfo));
    }, [urlInfo]);

    useEffect(() => {
        store.dispatch(setProfileLoading(loading));
    }, [loading]);

    // Extract All image URLs Before Rendering
    function extractAllImageUrls(listOfdata, allSkills) {
        const urls = [];

        // 1. Profile image (used in CV3HeaderP)
        if (listOfdata?.profile_photo_1) urls.push(listOfdata.profile_photo_1);

        // 2. Skills HTML images (used in CV3SummaryP via modifiedContent)
        const skillsHtml = listOfdata?.skills || "";
        const htmlMatches = skillsHtml.match(/<img[^>]+src="([^">]+)"/g);
        if (htmlMatches) {
            htmlMatches.forEach((tag) => {
                const match = tag.match(/src="([^">]+)"/);
                if (match?.[1]) urls.push(match[1]);
            });
        }

        // 3. Skills icons (used in CV3SkillsP)
        listOfdata?.skills_ids?.forEach((skill) => {
            if (skill.icon) urls.push(skill.icon);
        });

        // 4. Experience thumbnails (used in CV3ExperiencesP)
        listOfdata?.experiences_ids?.forEach((exp) => {
            if (exp.thumbnail) urls.push(exp.thumbnail);
        });

        // 5. Portfolio thumbnails (used in CV3ProjectsP)
        listOfdata?.portfolios_ids?.forEach((portfolio) => {
            if (portfolio?.thumbnail) urls.push(portfolio.thumbnail);
        });

        // 6. Education thumbnails (used in CV3EducationP)
        listOfdata?.education_ids?.forEach((edu) => {
            if (edu.thumbnail) urls.push(edu.thumbnail);
        });

        return urls;
    }

    // ImagesReady Guard Before Rendering
    useEffect(() => {
        if (!listOfdata || !allSkills.length) return;

        async function run() {
            const urls = extractAllImageUrls(listOfdata, allSkills);

            setImageProgress({ loaded: 0, total: urls.length });

            await preloadImages(urls, (loaded, total) => {
                setImageProgress({ loaded, total });
            });

            setImagesReady(true); // all images fully loaded
        }

        run();
    }, [listOfdata, allSkills]);

    // Check if all essential data is loaded
    const isDataReady =
        !loading && listOfdata && urlInfo && allSkills.length > 0 && imagesReady;

    // State for parsed skills HTML
    const [visibleItems, setVisibleItems] = useState<string[]>([]);

    // Generate HTML for skills (overview section) - only on client side
    useEffect(() => {
        // Only run on client side where DOMParser is available
        if (typeof window === 'undefined' || !listOfdata?.skills || !sortedSkills) {
            return;
        }

        try {
            const rawHtml = modifiedContent(listOfdata?.skills, sortedSkills, listOfdata);
            const parser = new DOMParser();
            const doc = parser.parseFromString(rawHtml, "text/html");
            const items = Array.from(doc.querySelectorAll("li")).map(
                (li) => li.outerHTML,
            );
            setVisibleItems(items.slice(0, 7));
        } catch (error) {
            console.error('Error parsing skills HTML:', error);
            setVisibleItems([]);
        }
    }, [listOfdata?.skills, sortedSkills, listOfdata]);

    const summary =
        listOfdata?.ai_short_description ||
        "Web Designer with 2 years of experience, adept at UX and responsive design. Strong proficiency in Adobe Creative Suite and CMS. Successfully improved website user engagement by 25% at previous role. Passionate about enhancing the digital experience for educational institutions.";

    //Execute if Error occur
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="text-2xl text-red-500">
                    Error Loading CV3 Data: {error}
                </div>
            </div>
        );
    }

    //Execute if while Loading
    if (!isDataReady) {
        const { loaded, total } = imageProgress;
        const percent = total > 0 ? Math.round((loaded / total) * 100) : 0;

        return (
            <div className="flex items-center justify-center min-h-screen bg-white flex-col">
                <div className="text-2xl text-heading mb-4">Loading CV data...</div>
                {total > 0 && (
                    <div className="w-64 h-4 border border-gray-300 rounded overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${percent}%` }}
                        />
                    </div>
                )}
                {total > 0 && <div className="mt-2 text-sm">{percent}%</div>}
            </div>
        );
    }

    const experiences = listOfdata?.experiences_ids || [];

    const portfolios = listOfdata?.portfolios_ids || [];

    const allComponents: ComponentConfig[] = [
        {
            componentType: "dynamic",
            clickableNote: false,
            component: (
                <div className="w-full relative px-[2rem]">
                    <CV3HeaderP listOfdata={listOfdata} hideLinks={urlInfo?.hideLinks} />

                    {/* CV3 Grid Layout */}
                    <div className="grid grid-cols-5 gap-8 mt-8">
                        {/* Left Column - First Experience */}
                        <div className="col-span-3">

                            {/* // Experience 1 */}
                            {filteredExperiences[0] && (
                                <>
                                    <h2 className="text-[20px] font-bold text-black mb-4 border-b-2 border-black pb-2">
                                        EXPERIENCE
                                    </h2>
                                    <CV3ExperiencesP rawExperiences={[filteredExperiences[0]]} listOfdata={listOfdata} bulletCount={8} />
                                </>
                            )}

                            {/* // Experience 2 */}
                            {filteredExperiences[1] && (<div className="w-full relative px-[2rem]">

                                <CV3ExperiencesP rawExperiences={[filteredExperiences[1]]} listOfdata={listOfdata} bulletCount={4} />
                            </div>


                            )}
                        </div>

                        {/* Right Column - Summary & Skills */}
                        <div className="col-span-2 mt-2">
                            <CV3SummaryP summary={summary} />
                            <CV3SkillsP sortedSkills={sortedSkills} />

                            {/* Find Me Online */}
                            <div className="mb-6">
                                <h2 className="text-[20px] font-bold text-black mb-4 border-b-2 border-black ">FIND ME ONLINE</h2>

                                <div className="flex items-start gap-2">
                                    <span className="text-blue-600 text-lg"><Github className='w-8 h-8' /></span>
                                    <div>
                                        <span className=" font-bold text-[15px]">Github</span>
                                        <p className="list-disc  text-[13px] text-gray-700 space-y-1 font-medium leading-normal mt-3">{listOfdata?.github}</p>

                                    </div>
                                </div>
                            </div>

                            {/* Interests */}
                            <div className="mb-6">

                                <h2 className="text-[20px] font-bold text-black mb-4 border-b-2 border-black ">INTERESTS</h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-[18px]">✈️</span>
                                    <span className="font-bold text-[15px]">Travel</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div >
            ),
        },


        // Experience 3
        {
            componentType: "dynamic",
            component: filteredExperiences[2] ? (
                <div className="w-full relative px-[2rem]">
                    <div className="grid grid-cols-5 gap-8">
                        <div className="col-span-3">
                            {/* <CV3ExperiencesP rawExperiences={[filteredExperiences[2]]} listOfdata={listOfdata} bulletCount={5} /> */}
                            <>
                                <h2 className="text-[20px] font-bold text-black mb-4 border-b-2 border-black pb-2">
                                    EXPERIENCE
                                </h2>
                                <CV3ExperiencesP rawExperiences={[filteredExperiences[2]]} listOfdata={listOfdata} bulletCount={4} />
                            </>
                        </div>
                        <div className="col-span-2"></div>
                    </div>
                </div>
            ) : null,
        },

        // Experience 4
        {
            componentType: "dynamic",
            component: filteredExperiences[3] ? (
                <div className="w-full relative px-[2rem]">
                    <div className="grid grid-cols-5 gap-8">
                        <div className="col-span-3">
                            <CV3ExperiencesP rawExperiences={[filteredExperiences[3]]} listOfdata={listOfdata} bulletCount={5} />
                        </div>
                        <div className="col-span-2"></div>
                    </div>
                </div>
            ) : null,
        },

        // Experience 5
        {
            componentType: "dynamic",
            component: filteredExperiences[4] ? (
                <div className="w-full relative px-[2rem]">
                    <div className="grid grid-cols-5 gap-8">
                        <div className="col-span-3">
                            <CV3ExperiencesP rawExperiences={[filteredExperiences[4]]} listOfdata={listOfdata} bulletCount={6} />
                        </div>
                        <div className="col-span-2"></div>
                    </div>
                </div>
            ) : null,
        },

        // Education Section with Grid
        {
            componentType: "dynamic",
            component: listOfdata?.education_ids?.length > 0 && (
                <div className="w-full relative px-[2rem] mt-6">
                    <div className="grid grid-cols-5 gap-8">
                        <div className="col-span-3">
                            <h2 className="text-[20px] font-bold text-black mb-4 border-b-2 border-black pb-2">
                                EDUCATION
                            </h2>
                            <CV3EducationP
                                education={listOfdata?.education_ids}
                                location={listOfdata?.location}
                            />
                        </div>
                        <div className="col-span-2"></div>
                    </div>
                </div>
            ),
        },

        // Project 1
        {
            componentType: "dynamic",
            component: portfolios[0] ? (
                <div className="w-full relative px-[2rem] mt-6">
                    <div className="grid grid-cols-5 gap-8">
                        <div className="col-span-3">
                            <h2 className="text-[20px] font-bold text-black mb-4 border-b-2 border-black pb-2">
                                PROJECTS
                            </h2>
                            <CV3ProjectsP portfolios={[portfolios[0]]} />
                        </div>
                        <div className="col-span-2"></div>
                    </div>
                </div>
            ) : null,
        },

        // Project 2
        {
            componentType: "dynamic",
            component: portfolios[1] ? (
                <div className="w-full relative px-[2rem]">
                    <div className="grid grid-cols-5 gap-8">
                        <div className="col-span-3">
                            <CV3ProjectsP portfolios={[portfolios[1]]} />
                        </div>
                        <div className="col-span-2"></div>
                    </div>
                </div>
            ) : null,
        },

        // Project 3
        {
            componentType: "dynamic",
            component: portfolios[2] ? (
                <div className="w-full relative px-[2rem] mt-6">
                    <div className="grid grid-cols-5 gap-8">
                        <div className="col-span-3">
                            <h2 className="text-[20px] font-bold text-black mb-4 border-b-2 border-black pb-2">
                                PROJECTS
                            </h2>
                            <CV3ProjectsP portfolios={[portfolios[2]]} />
                        </div>
                        <div className="col-span-2"></div>
                    </div>
                </div>
            ) : null,
        },

        // Project 4
        {
            componentType: "dynamic",
            component: portfolios[3] ? (
                <div className="w-full relative px-[2rem]">
                    <div className="grid grid-cols-5 gap-8">
                        <div className="col-span-3">
                            <CV3ProjectsP portfolios={[portfolios[3]]} />
                        </div>
                        <div className="col-span-2"></div>
                    </div>
                </div>
            ) : null,
        },

        // Project 5
        {
            componentType: "dynamic",
            component: portfolios[4] ? (
                <div className="w-full relative px-[2rem]">
                    <div className="grid grid-cols-5 gap-8">
                        <div className="col-span-3">
                            <CV3ProjectsP portfolios={[portfolios[4]]} />
                        </div>
                        <div className="col-span-2"></div>
                    </div>
                </div>
            ) : null,
        },
    ];

    const componentsList: ComponentConfig[] = allComponents.filter(
        (config) => config.component !== null && config.component !== undefined,
    );

    return (
        <PrintPageRenderer
            componentsList={componentsList}
            orientation="Portrait"
            isDataReady={isDataReady}
            hideNotes={true}
            hideLinks={urlInfo?.hideLinks}
        />
    );
};

export default CV3;