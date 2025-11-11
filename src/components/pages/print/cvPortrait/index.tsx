"use client";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import "@/styles/printStyles/cvPortrait.css";
import { formatDate } from "@/hooks/formatdate";
import { modifiedContent } from "@/hooks/modifiedContent";
import React, { useEffect, useState } from "react";
import {
  blogData,
  contactDetails,
  dateFormatsOptions,
  socialLinks,
} from "@/data/JsonData";
import { useRouter, useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { store } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import {
  blogsListing,
  loadBlogs,
} from "@/hooks/apihandlers/blogListingApiHandler";
import ShowmoreSkills from "@/components/showmoreSkills";
import { useAppSelector } from "@/store";
import NoteDomainForPint from "@/components/NoteDomainForPint";
import { getImageForIndex } from "@/utils/getImageForIndex";
import {
  EducationBlogCvPortrait,
  IntroCvPortrait,
  OverviewCvPortrait,
  PortfolioCvPortrait,
  SkillsCvPortrait,
} from "@/components/PrintComponents/cvPortraitComponents";
import { SingleExperienceItem, getSortedExperiences, ExperiencesPageRenderer } from "@/components/PrintComponents/cvPortraitComponents/ExperienceCvPortrait";
import PrintPageRenderer, { ComponentConfig } from "@/utils/printPageRenderer";

type SkillType = {
  title: string;
  url?: string;
  // add other properties if they exist
};

const CV_Portrait = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter skills based on listOfdata.skills_ids
  const [allSkills, setAllSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [skillsListCount, setSkillsListCount] = useState<number>(0);

  useEffect(() => {
    if (listOfdata?.skills_ids && allSkills.length > 0) {
      const matchedSkills = allSkills.filter((skill) =>
        listOfdata.skills_ids.some((dataSkill) => dataSkill.id === skill.id)
      );
      setFilteredSkills(matchedSkills);
    }
  }, [listOfdata, allSkills]);

  // Count <li> occurrences in the skills HTML to determine whether the Read More button is needed
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

  console.log("Modified Content Response: ", {
    __html: modifiedContent(listOfdata?.skills, filteredSkills, listOfdata),
  });

  const router = useRouter();

  const [blogsList, setBlogsList] = useState([]);
  const [loadingblogs, setLoadingBlogs] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [showMoreSkillsForExperiences, setShowMoreSkillsForExperiences] =
    useState([]);
  const [showMoreSkillsForPortfolios, setShowMoreSkillsForPortfolios] =
    useState([]);
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  // useEffect(() => {
  //   setURLInfo(getRoutesDetails(params, searchParams));
  // }, [params, searchParams]);

  // Use getRoutesDetails
  useEffect(() => {
    // 🛑 Must wrap in an async function and call it 🛑
    const fetchRoutes = async () => {
      setURLInfo(await getRoutesDetails(params, searchParams));
    };
    fetchRoutes();
  }, [params, searchParams]);

  useEffect(() => {
    console.log("URL Info changed:", urlInfo);
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

  // console.log("List of Data:", listOfdata);

  const domain = listOfdata?.domain;

  useBodyBackgroundColor("#EFF5FD");

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  const [expandedItems, setExpandedItems] = useState({});

  // Toggle the "Show More" state for a specific item
  const toggleShowMore = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the specific item
    }));
  };

  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const handleBeforePrint = () => setIsPrinting(true);
    const handleAfterPrint = () => setIsPrinting(false);

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  const componentsList: ComponentConfig[] = [
    {
      componentType: "static",
      clickableNote: true,
      component: <IntroCvPortrait listOfdata={listOfdata} urlInfo={urlInfo} />,
    },

    {
      componentType: "dynamic",
      forceSolo: true,
      componentTitle: "Overview & Skills",
      component: (
        <>
          {listOfdata?.skills && (
            <OverviewCvPortrait
              filteredSkills={filteredSkills}
              listOfdata={listOfdata}
              isPrinting={isPrinting}
            />
          )}
        </>
      ),
    },

    {
      componentType: "dynamic",
      badgeTitle: "Skills",
      component: (
        <>
          {listOfdata?.skills_ids && (
            <SkillsCvPortrait
              list={listOfdata?.skills_ids}
              numColumns={6}
              numSkills={24}
              portfolioId={listOfdata?.portfolios_ids[0]?.id}
            />
          )}
        </>
      ),
    },

    // Dynamic experiences component - groups experiences per page with one badge per page
    ...(listOfdata && listOfdata?.experiences_ids?.length > 0 
      ? (() => {
          const sortedExperiences = getSortedExperiences(listOfdata.experiences_ids);
          const experiencesPerPage = 3; // Number of experiences per page
          const totalPages = Math.ceil(sortedExperiences.length / experiencesPerPage);
          
          // Create one component config for each page of experiences
          return Array.from({ length: totalPages }, (_, pageIndex) => ({
            componentType: "dynamic" as const,
            maxPageLimit: 1,
            renderOnEachpage: 1,
            badgeTitle: "Professional Experiences", // Badge shows once per page
            component: (
              <ExperiencesPageRenderer
                key={`experiences-page-${pageIndex}`}
                experiences={sortedExperiences}
                pageIndex={pageIndex}
                experiencesPerPage={experiencesPerPage}
                ShowmoreSkills={showMoreSkillsForExperiences}
                filteredSkills={filteredSkills}
                listOfdata={listOfdata}
              />
            ),
          }));
        })()
      : []),

    {
      componentType: "static",
      badgeTitle: "Portfolios",
      component: (
        <>
          {listOfdata?.portfolios_ids?.length > 0 && (
            <div
              className="w-full relative"
              key={listOfdata.portfolios_ids[0].id}
            >
              <PortfolioCvPortrait
                portfolios={listOfdata.portfolios_ids}
                companyType={listOfdata.companytype}
                locationLink={`/?sectionId=myWork`}
                portfolioId={listOfdata.portfolios_ids[0].id}
                from={1}
                max={2}
              />
            </div>
          )}
        </>
      ),
    },

    {
      componentType: "static",
      component: (
        <EducationBlogCvPortrait
          domain={domain}
          listOfdata={listOfdata}
          blogsList={blogsList}
          dateFormatsOptions={dateFormatsOptions}
          formatDate={formatDate}
          getImageForIndex={getImageForIndex}
          loadingblogs={loadingblogs}
        />
      ),
    },
  ];

  // Check if all essential data is loaded
  const isDataReady = !loading && listOfdata && urlInfo && allSkills.length > 0;
  console.log("Data Ready", isDataReady)


  return (
    <>
      {/* Show error state if there's an error */}
      {error ? (
        <div className="flex items-center justify-center min-h-screen bg-[#EFF5FD]">
          <div className="text-2xl text-red-500">
            Error loading CV data: {error}
          </div>
        </div>
      ) : /* Show loading state while data is being fetched */
      !isDataReady ? (
        <div className="flex items-center justify-center min-h-screen bg-[#EFF5FD]">
          <div className="text-2xl text-heading">Loading CV data...</div>
        </div>
      ) : (
        <PrintPageRenderer
          componentsList={componentsList}
          orientation="Portrait"
        />
      )}
    </>
  );
};
export default CV_Portrait;
