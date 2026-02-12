"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { store, useAppSelector } from "@/store";
import { setProfileUrlInfo, setProfileLoading } from "@/store/profileSlice";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { getRoutesDetails } from "@/hooks/url";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { useFilteredYearExperiences } from "@/hooks/useFilteredYearExperiences";

import {
  CV2Education,
  CV2Experiences,
  CV2Header,
  CV2Projects,
  CV2Skills,
  CV2Summary,
} from "@/components/CV2PageComponents";

import { preloadImages } from "@/utils/preLoadImages";
import { useSortedSkills } from "@/hooks/useSortedSkills";
import { contactDetails, socialLinks } from "@/data/JsonData";
import CV2WorkProof from "@/components/CV2PageComponents/CV2ClickableLinkedinGihubLinks";

const CV2 = ({ params }: { params: any }) => {
  // All Logic Start
  const searchParams = useSearchParams();
  // Global state
  const [urlInfo, setURLInfo] = useState<any>(null);
  const [listOfdata, setListOfData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Experiences section
  const [isMobile, setIsMobile] = useState(false);

  // Derived values
  const visibleSkills = listOfdata?.skills_ids ?? [];
  const skillsforCV = skillsGrouping(visibleSkills);

  console.log("API Data:", listOfdata);

  // Filter skills based on listOfdata.skills_ids
  const [allSkills, setAllSkills] = useState([]);

  // Images preloading
  const [imagesReady, setImagesReady] = useState(false);
  const [imageProgress, setImageProgress] = useState({ loaded: 0, total: 0 });

  // Sorted SKills
  const sortedSkills = useSortedSkills({
    skillsIdsWithOrder: listOfdata?.skills_ids,
    allSkills,
  });

  // console.log("Sorted Skills:", sortedSkills);

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

  const summary = listOfdata?.ai_short_description || "";

  // Filtered Experiences
  const filteredExperiences = useFilteredYearExperiences(
    listOfdata?.experiences_ids,
    listOfdata?.no_of_experiences,
  );

  // console.log("Filtered Experiences:", filteredExperiences);

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

  return (
    <div className="bg-white text-heading min-h-screen">
      <div className="max-w-[140rem] mx-auto p-[5rem] border border-solid border-gray-300 rounded-[0.6rem] my-[4rem] shadow-md">
        <CV2Header listOfdata={listOfdata} urlInfo={urlInfo} />

        {/* Summary & Tagline Section */}
        <CV2Summary summary={summary} />

        {/* Skills Section */}
        <CV2Skills sortedSkills={sortedSkills} />

        {/* Experience Section For CV2 Timeline */}
        <CV2Experiences
          rawExperiences={filteredExperiences}
          listOfdata={listOfdata}
          filteredSkills={allSkills}
        />

        {/* Education Section */}
        <CV2Education
          education={listOfdata?.education_ids}
          location={listOfdata?.location}
        />

        {/* Projects Section */}
        <CV2Projects portfolios={listOfdata?.portfolios_ids} />
      </div>
    </div>
  );
};

export default CV2;
