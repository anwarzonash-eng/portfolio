import React from "react";
import PortfolioCard from "./PortfolioCard";

interface SinglePortfolioItemProps {
  portfolio: any;
  listOfdata: any;
  showMoreSkills?: any[];
  index?: number;
}

const SinglePortfolioItem: React.FC<SinglePortfolioItemProps> = ({
  portfolio,
  listOfdata,
  showMoreSkills = [],
  index = 0
}) => {
  return (
    <div className="w-full relative">
      <PortfolioCard
        portfolio={portfolio}
        companyType={listOfdata?.companytype}
        showMoreSkills={showMoreSkills}
        index={index}
      />
    </div>
  );
};

export default SinglePortfolioItem;