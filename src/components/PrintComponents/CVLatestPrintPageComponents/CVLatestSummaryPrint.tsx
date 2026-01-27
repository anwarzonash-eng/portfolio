import React from "react";

type CVLatestSummaryProps = {
  summary: string;
  visibleItems: string[];
};

const CVLatestSummaryPrint = ({ summary, visibleItems }: CVLatestSummaryProps) => {
  return (
    <div className="w-full">
      <h2 className="CVLatestHeading">
        SUMMARY
      </h2>
      <p className="my-[1rem] text-[2rem] font-medium leading-relaxed text-[#4B5563] ">
        {summary}
      </p>
      <div className="text-heading list-div leading-[1.6rem]">
        <ul
          dangerouslySetInnerHTML={{
            __html: visibleItems.join(""),
          }}
        />
      </div>
    </div>
  );
};

export default CVLatestSummaryPrint;
