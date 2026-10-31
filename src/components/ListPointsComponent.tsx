"use client";
import React, { useState, useEffect } from "react";

interface ListPointsComponentProps {
  portfolio: any;
  listOfskills: any[];
  listOfdata: any[];
}

const ListPointsComponent: React.FC<ListPointsComponentProps> = ({
  portfolio,
  listOfskills,
  listOfdata,
}) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [step, setStep] = useState(0); // To track mobile steps
  const [isMobile, setIsMobile] = useState(false);

  const items = portfolio.features_short
    ? portfolio.features_short.split("</li>").filter(Boolean)
    : [];

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);
      setVisibleCount(mobile ? 0 : 4); // Mobile=0, Desktop=4 initially
      setStep(0);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleReadMore = () => {
    if (isMobile) {
      if (step === 0) {
        setVisibleCount(4); // First click → show 4
        setStep(1);
      } else if (step === 1) {
        setVisibleCount(items.length); // Second click → show all
        setStep(2);
      } else {
        setVisibleCount(0); // Reset back
        setStep(0);
      }
    } else {
      if (visibleCount === 4) {
        setVisibleCount(items.length); // Show all
      } else {
        setVisibleCount(4); // Collapse back
      }
    }
  };

  return (
    <div className="mb-2 border-2 border-solid border-black">
      <ul className="mt-[2rem] pl-[2rem] list-disc">
        {items.slice(0, visibleCount).map((item, index) => (
          <li
            key={index}
            dangerouslySetInnerHTML={{ __html: item + "</li>" }}
          />
        ))}
      </ul>

      {items.length > 0 && (
        <button
          onClick={handleReadMore}
          className="bg-primary leading-normal text-center py-[0.6rem] px-[2rem] text-onPrimary hover:bg-surface border border-[#E2E6EE] dark:border-border border-solid hover:border-primary hover:text-primary rounded-[2rem] text-[1.4rem] font-medium mt-4"
        >
          {visibleCount === 0 && isMobile
            ? "Read More"
            : visibleCount === 4
            ? "Read More"
            : visibleCount < items.length
            ? "Read More"
            : "Read Less"}
        </button>
      )}
    </div>
  );
};

export default ListPointsComponent;
