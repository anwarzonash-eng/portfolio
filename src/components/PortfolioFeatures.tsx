import React, { useState, useEffect } from "react";
import { modifiedContent } from "@/hooks/modifiedContent";
import { getColors } from "@/hooks/colors";

interface PortfolioFeaturesProps {
  features_short: string;
  skillsList: any[];
  listOfdata: any;
}

const PortfolioFeatures: React.FC<PortfolioFeaturesProps> = ({
  features_short,
  skillsList,
  listOfdata,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [showInitial, setShowInitial] = useState<boolean>(false);

  // Detect mobile device based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parse the content into list items
  const parseListItems = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const listItems = Array.from(doc.querySelectorAll("li"));
    return listItems.map((item) => item.outerHTML);
  };

  // Get modified content
  const modified = modifiedContent(features_short, skillsList, listOfdata);
  const listItems = parseListItems(modified);

  // Determine which items to show (match mobile flow for all devices)
  const itemsToShow = showAll
    ? listItems
    : showInitial
    ? listItems.slice(0, 4)
    : [];

  // Handle toggle button click
  const handleToggle = () => {
    if (!showInitial) {
      setShowInitial(true);
    } else {
      setShowAll(!showAll);
      if (showAll) {
        setShowInitial(false);
      }
    }
  };

  return (
    <div className="mt-[2rem] ">
      {itemsToShow.length > 0 && (
        <ul
          className="list-disc pl-[2rem] pb-0 mt-[2rem] text-heading text-[1.6rem] 
          leading-[3rem]"
          dangerouslySetInnerHTML={{ __html: itemsToShow.join("") }}
        />
      )}
      {listItems.length > (showInitial ? 4 : 0) && (
        <div className="flex items-center max-lg:justify-center mt-[-4rem]">
          <button
            onClick={handleToggle}
            className={`bg-primary leading-normal text-center py-[0.6rem] px-[2rem] text-white hover:bg-white border border-[#E2E6EE] border-solid hover:border-primary hover:text-primary rounded-[2rem] text-[1.4rem] font-medium my-[1.5rem] max-lg:px-[4rem]`}
          >
            {showAll ? "Read Less" : "Read More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioFeatures;
