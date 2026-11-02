"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import NoteDomainForPint from "./NoteDomainForPint";
import FaqAccordionItem from "@/components/FaqsComponents/FaqAccordionItem";
import FaqContactBox from "@/components/FaqsComponents/FaqContactBox";
import type { ProfileReport } from "@/types/api";
import {
  buildFaqInjectLinks,
  injectDynamicLinks,
} from "@/components/FaqsComponents/faqLinkInjection";
import { useFaqItems } from "@/components/FaqsComponents/useFaqItems";

// Define the props for the Faqs component (remains the same)
interface FaqsProps {
  urlInfo?: import("@/hooks/url").RoutesInfo | null;
  companyType?: "leewop" | string;
  apiData?: ProfileReport | null;
}
// --- End Type Definitions ---

const Faqs: React.FC<FaqsProps> = ({ urlInfo, apiData }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const pathname = usePathname();

  const readyData = apiData ? apiData : {};

  // Check if urlInfo.u is present
  const isUrlU = !!urlInfo?.u;

  // Shared with FaqsLazy so the placeholder renders an identical row set.
  const faqs = useFaqItems(isUrlU);

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
