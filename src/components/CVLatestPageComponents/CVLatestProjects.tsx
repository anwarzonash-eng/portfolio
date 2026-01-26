import React from "react";

type CVLatestProjectsProps = {
  portfolios?: any[] | null;
};

const CVLatestProjects = ({ portfolios }: CVLatestProjectsProps) => {
  if (!portfolios || portfolios.length === 0) return null;

  const projects = portfolios.slice(0, 5);

  return (
    <section className="mt-[1.8rem]" id="portfolioSection">
      <h2 className="CVLatestHeading">PROJECTS</h2>
      <div className="mt-[1rem] space-y-[2rem]">
        {projects.map((project, index) => (
          <div key={project?.id || index}>
            <div className="text-[1.7rem] text-[#4B5563] flex items-center gap-[1rem]">
              <div className="font-semibold text-heading">{project?.title}</div>
              <div className="mt-[0.4rem] text-[1.3rem] text-primary">{project?.link}</div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: project?.tagline_1 || "" }}
              className="offer_main list-div text-[1.6rem] rounded-[1rem]"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CVLatestProjects;
