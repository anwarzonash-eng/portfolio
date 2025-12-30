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
import { useSortedSkills } from "@/hooks/useSortedSkills";

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

  // console.log("Modified Content Response: ", {
  //   __html: modifiedContent(listOfdata?.skills, filteredSkills, listOfdata),
  // });

  // console.log("CV Portrait Testing:", listOfdata?.portfolios_ids)

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
    // console.log("URL Info changed:", urlInfo);
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

  // console.log("List of Data:", listOfdata?.portfolios_ids);
  // console.log("URL Info:", urlInfo);

  const domain = listOfdata?.domain;

  useBodyBackgroundColor("#EFF5FD");

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  const [expandedItems, setExpandedItems] = useState({});

  // const [isPrinting, setIsPrinting] = useState(false);

  // useEffect(() => {
  //   const handleBeforePrint = () => setIsPrinting(true);
  //   const handleAfterPrint = () => setIsPrinting(false);

  //   window.addEventListener("beforeprint", handleBeforePrint);
  //   window.addEventListener("afterprint", handleAfterPrint);

  //   return () => {
  //     window.removeEventListener("beforeprint", handleBeforePrint);
  //     window.removeEventListener("afterprint", handleAfterPrint);
  //   };
  // }, []);

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

  const sortedSkills = useSortedSkills({
    skillsIdsWithOrder: listOfdata?.skills_ids,
    allSkills,
  });
  // console.log("Sorted Skills: ", sortedSkills)

  const allComponents: ComponentConfig[] = [
    {
      componentType: "static",
      clickableNote: true,
      component: <IntroCvPortrait listOfdata={listOfdata} urlInfo={urlInfo} />,
    },

    // Overview & Skills - only if skills data exists
    ...(listOfdata?.skills
      ? [
          {
            componentType: "dynamic" as const,
            forceSolo: true,
            componentTitle: "Overview & Skills",
            component: (
              <OverviewCvPortrait
                filteredSkills={filteredSkills}
                listOfdata={listOfdata}
                // isPrinting={isPrinting}
              />
            ),
          },
        ]
      : []),

    // Skills Section - only if skills_ids exist
    ...(listOfdata?.skills_ids?.length > 0 &&
    listOfdata?.portfolios_ids?.length > 0
      ? [
          {
            componentType: "dynamic" as const,
            badgeTitle: "Skills",
            component: (
              <SkillsCvPortrait
                list={sortedSkills}
                numColumns={5}
                numSkills={20}
                portfolioId={listOfdata?.portfolios_ids[0]?.id}
              />
            ),
          },
        ]
      : []),

    // Experience Section 1 - only if experiences exist
    ...(listOfdata?.experiences_ids?.length > 0
      ? [
          {
            componentType: "static" as const,
            badgeTitle: "Professional Experiences",
            component: (
              <ExperienceCvPortrait
                filteredSkills={filteredSkills}
                listOfdata={listOfdata}
                showMoreSkills={showMoreSkillsForExperiences}
                skillsGrouping={skillsGrouping}
                start={0}
                end={3}
              />
            ),
          },
        ]
      : []),

    // Experience Section 2 - only if more than 3 experiences exist
    ...(listOfdata?.experiences_ids?.length > 3
      ? [
          {
            componentType: "static" as const,
            badgeTitle: "Professional Experiences",
            component: (
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
            ),
          },
        ]
      : []),

    // Portfolio Section 1 - only if portfolios exist
    ...(listOfdata?.portfolios_ids?.length > 0
      ? [
          {
            componentType: "static" as const,
            badgeTitle: "Portfolios",
            component: (
              <div
                className="w-full relative px-[2rem]"
                key={listOfdata.portfolios_ids[0].id}
              >
                <PortfolioCvPortrait
                  portfolios={listOfdata.portfolios_ids}
                  companyType={listOfdata.companytype}
                  locationLink={`/?sectionId=myWork`}
                  portfolioId={listOfdata.portfolios_ids[0].id}
                  listOfskills={listOfskills}
                  listOfdata={listOfdata}
                  from={1}
                  max={2}
                />
              </div>
            ),
          },
        ]
      : []),

    // Portfolio Section 2 - only if more than 1 portfolio exists
    ...(listOfdata?.portfolios_ids?.length > 1
      ? [
          {
            componentType: "static" as const,
            badgeTitle: "Portfolios",
            component: (
              <div
                className="w-full relative px-[2rem]"
                key={`${listOfdata.portfolios_ids[0].id}-2`}
              >
                <PortfolioCvPortrait
                  portfolios={listOfdata.portfolios_ids}
                  companyType={listOfdata.companytype}
                  locationLink={`/?sectionId=myWork`}
                  portfolioId={listOfdata.portfolios_ids[0].id}
                  listOfskills={listOfskills}
                  listOfdata={listOfdata}
                  from={2}
                  max={3}
                />
              </div>
            ),
          },
        ]
      : []),

    // Portfolio Section 3 - only if more than 2 portfolios exist
    ...(listOfdata?.portfolios_ids?.length > 2
      ? [
          {
            componentType: "static" as const,
            badgeTitle: "Portfolios",
            component: (
              <div
                className="w-full relative px-[2rem]"
                key={`${listOfdata.portfolios_ids[0].id}-3`}
              >
                <PortfolioCvPortrait
                  portfolios={listOfdata.portfolios_ids}
                  companyType={listOfdata.companytype}
                  locationLink={`/?sectionId=myWork`}
                  portfolioId={listOfdata.portfolios_ids[0].id}
                  listOfskills={listOfskills}
                  listOfdata={listOfdata}
                  from={3}
                  max={4}
                />
              </div>
            ),
          },
        ]
      : []),

    // Portfolio Section 4 - only if more than 3 portfolios exist
    ...(listOfdata?.portfolios_ids?.length > 3
      ? [
          {
            componentType: "static" as const,
            badgeTitle: "Portfolios",
            component: (
              <div
                className="w-full relative px-[2rem]"
                key={`${listOfdata.portfolios_ids[0].id}-4`}
              >
                <PortfolioCvPortrait
                  portfolios={listOfdata.portfolios_ids}
                  companyType={listOfdata.companytype}
                  locationLink={`/?sectionId=myWork`}
                  portfolioId={listOfdata.portfolios_ids[0].id}
                  listOfskills={listOfskills}
                  listOfdata={listOfdata}
                  from={4}
                  max={5}
                />
              </div>
            ),
          },
        ]
      : []),

    // Portfolio Section 5 - only if more than 4 portfolios exist
    ...(listOfdata?.portfolios_ids?.length > 4
      ? [
          {
            componentType: "static" as const,
            badgeTitle: "Portfolios",
            component: (
              <div
                className="w-full relative px-[2rem]"
                key={`${listOfdata.portfolios_ids[0].id}-5`}
              >
                <PortfolioCvPortrait
                  portfolios={listOfdata.portfolios_ids}
                  companyType={listOfdata.companytype}
                  locationLink={`/?sectionId=myWork`}
                  portfolioId={listOfdata.portfolios_ids[0].id}
                  listOfskills={listOfskills}
                  listOfdata={listOfdata}
                  from={5}
                  max={6}
                />
                <div className="flex justify-center items-center mt-[1.5rem]">
                  <Link
                    href={`/cv?scrollTo=portfolios&expand=true`}
                    className="btn-primary text-white py-[1rem] px-[3.4rem]
              text-[1.6rem] font-medium"
                  >
                    View All Portfolios
                  </Link>
                </div>
              </div>
            ),
          },
        ]
      : []),

    // Education & Blog Section - only if education or blogs exist
    ...(listOfdata?.education_ids?.length > 0 || blogsList?.length > 0
      ? [
          {
            componentType: "static" as const,
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
        ]
      : []),
  ];

  // Filter out any components with null/undefined component property
  const componentsList: ComponentConfig[] = allComponents.filter(
    (config) => config.component !== null && config.component !== undefined
  );

  // Extract All image URLs Before Rendering
  function extractAllImageUrls(listOfdata, blogsList) {
    const urls = [];

    // 1. Profile image (used in IntroCvPortrait)
    if (listOfdata?.profile_photo_1) urls.push(listOfdata.profile_photo_1);

    // 2. Skills HTML images (used in OverviewCvPortrait via modifiedContent)
    const skillsHtml = listOfdata?.skills || "";
    const htmlMatches = skillsHtml.match(/<img[^>]+src="([^">]+)"/g);
    if (htmlMatches) {
      htmlMatches.forEach((tag) => {
        const match = tag.match(/src="([^">]+)"/);
        if (match?.[1]) urls.push(match[1]);
      });
    }

    // 3. Skills icons (used in SkillsCvPortrait)
    listOfdata?.skills_ids?.forEach((skill) => {
      if (skill.icon) urls.push(skill.icon);
    });

    // 4. Experience thumbnails (used in ExperienceCvPortrait)
    listOfdata?.experiences_ids?.forEach((exp) => {
      if (exp.thumbnail) urls.push(exp.thumbnail);
    });

    // 5. Portfolio thumbnails with special cases (used in PortfolioCvPortrait)
    listOfdata?.portfolios_ids?.forEach((portfolio) => {
      if (portfolio?.title === "Velzon") {
        urls.push("/VelzonThumbnail.PNG");
      } else if (portfolio?.title === "Beyond Competitions") {
        urls.push("/BeyondCompetetionThumbnail.webp");
      } else if (portfolio?.thumbnail) {
        urls.push(portfolio.thumbnail);
      }
    });

    // 6. Education thumbnails (used in EducationBlogCvPortrait)
    listOfdata?.education_ids?.forEach((edu) => {
      if (edu.thumbnail) urls.push(edu.thumbnail);
    });

    // 7. Blog images via getImageForIndex (first 3 blogs only in EducationBlogCvPortrait)
    if (blogsList?.length > 0) {
      const blogsToShow = blogsList.slice(0, Math.min(3, blogsList.length));
      blogsToShow.forEach((blog, index) => {
        if (blog?.featuredImage) {
          const imageUrl = getImageForIndex(listOfdata?.domain, index);
          if (imageUrl) urls.push(imageUrl);
        }
      });
    }

    // console.log("cvPortrait - Extracted Image URLs:", urls);
    return urls;
  }

  // ImagesReady Guard Before PrintPageRenderer
  const [imagesReady, setImagesReady] = useState(false);
  const [imageProgress, setImageProgress] = useState({ loaded: 0, total: 0 });

  useEffect(() => {
    if (!listOfdata || !allSkills.length) return;

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
  }, [listOfdata, blogsList, allSkills]);

  // Check if all essential data is loaded
  const isDataReady =
    !loading && listOfdata && urlInfo && allSkills.length > 0 && imagesReady; // ensure images are fully loaded

  // console.log("Data Ready", isDataReady);

  // console.log("All Skills:", allSkills);

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
    <PrintPageRenderer
      componentsList={componentsList}
      orientation="Portrait"
      isDataReady={isDataReady}
    />
  );
};
export default CV_Portrait;
