import { skillsSyncApi } from "@/apiHandlers/skillsApi";

export const handleSkillsApiCall = async ({ setListOfSkills }) => {
  const payload = {
    id: "",
    title: "Wordpress",
    url: "",
    catagory: "",
    description: "",
    order: "",
    skillsIds:
      '{"skills_ids": ["9a78d633-53a0-4a70-9770-2adf8d5305e1","9a78d633-53a0-4a70-9770-2adf8d5305e1"]}',
    actionType: "list",
    companytype: "",
  };

  const results = await skillsSyncApi(payload);

  const statusStr = String(results?.status);
  if (/^4\d{2}$/.test(statusStr)) {
    // console.log('error', results);
  } else if (/^2\d{2}$/.test(statusStr)) {
    setListOfSkills(results?.data?.data || []);
  }
};
