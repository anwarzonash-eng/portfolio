import type { Portfolio } from "@/types/api";

type CV2ProjectsProps = {
  portfolios?: Portfolio[] | null;
};

const CV2Projects = ({ portfolios }: CV2ProjectsProps) => {
  if (!portfolios || portfolios.length === 0) return null;

  const projects = portfolios.slice(0, 5);

  return (
    <section className="my-[2rem]">
      <div className="mt-[1rem] space-y-[2rem]">
        {projects.map((project, index) => (
          <div key={project?.id || index}>
            <div className="text-[1.8rem] text-paragraph1 flex items-center gap-[1rem]">
              <div className="font-semibold text-heading">{project?.title}</div>
              {project?.link && <div className="mt-[0.4rem] text-[1.4rem] text-primary">{new URL(project.link).hostname}</div>}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: project?.tagline_1 || "" }}
              className="offer_main list-div text-[1.4rem] rounded-[1rem]"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CV2Projects;
