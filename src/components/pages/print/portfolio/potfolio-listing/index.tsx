"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import "@/styles/printStyles/portfolio_p.css";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { store } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { useAppSelector } from "@/store";
import WorkProofLinks from "@/components/WorkProofLinks";
import ContactMeLinks from "@/components/ContactMeLinks";
import { formatPhoneNumber } from "@/hooks/formatPhoneNumber";
import { formatDate } from "@/hooks/formatdate";
import { dateFormatsOptions } from "@/data/JsonData";
import { getImageForIndex } from "@/utils/getImageForIndex";
import { loadBlogs } from "@/hooks/apihandlers/blogListingApiHandler";
import PrintPageRenderer, { ComponentConfig } from "@/utils/printPageRenderer";
import {
  PortfolioWelcome,
  PortfolioContactMe,
  EducationBlogPortfolio,
  PortfolioPortrait,
} from "@/components/PrintComponents/portfolioListingComponents";
import { preloadImages } from "@/utils/preLoadImages";

const PortfolioListing_p = ({ params }: { params: any }) => {
  const [urlInfo, setURLInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [listOfdata, setListOfData] = useState<any>(null);
  const [listOfskills, setListOfSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogsList, setBlogsList] = useState<any[]>([]);
  const [loadingblogs, setLoadingBlogs] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const [imageProgress, setImageProgress] = useState({ loaded: 0, total: 0 });

  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );
  const searchParams = useSearchParams();

  // Set background color once
  useBodyBackgroundColor("#EFF5FD");

  // Fetch URL info
  useEffect(() => {
    const fetchRoutes = async () => {
      const info = await getRoutesDetails(params, searchParams);
      setURLInfo(info);
    };
    fetchRoutes();
  }, [params, searchParams]);

  // Fetch profile/portfolio data
  useEffect(() => {
    if (urlInfo) {
      reportsApiHandler({
        actionType: "portfolio",
        urlInfo,
        setError,
        setLoading,
        setListOfData,
      });
    }
  }, [urlInfo]);

  // Fetch skills (global)
  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills });
  }, []);

  // Sync Redux
  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

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

  const extractAllImageUrls = (data: any, blogs: any[]) => {
    const urls = new Set<string>();

    // 1. PortfolioWelcome: Profile photo
    if (data?.profile_photo_1) urls.add(data.profile_photo_1);

    // 2. PortfolioPortrait: Portfolio thumbnails with special handling
    data?.portfolios_ids?.forEach((portfolio: any) => {
      if (portfolio?.thumbnail) {
        // Handle special cases for specific portfolio titles
        if (portfolio?.title === "Velzon") {
          urls.add("/VelzonThumbnail.PNG");
        } else if (portfolio?.title === "Beyond Competitions") {
          urls.add("/BeyondCompetetionThumbnail.webp");
        } else if (portfolio?.thumbnail) {
          urls.add(portfolio.thumbnail);
        } else {
          urls.add("/images/dummy_port_img.webp");
        }
      }
    });

    // 3. EducationBlogPortfolio: Education thumbnails
    data?.education_ids?.forEach((edu: any) => {
      if (edu?.thumbnail) urls.add(edu.thumbnail);
    });

    // 4. EducationBlogPortfolio: Blog images (using getImageForIndex logic)
    // Component shows slice(0, 3) blogs
    blogs?.slice(0, 3).forEach((blog, index) => {
      if (blog?.featuredImage) {
        const blogImage = getImageForIndex(data?.domain || '', index);
        if (blogImage) urls.add(blogImage);
      }
    });

    return Array.from(urls);
  };

  // Preload images when data is available
  useEffect(() => {
    if (!listOfdata || listOfskills.length === 0) return;

    const urls = extractAllImageUrls(listOfdata, blogsList);
    console.log("Portfolio Listing - Preloading URLs:", urls);
    setImageProgress({ loaded: 0, total: urls.length });

    if (urls.length === 0) {
      setImagesReady(true);
      return;
    }

    preloadImages(urls, (loaded, total) =>
      setImageProgress({ loaded, total })
    ).then(() => setImagesReady(true));
  }, [listOfdata, blogsList, listOfskills.length]);

  // Final components list
  const componentsList: ComponentConfig[] = [
    {
      componentType: "static",
      clickableNote: true,
      component: (
        <PortfolioWelcome
          listOfdatas={listOfdatas}
          listOfdata={listOfdata}
          WorkProofLinks={WorkProofLinks}
          urlInfo={urlInfo}
          ContactMeLinks={ContactMeLinks}
        />
      ),
    },

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
              <PortfolioPortrait
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
              className="w-full relative"
              key={listOfdata.portfolios_ids[0].id}
            >
              <PortfolioPortrait
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
              className="w-full relative"
              key={listOfdata.portfolios_ids[0].id}
            >
              <PortfolioPortrait
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
              className="w-full relative"
              key={listOfdata.portfolios_ids[0].id}
            >
              <PortfolioPortrait
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
              className="w-full relative"
              key={listOfdata.portfolios_ids[0].id}
            >
              <PortfolioPortrait
                portfolios={listOfdata.portfolios_ids}
                companyType={listOfdata.companytype}
                locationLink={`/?sectionId=myWork`}
                portfolioId={listOfdata.portfolios_ids[0].id}
                from={5}
                max={6}
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
              className="w-full relative"
              key={listOfdata.portfolios_ids[0].id}
            >
              <PortfolioPortrait
                portfolios={listOfdata.portfolios_ids}
                companyType={listOfdata.companytype}
                locationLink={`/?sectionId=myWork`}
                portfolioId={listOfdata.portfolios_ids[0].id}
                from={6}
                max={7}
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
              className="w-full relative"
              key={listOfdata.portfolios_ids[0].id}
            >
              <PortfolioPortrait
                portfolios={listOfdata.portfolios_ids}
                companyType={listOfdata.companytype}
                locationLink={`/?sectionId=myWork`}
                portfolioId={listOfdata.portfolios_ids[0].id}
                from={7}
                max={8}
              />
              <div className="flex justify-center items-center mt-[1.5rem]">
                <Link
                  href={`/portfolio?scrollTo=portfolios&expand=true`}
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

    // Contact section (only if not urlInfo.u)
    ...(urlInfo?.u
      ? []
      : [
          {
            componentType: "static" as const,
            component: (
              <PortfolioContactMe
                listOfdata={listOfdata}
                formatPhoneNumber={formatPhoneNumber}
              />
            ),
          },
        ]),

    // Education & Blogs section
    {
      componentType: "static" as const,
      component: (
        <EducationBlogPortfolio
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
      orientation="Portrait"
      isDataReady={!loading && listOfdata && urlInfo && imagesReady}
    />
  );
};

export default PortfolioListing_p;
