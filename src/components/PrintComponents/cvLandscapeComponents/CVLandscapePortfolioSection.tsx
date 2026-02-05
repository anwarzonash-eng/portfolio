import NoteDomainForPint from "@/components/NoteDomainForPint";
import HomeSliderPrint from "@/components/Sliders/HomeSliderPrint";
import React from "react";

const CVLandscapePortfolioSection = ({urlInfo, listOfdata, from, max, hideLinks}) => {
  return (
    <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center flex-col overflow-hidden relative my-[4rem] print:m-0">
      {/* Note and Domain For Each Page */}
      {!hideLinks && (
        <NoteDomainForPint direction={"hidden print:right-0 print:block"} />
      )}
      {/* Title and View All Link */}
      <div className="flex items-center justify-center">
        <h2 className="badge">Portfolios</h2>
      </div>
      {listOfdata?.portfolios_ids?.map((portfolio, index) => {
        if (index >= 1) {
          return null;
        }

        return (
          <div className="max-w-[1550px] mx-auto w-full relative" key={index}>
            <div className="w-full px-[4rem]">
              <HomeSliderPrint
                portfolios={listOfdata?.portfolios_ids}
                isPortraitMode={false}
                companyType={listOfdata?.companytype}
                locationLink={`/?sectionId=myWork`}
                portfolioId={listOfdata?.portfolios_ids[0]?.id}
                pageOrientation="landscape"
                hideLinks={hideLinks}
                from={from}
                max={max}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default CVLandscapePortfolioSection;
