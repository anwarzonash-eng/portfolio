"use client";

import { modifiedContent } from "@/hooks/modifiedContent";
import { modifiedContentHideLinks } from "@/hooks/modifiedContentHideLinks";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ProfileReport, SkillRef } from "@/types/api";

const A4_HEIGHT_MM = 297;
const A4_DYNAMIC_MARGIN_MM = 20; // Margin applied by printPageRenderer for dynamic components
const EFFECTIVE_HEIGHT_MM = A4_HEIGHT_MM - A4_DYNAMIC_MARGIN_MM * 2; // 297 - 40 = 257mm
const SHOW_BUTTON_MM = 220; // Adjusted for smaller effective height

// Fine-tune these once (measure in DevTools → mm)
const BUTTON_HEIGHT_MM = 0; // button + paddings + margins
const MARGIN_BOTTOM_MM = 10; // reduced extra safety

const mmToPx = (mm: number) => mm * (96 / 25.4);
const pxToMm = (px: number) => px / (96 / 25.4);

interface OverviewCvPortraitProps {
  listOfdata: ProfileReport | null;
  filteredSkills: SkillRef[];
  hideLinks?: boolean;
  // isPrinting: boolean;
}

const OverviewCvPortrait = ({
  listOfdata,
  filteredSkills,
  hideLinks,
}: // isPrinting,
OverviewCvPortraitProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const [maxListHeightPx, setMaxListHeightPx] = useState<number | undefined>(
    undefined
  );
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let listNaturalPx = 0;
    let listNaturalMm = 0;

    // Find the list element (it's rendered via dangerouslySetInnerHTML)
    const listEl = containerRef.current.querySelector(
      ".list-div"
    ) as HTMLDivElement;
    if (listEl) {
      listNaturalPx = listEl.offsetHeight;
      listNaturalMm = pxToMm(listNaturalPx);
    }

    // --- Show button logic ---
    setShowButton(listNaturalMm > SHOW_BUTTON_MM);

    const fixedHeightMm = BUTTON_HEIGHT_MM + MARGIN_BOTTOM_MM;
    const availableForListMm = EFFECTIVE_HEIGHT_MM - fixedHeightMm; // Use effective height instead of full A4
    const availableForListPx = mmToPx(availableForListMm);

    // --- Clip list if needed ---
    if (listNaturalPx > availableForListPx) {
      setMaxListHeightPx(availableForListPx);
    } else {
      setMaxListHeightPx(undefined);
    }
  }, [listOfdata?.skills, filteredSkills]);

  return (
    <div ref={containerRef} className="w-full px-[2rem]">
      {/* Skills List */}
      <div
        className="list-div text-heading text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem] mb-[2rem] list-inside"
        style={
          maxListHeightPx
            ? { maxHeight: `${maxListHeightPx}px`, overflow: "hidden" }
            : {}
        }
        dangerouslySetInnerHTML={{
          __html: hideLinks ? modifiedContentHideLinks (
            listOfdata?.skills,
            filteredSkills,
            listOfdata
          ) : modifiedContent(
            listOfdata?.skills,
            filteredSkills,
            listOfdata
          ),
        }}
      />

      {/* Read More Button */}
      {showButton && !hideLinks && (
        <div className="flex items-center justify-center w-full">
          <Link
            ref={buttonRef}
            href="/cv"
            className="px-[3rem] py-[1.2rem] bg-primary rounded-[2.2rem] hover:bg-white hover:text-primary hover:border-primary border border-border border-solid text-center max-w-max text-white text-[1.3rem] font-medium font-Inter leading-tight mb-[1rem] block"
          >
            Read More
          </Link>
        </div>
      )}
    </div>
  );
};

export default OverviewCvPortrait;
