"use client";
import "@/styles/printStyles/home_p.css";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import WorkProofLinks from "@/components/WorkProofLinks";
import ContactMeLinks from "@/components/ContactMeLinks";
import React, { useEffect, useRef, useState } from "react";
import { formatPhoneNumber } from "@/hooks/formatPhoneNumber";
import { formatDate } from "@/hooks/formatdate";
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
import { preloadImages } from "@/utils/preLoadImages";

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
import Link from "next/link";
import { useSortedSkills } from "@/hooks/useSortedSkills";



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


 // console.log("Unsorted Skills Print Home Page:", listOfdata?.skills_ids)
 // Here im Using Custom Hook in useSortedSkills
  const sortedSkills = useSortedSkills({
    skillsIdsWithOrder: listOfdata?.skills_ids,
    allSkills: listOfskills
  });



  const domain = listOfdata?.domain;

  const skills: {
    [key: string]: {
      title: string;
      url?: string;
      order?: string;
    }[];
  } = skillsGrouping(listOfdata?.skills_ids);

  const allComponents: ComponentConfig[] = [
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
    // Skills Section - only if portfolios exist
    ...(listOfdata?.portfolios_ids?.length > 0 ? [{
      componentType: "dynamic" as const,
      badgeTitle: "Skills",
      component: (
        <HomeSkillsSection
          autoExpandOnParam={true}
          list={sortedSkills}
          numColumns={8}
          numSkills={32}
          portfolioId={listOfdata && listOfdata?.portfolios_ids[0]?.id}
          useLinks={true}
        />
      ),
    }] : []),
    // Services Section - only if services exist
    ...(listOfdata?.services?.length > 0 ? [{
      componentType: "static" as const,
      component: (
        <HomeServicesSection
          listOfdata={listOfdata}
          listOfdatas={listOfdatas}
          services={listOfdata?.services}
        />
      ),
    }] : []),

    // Portfolio Section 1 - only if first portfolio exists
    ...(listOfdata?.portfolios_ids?.length > 0 ? [{
      componentType: "static" as const,
      badgeTitle: "Explore My Technical Endeavors",
      component: (
        <div className="w-full p-[2rem]">
          <HomePortfolioCard
            portfolios={listOfdata.portfolios_ids}
            companyType={listOfdata.companytype}
            portfolioId={listOfdata.portfolios_ids[0]?.id}
            locationLink="/?sectionId=myWork"
            listOfskills={listOfskills}
            listOfdata={listOfdata}
            from={0}
            max={1}
          />
        </div>
      ),
    }] : []),
    // Portfolio Section 2 - only if second portfolio exists
    ...(listOfdata?.portfolios_ids?.length > 1 ? [{
      componentType: "static" as const,
      badgeTitle: "Explore My Technical Endeavors",
      component: (
        <div className="w-full p-[2rem]">
          <HomePortfolioCard
            portfolios={listOfdata.portfolios_ids}
            companyType={listOfdata.companytype}
            portfolioId={listOfdata.portfolios_ids[1]?.id}
            locationLink="/?sectionId=myWork"
            listOfskills={listOfskills}
            listOfdata={listOfdata}
            from={1}
            max={2}
          />
        </div>
      ),
    }] : []),
    // Portfolio Section 3 - only if third portfolio exists
    ...(listOfdata?.portfolios_ids?.length > 2 ? [{
      componentType: "static" as const,
      badgeTitle: "Explore My Technical Endeavors",
      component: (
        <div className="w-full p-[2rem]">
          <HomePortfolioCard
            portfolios={listOfdata.portfolios_ids}
            companyType={listOfdata.companytype}
            portfolioId={listOfdata.portfolios_ids[2]?.id}
            locationLink="/?sectionId=myWork"
            listOfskills={listOfskills}
            listOfdata={listOfdata}
            from={2}
            max={3}
          />
        </div>
      ),
    }] : []),

    // Experience Sections - only if experiences exist
    ...(listOfdata?.experiences_ids?.length > 0 ? [{
      componentType: "static" as const,
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
    }] : []),
    ...(listOfdata?.experiences_ids?.length > 2 ? [{
      componentType: "static" as const,
      badgeTitle: "Professional Experience",
      component: (
        <>
          <HomeExperienceSection
            listOfdata={listOfdata}
            skillsGrouping={skillsGrouping}
            showMoreSkills={showMoreSkills}
            listOfskills={listOfskills}
            start={2}
            end={4}
          />
          <div className="flex items-center justify-center">
            <Link
              href={`/?scrollTo=experiences&expand=true&nav=experience`}
              className="btn-primary text-white py-[1rem] mt-[2rem] px-[3.4rem] text-[1.8rem] font-medium"
            >
              View All Experiences
            </Link>
          </div>
        </>
      ),
    }] : []),

    // Contact Me Section - only if not a user profile
    ...(!urlInfo?.u ? [{
      componentType: "static" as const,
      component: (
        <HomeContactMeSection
          listOfdata={listOfdata}
          formatPhoneNumber={formatPhoneNumber}
        />
      ),
    }] : []),

    // Education Section - only if education data exists
    ...(listOfdata?.education_ids?.length > 0 || blogsList?.length > 0 ? [{
      componentType: "static" as const,
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
    }] : []),
  ];

  // Filter out any components with null/undefined component property
  const componentsList: ComponentConfig[] = allComponents.filter(
    (config) => config.component !== null && config.component !== undefined
  );

  // Extract All image URLs Before Rendering
  function extractAllImageUrls(listOfdata, blogsList) {
    const urls = [];

    // 1. Profile image (used in HomeWeclome)
    if (listOfdata?.profile_photo_1) urls.push(listOfdata.profile_photo_1);

    // 2. Skills HTML images (used in HomeHeroSection via modifiedContent if applicable)
    const skillsHtml = listOfdata?.skills || "";
    const htmlMatches = skillsHtml.match(/<img[^>]+src="([^"]+)"/g);
    if (htmlMatches) {
      htmlMatches.forEach((tag) => {
        const match = tag.match(/src="([^"]+)"/);
        if (match?.[1]) urls.push(match[1]);
      });
    }

    // 3. Skills icons (used in HomeSkillsSection) - first 40 skills based on numSkills
    const visibleSkills = listOfdata?.skills_ids?.slice(0, 40) || [];
    visibleSkills.forEach((skill) => {
      if (skill.icon) urls.push(skill.icon);
    });

    // 4. Experience thumbnails (used in ExperienceCard within HomeExperienceSection)
    listOfdata?.experiences_ids?.forEach((exp) => {
      if (exp.thumbnail) urls.push(exp.thumbnail);
    });

    // 5. Portfolio thumbnails with special cases (used in HomePortfolioCard)
    // Only first 3 portfolios based on the component logic (from 0 to 3)
    const visiblePortfolios = listOfdata?.portfolios_ids?.slice(0, 3) || [];
    visiblePortfolios.forEach((portfolio) => {
      if (portfolio?.title === "Velzon") {
        urls.push("/VelzonThumbnail.PNG");
      } else if (portfolio?.title === "Beyond Competitions") {
        urls.push("/BeyondCompetetionThumbnail.webp");
      } else if (portfolio?.thumbnail) {
        urls.push(portfolio.thumbnail);
      }
    });

    // 6. Education thumbnails (used in HomeEducationComponent)
    listOfdata?.education_ids?.forEach((edu) => {
      if (edu.thumbnail) urls.push(edu.thumbnail);
    });

    // 7. Blog images via getImageForIndex (first 2 blogs only in HomeEducationComponent)
    if (blogsList?.length > 0) {
      const blogsToShow = blogsList.slice(0, Math.min(2, blogsList.length));
      blogsToShow.forEach((blog, index) => {
        if (blog?.featuredImage) {
          const imageUrl = getImageForIndex(listOfdata?.domain, index);
          if (imageUrl) urls.push(imageUrl);
        }
      });
    }

    // console.log("Home_p - Extracted Image URLs:", urls);
    return urls;
  }

  // ImagesReady Guard Before PrintPageRenderer
  const [imagesReady, setImagesReady] = useState(false);
  const [imageProgress, setImageProgress] = useState({ loaded: 0, total: 0 });

  useEffect(() => {
    if (!listOfdata || !listOfskills.length) return;

    async function run() {
      const urls = extractAllImageUrls(listOfdata, blogsList);
      // console.log("Preloading URLs:", urls);

      setImageProgress({ loaded: 0, total: urls.length });

      await preloadImages(urls, (loaded, total) => {
        setImageProgress({ loaded, total });
      });

      setImagesReady(true); // all images fully loaded
    }

    run();
  }, [listOfdata, blogsList, listOfskills]);

  // Check if all essential data is loaded
  const isDataReady = !loading && listOfdata && urlInfo && imagesReady;
  // console.log("Data Ready", isDataReady);

  // console.log("URL Info From Home Page:", urlInfo);
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
        (() => {
          const { loaded, total } = imageProgress;
          const percent = total > 0 ? Math.round((loaded / total) * 100) : 0;

          return (
            <div className="flex items-center justify-center min-h-screen bg-[#f8f9fa] flex-col">
              <div className="text-2xl text-heading mb-4">Loading Home data...</div>
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
        })()
      ) : (
        <PrintPageRenderer
          componentsList={componentsList}
          orientation="Landscape"
          isDataReady={isDataReady}
        />
      )}
    </>
  );
};

export default Home_p;
