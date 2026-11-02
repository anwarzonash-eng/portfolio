"use client";
import { useEffect, useState } from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";
import type { Portfolio, ProfileReport } from "@/types/api";

interface UseHomeNavigationArgs {
  searchParams: ReadonlyURLSearchParams;
  listOfdata: ProfileReport | null;
  uniqueList: Portfolio[] | undefined;
  setShowAllExperiences: (show: boolean) => void;
}

/**
 * The home page's unified navigation system (query params → scroll /
 * highlight / expand), extracted verbatim from components/pages/home.
 */
export const useHomeNavigation = ({
  searchParams,
  listOfdata,
  uniqueList,
  setShowAllExperiences,
}: UseHomeNavigationArgs) => {
  // Highlight specific experience
  const [highlightedExperienceId, setHighlightedExperienceId] = useState<
    string | null
  >(null);
  // Highlight specific portfolio
  const [highlightedPortfolioId, setHighlightedPortfolioId] = useState<
    string | null
  >(null);

  // Unified navigation system - handles all scroll-to-section logic
  useEffect(() => {
    if (!listOfdata) return;

    const portfolioId = searchParams.get("portfolioId");
    const experienceId = searchParams.get("experienceId");
    const sectionId = searchParams.get("sectionId");
    const scrollTo = searchParams.get("scrollTo");
    const scroll = searchParams.get("scroll");
    const nav = searchParams.get("nav");
    const expand = searchParams.get("expand");

    console.log("🚀 Navigation System:", {
      portfolioId,
      experienceId,
      sectionId,
      scrollTo,
      scroll,
      nav,
      expand,
    });

    // Helper function to wait for element to exist and be rendered
    const waitForElement = (elementId: string): Promise<HTMLElement | null> => {
      return new Promise((resolve) => {
        const checkElement = () => {
          const element = document.getElementById(elementId);
          if (element && element.offsetHeight > 0) {
            resolve(element);
          } else {
            // Use requestAnimationFrame for better performance than setTimeout
            requestAnimationFrame(checkElement);
          }
        };
        checkElement();
      });
    };

    // Scroll to element with proper offset
    const scrollToElement = (element: HTMLElement, offset: number = 100) => {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - offset);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    };

    // Navigation logic in priority order
    const handleNavigation = async () => {
      try {
        // 1. Portfolio-specific navigation (highest priority)
        if (
          portfolioId &&
          (sectionId === "myWork" ||
            scrollTo === "myWork" ||
            nav === "portfolio")
        ) {
          console.log("📍 Portfolio Navigation");
          setHighlightedPortfolioId(portfolioId);

          // Set carousel slide if portfolio exists
          if (uniqueList?.length > 0) {
            const portfolioIndex = uniqueList.findIndex(
              (p) => p.id === portfolioId,
            );
            if (portfolioIndex !== -1) {
              window.dispatchEvent(
                new CustomEvent("setCarouselSlide", {
                  detail: { slideIndex: portfolioIndex },
                }),
              );
            }
          }

          const element = await waitForElement("myWork");
          if (element) scrollToElement(element, 80);
          return;
        }

        // 2. Experience-specific navigation
        if (
          experienceId ||
          (nav === "experience" &&
            (scrollTo === "experiences" || sectionId === "experienceSection"))
        ) {
          console.log("📍 Experience Navigation");

          if (expand === "true") setShowAllExperiences(true);

          if (experienceId) {
            setHighlightedExperienceId(experienceId);
            setShowAllExperiences(true);

            // Wait for experience expansion if needed
            if (expand === "true") {
              await new Promise((resolve) => setTimeout(resolve, 100)); // Brief wait for state update
            }

            const specificElement = await waitForElement(
              `experience-${experienceId}`,
            );
            if (specificElement) {
              scrollToElement(specificElement, 120);
              return;
            }
          }

          // Fallback to section
          const sectionElement = await waitForElement("experienceSection");
          if (sectionElement) scrollToElement(sectionElement, 100);
          return;
        }

        // 3. Skills section navigation
        if (
          (sectionId === "skillSection" ||
            scrollTo === "skills" ||
            scroll === "skills") &&
          nav !== "portfolio" &&
          nav !== "experience"
        ) {
          console.log("📍 Skills Navigation");

          const element = await waitForElement("skillSection");
          if (element) scrollToElement(element, 100);
          return;
        }

        // 4. General section navigation
        if (
          sectionId &&
          !["myWork", "experienceSection", "skillSection"].includes(
            sectionId,
          ) &&
          !nav &&
          !portfolioId &&
          !experienceId
        ) {
          console.log("📍 General Section Navigation:", sectionId);

          const element = await waitForElement(sectionId);
          if (element) scrollToElement(element, 100);
          return;
        }

        console.log("ℹ️ No navigation action needed");
      } catch (error) {
        console.error("Navigation error:", error);
      }
    };

    handleNavigation();
  }, [searchParams, listOfdata, uniqueList, setShowAllExperiences]);

  return { highlightedExperienceId, highlightedPortfolioId };
};

export default useHomeNavigation;
