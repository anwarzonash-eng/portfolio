"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/printStyles/cvPortrait.css";
import { useSearchParams } from "next/navigation";
import { store, useAppSelector } from "@/store";
import { setProfileUrlInfo, setProfileLoading } from "@/store/profileSlice";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { loadBlogs } from "@/hooks/apihandlers/blogListingApiHandler";
import { getRoutesDetails } from "@/hooks/url";
import { modifiedContent } from "@/hooks/modifiedContent";
import { SmoothScroll } from "@/hooks/SmoothScroll";
import { sortByDate } from "@/utils/sortByDate";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { contactDetails, dateFormatsOptions } from "@/data/JsonData";

import {
  CVLatestEducationPrint,
  CVLatestExperiencesPrint,
  CVLatestHeaderPrint,
  CVLatestProjectsPrint,
  CVLatestSkillsPrint,
  CVLatestSummaryPrint,
} from "@/components/PrintComponents/CVLatestPrintPageComponents";

import { preloadImages } from "@/utils/preLoadImages";
import { useSortedSkills } from "@/hooks/useSortedSkills";
import { GithubIcon, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import PrintPageRenderer, { ComponentConfig } from "@/utils/printPageRenderer";


const CVLatestPrint = ({ params }: { params: any }) => {
  // All Logic Start
  const searchParams = useSearchParams();
  // Global state
  const [urlInfo, setURLInfo] = useState<any>(null);
  const [listOfdata, setListOfData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Derived values
  const visibleSkills = listOfdata?.skills_ids ?? [];
  const skillsforCV = skillsGrouping(visibleSkills);
  const name = listOfdata?.name;
  const designation = listOfdata?.designation;
  const headerInfo = [
    listOfdata?.phone_no && { icon: Phone, value: listOfdata.phone_no },
    listOfdata?.email && { icon: Mail, value: listOfdata.email },
    listOfdata?.location && { icon: MapPin, value: listOfdata.location },
    listOfdata?.github && { icon: GithubIcon, value: listOfdata.github },
    listOfdata?.linkedin && { icon: Linkedin, value: listOfdata.linkedin },
  ].filter(Boolean);


 
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

  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills: setAllSkills });
  }, []);

  // API Calls
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
    if (urlInfo) {
      reportsApiHandler({
        actionType: "cv",
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

    // 2. Skills HTML images (used in CVLatestSummary via modifiedContent)
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

  // Generate HTML for skills (overview section)
  const rawHtml = modifiedContent(
    listOfdata?.skills,
    sortedSkills,
    listOfdata,
  );
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, "text/html");
  const items = Array.from(doc.querySelectorAll("li")).map(
    (li) => li.outerHTML,
  );
  const visibleItems = items.slice(0, 5);



  const stripHtml = (value: string) =>
    value
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const summary = listOfdata?.tag_line
    ? stripHtml(listOfdata.tag_line)
    : "Web Designer with 2 years of experience, adept at UX and responsive design. Strong proficiency in Adobe Creative Suite and CMS. Successfully improved website user engagement by 25% at previous role. Passionate about enhancing the digital experience for educational institutions.";


  //Execute if Error occur 
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-2xl text-red-500">
          Error loading CV data: {error}
        </div>
      </div>
    );
  }

  //Execute if while Loading  
  if (!isDataReady) {
    const { loaded, total } = imageProgress;
    const percent = total > 0 ? Math.round((loaded / total) * 100) : 0;

    return (
      <div className="flex items-center justify-center min-h-screen bg-white flex-col">
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

  const FIVE_YEARS_MS = 5 * 365 * 24 * 60 * 60 * 1000;

  const experiences = (listOfdata?.experiences_ids || []).filter((exp: any) => {
    if (!exp) return false;
    const company = (exp.company_name || exp.company || exp.companyname || "")
      .toString()
      .toLowerCase();
    if (company.includes("upwork")) return false;

    const startVal = exp.starting_date ?? exp.start_date ?? exp.startDate;
    if (!startVal) return false;
    const d = new Date(startVal);
    if (isNaN(d.getTime())) return false;

    return Date.now() - d.getTime() <= FIVE_YEARS_MS;
  });

  const portfolios = listOfdata?.portfolios_ids || [];

  const allComponents: ComponentConfig[] = [
    // Header, Summary, Skills - First Page
    {
      componentType: "static",
      clickableNote: false,
      forceSolo: true,
      component: (
        <div className="w-full relative p-[2rem] flex flex-col gap-[2rem]">
          <CVLatestHeaderPrint
            name={name}
            designation={designation}
            headerInfo={headerInfo}
            listOfdata={listOfdata}
          />
          <CVLatestSummaryPrint summary={summary} visibleItems={visibleItems} />
          <CVLatestSkillsPrint sortedSkills={sortedSkills?.slice(0, 20)} />
        </div>
      ),
    },

    //  Experiences 1
    ...experiences.slice(0, 1).map((exp: any, index: number) => ({
      componentType: "dynamic",
      component: (
        <div className="w-full relative px-[2rem]">
          <CVLatestExperiencesPrint
            rawExperiences={[exp]}
            listOfdata={listOfdata}
          />
        </div>
      ),
    })),
     
    //  Experiences 2
    ...experiences.slice(1, 2).map((exp: any, index: number) => ({
      componentType: "dynamic",
      component: (
        <div className="w-full relative px-[2rem]">
          <CVLatestExperiencesPrint
            rawExperiences={[exp]}
            listOfdata={listOfdata}
          />
        </div>
      ),
    })),
     

    //  Experiences 3
    ...experiences.slice(2, 3).map((exp: any, index: number) => ({
      componentType: "dynamic",
      component: (
        <div className="w-full relative px-[2rem]">
          <CVLatestExperiencesPrint
            rawExperiences={[exp]}
            listOfdata={listOfdata}
          />
        </div>
      ),
    })),
     
      
   
    // Projects: First 2 projects on the same page as Education (if possible)
    ...(portfolios.length > 0 || listOfdata?.education_ids?.length > 0
      ? [
          {
            componentType: "static",
            forceSolo: true,
            component: (
              <div className="w-full relative px-[2rem]">
                <CVLatestEducationPrint
                  education={listOfdata?.education_ids}
                  location={listOfdata?.location}
                />
                <CVLatestProjectsPrint portfolios={portfolios.slice(0, 2)} />
              </div>
            ),
          },
        ]
      : []),
    // Projects: Next 3 projects on the last page (forced solo page)
    ...(portfolios.length > 2
      ? [
          {
            componentType: "dynamic" as const,
            forceSolo: true,
            component: (
              <div className="w-full relative px-[2rem]">
                <CVLatestProjectsPrint portfolios={portfolios.slice(2, 5)} />
              </div>
            ),
          },
        ]
      : []),
  ];

  const componentsList: ComponentConfig[] = allComponents.filter(
    (config) => config.component !== null && config.component !== undefined
  );


  return (
    <PrintPageRenderer
      componentsList={componentsList}
      orientation="Portrait"
      isDataReady={isDataReady}
      hideNotes={true}
    />
  );
};

export default CVLatestPrint;
