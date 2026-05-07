"use client";
import { useEffect, useState } from "react";
import "@/styles/printStyles/cvLatest.css";
import { useSearchParams } from "next/navigation";
import { store } from "@/store";
import { setProfileUrlInfo, setProfileLoading } from "@/store/profileSlice";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { getRoutesDetails } from "@/hooks/url";

import {
    CV4HeaderP,
    CV4SummaryP,
    CV4SkillsP,
    CV4ExperiencesP,
    CV4EducationP,
} from "@/components/PrintComponents/CV4PrintComponents";

import { preloadImages } from "@/utils/preLoadImages";
import { useSortedSkills } from "@/hooks/useSortedSkills";
import PrintPageRenderer, { ComponentConfig } from "@/utils/printPageRenderer";

const CV4 = ({ params }: { params: any }) => {
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

    const summary =
        listOfdata?.ai_short_description ||
        "Senior Frontend Engineer with expertise in React, TypeScript, and building user-focused, scalable data-driven applications. Led Stripe's $18 Ultimate Fund platform, created responsive UI libraries, and improved internal processes by creating robust libraries with Storybook at XXXL. Committed to building intuitive data products and data visualizations that enhance decision-making for large-scale clients.";

    useEffect(() => {
        handleSkillsApiCall({ setListOfSkills: setAllSkills });
    }, []);

    // API Calls
    // Use getRoutesDetails
    useEffect(() => {
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

        // 1. Profile image
        if (listOfdata?.profile_photo_1) urls.push(listOfdata.profile_photo_1);

        // 2. Skills HTML images
        const skillsHtml = listOfdata?.skills || "";
        const htmlMatches = skillsHtml.match(/<img[^>]+src="([^">]+)"/g);
        if (htmlMatches) {
            htmlMatches.forEach((tag) => {
                const match = tag.match(/src="([^">]+)"/);
                if (match?.[1]) urls.push(match[1]);
            });
        }

        // 3. Skills icons
        listOfdata?.skills_ids?.forEach((skill) => {
            if (skill.icon) urls.push(skill.icon);
        });

        // 4. Experience thumbnails
        listOfdata?.experiences_ids?.forEach((exp) => {
            if (exp.thumbnail) urls.push(exp.thumbnail);
        });

        // 5. Portfolio thumbnails
        listOfdata?.portfolios_ids?.forEach((portfolio) => {
            if (portfolio?.thumbnail) urls.push(portfolio.thumbnail);
        });

        // 6. Education thumbnails
        listOfdata?.education_ids?.forEach((edu) => {
            if (edu.thumbnail) urls.push(edu.thumbnail);
        });

        return urls;
    }

    // Images Ready Guard Before Rendering
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

    // Execute if Error occur
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="text-2xl text-red-500">
                    Error Loading CV4 Data: {error}
                </div>
            </div>
        );
    }

    // Execute if while Loading
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

    const allComponents: ComponentConfig[] = [
        {
            componentType: "dynamic",
            clickableNote: false,
            component: (
                <div className="w-full relative" style={{
                    fontFamily: 'Arial, sans-serif',
                    background: 'white',
                    color: 'black',
                    lineHeight: '1.4',
                    margin: '0',
                    padding: '0'
                }}>
                    {/* ATS Print Styles */}
                    <style jsx global>{`
                        @media print {
                            html, body {
                                margin: 0 !important;
                                padding: 0 !important;
                              
                            }
                            
                           
                            
                            h1:first-child, header h1:first-child {
                                margin-top: 0 !important;
                                padding-top: 0 !important;
                            }

                            @page {
                                margin: 0 !important;
                            }
                        }
                    `}</style>

                    {/* Header */}
                    <CV4HeaderP listOfdata={listOfdata} />

                    {/* Summary Section */}
                    <CV4SummaryP summary={summary} />

                    {/* Skills Section */}
                    <CV4SkillsP sortedSkills={sortedSkills} />

                    {/* Work Experience Section */}
                    <CV4ExperiencesP
                        experiences_for_cv4={listOfdata?.experiences_for_cv4 || []} />

                    {/* Education Section */}
                    <CV4EducationP listOfdata={listOfdata} />
                </div>
            ),
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

export default CV4;