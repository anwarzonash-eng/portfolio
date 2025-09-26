"use client";
import { FaqsData } from "@/data/JsonData";
import { scrollToSection } from "@/hooks/scrollToSection";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import NoteDomainForPint from "./NoteDomainForPint";

interface FaqsProps {
  urlInfo?: any;
  companyType?: string;
  listOfdata?: any; // optional full API response
  status?: "all" | "u" | "no_u"; // optional override
}

type FaqItem = {
  question: string;
  answer: string;
  altName: string;
};

const PERSONAL_KEYWORDS = [
  "calendly",
  "whatsapp",
  "phone",
  "phone number",
  "contact form",
  "email",
  "schedule",
  "schedule a call",
  "bank",
  "paypal",
  "stripe",
  "payoneer",
  "contact",
  "call me",
  "message me",
  "direct transfer",
  "phone:",
  "whatsapp:",
  "calendly.com",
  "http",
  "www.",
  "@",
];

const removeHtmlTags = (html = ""): string => {
  try {
    return html
      .replace(/<a[^>]*>(.*?)<\/a>/gi, "$1")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .trim();
  } catch {
    return html;
  }
};

const splitSentences = (text = ""): string[] =>
  text.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()) || [text];

const containsPersonalKeyword = (text = "") => {
  const lower = text.toLowerCase();
  return PERSONAL_KEYWORDS.some((k) => lower.includes(k));
};

