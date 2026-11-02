"use client";
import React from "react";

const stats = [
    {
        value: "100+",
        label: "COMPLETED",
        title: "Projects Delivered",
        desc: "Across various industries including FinTech, HealthTech, and E-commerce.",
        color: "#3b82f6",
        ring: "from-blue-500 to-blue-600",
        ringPercent: 75,
    },
    {
        value: "5.0",
        label: "★★★★★",
        title: "Client Rating",
        desc: "Consistent 5-star feedback for code quality, communication, and reliability.",
        color: "#3b82f6",
        ring: "from-blue-400 to-blue-600",
        ringPercent: 100,
    },
    {
        value: "2k+",
        label: "HOURS",
        title: "Hours Worked",
        desc: "Dedicated development time solving complex problems and building features.",
        color: "#3b82f6",
        ring: "from-blue-500 to-cyan-500",
        ringPercent: 75,
    },
];

/** "Marketplace Impact" stats band (extracted verbatim from the case-study page). */
const MarketplaceImpact = () => (
    <section className="w-full bg-sectionBG  py-10 ">
        <div className="mainContainer py-10 ">
            {/* Heading */}
            <div className="text-center !mb-[6rem] ">
                <h2 className="text-white text-[3.6rem] lg:text-[4.8rem] font-black leading-tight mb-4">
                    Marketplace{" "}
                    Impact
                </h2>
                <p className="text-gray-400 dark:text-textMuted text-[1.6rem] max-w-[44rem] mx-auto leading-relaxed">
                    Proven track record of delivering high-quality solutions for clients worldwide.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[4rem] lg:gap-[6rem] mt-20 mb-20">
                {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-[2rem]">
                        {/* Circular ring */}
                        <div
                            className="relative flex items-center justify-center rounded-full"
                            style={{
                                width: "14rem",
                                height: "14rem",
                                background: `conic-gradient(#3b82f6 0% ${stat.ringPercent}%, #1e2a3a ${stat.ringPercent}% 100%)`,
                                padding: "6px",
                            }}
                        >
                            {/* Inner dark circle */}
                            <div
                                className="flex flex-col items-center justify-center rounded-full bg-sectionBG w-full h-full"
                                style={{ gap: "0.2rem" }}
                            >
                                <span className="text-white font-black text-[2.8rem] leading-none">
                                    {stat.value}
                                </span>
                                <span className="text-white text-[1.2rem] font-semibold tracking-wider uppercase">
                                    {stat.label}
                                </span>
                            </div>
                        </div>

                        {/* Text below ring */}
                        <div>
                            <h3 className="text-white font-bold text-[1.8rem] mb-[0.8rem]">
                                {stat.title}
                            </h3>
                            <p className="text-gray-400 dark:text-textMuted text-[1.4rem] leading-relaxed max-w-[22rem]">
                                {stat.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default MarketplaceImpact;
