"use client";
import { useEffect, useState } from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { SmoothScroll } from "@/hooks/SmoothScroll";
import type { ProfileReport } from "@/types/api";

interface UseCvNavigationArgs {
  searchParams: ReadonlyURLSearchParams;
  listOfdata: ProfileReport | null;
  setShowAllExperiences: (show: boolean) => void;
}

/**
 * The CV page's scroll/highlight navigation (query params → SmoothScroll),
 * extracted verbatim from components/pages/cv.
 */
export const useCvNavigation = ({
  searchParams,
  listOfdata,
  setShowAllExperiences,
}: UseCvNavigationArgs) => {
  // Highlight specific experience
  const [highlightedExperienceId, setHighlightedExperienceId] = useState<
    string | null
  >(null);
  // Highlight specific portfolio
  const [highlightedPortfolioId, setHighlightedPortfolioId] = useState<
    string | null
  >(null);

  // Scroll to specific experience or section
  useEffect(() => {
    const sectionId = searchParams.get("sectionId");
    const experienceId = searchParams.get("experienceId");
    const portfolioId = searchParams.get("portfolioId");
    const expandParam = searchParams.get("expand");
    const scrollTo = searchParams.get("scrollTo");

    if (experienceId) {
      setHighlightedExperienceId(experienceId); // Highlight the specific experience
      setShowAllExperiences(true); // Ensure all experiences are shown
      setTimeout(() => {
        const experienceElement = document.getElementById(
          `experience-${experienceId}`,
        );
        if (experienceElement) {
          experienceElement.scrollIntoView({ behavior: "smooth" });
        } else if (sectionId) {
          SmoothScroll(sectionId);
        }
      }, 100); // Small delay to ensure DOM is rendered
    } else if (portfolioId) {
      setHighlightedPortfolioId(portfolioId); // Highlight the specific portfolio
      setTimeout(() => {
        const portfolioElement = document.getElementById(
          `portfolio-${portfolioId}`,
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
      // If expand=true and scrollTo=experiences is provided, expand the experiences list and scroll
      if (expandParam === "true" && scrollTo === "experiences") {
        setShowAllExperiences(true);
        // Small timeout to allow DOM to render before scrolling
        setTimeout(() => {
          SmoothScroll("experienceSection");
        }, 120);
      }
      // If expand=true and scrollTo=portfolios is provided, scroll to portfolio section
      else if (expandParam === "true" && scrollTo === "portfolios") {
        // Small timeout to allow DOM to render before scrolling
        setTimeout(() => {
          SmoothScroll("portfolioSection");
        }, 120);
      }
    }
  }, [searchParams, listOfdata, setShowAllExperiences]);

  return { highlightedExperienceId, highlightedPortfolioId };
};

export default useCvNavigation;