const Faqs = ({ urlInfo, companyType, listOfdata, status }: FaqsProps) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const pathname = usePathname();

  // effectiveStatus: prop `status` overrides urlInfo?.u. If no status prop, urlInfo?.u -> 'u', else default 'all'
  const effectiveStatus = useMemo<"all" | "u" | "no_u">(() => {
    if (status) return status;
    return urlInfo?.u ? "u" : "all";
  }, [status, urlInfo?.u]);

  const forcePrintStyles =
    pathname?.startsWith("/print/portfolio") ||
    pathname?.startsWith("/print/home");

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

  const toggleFAQ = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Create sanitized Upwork-safe answer and full answer with appended links
  const processedFaqs = useMemo(() => {
    return (FaqsData as FaqItem[]).map((faq) => {
      const baseAnswer = faq.answer || "";
      // Remove existing anchors/tags for processing
      const plain = removeHtmlTags(baseAnswer);

      // Split into sentences and remove sentences that include personal keywords
      const sentences = splitSentences(plain);
      const safeSentences = sentences.filter(
        (s) => !containsPersonalKeyword(s)
      );

      let upworkAnswer = safeSentences.join(" ").trim();

      // If sanitized answer is too short / empty, provide an upwork-safe fallback
      if (!upworkAnswer || upworkAnswer.length < 20) {
        if (listOfdata?.upwork) {
          upworkAnswer = `Please contact me via Upwork messages: <a href="${listOfdata.upwork}" target="_blank" rel="noopener noreferrer" class="text-primary underline">Upwork profile</a>.`;
        } else {
          upworkAnswer =
            "For hiring or inquiries while on Upwork, please message me directly on Upwork.";
        }
      }

      // Build full (no_u) answer: original answer + append relevant links found in listOfdata
      const linkParts: string[] = [];

      if (listOfdata?.linkedIn) {
        linkParts.push(
          `<a href="${listOfdata.linkedIn}" target="_blank" rel="noopener noreferrer" class="text-primary underline">LinkedIn</a>`
        );
      }
      if (listOfdata?.github) {
        linkParts.push(
          `<a href="${listOfdata.github}" target="_blank" rel="noopener noreferrer" class="text-primary underline">GitHub</a>`
        );
      }
      if (listOfdata?.upwork) {
        linkParts.push(
          `<a href="${listOfdata.upwork}" target="_blank" rel="noopener noreferrer" class="text-primary underline">Upwork</a>`
        );
      }
      if (listOfdata?.calendly) {
        linkParts.push(
          `<a href="${listOfdata.calendly}" target="_blank" rel="noopener noreferrer" class="text-primary underline">Schedule a Call</a>`
        );
      }
      if (listOfdata?.whatsapp) {
        linkParts.push(
          `<a href="${listOfdata.whatsapp}" target="_blank" rel="noopener noreferrer" class="text-primary underline">WhatsApp</a>`
        );
      }
      if (listOfdata?.email) {
        linkParts.push(
          `<a href="mailto:${listOfdata.email}" class="text-primary underline">${listOfdata.email}</a>`
        );
      }

      // Only append links that make sense for the FAQ: e.g., if altName mentions GitHub, LinkedIn add those first
      const prioritizedLinks: string[] = [];
      if (faq.altName?.toLowerCase().includes("linkedin")) {
        const l = linkParts.find((p) => p.includes("LinkedIn"));
        if (l) prioritizedLinks.push(l);
      }
      if (faq.altName?.toLowerCase().includes("github")) {
        const g = linkParts.find((p) => p.includes("GitHub"));
        if (g) prioritizedLinks.push(g);
      }
      if (faq.altName?.toLowerCase().includes("upwork")) {
        const u = linkParts.find((p) => p.includes("Upwork"));
        if (u) prioritizedLinks.push(u);
      }

      // Add other links (deduplicated)
      const rest = linkParts.filter((p) => !prioritizedLinks.includes(p));
      const finalLinks = [...prioritizedLinks, ...rest];

      const fullAnswer =
        baseAnswer +
        (finalLinks.length > 0
          ? ` <div class="mt-2">Links: ${finalLinks.join(" | ")}</div>`
          : "");

      return {
        ...faq,
        upworkAnswer,
        fullAnswer,
        // quick flag if original answer contained personal keywords
        hadPersonalKeywords: containsPersonalKeyword(plain),
      };
    });
    // Recompute when listOfdata changes so links update
  }, [listOfdata]);

  // Company filter (same as before)
  const companyFiltered = useMemo(() => {
    return processedFaqs.filter(({ altName }) => {
      const companyFilter =
        companyType === "leewop"
          ? altName !== "Development_process"
          : altName !== "bookkeeping_process";
      return companyFilter;
    });
  }, [processedFaqs, companyType]);

  // Determine which faqs to display and which variant to use based on effectiveStatus
  const displayFaqs = useMemo(() => {
    if (effectiveStatus === "all") {
      return companyFiltered.map((f) => ({
        ...f,
        displayAnswer: f.fullAnswer,
      }));
    }

    if (effectiveStatus === "no_u") {
      return companyFiltered.map((f) => ({
        ...f,
        displayAnswer: f.fullAnswer,
      }));
    }

    // effectiveStatus === 'u'
    // For Upwork mode: prefer sanitized upworkAnswer. If sanitized is tiny AND the original had personal keywords,
    // exclude entirely (so Upwork won't show an FAQ that can't be made safe).
    return companyFiltered
      .map((f) => ({ ...f, displayAnswer: f.upworkAnswer }))
      .filter((f) => {
        // always keep explicit Upwork FAQ
        if (String(f.altName).toLowerCase() === "upwork") return true;

        // if original had personal keywords and sanitized answer is very short, exclude
        const isShort = !f.displayAnswer || f.displayAnswer.trim().length < 20;
        if (f.hadPersonalKeywords && isShort) {
          return false; // exclude unsafe faq in upwork mode
        }
        return true;
      });
  }, [companyFiltered, effectiveStatus]);

  // For print mode limit/slice
  const faqsToDisplay = isPrinting ? displayFaqs.slice(0, 5) : displayFaqs;

  // (Optional) keep a console log to help debug while developing
  // // console.log("effectiveStatus", effectiveStatus, "listOfdata", listOfdata);

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
                    dangerouslySetInnerHTML={{ __html: faq.displayAnswer }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="w-full">
          <div className="mainContainer mt-[10rem] mb-[5rem] flex flex-col md:flex-row gap-[4rem] lg:gap-[6rem] lg:justify-between">
            {/* Faq Bg - Hidden in print */}
            {/* Hide contact box for Upwork mode (effectiveStatus === "u") */}
            {effectiveStatus !== "u" && (
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
            <div className="w-full print:w-full">
              <div className="flex items-center justify-center lg:hidden w-full">
                <div className="badge">FAQ's</div>
              </div>
              <h2 className="text-[4rem] font-medium text-heading hidden lg:block">
                FAQ
              </h2>

              {faqsToDisplay.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-solid border-border"
                >
                  <button
                    className={`w-full gap-[2rem] flex justify-between items-center text-left text-[1.8rem] font-medium leading-[2.8rem] text-heading py-[2.4rem] rounded-md focus:outline-none ${
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
                        ? "max-h-[500px] pt-4 pb-4"
                        : "max-h-0"
                    }`}
                  >
                    <div
                      className="text-[1.6rem] font-normal text-paragraph1 mt-2 duration-300"
                      dangerouslySetInnerHTML={{ __html: faq.displayAnswer }}
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
