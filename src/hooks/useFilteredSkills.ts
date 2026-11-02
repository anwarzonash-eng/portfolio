"use client";
import { useEffect, useState } from "react";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { useSortedSkills } from "@/hooks/useSortedSkills";
import type { ProfileReport, SkillRef } from "@/types/api";

interface UseFilteredSkillsOptions {
  /**
   * "mount": fetch the global skills list once on mount (cv / portfolio-detail
   * behaviour). "whenData": fetch (and re-fetch) once profile data is present
   * (home behaviour).
   */
  fetchOn?: "mount" | "whenData";
  /** home resets filteredSkills to [] when there is no match; cv kept the old list. */
  resetWhenEmpty?: boolean;
}

/**
 * Shared replacement for the copy-pasted skills plumbing: fetches the global
 * skills list, intersects it with the profile's skills_ids and exposes the
 * ordered variant via useSortedSkills.
 */
export const useFilteredSkills = (
  listOfdata: ProfileReport | null,
  { fetchOn = "mount", resetWhenEmpty = false }: UseFilteredSkillsOptions = {}
) => {
  const [allSkills, setAllSkills] = useState<SkillRef[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<SkillRef[]>([]);

  useEffect(() => {
    if (fetchOn === "whenData" && !listOfdata) return;
    handleSkillsApiCall({ setListOfSkills: setAllSkills });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchOn === "whenData" ? listOfdata : null]);

  useEffect(() => {
    if (listOfdata?.skills_ids && allSkills.length > 0) {
      const matchedSkills = allSkills.filter((skill) =>
        listOfdata.skills_ids.some((dataSkill) => dataSkill.id === skill.id)
      );
      setFilteredSkills(matchedSkills);
    } else if (resetWhenEmpty) {
      setFilteredSkills([]);
    }
  }, [listOfdata, allSkills, resetWhenEmpty]);

  const sortedSkills = useSortedSkills({
    skillsIdsWithOrder: listOfdata?.skills_ids,
    allSkills,
  });

  return { allSkills, setAllSkills, filteredSkills, sortedSkills };
};

export default useFilteredSkills;
