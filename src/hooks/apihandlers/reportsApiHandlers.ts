import { reportsSync } from "@/apiHandlers/reportsApi";
import { store } from "@/store";
import { setListOfProfileData } from "@/store/profileSlice";
import type { RoutesInfo } from "@/hooks/url";
import type {
  ProfileApiData,
  ProfileReport,
  ReportsPayload,
  ServiceSkill,
  SkillGroup,
} from "@/types/api";

interface ReportsApiHandlerArgs {
  actionType?: string;
  urlInfo: RoutesInfo | null;
  setLoading: (loading: boolean) => void;
  /** Accepts a React state setter; the handler passes the report or [] on error. */
  setListOfData: (data: unknown) => void;
  itemID?: string | number | null;
  setError: (message: string) => void;
}

export const reportsApiHandler = async ({
  urlInfo,
  setLoading,
  setListOfData,
  itemID = null,
  setError,
}: ReportsApiHandlerArgs) => {
  const payload: ReportsPayload = {
    domain: urlInfo?.domain,
    uniqueId: urlInfo?.uniqueID,
  };
  if (itemID && itemID !== null) {
    payload.itemID = itemID;
  }

  try {
    const results = await reportsSync(payload);
    const statusStr = String(results?.status);

    if (/^2\d{2}$/.test(statusStr)) {

      const data = await adjustDynamicContent(results?.data?.data[0][0]);
      setListOfData(data);
      store.dispatch(setListOfProfileData(data));
    } else {
      // treat 4xx/5xx as error → empty data
      setError("No data found");
      setListOfData([]);
    }
  } catch {
    setError("Something went wrong while fetching reports");
    setListOfData([]);
  } finally {
    setLoading(false); // ✅ always stop loader
  }
};

const adjustDynamicContent = async (
  data: ProfileApiData
): Promise<ProfileReport> => {
  try {

    data = await adjustmetaCV4Content(data);
    data = await adjustmetaData(data);
    data = await adjustSkillsDescriptionForCV(data);
    data = await adjustSkillsIDsInExperiencesAndPortflios(data);
    data = await adjustSkillsDescriptionInExperiences(data);
    data = await adjustSkillsDescriptionInPortfolios(data);
    data = await adjustExperienceIntro(data);
    data = await adjustSkilledDescriptionInServices(data);

    console.log({ data })
  }
  catch (error) {

    console.log(error)

  }
  return data;
};

const adjustmetaCV4Content = async (
  data: ProfileReport
): Promise<ProfileReport> => {
  const generateYears = (count: number) =>
    Array.from({ length: count }, (_, i) =>
      i === 0 ? 2025 : 2025 - i
    );
  //
  const eligibleYears = Math.min(...generateYears(data.no_of_experiences))
  const eligibleExperiences = data.experiences_ids.filter(experience => {

    const isShow = experience.meta_data.job_types['fulltime'].is_show;
    const companyEndYear = new Date(experience.meta_data.job_types['fulltime'].end_date).getFullYear();
    if (isShow && companyEndYear >= eligibleYears) {

      return true
    }
    return false;

  })
  const newCopyOfEligibleExperience = structuredClone(eligibleExperiences);

  newCopyOfEligibleExperience.forEach((experience, _index) => {

    experience.starting_date = experience.meta_data.job_types['fulltime'].start_date || experience.starting_date;
    experience.ending_Date = experience.meta_data.job_types['fulltime'].end_date || experience.ending_Date;
    experience.is_still_working = experience.meta_data.job_types['fulltime'].is_continue || experience.is_still_working;
    experience.type = experience.meta_data.job_types['fulltime'].type || experience.type; // Full Time, Contract, Freelance,
    experience.nature = experience.meta_data.job_types['fulltime'].job_nature || 'Remote';
    experience.isShow = experience.meta_data.job_types['fulltime'].is_show || false;

  });
  newCopyOfEligibleExperience.sort((a, b) => {
    const dateA = new Date(a.ending_Date).getTime();
    const dateB = new Date(b.ending_Date).getTime();

    // For Descending (Latest date first):
    return dateB - dateA;
  }
  )
  console.log({ newCopyOfEligibleExperience })

  newCopyOfEligibleExperience.forEach((experience, index) => {

    const currentExperienceContend = data.cv4_content['experience' + (index + 1)]
    experience.long_description = currentExperienceContend;
  });

  data.experiences_for_cv4 = newCopyOfEligibleExperience;
  console.log({ experiences_for_cv4: data.experiences_for_cv4 })

  // Adjust the dynamic content based on the received data
  return data;
};

