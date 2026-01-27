import React from "react";

type CVLatestProjectsProps = {
  portfolios?: any[] | null;
};

const CVLatestProjects = ({ portfolios }: CVLatestProjectsProps) => {
  if (!portfolios || portfolios.length === 0) return null;

  const projects = portfolios.slice(0, 5);

  return (
    <section className="my-[3rem] pb-[2rem] border-b border-[#E5E7EB]" id="portfolioSection">
      <h2 className="CVLatestHeading">PROJECTS</h2>
      <div className="mt-[1rem] space-y-[2rem]">
        {projects.map((project, index) => (
          <div key={project?.id || index}>
            <div className="text-[2rem] text-[#4B5563] flex items-center gap-[1rem]">
              <div className="font-semibold text-heading">{project?.title}</div>
              <div className="mt-[0.4rem] text-[1.5rem] text-primary">{project?.link}</div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: project?.tagline_1 || "" }}
              className="offer_main list-div text-[1.5rem] rounded-[1rem] leading-[2.2rem]"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CVLatestProjects;
