"use client";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import "@/styles/printStyles/cvPortrait.css";
import { formatDate } from "@/hooks/formatdate";
import { modifiedContent } from "@/hooks/modifiedContent";
import React, { useEffect, useState } from "react";
import { dateFormatsOptions } from "@/data/JsonData";
import { useRouter, useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { store } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import { loadBlogs } from "@/hooks/apihandlers/blogListingApiHandler";
import { useAppSelector } from "@/store";
import { getImageForIndex } from "@/utils/getImageForIndex";
import {
  EducationBlogCvPortrait,
  IntroCvPortrait,
  OverviewCvPortrait,
  PortfolioCvPortrait,
  SkillsCvPortrait,
} from "@/components/PrintComponents/cvPortraitComponents";
import ExperienceCvPortrait from "@/components/PrintComponents/cvPortraitComponents/ExperienceCvPortrait";
import PrintPageRenderer, { ComponentConfig } from "@/utils/printPageRenderer";
import ShowmoreSkills from "@/components/showmoreSkills";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { preloadImages } from "@/utils/preLoadImages";
import Link from "next/link";

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

  console.log("List of Data:", listOfdata);

  const domain = listOfdata?.domain;

  useBodyBackgroundColor("#EFF5FD");

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  const [expandedItems, setExpandedItems] = useState({});

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

  // Extract and sort experiences once for reuse across components
  const sortedExperiences = React.useMemo(() => {
    if (!listOfdata?.experiences_ids) {
      return [];
    }
    return [...listOfdata.experiences_ids].sort((a, b) => {
      const dateA = new Date(a.starting_date).getTime();
      const dateB = new Date(b.starting_date).getTime();
      return dateB - dateA;
    });
  }, [listOfdata?.experiences_ids]);

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
              numSkills={30}
              portfolioId={listOfdata?.portfolios_ids[0]?.id}
            />
          )}
        </>
      ),
    },

    // Experience Section

    {
      componentType: "static",
      badgeTitle: "Professional Experiences",
      component: (
        <>
          {listOfdata && listOfdata?.experiences_ids?.length > 0 && (
            <ExperienceCvPortrait
              filteredSkills={filteredSkills}
              listOfdata={listOfdata}
              showMoreSkills={showMoreSkillsForExperiences}
              skillsGrouping={skillsGrouping}
              start={0}
              end={3}
            />
          )}
        </>
      ),
    },

    {
      componentType: "static",
      badgeTitle: "Professional Experiences",
      component: (
        <>
          {listOfdata && listOfdata?.experiences_ids?.length > 3 && (
            <div>
              <ExperienceCvPortrait
                filteredSkills={filteredSkills}
                listOfdata={listOfdata}
                showMoreSkills={showMoreSkillsForExperiences}
                skillsGrouping={skillsGrouping}
                start={3}
                end={6}
              />
              <div className="hidden items-center justify-center w-full">
                <button className="hover:bg-white bg-primary text-white hover:text-primary capitalize text-center text-primary text-[1.4rem] font-medium py-[1rem] px-[2rem] inline-flex items-center justify-center gap-[8px] rounded-[5rem] relative border border-transparent hover:border-primary my-[1rem]">
                  Read More
                </button>
              </div>
              <div className="flex justify-center mt-8">
                <Link
                  href={`/cv?scrollTo=experiences&expand=true`}
                  className="btn-primary text-white py-[1rem] px-[3.4rem]
                  text-[1.6rem] font-medium"
                >
                  View All Experiences
                </Link>
              </div>
            </div>
          )}
        </>
      ),
    },

    {
      componentType: "static",
      badgeTitle: "Portfolios",
      component: (
        <>
          {listOfdata?.portfolios_ids?.length > 0 && (
            <div
              className="w-full relative px-[2rem]"
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
      badgeTitle: "Portfolios",
      component: (
        <>
          {listOfdata?.portfolios_ids?.length > 0 && (
            <div
              className="w-full relative px-[2rem]"
              key={listOfdata.portfolios_ids[0].id}
            >
              <PortfolioCvPortrait
                portfolios={listOfdata.portfolios_ids}
                companyType={listOfdata.companytype}
                locationLink={`/?sectionId=myWork`}
                portfolioId={listOfdata.portfolios_ids[0].id}
                from={2}
                max={3}
              />
            </div>
          )}
        </>
      ),
    },

    {
      componentType: "static",
      badgeTitle: "Portfolios",
      component: (
        <>
          {listOfdata?.portfolios_ids?.length > 0 && (
            <div
              className="w-full relative px-[2rem]"
              key={listOfdata.portfolios_ids[0].id}
            >
              <PortfolioCvPortrait
                portfolios={listOfdata.portfolios_ids}
                companyType={listOfdata.companytype}
                locationLink={`/?sectionId=myWork`}
                portfolioId={listOfdata.portfolios_ids[0].id}
                from={3}
                max={4}
              />
            </div>
          )}
        </>
      ),
    },

    {
      componentType: "static",
      badgeTitle: "Portfolios",
      component: (
        <>
          {listOfdata?.portfolios_ids?.length > 0 && (
            <div
              className="w-full relative px-[2rem]"
              key={listOfdata.portfolios_ids[0].id}
            >
              <PortfolioCvPortrait
                portfolios={listOfdata.portfolios_ids}
                companyType={listOfdata.companytype}
                locationLink={`/?sectionId=myWork`}
                portfolioId={listOfdata.portfolios_ids[0].id}
                from={4}
                max={5}
              />
            </div>
          )}
        </>
      ),
    },

    {
      componentType: "static",
      badgeTitle: "Portfolios",
      component: (
        <>
          {listOfdata?.portfolios_ids?.length > 0 && (
            <div
              className="w-full relative px-[2rem]"
              key={listOfdata.portfolios_ids[0].id}
            >
              <PortfolioCvPortrait
                portfolios={listOfdata.portfolios_ids}
                companyType={listOfdata.companytype}
                locationLink={`/?sectionId=myWork`}
                portfolioId={listOfdata.portfolios_ids[0].id}
                from={5}
                max={6}
              />
              <div className="flex justify-center items-center mt-[1.5rem]">
                <Link
                  href={`/portfolio`}
                  className="btn-primary text-white py-[1rem] px-[3.4rem]
                  text-[1.6rem] font-medium"
                >
                  View All Portfolios
                </Link>
              </div>
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

  // Extract All image URLs Before Rendering
  function extractAllImageUrls(listOfdata, blogsList) {
    const urls = [];

    // Profile image
    if (listOfdata?.profile_photo_1) urls.push(listOfdata.profile_photo_1);

    // skills HTML
    const skillsHtml = listOfdata?.skills || "";
    const htmlMatches = skillsHtml.match(/<img[^>]+src="([^">]+)"/g);
    if (htmlMatches) {
      htmlMatches.forEach((tag) => {
        const match = tag.match(/src="([^">]+)"/);
        if (match?.[1]) urls.push(match[1]);
      });
    }

    // Experiences
    listOfdata?.experiences_ids?.forEach((exp) => {
      if (exp.company_logo) urls.push(exp.company_logo);
    });

    // Portfolio images
    listOfdata?.portfolios_ids?.forEach((p) => {
      if (p.thumbnail) urls.push(p.thumbnail);
    });

    // Blogs
    blogsList?.forEach((blog) => {
      if (blog.image) urls.push(blog.image);
    });

    return urls;
  }


  // ImagesReady Guard Before PrintPageRenderer
  const [imagesReady, setImagesReady] = useState(false);
  const [imageProgress, setImageProgress] = useState({ loaded: 0, total: 0 });

  useEffect(() => {
    if (!listOfdata || !allSkills.length) return;

    async function run() {
      const urls = extractAllImageUrls(listOfdata, blogsList);
      console.log("Preloading URLs:", urls);

      setImageProgress({ loaded: 0, total: urls.length });

      await preloadImages(urls, (loaded, total) => {
        setImageProgress({ loaded, total });
      });

      setImagesReady(true); // all images fully loaded
    }

    run();
  }, [listOfdata, blogsList, allSkills]);

  // Check if all essential data is loaded
  const isDataReady =
    !loading && listOfdata && urlInfo && allSkills.length > 0 && imagesReady; // ensure images are fully loaded

  console.log("Data Ready", isDataReady);

  console.log("All Skills:", allSkills);


  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#EFF5FD]">
        <div className="text-2xl text-red-500">
          Error loading CV data: {error}
        </div>
      </div>
    );
  }

  if (!listOfdata || !imagesReady || allSkills.length === 0) {
    const { loaded, total } = imageProgress;
    const percent = total > 0 ? Math.round((loaded / total) * 100) : 0;

    return (
      <div className="flex items-center justify-center min-h-screen bg-[#EFF5FD] flex-col">
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
    <PrintPageRenderer componentsList={componentsList} orientation="Portrait" isDataReady={isDataReady} />
  );
};
export default CV_Portrait;
