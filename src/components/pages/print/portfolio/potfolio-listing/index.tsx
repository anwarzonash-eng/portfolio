"use client";
import React, { useEffect, useState } from "react";
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
  PortfolioCard,
} from "@/components/PrintComponents/portfolioListingComponents";

const PortfolioListing_p = ({ params }: { params: any }) => {
  const [showMoreSkills, setShowMoreSkills] = useState([]);
  const [urlInfo, setURLInfo] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [blogsList, setBlogsList] = useState([]);
  const [loadingblogs, setLoadingBlogs] = useState(false);

  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );
  const searchParams = useSearchParams();

  useBodyBackgroundColor("#EFF5FD");
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
        actionType: "portfolio",
        urlInfo,
        setError,
        setLoading,
        setListOfData,
      });
  }, [urlInfo]);

  useBodyBackgroundColor("#EFF5FD");

  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills });
  }, []);

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  // Load blogs when data is available
  useEffect(() => {
    if (listOfdata) {
      loadBlogs({
        domain: listOfdata?.domain,
        setBlogs: setBlogsList,
        setLoading: setLoadingBlogs,
      });
    }
  }, [listOfdata]);

  // Image loading check for portfolio images
  useEffect(() => {
    if (listOfdata?.portfolios_ids?.length > 0) {
      console.log('🖼️ Starting portfolio image loading check...');
      
      const checkImages = () => {
        const images = document.querySelectorAll('img');
        console.log(`📸 Found ${images.length} images to check`);
        
        let loadedCount = 0;
        const totalImages = images.length;

        if (totalImages === 0) {
          console.log('✅ No images found, marking as loaded');
          setImagesLoaded(true);
          return;
        }

        const checkAllLoaded = (imgSrc: string, success: boolean) => {
          loadedCount++;
          console.log(`📸 Image ${success ? 'loaded' : 'failed'}: ${imgSrc} (${loadedCount}/${totalImages})`);
          
          if (loadedCount === totalImages) {
            console.log('✅ All images processed, marking as loaded');
            setImagesLoaded(true);
          }
        };

        images.forEach((img, index) => {
          if (img.complete) {
            checkAllLoaded(img.src, !img.naturalWidth || img.naturalWidth > 0);
          } else {
            img.addEventListener('load', () => checkAllLoaded(img.src, true));
            img.addEventListener('error', () => checkAllLoaded(img.src, false));
          }
        });

        // Fallback timeout
        setTimeout(() => {
          console.log('⏰ Image loading timeout, forcing ready state');
          setImagesLoaded(true);
        }, 8000);
      };
      
      // Small delay to ensure DOM is updated
      setTimeout(checkImages, 500);
    } else {
      setImagesLoaded(true);
    }
  }, [listOfdata?.portfolios_ids]);

  // Check if all data is ready for rendering
  const isDataReady = React.useMemo(() => {
    const hasBasicData = !loading && listOfdata && urlInfo;
    const hasSkillsData = listOfskills.length > 0;
    const hasPortfolios = listOfdata?.portfolios_ids?.length > 0;
    const hasBlogsData = !loadingblogs;
    const hasImages = imagesLoaded;
    
    console.log('🔍 Portfolio data readiness check:', {
      hasBasicData,
      hasSkillsData,
      hasPortfolios,
      hasBlogsData,
      hasImages,
      portfolioCount: listOfdata?.portfolios_ids?.length || 0,
      blogsCount: blogsList.length
    });
    
    return hasBasicData && hasSkillsData && hasPortfolios && hasBlogsData && hasImages;
  }, [loading, listOfdata, urlInfo, listOfskills, loadingblogs, imagesLoaded, blogsList]);

  // Get unique portfolios (deduplicated by ID)
  const uniquePortfolios = React.useMemo(() => {
    if (!listOfdata?.portfolios_ids) return [];
    
    return Array.from(
      new Map(
        listOfdata.portfolios_ids.map((p: any) => [String(p?.id), p])
      ).values()
    );
  }, [listOfdata?.portfolios_ids]);

  // Create components list for PrintPageRenderer
  const componentsList: ComponentConfig[] = [
    // Welcome/Intro component
    {
      componentType: "static" as const,
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

    // Dynamic portfolio components - each portfolio on its own page
    ...uniquePortfolios.slice(0, 5).map((portfolio: any, index: number) => ({
      componentType: "dynamic" as const,
      forceSolo: true, // Each portfolio gets its own page
      maxPageLimit: 1,
      renderOnEachpage: 1,
      component: (
        <PortfolioCard
          key={portfolio.id}
          portfolio={portfolio}
          companyType={listOfdata?.companytype}
          showMoreSkills={showMoreSkills}
          index={index}
        />
      ),
    })),

    // Contact section (only if not urlInfo.u)
    ...(urlInfo?.u ? [] : [{
      componentType: "static" as const,
      component: (
        <PortfolioContactMe 
          listOfdata={listOfdata}
          formatPhoneNumber={formatPhoneNumber}
        />
      ),
    }]),

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

  return (
    <>
      {/* Show error state if there's an error */}
      {error ? (
        <div className="flex items-center justify-center min-h-screen bg-[#EFF5FD]">
          <div className="text-2xl text-red-500">
            Error loading portfolio data: {error}
          </div>
        </div>
      ) : /* Show loading state while data is being fetched */
      !isDataReady ? (
        <div className="flex items-center justify-center min-h-screen bg-[#EFF5FD]">
          <div className="text-center">
            <div className="text-2xl text-heading mb-4">Loading portfolio data...</div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className={`flex items-center justify-center gap-2 ${!loading && listOfdata && urlInfo ? 'text-green-600' : 'text-gray-500'}`}>
                <span>{!loading && listOfdata && urlInfo ? '✅' : '⏳'}</span>
                <span>Basic data loaded</span>
              </div>
              <div className={`flex items-center justify-center gap-2 ${listOfskills.length > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                <span>{listOfskills.length > 0 ? '✅' : '⏳'}</span>
                <span>Skills data loaded ({listOfskills.length} skills)</span>
              </div>
              <div className={`flex items-center justify-center gap-2 ${listOfdata?.portfolios_ids?.length > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                <span>{listOfdata?.portfolios_ids?.length > 0 ? '✅' : '⏳'}</span>
                <span>Portfolios loaded ({uniquePortfolios.length} portfolios)</span>
              </div>
              <div className={`flex items-center justify-center gap-2 ${!loadingblogs ? 'text-green-600' : 'text-gray-500'}`}>
                <span>{!loadingblogs ? '✅' : '⏳'}</span>
                <span>Blogs data loaded ({blogsList.length} blogs)</span>
              </div>
              <div className={`flex items-center justify-center gap-2 ${imagesLoaded ? 'text-green-600' : 'text-gray-500'}`}>
                <span>{imagesLoaded ? '✅' : '⏳'}</span>
                <span>Images loaded</span>
              </div>
            </div>
          </div>
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

export default PortfolioListing_p;
