import { skillsSyncApi } from "@/apiHandlers/skillsApi";

export const handleSkillsApiCall = async ({ setListOfSkills }) => {
  const payload = {
    actionType: "list",
    id: "",
    title: "",
    url: "",
    catagory: "",
    description: "",
    order: "",
    skillsIds: "",
    companytype: "",
  };

  try {
    const results = await skillsSyncApi(payload);
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
