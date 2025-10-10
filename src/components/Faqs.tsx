import { FaqsDataUpdated } from "@/data/JsonData";
import { scrollToSection } from "@/hooks/scrollToSection";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import NoteDomainForPint from "./NoteDomainForPint";


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

  // Check if urlInfo.u is present
  const isUrlU = !!urlInfo?.u;


  // ✅ Define the links once — they will be injected automatically
  const injectLinks: Record<string, string> = {
    upwork_profile_link: readyData?.upwork,
    github_profile_link: readyData?.github,
    linked_profile_link: readyData?.linkedIn,
    cv_link: "/cv",
    cv_download_link: "/cv/download",
    email_link: `mailto:${readyData?.email || "#"}`,
    whatsapp_link: `https://wa.me/${readyData?.phone_no}`,
    calendly_link: readyData?.calendly_link,
    instagram_link: readyData?.instagram,
    linkedIn_link: readyData?.linkedIn,
    website_link: readyData?.domain,
  };

  // ✅ Helper: converts placeholders like {github_profile_link}GitHub{end}
  const injectDynamicLinks = (text: string): string => {
    if (!text) return "";

    let result = text;

    Object.keys(injectLinks).forEach((key) => {
      const regex = new RegExp(`\\{${key}\\}(.*?)\\{end\\}`, "g");
      result = result.replace(
        regex,
        // Make sure the link is not null/undefined before creating the tag
        injectLinks[key] ? `<a href="${injectLinks[key]}" target="_blank" rel="noopener noreferrer" class="text-primary underline">$1</a>` : "$1"
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


  const faqsToDisplay = isPrinting ? faqs.slice(0, 5) : faqs;

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
                  className={`w-full gap-[2rem] flex justify-between items-center text-left text-[1.6rem] print:text-[2rem] font-medium leading-[2.8rem] text-heading py-[1rem] rounded-md focus:outline-none print:py-2 ${
                    isPrinting ? "pointer-events-none" : ""
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
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isPrinting || activeFaq === index
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
                  className="bg-radial-gradient bg-primary md:mb-[34px] mb-[13px] max-w-[320px] rounded-[0.6rem] text-white py-[1rem] px-[3rem] xl:py-[2rem] xl:px-[5.6rem] text-[1.8rem] font-medium border border-solid border-white hover:bg-white hover:text-primary duration-300 w-full"
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