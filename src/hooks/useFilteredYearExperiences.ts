import { useMemo } from "react";

import type { Experience } from "@/types/api";


export const useFilteredYearExperiences = (experiences: Experience[] = [], noOfYears: number) => {
  return useMemo(() => {
    // 1. Filter experiences where isShow is true
    const visibleExperiences = experiences.filter((exp) => exp.isShow === true);

    // 2. Remove Upwork-related experiences
    const nonUpworkExperiences = visibleExperiences.filter((exp) => {
      const companyName = exp?.company_name?.toLowerCase() || "";
      const website = exp?.company_website?.toLowerCase() || "";
      return !companyName.includes("upwork") && !website.includes("upwork");
    });

    // 3. Calculate the current year
    const currentYear = new Date().getFullYear();

    // 4. Create array of previous noOfYears years
    const previousYears = [];
    for (let i = 1; i <= noOfYears; i++) {
      previousYears.push(currentYear - i);
    }
    // previousYears will be [2025, 2024, 2023] for noOfYears=3, currentYear=2026

    // 5. Filter experiences where starting_date or ending_date year is in previousYears
    const experiencesInRange = nonUpworkExperiences.filter((exp) => {
      const startDateStr = exp?.starting_date || exp?.start_date || exp?.startDate;
      const endDateStr = exp?.ending_date || exp?.end_date || exp?.endDate;

      let startYear: number | null = null;
      let endYear: number | null = null;

      if (startDateStr) {
        try {
          startYear = new Date(startDateStr).getFullYear();
        } catch {
          // ignore
        }
      }

      if (endDateStr) {
        try {
          endYear = new Date(endDateStr).getFullYear();
        } catch {
          // ignore
        }
      }

      // Include if startYear or endYear is in previousYears
      return (startYear && previousYears.includes(startYear)) || (endYear && previousYears.includes(endYear));
    });

    // 6. Sort by date (newest first) - using starting_date or ending_date
    const sortedExperiences = experiencesInRange.sort((a, b) => {
      const dateA = a?.starting_date || a?.start_date || a?.startDate || a?.ending_date || a?.end_date || a?.endDate;
      const dateB = b?.starting_date || b?.start_date || b?.startDate || b?.ending_date || b?.end_date || b?.endDate;

      if (!dateA || !dateB) return 0;

      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

    // 7. Return the filtered and sorted experiences
    return sortedExperiences;
  }, [experiences, noOfYears]);
};