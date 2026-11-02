"use client";
import { FaqsDataUpdated } from "@/data/JsonData";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import NoteDomainForPint from "./NoteDomainForPint";
import FaqAccordionItem from "@/components/FaqsComponents/FaqAccordionItem";
import FaqContactBox from "@/components/FaqsComponents/FaqContactBox";
import type { ProfileReport } from "@/types/api";
import {
  buildFaqInjectLinks,
  getFaqsByDomain,
  injectDynamicLinks,
} from "@/components/FaqsComponents/faqLinkInjection";

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
  urlInfo?: import("@/hooks/url").RoutesInfo | null;
  companyType?: "leewop" | string;
  apiData?: ProfileReport | null;
}
// --- End Type Definitions ---

const Faqs: React.FC<FaqsProps> = ({ urlInfo, apiData }) => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const pathname = usePathname();

  const readyData = apiData ? apiData : {};

  // Check if urlInfo.u is present
  const isUrlU = !!urlInfo?.u;

  // ✅ Define the links once — they will be injected automatically
  const injectLinks = buildFaqInjectLinks(readyData);

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
              <div className="badge">FAQ&apos;s</div>
            </div>
            <h2 className="text-[4rem] font-medium text-heading print:mb-4 hidden lg:block print:hidden">
              FAQ
            </h2>

            {faqsToDisplay.map((faq, index) => (
              <FaqAccordionItem
                key={index}
                compact
                question={faq.question}
                answerHtml={injectDynamicLinks(faq.answer, injectLinks)}
                isActive={activeFaq === index}
                isPrinting={isPrinting}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </section>
      ) : (

        <section className="w-full print:break-before-page">
          {/* FAQ Section Completed */}
          <div className="mainContainer mt-[10rem] mb-[5rem] flex flex-col md:flex-row gap-[4rem] lg:gap-[6rem] lg:justify-between print:mt-0">
            {/* Faq Bg - Hidden in print */}
            {/* Hide contact box for Upwork mode (effectiveStatus === "u") */}
            {!isUrlU && <FaqContactBox urlInfo={urlInfo} />}

            {/* Faq Container */}
            <div className="w-full print:w-full print:space-y-12 print:mt-[93px]">
              <h2 className="text-[4rem] font-medium text-heading print:text-3xl print:mb-4">FAQ</h2>

              {faqsToDisplay.map((faq, index) => (
                <FaqAccordionItem
                  key={index}
                  question={faq.question}
                  answerHtml={injectDynamicLinks(faq.answer, injectLinks)}
                  isActive={activeFaq === index}
                  isPrinting={isPrinting}
                  onToggle={() => toggleFAQ(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Faqs;
