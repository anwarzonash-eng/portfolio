import React from "react";

type CVLatestSummaryProps = {
  summary: string;
  visibleItems: string[];
};

const CVLatestSummary = ({ summary, visibleItems }: CVLatestSummaryProps) => {
  return (
    <section className="mt-[2rem]">
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
    </section>
  );
};

export default CVLatestSummary;
