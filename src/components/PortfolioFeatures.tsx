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
  const [showInitialMobile, setShowInitialMobile] = useState<boolean>(false);

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

  // Determine which items to show
  const itemsToShow = isMobile
    ? showAll
      ? listItems
      : showInitialMobile
      ? listItems.slice(0, 4)
      : []
    : showAll
    ? listItems
    : listItems.slice(0, 4);

  // Handle toggle button click
  const handleToggle = () => {
    if (isMobile) {
      if (!showInitialMobile) {
        setShowInitialMobile(true);
      } else {
        setShowAll(!showAll);
        if (showAll) {
          setShowInitialMobile(false);
        }
      }
    } else {
      setShowAll(!showAll);
    }
  };

  return (
    <div className="mt-[2rem]">
      {itemsToShow.length > 0 && (
        <div
          className="list-div-portfolio1 pl-[2rem] mt-[2rem] list-div-portfolio1 custom-bullets text-heading text-[1.8rem] leading-[150%]"
          dangerouslySetInnerHTML={{ __html: itemsToShow.join("") }}
        />
      )}
      {listItems.length > (isMobile && !showInitialMobile ? 0 : 4) && (
        <div className="flex items-center max-lg:justify-center">
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
