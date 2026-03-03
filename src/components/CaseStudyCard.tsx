"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ShowmoreSkills from "./showmoreSkills";
import useIsDesktop from "@/hooks/useIsDesktop";
import { modifiedContent } from "@/hooks/modifiedContent";

interface CaseStudyCardProps {
    portfolio: {
        id: string;
        thumbnail?: string;
        pictures?: string;
        child_hero_banner?: string;
        company_icon?: string;
        title?: string;
        link?: string;
        tagline_1?: string;
        features_short?: string;
        skills?: any[] | any[][];
        has_testimonial?: boolean;
    };
    thumbnailSize: string;
    website_purpose?: string;
    listOfskills: any[];
    listOfdata: any;
    index: number;
    showMoreSkills: boolean[];
    setShowMoreSkills: React.Dispatch<React.SetStateAction<boolean[]>>;
    openModal: (
        pictures?: string,
        thumbnail?: string,
        child_hero_banner?: string,
    ) => void;
}

// Accent colours that cycle per card
const TAG_COLORS = [
    "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "bg-green-500/20 text-green-400 border-green-500/30",
    "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    "bg-pink-500/20 text-pink-400 border-pink-500/30",
    "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
];

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
    portfolio,
    listOfskills,
    listOfdata,
    index,
    showMoreSkills,
    setShowMoreSkills,
    openModal,
}) => {
    const skills = portfolio?.skills || [];
    const isSkillsNested =
        Array.isArray(skills) && skills.length > 0 && Array.isArray(skills[0]);
    const flatSkills = isSkillsNested ? skills.flat() : skills;
    const isDesktop = useIsDesktop(1024);
    const initialSkillLimit = isDesktop ? 6 : 4;
    const skillsToShow = showMoreSkills[index]
        ? flatSkills
        : flatSkills.slice(0, initialSkillLimit);

    const tagColor = TAG_COLORS[index % TAG_COLORS.length];
    const categoryTag = flatSkills?.[0]?.title || "Project";

    return (
        <div className="flex flex-col bg-sectionBG  rounded-[1.2rem] overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-lg h-full">


            {/* Thumbnail */}
            {portfolio?.thumbnail && (
                <div
                    className="relative w-full overflow-hidden cursor-pointer bg-black/30"
                    style={{ height: "22rem" }}
                    onClick={() =>
                        openModal(
                            portfolio?.pictures,
                            portfolio?.thumbnail,
                            portfolio?.child_hero_banner,
                        )
                    }
                >
                    <img
                        src={portfolio.thumbnail}
                        alt={portfolio.title || "Project"}
                        className="w-full h-full object-cover  hover:scale-105 transition-all duration-500"
                    />
                </div>
            )}

            {/* Card body */}
            <div className="flex flex-col flex-1 p-5 gap-4">
                {/* Title + icon */}
                <div className="flex items-center gap-3">
                    {portfolio?.company_icon && (
                        <Image
                            src={portfolio.company_icon}
                            alt="icon"
                            height={36}
                            width={36}
                            className="h-[4rem] w-[4rem] rounded-md object-contain bg-white/15 p-1"
                        />
                    )}
                    <h3 className="text-white font-bold text-[1.9rem] leading-tight line-clamp-2">
                        {portfolio?.title}
                    </h3>
                </div>

                {/* Tagline */}
                {portfolio?.tagline_1 && (
                    <p
                        className="text-gray-200 text-[1.5rem] leading-relaxed line-clamp-3"
                        dangerouslySetInnerHTML={{
                            __html: modifiedContent(
                                portfolio.tagline_1,
                                listOfskills,
                                listOfdata,
                            ),
                        }}
                    />
                )}

                {/* Tech skill pills */}
                {skillsToShow.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {skillsToShow.map((skill: any, i: number) =>
                            skill?.url ? (
                                <Link
                                    key={i}
                                    href={skill.url}
                                    target="_blank"
                                    className="text-[1.3rem] px-3 py-1 rounded-full border border-white/10 border-white  bg-white text-black   hover:bg-transparent hover:text-white hover:border-white transition-colors"
                                >
                                    {skill.title}
                                </Link>
                            ) : (
                                <span
                                    key={i}
                                    className="text-[1.3rem] px-3 py-1 rounded-full border border-white/10 border-white  bg-white text-black   hover:bg-transparent hover:text-white hover:border-white transition-colors"
                                >
                                    {skill.title}
                                </span>
                            ),
                        )}
                        {!isDesktop && (
                            <ShowmoreSkills
                                props={{
                                    list: flatSkills,
                                    index,
                                    setShowMoreSkills,
                                    showMoreSkills,
                                }}
                            />
                        )}
                    </div>
                )}

                {/* Spacer pushes CTA to bottom */}
                <div className="flex-1" />

                {/* CTA */}
                <div className="flex items-center gap-3 flex-wrap print:hidden">
                    <Link
                        href={`/portfolio/${portfolio.id}`}
                        className="flex-1 text-center text-white text-[1.4rem] font-medium py-[0.9rem] px-4 primaryGradient rounded-[0.6rem] hover:opacity-90 transition-opacity"
                    >
                        View Details →
                    </Link>
                    {portfolio?.link && listOfdata?.companytype !== "leewop" && (
                        <a
                            href={portfolio.link}
                            target="_blank"
                            className="text-[1.4rem] font-medium py-[0.9rem] px-4 border border-white/20 text-gray-300 rounded-[0.6rem] hover:border-primary hover:text-primary transition-colors"
                        >
                            Live ↗
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CaseStudyCard;
