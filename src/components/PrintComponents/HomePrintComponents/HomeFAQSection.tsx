import { FaqsDataUpdated } from "@/data/JsonData";
import { scrollToSection } from "@/hooks/scrollToSection";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import NoteDomainForPint from "@/components/NoteDomainForPint";

// Update FaqItem to include the new 'type' property
interface FaqItem {
  index?: number;
  question: string;
  answer: string;
  type: "all" | "not_u" | "u"; // Added 'type' property
  altName?: string;
}

// Define the shape of a user's FAQ group (remains the same)
interface UserFaqGroup {
  id?: string;
  name: string;
  faqs: FaqItem[];
  altName?: string; // Made optional to match external data shape
}

// Define the props for the Faqs component (remains the same)
interface FaqsProps {
  urlInfo?: { u?: string };
  companyType?: "leewop" | string;
  apiData?: any;
}
// --- End Type Definitions ---

const HomeFAQSection: React.FC<FaqsProps> = ({
  urlInfo,
  companyType,
  apiData,
}) => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const pathname = usePathname();

  const readyData = apiData ? apiData : {};

  // console.log("API Data FAQs:", readyData)

  // Check if urlInfo.u is present
  const isUrlU = !!urlInfo?.u;

  // ✅ Define the links once — they will be injected automatically
  const injectLinks = {
    profile_pic_url: readyData?.profile_photo_1,
    designation: readyData?.designation,
    website_link: readyData?.domain,
    client_name: readyData?.upwork,
    upwork_profile_link: readyData?.upwork,
    github_profile_link: readyData?.github,
    linked_profile_link: readyData?.linkedIn,
    cv_link: "/cv",
    cv_download_link: "/cv",
    tag_line_one: readyData?.tag_line, //Done
    skills_names: "/", // Redirect To Skills Section
    services_names: "/", // Redirect To Services Section
    skills_link: "/",
    skill_1_pic: "/",
    skill_1_title_pic: "/",
    skill_2_pic: "/",
    skill_2_title_pic: "/",
    skill_3_pic: "/",
    skill_3_title_pic: "/",
    skill_4_pic: "/",
    skill_4_title_pic: "/",
    skill_5_pic: "/",
    skill_5_title_pic: "/",
    skill_6_pic: "/",
    skill_6_title_pic: "/",
    skill_7_pic: "/",
    skill_7_title_pic: "/",
    skill_8_pic: "/",
    skill_8_title_pic: "/",
    skill_9_pic: "/",
    skill_9_title_pic: "/",
    service_1_title: "/",
    service_1_link: "/",
    service_1_description: "/",
    service_2_title: "/",
    service_2_link: "/",
    service_2_description: "/",
    service_3_title: "/",
    service_3_link: readyData?.upwork,
    service_3_description: readyData?.upwork,
    services_links: readyData?.upwork,
    client_1_video_link: readyData?.upwork,
    client_1_review: readyData?.upwork,
    client_1_name: readyData?.upwork,
    client_1_designation: readyData?.upwork,
    client_1_company: readyData?.upwork,
    client_2_video_link: readyData?.upwork,
    client_2_review: readyData?.upwork,
    client_2_name: readyData?.upwork,
    client_2_designation: readyData?.upwork,
    client_2_company: readyData?.upwork,
    client_3_video_link: readyData?.upwork,
    client_3_review: readyData?.upwork,
    client_3_name: readyData?.upwork,
    client_3_designation: readyData?.upwork,
    client_3_company: readyData?.upwork,
    all_portfolio: "/portfolio",
    portfolio_1_picture: readyData?.portfolios_ids?.[0]?.thumbnail,
    portfolio_1_title: readyData?.portfolios_ids?.[0]?.title,
    portfolio_1_description: readyData?.portfolios_ids?.[0]?.tagline_2,
    portfolio_1_link: readyData?.readyData?.portfolios_ids?.[0]?.link,
    portfolio_1_more_skills_count:
      readyData?.readyData?.portfolios_ids?.[0]?.skills.length,
    portfolio_1_skill_1_pic: readyData?.upwork,
    portfolio_1_skill_1_title_pic: readyData?.upwork,
    portfolio_1_skill_2_pic: readyData?.upwork,
    portfolio_1_skill_2_title_pic: readyData?.upwork,
    portfolio_1_skill_3_pic: readyData?.upwork,
    portfolio_1_skill_3_title_pic: readyData?.upwork,
    portfolio_1_skill_4_pic: readyData?.upwork,
    portfolio_1_skill_4_title_pic: readyData?.upwork,
    portfolio_1_skill_5_pic: readyData?.upwork,
    portfolio_1_skill_5_title_pic: readyData?.upwork,
    portfolio_1_skill_6_pic: readyData?.upwork,
    portfolio_1_skill_6_title_pic: readyData?.upwork,
    portfolio_1_skill_7_pic: readyData?.upwork,
    portfolio_1_skill_7_title_pic: readyData?.upwork,
    portfolio_1_skill_8_pic: readyData?.upwork,
    portfolio_1_skill_8_title_pic: readyData?.upwork,
    portfolio_1_skill_9_pic: readyData?.upwork,
    portfolio_1_skill_9_title_pic: readyData?.upwork,
    portfolio_2_picture: readyData?.upwork,
    portfolio_2_title: readyData?.upwork,
    portfolio_2_description: readyData?.upwork,
    portfolio_2_link: readyData?.upwork,
    portfolio_2_more_skills_count: readyData?.upwork,
    portfolio_2_skill_1_pic: readyData?.upwork,
    portfolio_2_skill_1_title_pic: readyData?.upwork,
    portfolio_2_skill_2_pic: readyData?.upwork,
    portfolio_2_skill_2_title_pic: readyData?.upwork,
    portfolio_2_skill_3_pic: readyData?.upwork,
    portfolio_2_skill_3_title_pic: readyData?.upwork,
    portfolio_2_skill_4_pic: readyData?.upwork,
    portfolio_2_skill_4_title_pic: readyData?.upwork,
    portfolio_2_skill_5_pic: readyData?.upwork,
    portfolio_2_skill_5_title_pic: readyData?.upwork,
    portfolio_2_skill_6_pic: readyData?.upwork,
    portfolio_2_skill_6_title_pic: readyData?.upwork,
    portfolio_2_skill_7_pic: readyData?.upwork,
    portfolio_2_skill_7_title_pic: readyData?.upwork,
    portfolio_2_skill_8_pic: readyData?.upwork,
    portfolio_2_skill_8_title_pic: readyData?.upwork,
    portfolio_2_skill_9_pic: readyData?.upwork,
    portfolio_2_skill_9_title_pic: readyData?.upwork,
    portfolio_3_picture: readyData?.upwork,
    portfolio_3_title: readyData?.upwork,
    portfolio_3_description: readyData?.upwork,
    portfolio_3_link: readyData?.upwork,
    portfolio_3_more_skills_count: readyData?.upwork,
    portfolio_3_skill_1_pic: readyData?.upwork,
    portfolio_3_skill_1_title_pic: readyData?.upwork,
    portfolio_3_skill_2_pic: readyData?.upwork,
    portfolio_3_skill_2_title_pic: readyData?.upwork,
    portfolio_3_skill_3_pic: readyData?.upwork,
    portfolio_3_skill_3_title_pic: readyData?.upwork,
    portfolio_3_skill_4_pic: readyData?.upwork,
    portfolio_3_skill_4_title_pic: readyData?.upwork,
    portfolio_3_skill_5_pic: readyData?.upwork,
    portfolio_3_skill_5_title_pic: readyData?.upwork,
    portfolio_3_skill_6_pic: readyData?.upwork,
    portfolio_3_skill_6_title_pic: readyData?.upwork,
    portfolio_3_skill_7_pic: readyData?.upwork,
    portfolio_3_skill_7_title_pic: readyData?.upwork,
    portfolio_3_skill_8_pic: readyData?.upwork,
    portfolio_3_skill_8_title_pic: readyData?.upwork,
    portfolio_3_skill_9_pic: readyData?.upwork,
    portfolio_3_skill_9_title_pic: readyData?.upwork,
    all_blogs: readyData?.upwork,
    blog_1_picture: readyData?.upwork,
    blog_1_title: readyData?.upwork,
    blog_1_link: readyData?.upwork,
    blog_1_descirption: readyData?.upwork,
    blog_2_picture: readyData?.upwork,
    blog_2_title: readyData?.upwork,
    blog_2_link: readyData?.upwork,
    blog_2_descirption: readyData?.upwork,
    blog_3_picture: readyData?.upwork,
    blog_3_title: readyData?.upwork,
    blog_3_link: readyData?.upwork,
    blog_3_descirption: readyData?.upwork,
    email_link: `mailto:${readyData?.email || "#"}`,
    whatsapp_link: `https://wa.me/${readyData?.phone_no}`,
    calendly_link: readyData?.calendly_link,
    instagram_link: readyData?.instagram,
    linkedIn_link: readyData?.linkedIn,
    contactme_link: "/contact-me",
  };

  // ✅ Helper: converts placeholders like {github_profile_link}GitHub{end}
  const injectDynamicLinks = (text: string): string => {
    if (!text) return "";

    let result = text;

    const capitalizeFirstLetter = (s: string): string => {
      if (!s) return s;
      return s.charAt(0).toUpperCase() + s.slice(1);
    };

    Object.keys(injectLinks).forEach((key) => {
      // The regex captures the content $1 inside the curly braces
      const regex = new RegExp(`\\{${key}\\}(.*?)\\{end\\}`, "g");

      result = result.replace(regex, (match, content) => {
        // Capitalize the first character of the captured content ($1)
        const capitalizedContent = capitalizeFirstLetter(content);

        // Check if a link exists for the key
        if (injectLinks[key]) {
          // If the link exists, return the <a> tag with the capitalized content
          return `<a href="${injectLinks[key]}" target="_blank" rel="noopener noreferrer" class="text-primary underline">${capitalizedContent}</a>`;
        } else {
          // If the link does NOT exist, return just the capitalized content
          return capitalizedContent;
        }
      });
    });

    return result;
  };

  // ✅ Helper: detect which user's FAQs to show based on domain
  const getFaqsByDomain = (): string => {
    const hostname =
      typeof window !== "undefined" ? window.location.hostname : "";

    if (hostname.includes("findusman.me")) return "Usman";
    if (hostname.includes("findahmad.me")) return "Ahmad";
    if (hostname.includes("usamaashraf.dev")) return "Usama";
    if (hostname.includes("farhanali.dev")) return "Farhan";

    return "Usman"; // default fallback
  };

  const toggleFAQ = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Logic to load and filter the FAQs based on domain and the new 'type' logic
  useEffect(() => {
    const user = getFaqsByDomain();
    const matchedGroup = (FaqsDataUpdated as UserFaqGroup[]).find(
      (f) => f.name === user
    );

    if (matchedGroup) {
      // 1. Get the base FAQs (altName group filtering is REMOVED as requested)
      const baseFaqItems = matchedGroup.faqs;

      // 2. Apply the NEW type filtering to the individual FAQ items
      const filteredFaqItems = baseFaqItems.filter((faq) => {
        if (faq.type === "all") {
          return true; // Always display
        }

        // CORRECTION: Display 'not_u' when isUrlU is FALSE, otherwise hide them.
        if (faq.type === "not_u") {
          // Display if NOT isUrlU (i.e., display them always, EXCEPT when isUrlU is true)
          return !isUrlU;
        }

        if (faq.type === "u") {
          // return  isUrlU; // Display only when isUrlU is TRUE
          return true;
        }

        return true; // Default to display if type is missing or unknown
      });

      setFaqs(filteredFaqItems);
    } else {
      setFaqs([]);
    }
  }, [isUrlU]); // Re-run when isUrlU changes. Removed urlInfo and companyType dependencies.

  const faqsToDisplay = isPrinting ? faqs.slice(0, 6) : faqs;

  return (
    <div className="w-full ">
      {faqsToDisplay.map((faq, index) => (
        <div
          key={index}
          className="border-b border-solid border-black b-[2rem]"
        >
          <button
            className={`w-full gap-[2rem] flex justify-between items-center text-left text-[2rem] font-medium leading-[2.8rem] text-heading 
              rounded-md focus:outline-none py-2 ${
                isPrinting ? "pointer-events-none" : ""
              }`}
            onClick={() => !isPrinting && toggleFAQ(index)}
          >
            {faq.question}
            {!isPrinting && (
              <img
                src={
                  activeFaq === index ? "/images/minus.svg" : "/images/plus.svg"
                }
                alt={activeFaq === index ? "Collapse" : "Expand"}
                className="w-[2.4rem] h-[2.4rem] duration-300"
              />
            )}
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-out pt-2 pb-2 `}
          >
            <div
              className="text-[1.4rem] font-normal text-paragraph1 duration-300 text-sm mt-0"
              // CORRECTED: Use faq.answer and apply dynamic links
              dangerouslySetInnerHTML={{
                __html: injectDynamicLinks(faq.answer),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeFAQSection;
