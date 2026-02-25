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
}: any) => {
  const payload: { domain: any; uniqueId: any; itemID?: any } =
  {
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

      let data = await adjustDynamicContent(results?.data?.data[0][0]);
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


// Donwload CV Test BY Passing test-CV.pdf
// const adjustDynamicContent = async (data) => {
//   try {
//     data = await adjustSkillsDescriptionForCV(data);
//     data = await adjustSkillsIDsInExperiencesAndPortflios(data);
//     data = await adjustSkillsDescriptionInExperiences(data);
//     data = await adjustSkillsDescriptionInPortfolios(data);
//     data = await adjustExperienceIntro(data);
//     data = await adjustSkilledDescriptionInServices(data);

//     // ✅ ADD THIS BLOCK (IMMUTABLE)
//     data = {
//       ...data,
//       pdf_urls: {
//         ...data?.pdf_urls,
//         urls: data?.pdf_urls?.urls?.map(item =>
//           item.type === "cv_with_u"
//             ? { ...item, url: "/test-cv.pdf" }
//             : item
//         ),
//       },
//     };

//     console.log({ data });
//   } catch (error) {
//     console.log(error);
//   }

//   return data;
// };

const adjustmetaCV4Content = async (data) => {
  const generateYears = (count) =>
    Array.from({ length: count }, (_, i) =>
      i === 0 ? 2025 : 2025 - i
    );
  //
  const eligibleYears = Math.min(...generateYears(data.no_of_experiences))
  // const eligibleYears = Math.min(...generateYears(8))

  // console.log({ eligibleYears })
  const eligibleExperiences = data.experiences_ids.filter(experience => {

    const isShow = experience.meta_data.job_types['fulltime'].is_show;
    const companyEndYear = new Date(experience.meta_data.job_types['fulltime'].end_date).getFullYear();
    if (isShow && companyEndYear >= eligibleYears) {

      return true
    } else false;

  })
  const newCopyOfEligibleExperience = structuredClone(eligibleExperiences);

  newCopyOfEligibleExperience.forEach((experience, index) => {

    experience.starting_date = experience.meta_data.job_types['fulltime'].start_date || experience.starting_date;
    experience.ending_Date = experience.meta_data.job_types['fulltime'].end_date || experience.ending_Date;
    experience.is_still_working = experience.meta_data.job_types['fulltime'].is_continue || experience.is_still_working;
    experience.type = experience.meta_data.job_types['fulltime'].type || experience.type; // Full Time, Contract, Freelance, 
    experience.nature = experience.meta_data.job_types['fulltime'].job_nature || 'Remote';
    experience.isShow = experience.meta_data.job_types['fulltime'].is_show || false;


  });
  newCopyOfEligibleExperience.sort((a, b) => {
    const dateA: any = new Date(a.ending_Date);
    const dateB: any = new Date(b.ending_Date);

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

const adjustmetaData = async (data) => {
  data.email = data?.email_type == 'personal' ? data.non_business_email : data.email;
  // console.log({ data })


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


    // console.log(element.title);
    if (element.meta_data.job_types) {

      const metaDataForCurrentWebsitePurpose = element.meta_data.job_types[data.website_purpose]

      element.starting_date = metaDataForCurrentWebsitePurpose.start_date || element.starting_date;
      element.ending_Date = metaDataForCurrentWebsitePurpose.end_date || element.ending_Date;
      element.is_still_working = metaDataForCurrentWebsitePurpose.is_continue || element.is_still_working;
      element.type = metaDataForCurrentWebsitePurpose.type || element.type; // Full Time, Contract, Freelance, 
      element.nature = metaDataForCurrentWebsitePurpose.job_nature || 'Remote';
      element.isShow = metaDataForCurrentWebsitePurpose.is_show || false;





      // console.log({ meta_data: element.meta_data, website_purpose: data.website_purpose, metaDataForCurrentWebsitePurpose, experiences: element })
    }

    // console.log({ desination_catgory })



  });

  data.website_purpose = data.website_purpose == 'freelance' ? 'upwork' : data.website_purpose == 'fulltime' || data.website_purpose == 'contract' ? 'contract' : 'startup'

  data.portfolios_ids.sort((a, b) => { a.display_order - b.display_order })


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
    exp.short_description = '';
  });
  return data;
};

const adjustSkilledDescriptionInServices = async (data) => {
  if (!Array.isArray(data.services) || !Array.isArray(data.skills_categories))
    return data;

  // console.log({ services_length_before: data.services.length });

  data.services.forEach((service) => {

    const skillsWithID = service.skills.map((skill) => { return { id: skill } })

    const matchedGroups = getMatchedSkillsGroups({
      skills_groups: data.skills_groups,
      skills_ids: skillsWithID,
    });
    let skills = `${matchedGroups
      .map((group) => `<li>${group.description}</li>`)
      .join("")}`;
    // console.log({ skills: data.skills_ids })
    // console.log({ skills_services: service.skills })

    const transformedSkills = service.skills.map((skillId) => {
      const matched_skill = data.skills_ids.find((skill_parent) =>
        skill_parent.id === skillId
      );

      return {
        id: skillId,
        title: matched_skill ? matched_skill.title : ''
      };
    });

    service.skills = transformedSkills;

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
      service.intro_main = service.intro_main?.replace(
        "${formattedSkills}",
        skillsString
      );


      service.picture = matchedCategory.thumbnail;
      service.tagline = matchedCategory.tagline;
      service.title = matchedCategory.title;
    }
    // console.log({ from_service: data, services_skills_data: skills, matched_groups: matchedGroups, skillsWithID });
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
