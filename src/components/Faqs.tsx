import { FaqsDataUpdated } from "@/data/JsonData";
import { scrollToSection } from "@/hooks/scrollToSection";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import NoteDomainForPint from "./NoteDomainForPint";
import { json } from "stream/consumers";


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


const Faqs: React.FC<FaqsProps> = ({ urlInfo, companyType, apiData }) => {
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
    portfolio_1_more_skills_count: readyData?.readyData?.portfolios_ids?.[0]?.skills.length,
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

  }

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

      result = result.replace(
        regex,
        (match, content) => {
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
        }
      );
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

  const forcePrintStyles =
    pathname?.startsWith("/print/portfolio") ||
    pathname?.startsWith("/print/home");

  // Print mode detection
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

  // Logic to load and filter the FAQs based on domain and the new 'type' logic
  useEffect(() => {
    const user = getFaqsByDomain();
    const matchedGroup = (FaqsDataUpdated as UserFaqGroup[]).find((f) => f.name === user);

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
    <>
      {forcePrintStyles ? (
        <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] relative">
          <NoteDomainForPint direction={"hidden print:right-0 print:block"} />
          <div className="max-w-[1550px] w-full mx-auto">
            <div className="flex items-center justify-center lg:hidden print:flex w-full">
              <div className="badge">FAQ's</div>
            </div>
            <h2 className="text-[4rem] font-medium text-heading print:mb-4 hidden lg:block print:hidden">
              FAQ
            </h2>

            {faqsToDisplay.map((faq, index) => (
              <div
                key={index}
                className="border-b border-solid border-border print:border-black print:mb-[2rem]"
              >
                <button
                  className={`w-full gap-[2rem] flex justify-between items-center text-left text-[1.6rem] print:text-[2rem] font-medium leading-[2.8rem] text-heading py-[1rem] rounded-md focus:outline-none print:py-2 ${isPrinting ? "pointer-events-none" : ""
                    }`}
                  onClick={() => !isPrinting && toggleFAQ(index)}
                >
                  {faq.question}
                  {!isPrinting && (
                    <img
                      src={
                        activeFaq === index
                          ? "/images/minus.svg"
                          : "/images/plus.svg"
                      }
                      alt={activeFaq === index ? "Collapse" : "Expand"}
                      className="w-[2.4rem] h-[2.4rem] duration-300"
                    />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${isPrinting || activeFaq === index
                    ? "max-h-[500px] pt-2 pb-2 print:max-h-none"
                    : "max-h-0"
                    }`}
                >
                  <div
                    className="text-[1.4rem] font-normal text-paragraph1 mt-2 duration-300 print:text-sm print:mt-0"
                    // CORRECTED: Use faq.answer and apply dynamic links
                    dangerouslySetInnerHTML={{ __html: injectDynamicLinks(faq.answer) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (

        <section className="w-full print:break-before-page">
          {/* FAQ Section Completed */}
          {/* <div className="text-[4rem] text-primary">{readyData?.portfolios_ids?.[0]?.skills?.length || 0}</div> */}
          <div className="mainContainer mt-[10rem] mb-[5rem] flex flex-col md:flex-row gap-[4rem] lg:gap-[6rem] lg:justify-between print:mt-0">
            {/* Faq Bg - Hidden in print */}
            {/* Hide contact box for Upwork mode (effectiveStatus === "u") */}
            {!isUrlU && (
              <div className="bg-primary rounded-[2rem] flex items-center justify-between flex-col overflow-hidden h-[27rem] lg:h-[40.7rem] md:max-w-[35.7rem] w-full relative">
                <div className="text-paragraph2 pt-[2rem] lg:pt-[3rem] pl-[2rem]">
                  <h4 className="pb-[2rem] text-[2.4rem] lg:text-[3rem] font-medium leading-[3.6rem]">
                    Find your <br /> answer here{urlInfo?.u ? "." : "?"}
                  </h4>
                  {!urlInfo?.u && (
                    <p className="text-[1.8rem] font-normal leading-[2.6rem]">
                      No worries, You can share your queries over here.
                    </p>
                  )}
                </div>
                {!urlInfo?.u && (
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="bg-radial-gradient bg-primary mb-[34px]  max-w-[320px] rounded-[0.6rem] text-white py-[1rem] px-[3rem] xl:py-[2rem] xl:px-[5.6rem] text-[1.8rem] font-medium border border-solid border-white hover:bg-white hover:text-primary duration-300 w-full"
                  >
                    Contact Me
                  </button>
                )}
              </div>
            )}

            {/* Faq Container */}
            <div className="w-full print:w-full print:space-y-12 print:mt-[93px]">
              <h2 className="text-[4rem] font-medium text-heading print:text-3xl print:mb-4">FAQ</h2>

              {faqsToDisplay.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-solid border-border print:border-black print:mb-[12rem]"
                >
                  {/* Always show question in print mode */}
                  <button
                    className={`w-full gap-[2rem] flex justify-between items-center text-left text-[1.8rem] print:text-[3rem] font-medium leading-[2.8rem] text-heading py-[2.4rem] rounded-md focus:outline-none print:py-2  ${isPrinting ? "pointer-events-none" : ""
                      }`}
                    onClick={() => !isPrinting && toggleFAQ(index)}
                  >
                    {faq.question}
                    {!isPrinting && (
                      <img
                        src={
                          activeFaq === index
                            ? "/images/minus.svg"
                            : "/images/plus.svg"
                        }
                        alt={activeFaq === index ? "Collapse" : "Expand"}
                        className="w-[2.4rem] h-[2.4rem] duration-300"
                      />
                    )}
                  </button>
                  {/* Always expanded in print mode */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${isPrinting || activeFaq === index
                      ? "max-h-[500px] pt-4 pb-4 print:max-h-none"
                      : "max-h-0"
                      }`}
                  >
                    <div
                      className="text-[1.6rem] font-normal text-paragraph1 mt-2 duration-300 print:text-sm print:mt-0"
                      dangerouslySetInnerHTML={{ __html: injectDynamicLinks(faq.answer) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Faqs;