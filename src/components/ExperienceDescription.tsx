"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ExperienceDescription({
  experience,
  listOfskills,
  listOfdata,
  index,
}) {
  const [expandedExp, setExpandedExp] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 🛡️ Guard against missing data
  if (!experience) return null;

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Safe HTML string
  const rawHtmlExp = experience?.long_description || "";

  // Parse <li> items
  const parserExp = new DOMParser();
  const docExp = parserExp.parseFromString(rawHtmlExp, "text/html");
  const itemsExp = Array.from(docExp.querySelectorAll("li")).map(
    (li) => li.outerHTML
  );

  // Decide how many to show
  let visibleItems: string[];
  if (isMobile) {
    visibleItems = expandedExp ? itemsExp : [];
  } else {
    visibleItems = expandedExp ? itemsExp : itemsExp.slice(0, 3);
  }

  return (
    <div className="mt-0 md:mt-[2rem] offer_main list-div-portfolio text-heading text-[1.4rem] font-normal leading-[150%] list-disc pl-[2rem] flex flex-col gap-[0.8rem]">
      <ul dangerouslySetInnerHTML={{ __html: visibleItems.join("") }} />

      {itemsExp.length > (isMobile ? 0 : 3) && (
        <div className="flex items-center ml-[-2rem]">
          <Link
          href={"#"}
            onClick={() => setExpandedExp((prev) => !prev)}
            className="bg-primary print:hidden inline-block py-[0.4rem] px-[2rem] text-white hover:bg-white border border-[#E2E6EE] border-solid hover:border hover:border-primary hover:border-solid hover:text-primary rounded-[1.2rem] text-[1.2rem] font-medium 
            mt-[-2rem] leading-normal"
          >
            {expandedExp ? "Read Less" : "Read More"}
          </Link>
        </div>
      )}
    </div>
  );
}
