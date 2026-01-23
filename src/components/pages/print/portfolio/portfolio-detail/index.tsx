"use client";
import React, { useEffect, useRef, useState } from "react";
import "@/styles/printStyles/portfolio_detail_p.css";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { useSearchParams } from "next/navigation";
import { formatDate } from "@/hooks/formatdate";
import Portfoliodetailbg from "@/components/portfoliodetailbg";
import { dateFormatsOptions } from "@/data/JsonData";
import { modifiedContent } from "@/hooks/modifiedContent";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { getRoutesDetails } from "@/hooks/url";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { store, useAppSelector } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import WorkProofLinks from "@/components/WorkProofLinks";
import ContactMeLinks from "@/components/ContactMeLinks";
import {
  BlogTechStackPoint,
  EducationBlogPortfolioDetail,
  HeroPortfolioDetail,
  IntroPortfolioDetail,
  PortfolioBlogDetail,
  PortfolioDetailKeyModule,
  PortfolioDetailSKills,
  PortfolioDetailSliderSection,
  PortfolioDetailUpworkSection,
} from "@/components/PrintComponents/portfolioDetailComponents";
import { getImageForIndex } from "@/utils/getImageForIndex";
import { loadBlogs } from "@/hooks/apihandlers/blogListingApiHandler";
import PrintPageRenderer, { ComponentConfig } from "@/utils/printPageRenderer";
import { preloadImages } from "@/utils/preLoadImages";
import { useSortedSkills } from "@/hooks/useSortedSkills";

