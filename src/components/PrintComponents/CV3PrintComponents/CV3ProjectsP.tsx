import React from "react";
import { CalendarDays } from "lucide-react";

type CV3ProjectsProps = {
    portfolios?: any[] | null;
};

const CV3ProjectsP = ({ portfolios }: CV3ProjectsProps) => {
    if (!portfolios || portfolios.length === 0) return null;

    const projects = portfolios.slice(0, 5);

    return (
        <div className="mt-2 space-y-4">
            {projects.map((project, idx) => (
                <div
                    key={project?.id || idx}
                    className={`mb-4 ${idx !== projects.length - 1 ? 'border-dashed border-b border-gray-300 pb-4' : ''}`}
                >
                    <h3 className="text-[16px] font-semibold text-black">{project?.title || project?.name || 'Project'}</h3>

                    <div className='flex gap-6 items-center font-medium mb-3'>
                        {(project?.date || project?.period || project?.start_date) && (
                            <span className="text-[12px] flex items-center gap-2 text-gray-600">
                                <CalendarDays className='w-5 h-5' /> {project?.date || project?.period || project?.start_date}
                            </span>
                        )}
                        {project?.link && (
                            <a
                                className="text-[12px] !text-[#1e90ff] mt-0 text-primary font-medium min-w-0 max-w-full break-words break-all whitespace-normal"
                                href={project?.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {new URL(project.link).hostname}
                            </a>
                        )}
                    </div>

                    {project?.tagline_1 ? (
                        <div
                            className="text-[12px] text-gray-700 space-y-1 leading-normal offer_main"
                            dangerouslySetInnerHTML={{ __html: project.tagline_1 }}
                        />
                    ) : project?.description ? (
                        <p className=" text-gray-700 space-y-1  leading-normal">{project.description}</p>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default CV3ProjectsP;