"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
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
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import {
  CVLatestEducation,
  CVLatestExperiences,
  CVLatestHeader,
  CVLatestProjects,
  CVLatestSkills,
  CVLatestSummary,
} from "@/components/PrintComponents/CVLatestPrintPageComponents";

import WebsiteLoader from "@/components/WebsiteLoader";
import { useSortedSkills } from "@/hooks/useSortedSkills";
import { GithubIcon, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/hooks/formatdate";

type CVLatestLayoutProps = {
  listOfdata?: any;
  urlInfo?: any;
  loading?: boolean;
  error?: string | null;
  allSkills?: any[];
  sortedSkills?: any[];
};

const CVLatest = ({ params }: { params: any }) => {
  // All Logic Start
  const searchParams = useSearchParams();
  // Global state
  const [urlInfo, setURLInfo] = useState<any>(null);
  const [listOfdata, setListOfData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Experiences section
  const [isMobile, setIsMobile] = useState(false);

  // Derived values
  const visibleSkills = listOfdata?.skills_ids ?? [];
  const skillsforCV = skillsGrouping(visibleSkills);
  const name = listOfdata?.name;
  const designation = listOfdata?.designation;
  const headerInfo = [
    listOfdata?.phone && { icon: Phone, value: listOfdata.phone },
    listOfdata?.email && { icon: Mail, value: listOfdata.email },
    listOfdata?.location && { icon: MapPin, value: listOfdata.location },
    listOfdata?.github && { icon: GithubIcon, value: listOfdata.github },
    listOfdata?.linkedin && { icon: Linkedin, value: listOfdata.linkedin },
  ].filter(Boolean);


 
  // Filter skills based on listOfdata.skills_ids
  const [allSkills, setAllSkills] = useState([]);

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

  // Styling
  useBodyBackgroundColor("#FFFFFF");

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

  const maxItems = isMobile ? 4 : 10;
  const visibleItems = items.slice(0, maxItems);



  const stripHtml = (value: string) =>
    value
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const summary = listOfdata?.tag_line
    ? stripHtml(listOfdata.tag_line)
    : "Web Designer with 2 years of experience, adept at UX and responsive design. Strong proficiency in Adobe Creative Suite and CMS. Successfully improved website user engagement by 25% at previous role. Passionate about enhancing the digital experience for educational institutions.";




  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-2xl text-red-500">
          Error loading CV data: {error}
        </div>
      </div>
    );
  }

  if (loading && !listOfdata) {
    return <WebsiteLoader height="h-[30rem]" />;
  }

  return (
    <div className="bg-white text-heading min-h-screen">
      <div className="max-w-[140rem] mx-auto px-[2.4rem] py-[2.8rem]">
        <CVLatestHeader
          name={name}
          designation={designation}
          headerInfo={headerInfo}
          listOfdata={listOfdata}
        />

        {/* Summary & Tagline Section */}
        <CVLatestSummary summary={summary} visibleItems={visibleItems} />

        {/* Skills Section */}
        <CVLatestSkills sortedSkills={sortedSkills} />

        {/* Experience Section For CVLatest Timeline */}
        <CVLatestExperiences
          rawExperiences={listOfdata?.experiences_ids || []}
          listOfdata={listOfdata}
          isMobile={isMobile}
        />

        {/* Education Section */}
        <CVLatestEducation
          education={listOfdata?.education_ids}
          location={listOfdata?.location}
        />

        {/* Projects Section */}
        <CVLatestProjects portfolios={listOfdata?.portfolios_ids} />

        <footer className="mt-[2.4rem] pt-[1.2rem] border-t border-[#E5E7EB] flex items-center justify-between text-[1.1rem] text-[#6B7280]">
          <span>www.enhancv.com</span>
          <span className="inline-flex items-center gap-[0.6rem]">
            Powered by Enhancv
          </span>
        </footer>
      </div>
    </div>
  );
};

export default CVLatest;
