"use client";
import "@/styles/printStyles/home_p.css";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import WorkProofLinks from "@/components/WorkProofLinks";
import ContactMeLinks from "@/components/ContactMeLinks";
import React, { useEffect, useRef, useState } from "react";
import { formatPhoneNumber } from "@/hooks/formatPhoneNumber";
import { formatDate } from "@/hooks/formatdate";
import { modifiedContent } from "@/hooks/modifiedContent";
import { dateFormatsOptions } from "@/data/JsonData";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { store, useAppSelector } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import { scrollToSection } from "@/hooks/scrollToSection";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { useMediaQuery } from "react-responsive";
import { loadBlogs } from "@/hooks/apihandlers/blogListingApiHandler";
import { getImageForIndex } from "@/utils/getImageForIndex";

// Components Imports
import {
  HomeWeclome,
  HomeHeroSection,
  HomeAboutSection,
  HomeUpworkSection,
  HomeSkillsSection,
  HomeServicesSection,
  HomeFAQSection,
  HomeContactMeSection,
  HomeEducationComponent,
  HomeExperienceSection,
  HomePortfolioCard,
} from "@/components/PrintComponents/HomePrintComponents";
import PrintPageRenderer, { ComponentConfig } from "@/utils/printPageRenderer";

const Home_p = ({ params }: { params: any }) => {
  useBodyBackgroundColor("#f8f9fa");
  const [showMoreSkills, setShowMoreSkills] = useState([]);
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const skillsContainerRef = useRef(null);
  const [blogsList, setBlogsList] = useState([]);
  const [loadingblogs, setLoadingBlogs] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

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
        actionType: "home",
        urlInfo,
        setError,
        setLoading,
        setListOfData,
      });
  }, [urlInfo]);

  useEffect(() => {
    const skillsContainer = skillsContainerRef?.current;
    if (skillsContainer) {
      // Check if content overflows the specified height (e.g., 40rem)
      setIsOverflowing(
        skillsContainer?.scrollHeight > skillsContainer?.clientHeight
      );
    }
  }, [listOfdata?.skills_ids]);

  useEffect(() => {
    if (listOfdata) {
      // // console.log(listOfdata);
      // skillsSyncApi({ setListOfSkills });
    }
    listOfdata && handleSkillsApiCall({ setListOfSkills });
  }, [listOfdata]);

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

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

  const skills: {
    [key: string]: {
      title: string;
      url?: string;
      order?: string;
    }[];
  } = skillsGrouping(listOfdata?.skills_ids);

  const componentsList: ComponentConfig[] = [
    {
      componentType: "static",
      clickableNote: true,
      component: (
        <HomeWeclome
          listOfdata={listOfdata}
          listOfdatas={listOfdatas}
          urlInfo={urlInfo}
          WorkProofLinks={WorkProofLinks}
          ContactMeLinks={ContactMeLinks}
        />
      ),
    },

    {
      componentType: "static",
      component: (
        <HomeHeroSection
          isOverflowing={isOverflowing}
          scrollToSection={scrollToSection}
          skillsContainerRef={skillsContainerRef}
          skills={skills}
          listOfdata={listOfdata}
        />
      ),
    },

    {
      componentType: "static",
      component: (
        <HomeAboutSection
          ContactMeLinks={ContactMeLinks}
          WorkProofLinks={WorkProofLinks}
          formatPhoneNumber={formatPhoneNumber}
          listOfdata={listOfdata}
          urlInfo={urlInfo}
        />
      ),
    },

    {
      componentType: "static",
      component: (
        <HomeUpworkSection listOfdata={listOfdata} urlInfo={urlInfo} />
      ),
    },
    {
      componentType: "dynamic",
      badgeTitle: "Skills",
      component: (
        <HomeSkillsSection
          autoExpandOnParam={true}
          list={listOfdata?.skills_ids}
          numColumns={8}
          numSkills={40}
          portfolioId={listOfdata?.portfolios_ids[0]?.id}
          useLinks={true}
        />
      ),
    },
    {
      componentType: "static",
      component: (
        <HomeServicesSection
          listOfdata={listOfdata}
          listOfdatas={listOfdatas}
          services={listOfdata?.services}
        />
      ),
    },
    {
      componentType: "static",
      badgeTitle: "Explore My Technical Endeavors",
      component: listOfdata?.portfolios_ids?.length > 0 && (
        <div className="w-full p-[2rem]">
          <HomePortfolioCard
            portfolios={listOfdata.portfolios_ids}
            companyType={listOfdata.companytype}
            portfolioId={listOfdata.portfolios_ids[0]?.id}
            locationLink="/?sectionId=myWork"
            from={0}
            max={1}
          />
        </div>
      ),
    },
    {
      componentType: "static",
      badgeTitle: "Explore My Technical Endeavors",
      component: listOfdata?.portfolios_ids?.length > 0 && (
        <div className="w-full p-[2rem]">
          <HomePortfolioCard
            portfolios={listOfdata.portfolios_ids}
            companyType={listOfdata.companytype}
            portfolioId={listOfdata.portfolios_ids[0]?.id}
            locationLink="/?sectionId=myWork"
            from={1}
            max={2}
          />
        </div>
      ),
    },
    {
      componentType: "static",
      badgeTitle: "Explore My Technical Endeavors",
      component: listOfdata?.portfolios_ids?.length > 0 && (
        <div className="w-full p-[2rem]">
          <HomePortfolioCard
            portfolios={listOfdata.portfolios_ids}
            companyType={listOfdata.companytype}
            portfolioId={listOfdata.portfolios_ids[0]?.id}
            locationLink="/?sectionId=myWork"
            from={2}
            max={3}
          />
        </div>
      ),
    },

    {
      componentType: "static",
      badgeTitle: "Professional Experience",
      component: (
        <HomeExperienceSection
          listOfdata={listOfdata}
          skillsGrouping={skillsGrouping}
          showMoreSkills={showMoreSkills}
          listOfskills={listOfskills}
          start={0}
          end={2}
        />
      ),
    },
    {
      componentType: "static",
      badgeTitle: "Professional Experience",
      component: (
        <HomeExperienceSection
          listOfdata={listOfdata}
          skillsGrouping={skillsGrouping}
          showMoreSkills={showMoreSkills}
          listOfskills={listOfskills}
          start={2}
          end={4}
        />
      ),
    },
    {
      componentType: "static",
      badgeTitle: "Professional Experience",
      component: (
        <HomeExperienceSection
          listOfdata={listOfdata}
          skillsGrouping={skillsGrouping}
          showMoreSkills={showMoreSkills}
          listOfskills={listOfskills}
          start={4}
          end={6}
        />
      ),
    },

    // {
    //   componentType: "dynamic",
    //   badgeTitle: "FAQ's",
    //   component: (
    //     <HomeFAQSection
    //       urlInfo={urlInfo}
    //       companyType={listOfdata?.companytype}
    //       apiData={listOfdata}
    //     />
    //   ),
    // },
    {
      componentType: "static",
      component: (
        <>
          {!urlInfo?.u && (
            <HomeContactMeSection
              listOfdata={listOfdata}
              formatPhoneNumber={formatPhoneNumber}
            />
          )}
        </>
      ),
    },

    {
      componentType: "static",
      component: (
        <HomeEducationComponent
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
  const isDataReady = !loading && listOfdata && urlInfo;
  console.log("Data Ready", isDataReady);

  return (
    <>
      {/* Show error state if there's an error */}
      {error ? (
        <div className="flex items-center justify-center min-h-screen bg-[#EFF5FD]">
          <div className="text-2xl text-red-500">
            Error loading Home data: {error}
          </div>
        </div>
      ) : /* Show loading state while data is being fetched */
      !isDataReady ? (
        <div className="flex items-center justify-center min-h-screen bg-[#EFF5FD]">
          <div className="text-2xl text-heading">Loading Home data...</div>
        </div>
      ) : (
        <PrintPageRenderer
          componentsList={componentsList}
          orientation="Landscape"
        />
      )}
    </>
  );
};

export default Home_p;
