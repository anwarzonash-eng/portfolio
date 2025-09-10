"use client";
import { useEffect, useState } from "react";

interface ExperienceDescriptionProps {
  experience?: any;
  listOfskills?: any;
  listOfdata?: any;
  index?: number;
  rawHtml?: string; // ✅ optional
}

export default function ExperienceDescription({
  experience,
  listOfskills,
  listOfdata,
  index,
  rawHtml,
}: ExperienceDescriptionProps) {
  const [expandedStep, setExpandedStep] = useState<0 | 1 | 2>(0);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Pick source of HTML: rawHtml > experience.long_description
  const rawHtmlExp = rawHtml || experience?.long_description || "";

  if (!rawHtmlExp) return null;

  // Detect mobile vs desktop and set initial expandedStep
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // ✅ On desktop -> show first 4 by default
      if (!mobile) {
        setExpandedStep(1);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Parse <li> items
  const parserExp = new DOMParser();
  const docExp = parserExp.parseFromString(rawHtmlExp, "text/html");
  const itemsExp = Array.from(docExp.querySelectorAll("li")).map(
    (li) => li.outerHTML
  );

  // Decide how many to show based on expandedStep
  let visibleItems: string[] = [];
  if (expandedStep === 1) {
    visibleItems = itemsExp.slice(0, 4); // first 4
  } else if (expandedStep === 2) {
    visibleItems = itemsExp; // all
  }

  // Decide button label
  let buttonLabel = "Read More";
  if (expandedStep === 1) buttonLabel = "Read More";
  if (expandedStep === 2) buttonLabel = "Read Less";

  // Handle button click
  const handleToggle = () => {
    if (expandedStep === 0) setExpandedStep(1); // show 4
    else if (expandedStep === 1) setExpandedStep(2); // show all
    else setExpandedStep(0); // collapse back
  };

  return (
    <div className="mt-[2rem] offer_main list-div-portfolio text-heading text-[1.4rem] font-normal leading-[150%] list-disc pl-[2rem] w-full">
      <ul dangerouslySetInnerHTML={{ __html: visibleItems.join("") }} />

      {itemsExp.length > 0 && (
        <button
          onClick={handleToggle}
          className={`bg-primary py-[0.6rem] px-[2rem] text-white hover:bg-white border border-[#E2E6EE] border-solid hover:border-primary hover:text-primary rounded-[2rem]
            text-[1.4rem]  font-medium ${
              expandedStep === 1 || expandedStep === 2
                ? "mt-[-2rem] ml-[-1rem]"
                : "mt-[-4rem] ml-[-2rem]"
            } leading-normal max-w-max`}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
}