const PortfolioDetails_p = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();
  const [portfolioDetails, setPortfolioDetails] = useState(null);
  const [blogsList, setBlogsList] = useState<any[]>([]);
  const [loadingblogs, setLoadingBlogs] = useState(false);
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagesReady, setImagesReady] = useState(false);
  const [imageProgress, setImageProgress] = useState({ loaded: 0, total: 0 });

  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  // Filter skills based on listOfdata.skills_ids
  const [allSkills, setAllSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);

  useEffect(() => {
    if (listOfdata?.skills_ids && allSkills.length > 0) {
      const matchedSkills = allSkills.filter((skill) =>
        listOfdata.skills_ids.some((dataSkill) => dataSkill.id === skill.id)
      );
      setFilteredSkills(matchedSkills);
    }
  }, [listOfdata, allSkills]);

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
        actionType: "portfolioById",
        urlInfo,
        setError,
        setLoading,
        setListOfData, // 🛑 CORRECTED LOGIC 🛑
        itemID: params.id
          ? params.id // Case 1: ID is directly in params.id
          : Array.isArray(params.value)
          ? params.value[0] // Case 2: ID is the first element of a catch-all array
          : typeof params.value === "object" && params.value !== null
          ? params.value.id // Case 3: ID is nested as an object property
          : params.value, // 🛑 END CORRECTED LOGIC 🛑
      });
  }, [urlInfo, params.id, params.value]); //

  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills });
  }, []);

  useEffect(() => {
    if (listOfdata && listOfdata?.portfolios_ids?.length > 0) {
      setPortfolioDetails(listOfdata?.portfolios_ids[0]);
    }
  }, [listOfdata]);

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  useBodyBackgroundColor("#EFF5FD");
  const skillsRef = useRef<HTMLDivElement | null>(null); // Create a ref for the skills section

  useEffect(() => {
    if (portfolioDetails) {
      if (searchParams.get("scroll") === "skills" && skillsRef.current) {
        skillsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams, portfolioDetails]);

  const skillsforDetailPortfolio: {
    [key: string]: {
      title: string;
      url?: string;
      order?: string;
    }[];
  } = skillsGrouping(portfolioDetails?.skills);

  // Features parsing and truncation for screen/print
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const [featuresItemCount, setFeaturesItemCount] = useState(0);
  const [fullFeaturesHtml, setFullFeaturesHtml] = useState<string | null>(null);
  const [defaultTruncatedHtml, setDefaultTruncatedHtml] = useState<
    string | null
  >(null); // 15 items for screen
  const [printTruncatedHtml, setPrintTruncatedHtml] = useState<string | null>(
    null
  ); // 12 items for print
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // screen expansion toggle

  // Load blogs when profile data is ready
  useEffect(() => {
    if (listOfdata?.domain) {
      loadBlogs({
        domain: listOfdata.domain,
        setBlogs: setBlogsList,
        setLoading: setLoadingBlogs,
      });
    }
  }, [listOfdata?.domain]);

  useEffect(() => {
    if (!portfolioDetails) {
      setFeaturesItemCount(0);
      setFullFeaturesHtml("");
      setDefaultTruncatedHtml("");
      setPrintTruncatedHtml("");
      return;
    }

    try {
      const rawHtml =
        modifiedContent(
          portfolioDetails?.features_short,
          filteredSkills,
          listOfdata
        ) || "";

      // DEBUG: inspect rawHtml and ensure it contains the expected <li> items
      // Remove these logs after verification
      // console.log("[features] rawHtml length:", rawHtml.length);
      const parserForCount = new DOMParser();
      const docForCount = parserForCount.parseFromString(rawHtml, "text/html");
      const allLis = Array.from(docForCount.querySelectorAll("li"));
      setFeaturesItemCount(allLis.length);
      setFullFeaturesHtml(rawHtml);

      // Helper builds truncated HTML using a FRESH parser/document each call
      const buildTruncated = (count: number) => {
        if (!rawHtml) return "";

        const parser = new DOMParser();
        const tempDoc = parser.parseFromString(rawHtml, "text/html");

        // get all list items from the source HTML (preserves order)
        const lis = Array.from(tempDoc.querySelectorAll("li"));
        if (lis.length === 0) {
          // nothing to truncate, return raw source
          return rawHtml;
        }

        // determine the type of the first list (ul or ol), fallback to 'ul'
        const firstList = tempDoc.querySelector("ul, ol");
        const listTag = firstList ? firstList.tagName.toLowerCase() : "ul";

        // Create a new document to build safe HTML
        const newDoc = document.implementation.createHTMLDocument("");
        const container = newDoc.createElement("div");
        const newList = newDoc.createElement(listTag);

        // append clones of the first `count` <li> items
        const take = Math.min(count, lis.length);
        lis.slice(0, take).forEach((li) => {
          newList.appendChild(li.cloneNode(true));
        });

        container.appendChild(newList);
        return container.innerHTML;
      };

      // default screen truncated to 15
      setDefaultTruncatedHtml(
        allLis.length > 15 ? buildTruncated(15) : rawHtml
      );

      // print truncated to 12 (force up to 12)
      setPrintTruncatedHtml(allLis.length > 12 ? buildTruncated(12) : rawHtml);
    } catch (e) {
      console.error("[features] parse error:", e);
      setFeaturesItemCount(0);
      setFullFeaturesHtml("");
      setDefaultTruncatedHtml("");
      setPrintTruncatedHtml("");
    }
  }, [portfolioDetails, filteredSkills, listOfdata]);

  // Listen for print events to toggle print mode
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onBefore = () => setIsPrintMode(true);
    const onAfter = () => setIsPrintMode(false);

    window.addEventListener("beforeprint", onBefore);
    window.addEventListener("afterprint", onAfter);

    // matchMedia fallback
    const m = window.matchMedia?.("print");
    const mmHandler = (e: MediaQueryListEvent) => setIsPrintMode(e.matches);
    if (m && typeof m.addEventListener === "function")
      m.addEventListener("change", mmHandler);

    return () => {
      window.removeEventListener("beforeprint", onBefore);
      window.removeEventListener("afterprint", onAfter);
      if (m && typeof m.removeEventListener === "function")
        m.removeEventListener("change", mmHandler);
    };
  }, []);

  const sortedSkills = useSortedSkills({
    skillsIdsWithOrder: listOfdata?.skills_ids,
    allSkills: listOfskills,
  });

  const componentsList: ComponentConfig[] = [
    {
      componentType: "static",
      clickableNote: true,
      component: (
        <IntroPortfolioDetail
          ContactMeLinks={ContactMeLinks}
          WorkProofLinks={WorkProofLinks}
          listOfdata={listOfdata}
          listOfdatas={listOfdatas}
          urlInfo={urlInfo}
        />
      ),
    },

    {
      componentType: "static",
      component: (
        <HeroPortfolioDetail
          portfolioDetails={portfolioDetails}
          formatDate={formatDate}
          dateFormatsOptions={dateFormatsOptions}
          Portfoliodetailbg={Portfoliodetailbg}
        />
      ),
    },
    {
      componentType: "static",
      component: (
        <PortfolioBlogDetail
          portfolioDetails={portfolioDetails}
          formatDate={formatDate}
          dateFormatsOptions={dateFormatsOptions}
          modifiedContent={modifiedContent}
          filteredSkills={filteredSkills}
          listOfdata={listOfdata}
          skillsforDetailPortfolio={skillsforDetailPortfolio}
        />
      ),
    },
    {
      componentType: "static",
      component: (
        <BlogTechStackPoint
          featuresItemCount={featuresItemCount}
          printTruncatedHtml={printTruncatedHtml}
          portfolioId={
            portfolioDetails?.id ||
            params?.id ||
            listOfdata?.portfolios_ids?.[0]?.id
          }
        />
      ),
    },
    {
      componentType: "static",
      component: (
        <PortfolioDetailKeyModule
          modifiedContent={modifiedContent}
          portfolioDetails={portfolioDetails}
          filteredSkills={filteredSkills}
          listOfdata={listOfdata}
        />
      ),
    },
    {
      componentType: "static",
      component: (
        <PortfolioDetailUpworkSection
          listOfdata={listOfdata}
          urlInfo={urlInfo}
        />
      ),
    },
    {
      componentType: "static",
      badgeTitle: "Tech Stack I have worked on",
      component: (
        <PortfolioDetailSKills
          list={sortedSkills}
          numColumns={7}
          numSkills={35}
          portfolioId={listOfdata?.portfolios_ids[0]?.id}
        />
      ),
    },
    {
      componentType: "static",
      component: (
        <PortfolioDetailSliderSection
          portfolioDetails={portfolioDetails}
          params={params}
        />
      ),
    },
    {
      componentType: "static",
      component: (
        <EducationBlogPortfolioDetail
          listOfdata={listOfdata}
          domain={listOfdata?.domain}
          formatDate={formatDate}
          dateFormatsOptions={dateFormatsOptions}
          loadingblogs={loadingblogs}
          blogsList={blogsList}
          getImageForIndex={getImageForIndex}
        />
      ),
    },
  ];

  const extractAllImageUrls = (
    data: any,
    blogs: any[],
    portfolioDetails: any
  ) => {
    const urls = new Set<string>();

    // 1. IntroPortfolioDetail: Profile photo
    if (data?.profile_photo_1) urls.add(data.profile_photo_1);

    // 2. HeroPortfolioDetail: Portfolio thumbnail
    if (portfolioDetails?.thumbnail) urls.add(portfolioDetails.thumbnail);

    // 3. PortfolioDetailSliderSection: Portfolio pictures (JSON array)
    if (portfolioDetails?.pictures) {
      try {
        const pictures = JSON.parse(portfolioDetails.pictures || "[]");
        if (Array.isArray(pictures)) {
          // Only add first image as component shows slice(0, 1)
          pictures.slice(0, 1).forEach((pic) => {
            if (pic && typeof pic === "string") urls.add(pic);
          });
        }
      } catch (e) {
        console.warn("Error parsing portfolio pictures:", e);
      }
    }

    // 4. EducationBlogPortfolioDetail: Education thumbnails
    data?.education_ids?.forEach((edu: any) => {
      if (edu.thumbnail) urls.add(edu.thumbnail);
    });

    // 5. EducationBlogPortfolioDetail: Blog images (using getImageForIndex logic)
    blogs?.slice(0, 2).forEach((blog, index) => {
      if (blog.featuredImage) {
        const blogImage = getImageForIndex(data?.domain || "", index);
        if (blogImage) urls.add(blogImage);
      }
    });

    // 6. Other potential images from modifiedContent (features_short, key_modules, etc.)
    const htmlFields = [
      portfolioDetails?.features_short,
      portfolioDetails?.key_modules,
      portfolioDetails?.short_description,
    ];

    htmlFields.forEach((htmlContent) => {
      if (htmlContent) {
        const processedHtml =
          modifiedContent(htmlContent, filteredSkills, data) || "";
        const htmlMatches = processedHtml.match(
          /<img[^>]+src=["']([^"']+)["'][^>]*>/g
        );
        if (htmlMatches) {
          htmlMatches.forEach((tag) => {
            const match = tag.match(/src=["']([^"']+)["']/);
            if (match?.[1]) urls.add(match[1]);
          });
        }
      }
    });

    return Array.from(urls);
  };

  // Preload images when data is available
  useEffect(() => {
    if (!listOfdata || listOfskills.length === 0) return;

    const urls = extractAllImageUrls(listOfdata, blogsList, portfolioDetails);
    // console.log("Portfolio Detail - Preloading URLs:", urls);
    setImageProgress({ loaded: 0, total: urls.length });

    if (urls.length === 0) {
      setImagesReady(true);
      return;
    }

    preloadImages(urls, (loaded, total) =>
      setImageProgress({ loaded, total })
    ).then(() => setImagesReady(true));
  }, [
    listOfdata,
    blogsList,
    listOfskills.length,
    portfolioDetails,
    filteredSkills,
  ]);

  // Loading / Error States
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#EFF5FD]">
        <div className="text-2xl text-red-500">
          Error Loading Portfolio data: {error}
        </div>
      </div>
    );
  }

  if (!listOfdata || !imagesReady || listOfskills.length === 0) {
    const { loaded, total } = imageProgress;
    const percent = total > 0 ? Math.round((loaded / total) * 100) : 0;

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#EFF5FD] gap-4">
        <div className="text-2xl text-heading">Loading Portfolio data...</div>
        {total > 0 && (
          <>
            <div className="w-64 h-4 border border-gray-300 rounded overflow-hidden bg-white">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="text-sm text-gray-600">{percent}%</div>
          </>
        )}
      </div>
    );
  }

  return (
    <PrintPageRenderer
      componentsList={componentsList}
      orientation="Landscape"
      isDataReady={
        !loading &&
        listOfdata &&
        urlInfo &&
        imagesReady &&
        listOfskills.length > 0
      }
    />
  );
};

export default PortfolioDetails_p;
