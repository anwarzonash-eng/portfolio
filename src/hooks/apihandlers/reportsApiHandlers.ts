import { reportsSync } from "@/apiHandlers/reportsApi";
import { store } from "@/store";
import { setListOfProfileData } from "@/store/profileSlice";

export const reportsApiHandler = async ({
  actionType,
  urlInfo,
  setLoading,
  setListOfData,
  itemID = null,
  setError,
}) => {
  const payload: { actionType: any; domain: any; uniqueId: any; itemID?: any } =
    {
      actionType: actionType,
      domain: urlInfo?.domain,
      uniqueId: urlInfo?.uniqueID,
    };
  if (itemID && itemID !== null) {
    payload.itemID = itemID;
  }

  // const results = await reportsSync(payload);
  // const statusStr = String(results?.status);
  // if (/^4\d{2}$/.test(statusStr)) {
  //   setLoading(false);
  //   // console.log("error", results);
  // } else if (/^2\d{2}$/.test(statusStr)) {
  //   // console.log("before success", results?.data?.data[0]);

  //   let data = await adjustDynamicContent(results?.data?.data[0]);

  //   // console.log("success", data);
  //   setLoading(false);
  //   setListOfData(data);
  //   store.dispatch(setListOfProfileData(data));
  // }
  try {
    const results = await reportsSync(payload);
    const statusStr = String(results?.status);

    if (/^2\d{2}$/.test(statusStr)) {
      let data = await adjustDynamicContent(results?.data?.data[0]);
      setListOfData(data);
      store.dispatch(setListOfProfileData(data));
    } else {
      // treat 4xx/5xx as error → empty data
      setError("No data found");
      setListOfData([]);
    }
  } catch (err) {
    setError("Something went wrong while fetching reports");
    setListOfData([]);
  } finally {
    setLoading(false); // ✅ always stop loader
  }
};

const adjustDynamicContent = async (data) => {
  data = await adjustSkillsDescriptionForCV(data);
  data = await adjustSkillsIDsInExperiencesAndPortflios(data);
  data = await adjustSkillsDescriptionInExperiences(data);
  data = await adjustSkillsDescriptionInPortfolios(data);
  data = await adjustExperienceIntro(data);
  data = await adjustSkilledDescriptionInServices(data);

  // Adjust the dynamic content based on the received data
  return data;
};

const adjustSkillsDescriptionForCV = async (data) => {
  const matchedGroups = getMatchedSkillsGroups(data);
  data.skills = `<ul>${matchedGroups
    .map((group) => `<li>${group.description}</li>`)
    .join("")}</ul>`;

  // Adjust the dynamic content based on the received data
  return data;
};

const adjustSkillsIDsInExperiencesAndPortflios = async (data) => {
  // Ensure data.skills_ids is an array
  const dataToShuffle = Array.isArray(data.skills_ids) ? data.skills_ids : [];

  data.experiences_ids?.forEach((experience) => {
    experience.skills = shuffleArray(dataToShuffle);
  });

  data.portfolios_ids?.forEach((portfolio) => {
    portfolio.skills = shuffleArray(dataToShuffle);
  });

  return data;
};

const adjustSkillsDescriptionInExperiences = async (data) => {
  if (!data.experiences_ids) return data;

  const matchedGroups = getMatchedSkillsGroups(data);
  data.experiences_ids.forEach((exp, idx) => {
    // For each matched group, get the corresponding experience_variationN
    const variations = matchedGroups
      .map((group) => group[`experience_variation${idx + 1}`])
      .filter(Boolean); // Remove undefined/null

    if (variations.length > 0) {
      // If long_description is a <ul>...</ul>, insert new <li> after <ul>
      if (
        typeof exp.long_description === "string" &&
        exp.long_description.includes("<ul")
      ) {
        const ulStart = exp.long_description.indexOf("<ul");
        const ulOpenEnd = exp.long_description.indexOf(">", ulStart) + 1;
        exp.long_description =
          exp.long_description.slice(0, ulOpenEnd) +
          variations.map((v) => `<li>${v}</li>`).join("") +
          exp.long_description.slice(ulOpenEnd);
      } else {
        // If not a <ul>, prepend as a new list before existing content
        exp.long_description =
          `<ul>${variations.map((v) => `<li>${v}</li>`).join("")}</ul>` +
          (exp.long_description || "");
      }
    }
  });
  // Adjust the dynamic content based on the received data
  return data;
};

