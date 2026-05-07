
"use client"


import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { store, useAppSelector } from "@/store";
import { setProfileUrlInfo, setProfileLoading } from "@/store/profileSlice";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { getRoutesDetails } from "@/hooks/url";
import { modifiedContent } from "@/hooks/modifiedContent";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { useFilteredYearExperiences } from "@/hooks/useFilteredYearExperiences";
import { preloadImages } from "@/utils/preLoadImages";
import { useSortedSkills } from "@/hooks/useSortedSkills";
import CV4Header from "@/components/CV4PageComponents/CV4Header";
import CV4Summary from "@/components/CV4PageComponents/CV4Summary";
import CV4Skills from "@/components/CV4PageComponents/CV4Skills";
import CV4Experiences from "@/components/CV4PageComponents/CV4Experiences";
import CV4Education from "@/components/CV4PageComponents/CV4Education";
import { Download } from "lucide-react";

// Dynamically imported — uses browser-only @react-pdf/renderer APIs
const CV4PdfEditorModal = dynamic(
    () => import("@/components/CV4PageComponents/CV4PdfEditorModal"),
    { ssr: false }
);


const CV4 = ({ params }: { params: any }) => {
    // All Logic Start
    const searchParams = useSearchParams();
    // Global state
    const [urlInfo, setURLInfo] = useState<any>(null);
    const [listOfdata, setListOfData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // PDF editor modal
    const [pdfModalOpen, setPdfModalOpen] = useState(false);
    // Experiences section
    const [isMobile, setIsMobile] = useState(false);

    // Derived values
    const visibleSkills = listOfdata?.skills_ids ?? [];
    const skillsforCV = skillsGrouping(visibleSkills);



    // Filter skills based on listOfdata.skills_ids
    const [allSkills, setAllSkills] = useState([]);

    // Images preloading
    const [imagesReady, setImagesReady] = useState(false);
    const [imageProgress, setImageProgress] = useState({ loaded: 0, total: 0 });

    // Sorted SKills
    const sortedSkills: any = useSortedSkills({
        skillsIdsWithOrder: listOfdata?.skills_ids,
        allSkills,
    });

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

        // 1. Profile image (used in CVLatestHeader)
        if (listOfdata?.profile_photo_1) urls.push(listOfdata.profile_photo_1);

        // 2. Skills HTML images (used in CVLatestSummary via modifiedContent)
        const skillsHtml = listOfdata?.skills || "";
        const htmlMatches = skillsHtml.match(/<img[^>]+src="([^">]+)"/g);
        if (htmlMatches) {
            htmlMatches.forEach((tag) => {
                const match = tag.match(/src="([^">]+)"/);
                if (match?.[1]) urls.push(match[1]);
            });
        }

        // 3. Skills icons (used in CVLatestSkills)
        listOfdata?.skills_ids?.forEach((skill) => {
            if (skill.icon) urls.push(skill.icon);
        });

        // 4. Experience thumbnails (used in CVLatestExperiences)
        listOfdata?.experiences_ids?.forEach((exp) => {
            if (exp.thumbnail) urls.push(exp.thumbnail);
        });

        // 5. Portfolio thumbnails (used in CVLatestProjects)
        listOfdata?.portfolios_ids?.forEach((portfolio) => {
            if (portfolio?.thumbnail) urls.push(portfolio.thumbnail);
        });

        // 6. Education thumbnails (used in CVLatestEducation)
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

    const summary =
        listOfdata?.ai_short_description ||
        "Web Designer with 2 years of experience, adept at UX and responsive design. Strong proficiency in Adobe Creative Suite and CMS. Successfully improved website user engagement by 25% at previous role. Passionate about enhancing the digital experience for educational institutions.";

    // Filtered Experiences
    const filteredExperiences = useFilteredYearExperiences(
        listOfdata?.experiences_ids,
        listOfdata?.no_of_experiences
    );



    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="text-2xl text-red-500">
                    Error loading CV data: {error}
                </div>
            </div>
        );
    }

    if (!isDataReady) {
        const { loaded, total } = imageProgress;
        const percent = total > 0 ? Math.round((loaded / total) * 100) : 0;

        return (
            <div className="flex items-center justify-center min-h-screen bg-[#FAFBFD] flex-col">
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


    ;

    return (
        <>
            {/* PDF Editor Modal */}
            {pdfModalOpen && (
                <CV4PdfEditorModal
                    listOfdata={listOfdata}
                    experiences_for_cv4={listOfdata?.experiences_for_cv4 || []}
                    onClose={() => setPdfModalOpen(false)}
                />
            )}

            <div className="cv-container bg-white text-heading min-h-screen">
                <div className="max-w-[110rem] mx-auto p-[7rem] border border-solid border-gray-300 rounded-[0.6rem] my-[4rem] shadow-md">
                    {/* Download PDF Button */}
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={() => setPdfModalOpen(true)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Download PDF
                        </button>
                    </div>

                    {/* Header */}
                    <CV4Header listOfdata={listOfdata} />

                    {/* Summary Section */}

                    <CV4Summary summary={summary} />

                    {/* Skills Section */}

                    <CV4Skills sortedSkills={sortedSkills} />

                    {/* Work Experience Section */}

                    <CV4Experiences
                        experiences_for_cv4={listOfdata?.experiences_for_cv4 || []} />

                    {/* Education Section */}

                    <CV4Education listOfdata={listOfdata} />
                </div>
            </div >
        </>
    )
}

export default CV4