"use client";
import React from "react";
import WebsiteLoader from "@/components/WebsiteLoader";
import type { ProfileReport } from "@/types/api";

interface CaseStudyHeroProps {
    listOfdata: ProfileReport | null;
    loading: boolean;
}

/** Case-study hero banner (extracted verbatim from the case-study page). */
const CaseStudyHero = ({ listOfdata, loading }: CaseStudyHeroProps) => (
    <section className="w-full  pt-[10rem] pb-[6rem] relative" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)", backgroundSize: "50px 50px" }}>
        {!loading && <div className="mainContainer">
            <div className="max-w-[70rem]">

                <h1 className="text-black dark:text-heading text-[5rem] lg:text-[7rem] font-black leading-[1.05] mb-6">
                    Building{" "}
                    <span className="text-primary">Digital</span>{" "}Experiences
                    That Scale.
                </h1>
                <p className="text-gray-800 dark:text-heading text-[1.8rem] leading-relaxed max-w-[55rem]">
                    {listOfdata?.designation ||
                        "Senior Full-Stack Developer specializing in modern web technologies, scalable architecture, and intuitive user interfaces."}
                </p>

            </div>
        </div>}
        {loading && <WebsiteLoader height="h-[10rem]" />}
    </section>
);

export default CaseStudyHero;
