import { skillsSyncApi } from "@/apiHandlers/skillsApi";
import type { SkillRef } from "@/types/api";

interface HandleSkillsApiCallArgs {
  setListOfSkills: (skills: SkillRef[]) => void;
}

export const handleSkillsApiCall = async ({
  setListOfSkills,
}: HandleSkillsApiCallArgs) => {
  try {
    const results = await skillsSyncApi();
    const statusStr = String(results?.status);
    if (/^2\d{2}$/.test(statusStr)) {
      setListOfSkills(results?.data?.data || []);
    } else {
      console.error("Skills API error:", results);
      setListOfSkills([]);
    }
  } catch (err) {
    console.error("Error fetching skills:", err);
    setListOfSkills([]);
  }
};
