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
      <p className="mt-[0.6rem] text-[1.5rem] leading-relaxed text-[#4B5563] ">
        {summary}
      </p>
      <div className="text-heading services_main list-div text-[1.2rem] leading-[1.6rem] flex flex-col gap-[1rem] mb-[5rem] list-inside w-full max-w-full">
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
