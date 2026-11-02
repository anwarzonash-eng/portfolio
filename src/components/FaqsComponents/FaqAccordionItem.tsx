"use client";
import React from "react";
import Image from "next/image";

interface FaqAccordionItemProps {
  question: string;
  answerHtml: string;
  isActive: boolean;
  isPrinting: boolean;
  onToggle: () => void;
  /** true = the denser print-page variant, false = the normal FAQ list. */
  compact?: boolean;
}

/** One expandable FAQ row (extracted verbatim from Faqs.tsx, which had two copies). */
const FaqAccordionItem = ({
  question,
  answerHtml,
  isActive,
  isPrinting,
  onToggle,
  compact = false,
}: FaqAccordionItemProps) => (
  <div
    className={`border-b border-solid border-border print:border-black ${
      compact ? "print:mb-[2rem]" : "print:mb-[12rem]"
    }`}
  >
    {/* Always show question in print mode */}
    <button
      className={`w-full gap-[2rem] flex justify-between items-center text-left ${
        compact
          ? "text-[1.6rem] print:text-[2rem] py-[1rem]"
          : "text-[1.8rem] print:text-[3rem] py-[2.4rem]"
      } font-medium leading-[2.8rem] text-heading rounded-md focus:outline-none print:py-2 ${isPrinting ? "pointer-events-none" : ""
        }`}
      onClick={() => !isPrinting && onToggle()}
    >
      {question}
      {!isPrinting && (
        <Image width={24} height={24}
          src={isActive ? "/images/minus.svg" : "/images/plus.svg"}
          alt={isActive ? "Collapse" : "Expand"}
          className="w-[2.4rem] h-[2.4rem] duration-300"
        />
      )}
    </button>
    {/* Always expanded in print mode */}
    <div
      className={`overflow-hidden transition-all duration-300 ease-out ${isPrinting || isActive
        ? `max-h-[500px] ${compact ? "pt-2 pb-2" : "pt-4 pb-4"} print:max-h-none`
        : "max-h-0"
        }`}
    >
      <div
        className={`${
          compact ? "text-[1.4rem]" : "text-[1.6rem]"
        } font-normal text-paragraph1 mt-2 duration-300 print:text-sm print:mt-0`}
        dangerouslySetInnerHTML={{ __html: answerHtml }}
      />
    </div>
  </div>
);

export default FaqAccordionItem;