const adjustSkillsDescriptionInPortfolios = async (data) => {
  const matchedGroups = getMatchedSkillsGroups(data);

  data.portfolios_ids.forEach((portfolio, idx) => {
    const shuffledSkills = shuffleArray(data.skills_ids || []);
    const skillsString = shuffledSkills.map((skill) => skill.title).join(", ");
    portfolio.tagline_1 = portfolio.tagline_1?.replace(
      "${Skills}",
      skillsString
    );
    // Collect all portfolio_variationN for this index from all matched groups
    const variations = matchedGroups
      .map(
        (group) => group.portfolio_variations?.[`portfolio_variation${idx + 1}`]
      )
      .filter(Boolean);

    if (variations.length > 0) {
      // Replace features_short with a <ul> of all variations as <li>
      portfolio.features_short = `<ul>${variations
        .map((v) => `<li>${v}</li>`)
        .join("")}</ul>`;
    }
  });
  // Adjust the dynamic content based on the received data
  return data;
};

const adjustExperienceIntro = async (data) => {
  if (!Array.isArray(data.services) || !Array.isArray(data.skills_categories))
    return data;
  const mainService = data.services.find((service) => service.type === "main");
  if (!mainService) return data;

  // 2. Find the matching skills category
  const matchedCategory = data.skills_categories.find(
    (cat) => cat.id === mainService.category_id
  );
  if (!matchedCategory || !matchedCategory.experience_intro) return data;

  // 3. Add introN to short_description of each experience_ids object
  data.experiences_ids.forEach((exp, idx) => {
    const introKey = `intro${idx + 1}`;
    const introValue = matchedCategory.experience_intro[introKey];
    if (introValue) {
      // Prepend the intro as a new <p> before existing short_description
      exp.short_description =
        `<p>${introValue}</p>` + (exp.short_description || "");
    }
    exp.short_description = exp.short_description?.replace(
      "${Company_name}",
      exp.company_name
    );
    const shuffledSkills = shuffleArray(data.skills_ids || []);
    const skillsString = shuffledSkills.map((skill) => skill.title).join(", ");
    exp.short_description = exp.short_description?.replace(
      "${Skills}",
      skillsString
    );
  });
  return data;
};

const adjustSkilledDescriptionInServices = async (data) => {
  if (!Array.isArray(data.services) || !Array.isArray(data.skills_categories))
    return data;

  data.services.forEach((service) => {
    const matchedGroups = getMatchedSkillsGroups({
      skills_groups: data.skills_groups,
      skills_ids: service.skills,
    });
    let skills = `${matchedGroups
      .map((group) => `<li>${group.description}</li>`)
      .join("")}`;

    const shuffledSkills = shuffleArray(service.skills || []);
    const skillsString = shuffledSkills.map((skill) => skill.title).join(", ");

    const matchedCategory = data.skills_categories.find(
      (cat) => cat.id === service.category_id
    );
    if (matchedCategory) {
      const ulStart = matchedCategory.intro?.indexOf("<ul");
      const ulOpenEnd = matchedCategory.intro?.indexOf(">", ulStart) + 1;
      service.intro_detail =
        matchedCategory.intro?.slice(0, ulOpenEnd) +
        `${skills}` +
        matchedCategory.intro?.slice(ulOpenEnd);

      service.intro_main = matchedCategory.intro_heading;
      service.intro_main = service.intro_main?.replace(
        "${Skills}",
        skillsString
      );
      service.picture = matchedCategory.thumbnail;
      service.tagline = matchedCategory.tagline;
      service.title = matchedCategory.title;
    }
  });

  // Adjust the dynamic content based on the received data
  return data;
};

const shuffleArray = (array: any) => {
  if (!Array.isArray(array)) return []; // ✅ prevent crash
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

function getMatchedSkillsGroups(data) {
  if (
    !data ||
    !Array.isArray(data.skills_groups) ||
    !Array.isArray(data.skills_ids)
  ) {
    return [];
  }

  // Create a Set of all main skills_ids for fast lookup
  const mainSkillIds = new Set(data.skills_ids.map((skill: any) => skill.id));

  // Filter skills_groups where at least one skill id matches
  const matchedGroups = data.skills_groups.filter((group: any) => {
    if (group.skills_ids && Array.isArray(group.skills_ids.skills_ids)) {
      return group.skills_ids.skills_ids.some((id: string) =>
        mainSkillIds.has(id)
      );
    }
    return false;
  });

  return matchedGroups;
}