const adjustmetaData = async (data: ProfileReport): Promise<ProfileReport> => {
  data.email = data?.email_type == 'personal' ? data.non_business_email : data.email;

  data.education_ids.forEach(element => {
    element.degree_start_date = '';
    element.degree_end_date = '';
  });

  const desination_catgory = data.skills_categories.find((item) => item.id === data.designation_category)
  const sortedAsc = [...data.experiences_ids].sort((a, b) =>
    new Date(b.starting_date).getTime() - new Date(a.starting_date).getTime()
  );
  data.experiences_ids = sortedAsc;
  data.experiences_ids.forEach((element, index) => {

    element.long_description = element.company_name == 'Upwork' ? `<ul><li>${element.tech_descriptions}</li></ul>` : element.long_description;

    element.title = desination_catgory?.experience_titles['title' + (index + 1)] || element.title;

    if (element.meta_data.job_types) {

      const metaDataForCurrentWebsitePurpose = element.meta_data.job_types[data.website_purpose]

      element.starting_date = metaDataForCurrentWebsitePurpose.start_date || element.starting_date;
      element.ending_Date = metaDataForCurrentWebsitePurpose.end_date || element.ending_Date;
      element.is_still_working = metaDataForCurrentWebsitePurpose.is_continue || element.is_still_working;
      element.type = metaDataForCurrentWebsitePurpose.type || element.type; // Full Time, Contract, Freelance,
      element.nature = metaDataForCurrentWebsitePurpose.job_nature || 'Remote';
      element.isShow = metaDataForCurrentWebsitePurpose.is_show || false;

    }

  });

  data.website_purpose = data.website_purpose == 'freelance' ? 'upwork' : data.website_purpose == 'fulltime' || data.website_purpose == 'contract' ? 'contract' : 'startup'

  // NOTE: kept as a no-op comparator — the original code never returned the
  // difference, so portfolios were never actually re-ordered. Returning the
  // subtraction here would newly enable display_order sorting (a behaviour
  // change), so that is left for a separate task.
  // NOTE: historically a no-op — the original comparator never returned the
  // difference, so portfolios keep their API order. Enabling display_order
  // sorting here would change page output, so it is left for a separate task.
  data.portfolios_ids.sort(() => 0)

  // Adjust the dynamic content based on the received data
  return data;
};

const adjustSkillsDescriptionForCV = async (
  data: ProfileReport
): Promise<ProfileReport> => {

  const matchedGroups = getMatchedSkillsGroups(data);
  data.skills = `<ul>${matchedGroups
    .map((group) => `<li>${group.description}</li>`)
    .join("")}</ul>`;

  // Adjust the dynamic content based on the received data
  return data;
};

const adjustSkillsIDsInExperiencesAndPortflios = async (
  data: ProfileReport
): Promise<ProfileReport> => {
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

const adjustSkillsDescriptionInExperiences = async (
  data: ProfileReport
): Promise<ProfileReport> => {
  if (!data.experiences_ids) return data;

  const matchedGroups = getMatchedSkillsGroups(data);
  data.experiences_ids.forEach((exp, idx) => {
    // For each matched group, get the corresponding experience_variationN
    const variations = matchedGroups
      .map((group) => group[`experience_variation${idx + 1}` as `experience_variation${number}`])
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

const adjustSkillsDescriptionInPortfolios = async (
  data: ProfileReport
): Promise<ProfileReport> => {
  const matchedGroups = getMatchedSkillsGroups(data);

  data.portfolios_ids?.forEach((portfolio, idx) => {
    const shuffledSkills = shuffleArray(data.skills_ids || []);
    const skillsString = shuffledSkills.map((skill) => `<u>${skill.title}</u>`).join(", ");
    portfolio.tagline_2 = portfolio.tagline_2?.replace(
      "{Skills}",
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

const adjustExperienceIntro = async (
  data: ProfileReport
): Promise<ProfileReport> => {
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
    exp.short_description = '';
  });
  return data;
};

const adjustSkilledDescriptionInServices = async (
  data: ProfileReport
): Promise<ProfileReport> => {
  if (!Array.isArray(data.services) || !Array.isArray(data.skills_categories))
    return data;

  data.services.forEach((service) => {

    // At this point the API still sends skills as an array of ids; the loop
    // below rewrites them into { id, title } objects.
    const rawSkillIds = (service.skills ?? []) as (string | number)[];
    const skillsWithID = rawSkillIds.map((skill) => { return { id: skill } })

    const matchedGroups = getMatchedSkillsGroups({
      skills_groups: data.skills_groups,
      skills_ids: skillsWithID,
    });
    const skills = `${matchedGroups
      .map((group) => `<li>${group.description}</li>`)
      .join("")}`;

    const transformedSkills: ServiceSkill[] = rawSkillIds.map((skillId) => {
      const matched_skill = data.skills_ids.find((skill_parent) =>
        skill_parent.id === skillId
      );

      return {
        id: skillId,
        title: matched_skill ? matched_skill.title : ''
      };
    });

    service.skills = transformedSkills;

    const shuffledSkills = shuffleArray(transformedSkills);
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
      service.intro_main = service.intro_main?.replace(
        "${formattedSkills}",
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

const shuffleArray = <T,>(array: T[] | null | undefined): T[] => {
  if (!Array.isArray(array)) return []; // ✅ prevent crash
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

function getMatchedSkillsGroups(
  data: Pick<ProfileApiData, "skills_groups" | "skills_ids">
): SkillGroup[] {
  if (
    !data ||
    !Array.isArray(data.skills_groups) ||
    !Array.isArray(data.skills_ids)
  ) {
    return [];
  }

  // Create a Set of all main skills_ids for fast lookup
  const mainSkillIds = new Set(data.skills_ids.map((skill) => skill.id));

  // Filter skills_groups where at least one skill id matches
  const matchedGroups = data.skills_groups.filter((group) => {
    if (group.skills_ids && Array.isArray(group.skills_ids.skills_ids)) {
      return group.skills_ids.skills_ids.some((id) =>
        mainSkillIds.has(id)
      );
    }
    return false;
  });

  return matchedGroups;
}
