"use client";
import React from "react";
import CaseStudyCard from "@/components/CaseStudyCard";
import type { Portfolio, ProfileReport, SkillRef } from "@/types/api";

interface CaseStudyGridProps {
    listOfdata: ProfileReport | null;
    filteredSkills: SkillRef[];
    highlightedPortfolioId: string | null;
    showMoreSkills: boolean[];
    setShowMoreSkills: (skills: boolean[]) => void;
    openModal: (
        pictures: Portfolio["pictures"],
        thumbnail: string | undefined,
        child_hero_banner: string | undefined
    ) => void;
}

/** De-duplicated portfolio card grid (extracted verbatim from the case-study page). */
const CaseStudyGrid = ({
    listOfdata,
    filteredSkills,
    highlightedPortfolioId,
    showMoreSkills,
    setShowMoreSkills,
    openModal,
}: CaseStudyGridProps) => (
    <div
        id="portfolioSection"
        className="mainContainer py-[4rem] w-full"
    >
        <p className="text-primary text-[1.4rem] uppercase tracking-widest font-medium  text-center mb-20">
            My Work
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from(
                new Map(
                    (listOfdata?.portfolios_ids || []).map((p) => [
                        String(p?.id),
                        p,
                    ]),
                ).values(),
            ).map((portfolio: Portfolio, index: number) => {
                return (
                    <div
                        id={`portfolio-${portfolio.id}`}
                        className={`relative ${highlightedPortfolioId === portfolio.id
                            ? "ring-2 ring-primary rounded-[1rem]"
                            : ""
                            }`}
                        key={String(portfolio?.id) || index}
                    >
                        <CaseStudyCard
                            portfolio={portfolio}
                            thumbnailSize={"large"}
                            listOfskills={filteredSkills}
                            listOfdata={listOfdata}
                            index={index}
                            showMoreSkills={showMoreSkills}
                            setShowMoreSkills={setShowMoreSkills}
                            openModal={openModal}
                        />
                    </div>
                );
            })}
        </div>
    </div>
);

export default CaseStudyGrid;
