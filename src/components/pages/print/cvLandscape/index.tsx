"use client";

import "@/styles/printStyles/cvLandscape.css";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { formatDate } from "@/hooks/formatdate";
import { modifiedContent } from "@/hooks/modifiedContent";
import React, { useEffect, useState } from "react";
import {
  contactDetails,
  dateFormatsOptions,
  socialLinks,
} from "@/data/JsonData";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { store } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import { scrollToSection } from "@/hooks/scrollToSection";
import { loadBlogs } from "@/hooks/apihandlers/blogListingApiHandler";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import NoteDomainForPint from "@/components/NoteDomainForPint";
import { getImageForIndex } from "@/utils/getImageForIndex";
import DesignationDomain from "@/components/DesignationDomain";
import HomeSliderPrint from "@/components/Sliders/HomeSliderPrint";
import SkillsContainer from "@/components/SkillsContainer";
import AreasOfExpertiesSkillComponent from "@/components/AreasOfExpertiesSkillComponent";
import { useSortedSkills } from "@/hooks/useSortedSkills";
import {
  CVLandscapeExperienceSection,
  CVLandscapeOverviewSection,
  CVLandscapePortfolioSection,
  CVLandscapeServicesSection,
  EducationBlogsLandscape,
} from "@/components/PrintComponents/cvLandscapeComponents";

const CV_Landscape = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blogsList, setBlogsList] = useState([]);
  const [loadingblogs, setLoadingBlogs] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [showMoreSkills, setShowMoreSkills] = useState([]);

  // Filter skills based on listOfdata.skills_ids
  const [allSkills, setAllSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  // Count of skills/list items in the skills HTML (used to decide whether to show Read More)
  const [skillsListCount, setSkillsListCount] = useState<number>(0);

  useEffect(() => {
    if (listOfdata?.skills_ids && allSkills.length > 0) {
      const matchedSkills = allSkills.filter((skill) =>
        listOfdata.skills_ids.some((dataSkill) => dataSkill.id === skill.id),
      );
      setFilteredSkills(matchedSkills);
    }
  }, [listOfdata, allSkills]);

  // Count <li> occurrences in the skills HTML to determine
  // whether the Read More button is needed
  useEffect(() => {
    try {
      const skillsHtml = listOfdata?.skills || "";
      const matches = skillsHtml.match(/<li\b/gi);
      setSkillsListCount(matches ? matches.length : 0);
    } catch (e) {
      setSkillsListCount(0);
    }
  }, [listOfdata?.skills]);

  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills: setAllSkills });
  }, []);

  // Use getRoutesDetails
  useEffect(() => {
    // 🛑 Must wrap in an async function and call it 🛑
    const fetchRoutes = async () => {
      setURLInfo(await getRoutesDetails(params, searchParams));
    };
    fetchRoutes();
  }, [params, searchParams]);

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        actionType: "cv",
        urlInfo,
        setError,
        setLoading,
        setListOfData,
      });
  }, [urlInfo]);

  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills });
  }, []);

  useEffect(() => {
    if (listOfdata) {
      loadBlogs({
        domain: listOfdata?.domain,
        setBlogs: setBlogsList,
        setLoading: setLoadingBlogs,
      });
    }
  }, [listOfdata]);

  useBodyBackgroundColor("#EFF5FD");

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  const sortedSkills = useSortedSkills({
    skillsIdsWithOrder: listOfdata?.skills_ids,
    allSkills,
  });

  const domain = listOfdata?.domain;
  console.log("CV Landscape Data:", listOfdata);

  return (
    <>
      {listOfdata && (
        <div className="bg-white">
          {/* Overview Section */}
          <CVLandscapeOverviewSection
            dateFormatsOptions={dateFormatsOptions}
            filteredSkills={filteredSkills}
            formatDate={formatDate}
            listOfdata={listOfdata}
            scrollToSection={scrollToSection}
            urlInfo={urlInfo}
            skillsListCount={skillsListCount}
          />

          {/* Skills Section */}
          <CVLandscapeServicesSection
            listOfdata={listOfdata}
            sortedSkills={sortedSkills}
            urlInfo={urlInfo}
          />

          {/* Experience Section ✅ */}
          {listOfdata && listOfdata?.experiences_ids?.length > 0 && (
            <>
              {/* Professional Experience Timeline Section 1✅ */}
              <CVLandscapeExperienceSection
                filteredSkills={filteredSkills}
                listOfdata={listOfdata}
                modifiedContent={modifiedContent}
                showAllExperiences={showAllExperiences}
                showMoreSkills={showMoreSkills}
                skillsGrouping={skillsGrouping}
                urlInfo={urlInfo}
              />
            </>
          )}

          {listOfdata && listOfdata?.experiences_ids?.length > 0 && (
            <>
              {/* Professional Experience Timeline Section 2✅ */}
              <CVLandscapeExperienceSection
                filteredSkills={filteredSkills}
                listOfdata={listOfdata}
                modifiedContent={modifiedContent}
                showAllExperiences={showAllExperiences}
                showMoreSkills={showMoreSkills}
                skillsGrouping={skillsGrouping}
                urlInfo={urlInfo}
              />
            </>
          )}

          {listOfdata && listOfdata?.experiences_ids?.length > 0 && (
            <>
              {/* Professional Experience Timeline Section 3✅ */}
              <CVLandscapeExperienceSection
                filteredSkills={filteredSkills}
                listOfdata={listOfdata}
                modifiedContent={modifiedContent}
                showAllExperiences={showAllExperiences}
                showMoreSkills={showMoreSkills}
                skillsGrouping={skillsGrouping}
                urlInfo={urlInfo}
              />
            </>
          )}

          {/* Portfolio Section */}
          {listOfdata && listOfdata?.portfolios_ids?.length > 0 && (
            <CVLandscapePortfolioSection
              from={0}
              max={1}
              listOfdata={listOfdata}
              urlInfo={urlInfo}
            />
          )}

          {listOfdata && listOfdata?.portfolios_ids?.length > 0 && (
            <CVLandscapePortfolioSection
              from={1}
              max={2}
              listOfdata={listOfdata}
              urlInfo={urlInfo}
            />
          )}

          {listOfdata && listOfdata?.portfolios_ids?.length > 0 && (
            <CVLandscapePortfolioSection
              from={2}
              max={3}
              listOfdata={listOfdata}
              urlInfo={urlInfo}
            />
          )}

          {/* Education and Blogs Landscape Section ✅ */}
          {listOfdata && (
            <EducationBlogsLandscape
              domain={domain}
              listOfdata={listOfdata}
              blogsList={blogsList}
              dateFormatsOptions={dateFormatsOptions}
              formatDate={formatDate}
              getImageForIndex={getImageForIndex}
              loadingblogs={loadingblogs}
            />
          )}
        </div>
      )}
    </>
  );
};
export default CV_Landscape;
