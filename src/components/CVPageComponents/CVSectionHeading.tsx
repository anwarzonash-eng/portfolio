import React from "react";

type CVSectionHeadingProps = {
  title: string;
  margin?: string;
};

const CVSectionHeading = ({title, margin}: CVSectionHeadingProps) => {
  return (
    <h2
      className={`text-heading leading-[3.56rem] 
      text-[3rem] lg:text-[4rem] font-semibold pl-[0.5rem] ${margin ? margin : "m-0"} max-lg:text-center`}
      >
      {title}
    </h2>
  );
};

export default CVSectionHeading;
