"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Newsletter from "@/components/Newsletter";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import PortfolioPopUp from "@/components/PortfolioPopUp";
import { useSearchParams } from "next/navigation";
import OurBlogs from "@/components/OurBlogs";
import { SmoothScroll } from "@/hooks/SmoothScroll";
import EmptyState from "@/components/EmptyState";
import UpworkActivitySection from "@/components/UpworkActivitySection";
import CaseStudyHero from "@/components/pages/case-study/CaseStudyHero";
import CaseStudyGrid from "@/components/pages/case-study/CaseStudyGrid";
import CaseStudySkillsSection from "@/components/pages/case-study/CaseStudySkillsSection";
import MarketplaceImpact from "@/components/pages/case-study/MarketplaceImpact";
import { useProfileReport } from "@/hooks/useProfileReport";
import { useFilteredSkills } from "@/hooks/useFilteredSkills";
import type { Portfolio } from "@/types/api";
import type { PageProps } from "@/types/page";

const CaseStudyListing = ({ params }: PageProps) => {
    const searchParams = useSearchParams();

    // Shared page bootstrap: route info + profile report + store sync
    const { urlInfo, listOfdata, loading, error } = useProfileReport({
        params,
        searchParams,
        dispatchNullUrlInfo: true,
    });

    // Shared skills plumbing (fetches the global list once on mount)
    const { filteredSkills, sortedSkills } = useFilteredSkills(listOfdata);

    const [
        selectedPorfolioPicturesforPopup,
        setSelectedPorfolioPicturesforPopup,
    ] = useState<string[] | null>(null);
    const [showMoreSkills, setShowMoreSkills] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hasOpenedFromQueryRef = React.useRef(false);
    // Highlight specific portfolio
    const [highlightedPortfolioId, setHighlightedPortfolioId] = useState<
        string | null
    >(null);

    // If the URL includes openGallery=true and a sectionId, open the modal
    // for that portfolio once data has loaded.
    useEffect(() => {
        try {
            const openGallery = searchParams.get("openGallery");
            const sectionId = searchParams.get("sectionId");

            if (
                openGallery === "true" &&
                sectionId &&
                listOfdata?.portfolios_ids &&
                !hasOpenedFromQueryRef.current
            ) {
                const found = listOfdata.portfolios_ids.find(
                    (p) => String(p.id) === String(sectionId)
                );
                if (found) {
                    // openModal expects (pictures, thumbnail, child_hero_banner)
                    openModal(found.pictures, found.thumbnail, found.child_hero_banner);
                    hasOpenedFromQueryRef.current = true;
                }
            }
        } catch {
            // ignore parse/open errors
        }
    }, [searchParams, listOfdata]);

    // Handle navigation to specific portfolios or sections
    useEffect(() => {
        const sectionId = searchParams.get("sectionId");
        const portfolioId = searchParams.get("portfolioId");
        const expandParam = searchParams.get("expand");
        const scrollTo = searchParams.get("scrollTo");

        if (portfolioId) {
            setHighlightedPortfolioId(portfolioId); // Highlight the specific portfolio
            setTimeout(() => {
                const portfolioElement = document.getElementById(
                    `portfolio-${portfolioId}`
                );
                if (portfolioElement) {
                    portfolioElement.scrollIntoView({ behavior: "smooth" });
                } else if (sectionId) {
                    SmoothScroll(sectionId);
                }
            }, 100); // Small delay to ensure DOM is rendered
        } else if (sectionId) {
            SmoothScroll(sectionId);
        } else {
            // If expand=true and scrollTo=portfolios is provided, scroll to portfolio section
            if (expandParam === "true" && scrollTo === "portfolios") {
                // Small timeout to allow DOM to render before scrolling
                setTimeout(() => {
                    SmoothScroll("portfolioSection");
                }, 120);
            }
        }
    }, [searchParams, listOfdata]);

    useBodyBackgroundColor("#EFF5FD");

    // Function to open the modal
    const openModal = (
        pictures: Portfolio["pictures"],
        thumbnail,
        child_hero_banner
    ) => {
        const portfolioImages = JSON.parse(pictures as string);
        const allImages = [thumbnail, child_hero_banner, ...portfolioImages];
        setSelectedPorfolioPicturesforPopup(allImages);

        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedPorfolioPicturesforPopup(null);
        setIsModalOpen(false);
    };

    if (error) {
        return <EmptyState message={error || "Something went wrong."} />;
    }

    const servicesSectionHeading =
        listOfdata?.website_purpose === "upwork"
            ? "Expert Development Services"
            : listOfdata?.website_purpose === "startup"
                ? "Full-Cycle Product Solutions"
                : listOfdata?.website_purpose === "contract"
                    ? "Technical Specializations"
                    : "Tech Stack";

    return (
        <div className=" min-h-screen">
            {/* ===== Hero Banner ===== */}
            <CaseStudyHero listOfdata={listOfdata} loading={loading} />

            {isModalOpen && selectedPorfolioPicturesforPopup !== null && (
                <PortfolioPopUp
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    portfolioImages={selectedPorfolioPicturesforPopup}
                />
            )}

            {listOfdata && listOfdata?.portfolios_ids?.length > 0 && (
                <>
                    {/* Portfolio Grid Section */}
                    <CaseStudyGrid
                        listOfdata={listOfdata}
                        filteredSkills={filteredSkills}
                        highlightedPortfolioId={highlightedPortfolioId}
                        showMoreSkills={showMoreSkills}
                        setShowMoreSkills={setShowMoreSkills}
                        openModal={openModal}
                    />

                    {/* skillSection */}
                    <CaseStudySkillsSection
                        listOfdata={listOfdata}
                        sortedSkills={sortedSkills}
                        heading={servicesSectionHeading}
                    />

                    {/* Marketplace Impact */}
                    <MarketplaceImpact />

                    {/* Upwork Activity Section - only if data exists */}
                    {listOfdata && listOfdata?.upwork_show_status === "show" && (
                        <UpworkActivitySection
                            urlInfo={urlInfo}
                            cvTrue={false}
                            data={listOfdata}
                        />
                    )}

                    {/* Our Blogs Section - only if domain exists */}
                    {listOfdata?.domain && (
                        <div className="w-full my-[10rem] lg:my-[12rem] print:my-1">
                            <OurBlogs domain={listOfdata?.domain} />
                        </div>
                    )}

                    {/* Newsletter - only if not user profile and data exists */}
                    {!urlInfo?.u && listOfdata && (
                        <div className="w-full mb-[5rem]">
                            <Newsletter listOfdata={listOfdata} />
                        </div>
                    )}
                </>
            )}

        </div>
    );
};

export default CaseStudyListing;
