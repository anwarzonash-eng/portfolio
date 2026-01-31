import React from "react";

type CV2SummaryProps = {
  summary: string;
};

const CV2Summary = ({ summary }: CV2SummaryProps) => {
  return (
    <section className="mt-[2rem]">
      <h2 className="cv2SecondaryHeading">
        SUMMARY
      </h2>
      <p className="my-[1rem] text-[1.4rem] font-normal leading-relaxed text-paragraph1">
        {summary}
      </p>
    </section>
  );
};

export default CV2Summary;
