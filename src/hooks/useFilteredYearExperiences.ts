import { useMemo } from "react";

interface Experience {
  company_name?: string;
  company_website?: string;
  starting_date?: string;
  start_date?: string;
  startDate?: string;
  [key: string]: any;
}

interface UseFilteredExperiencesProps {
  experiences: Experience[];
  noOfYears: number;
}

export const useFilteredYearExperiences = (experiences: Experience[] = [], noOfYears: number) => {
  return useMemo(() => {
    // 1. Remove Upwork-related experiences
    const nonUpworkExperiences = experiences.filter((exp) => {
      const companyName = exp?.company_name?.toLowerCase() || "";
      const website = exp?.company_website?.toLowerCase() || "";
      return !companyName.includes("upwork") && !website.includes("upwork");
    });

    // 2. Sort all non-Upwork experiences by date (newest first)
    const sortedNonUpworkExperiences = nonUpworkExperiences.sort((a, b) => {
      const dateA = a?.starting_date || a?.start_date || a?.startDate;
      const dateB = b?.starting_date || b?.start_date || b?.startDate;
      
      if (!dateA || !dateB) return 0;
      
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

    // 3. Calculate the current year
    const currentYear = new Date().getFullYear();

    // 4. Filter based on year difference (difference <= noOfYears)
    const experiencesInRange = sortedNonUpworkExperiences.filter((exp) => {
      const dateStr = exp?.starting_date || exp?.start_date || exp?.startDate;
      if (!dateStr) return false;

      try {
        const experienceYear = new Date(dateStr).getFullYear();
        const yearDifference = currentYear - experienceYear;
        return yearDifference <= noOfYears;
      } catch (error) {
        // If date parsing fails, exclude the experience
        return false;
      }
    });

    // 5. Return logic: Minimum 5 items (backfill if necessary)
    if (experiencesInRange.length >= 5) {
      return experiencesInRange;
    } else {
      // Backfill with the most recent non-Upwork experiences to reach minimum 5
      // Return exactly 5 (or all available if less than 5)
      const maxToReturn = Math.min(5, sortedNonUpworkExperiences.length);
      return sortedNonUpworkExperiences.slice(0, maxToReturn);
    }
  }, [experiences, noOfYears]);
};