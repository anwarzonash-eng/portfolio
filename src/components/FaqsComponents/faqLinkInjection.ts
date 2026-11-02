import type { ProfileReport } from "@/types/api";

/**
 * Placeholder → URL map injected into FAQ answers. Extracted verbatim from
 * Faqs.tsx; `readyData` is the profile report (or {} while loading).
 */
export const buildFaqInjectLinks = (
  readyData: ProfileReport & { readyData?: ProfileReport }
): Record<string, string | number | undefined> => {
  return {
    profile_pic_url: readyData?.profile_photo_1,
    designation: readyData?.designation,
    website_link: readyData?.domain,
    client_name: readyData?.upwork,
    upwork_profile_link: readyData?.upwork,
    github_profile_link: readyData?.github,
    linked_profile_link: readyData?.linkedIn,
    cv_link: "/cv",
    cv_download_link: "/cv",
    tag_line_one: readyData?.tag_line, //Done
    skills_names: "/", // Redirect To Skills Section
    services_names: "/", // Redirect To Services Section
    skills_link: "/",
    skill_1_pic: "/",
    skill_1_title_pic: "/",
    skill_2_pic: "/",
    skill_2_title_pic: "/",
    skill_3_pic: "/",
    skill_3_title_pic: "/",
    skill_4_pic: "/",
    skill_4_title_pic: "/",
    skill_5_pic: "/",
    skill_5_title_pic: "/",
    skill_6_pic: "/",
    skill_6_title_pic: "/",
    skill_7_pic: "/",
    skill_7_title_pic: "/",
    skill_8_pic: "/",
    skill_8_title_pic: "/",
    skill_9_pic: "/",
    skill_9_title_pic: "/",
    service_1_title: "/",
    service_1_link: "/",
    service_1_description: "/",
    service_2_title: "/",
    service_2_link: "/",
    service_2_description: "/",
    service_3_title: "/",
    service_3_link: readyData?.upwork,
    service_3_description: readyData?.upwork,
    services_links: readyData?.upwork,
    client_1_video_link: readyData?.upwork,
    client_1_review: readyData?.upwork,
    client_1_name: readyData?.upwork,
    client_1_designation: readyData?.upwork,
    client_1_company: readyData?.upwork,
    client_2_video_link: readyData?.upwork,
    client_2_review: readyData?.upwork,
    client_2_name: readyData?.upwork,
    client_2_designation: readyData?.upwork,
    client_2_company: readyData?.upwork,
    client_3_video_link: readyData?.upwork,
    client_3_review: readyData?.upwork,
    client_3_name: readyData?.upwork,
    client_3_designation: readyData?.upwork,
    client_3_company: readyData?.upwork,
    all_portfolio: "/portfolio",
    portfolio_1_picture: readyData?.portfolios_ids?.[0]?.thumbnail,
    portfolio_1_title: readyData?.portfolios_ids?.[0]?.title,
    portfolio_1_description: readyData?.portfolios_ids?.[0]?.tagline_2,
    portfolio_1_link: readyData?.readyData?.portfolios_ids?.[0]?.link,
    portfolio_1_more_skills_count: readyData?.readyData?.portfolios_ids?.[0]?.skills.length,
    portfolio_1_skill_1_pic: readyData?.upwork,
    portfolio_1_skill_1_title_pic: readyData?.upwork,
    portfolio_1_skill_2_pic: readyData?.upwork,
    portfolio_1_skill_2_title_pic: readyData?.upwork,
    portfolio_1_skill_3_pic: readyData?.upwork,
    portfolio_1_skill_3_title_pic: readyData?.upwork,
    portfolio_1_skill_4_pic: readyData?.upwork,
    portfolio_1_skill_4_title_pic: readyData?.upwork,
    portfolio_1_skill_5_pic: readyData?.upwork,
    portfolio_1_skill_5_title_pic: readyData?.upwork,
    portfolio_1_skill_6_pic: readyData?.upwork,
    portfolio_1_skill_6_title_pic: readyData?.upwork,
    portfolio_1_skill_7_pic: readyData?.upwork,
    portfolio_1_skill_7_title_pic: readyData?.upwork,
    portfolio_1_skill_8_pic: readyData?.upwork,
    portfolio_1_skill_8_title_pic: readyData?.upwork,
    portfolio_1_skill_9_pic: readyData?.upwork,
    portfolio_1_skill_9_title_pic: readyData?.upwork,
    portfolio_2_picture: readyData?.upwork,
    portfolio_2_title: readyData?.upwork,
    portfolio_2_description: readyData?.upwork,
    portfolio_2_link: readyData?.upwork,
    portfolio_2_more_skills_count: readyData?.upwork,
    portfolio_2_skill_1_pic: readyData?.upwork,
    portfolio_2_skill_1_title_pic: readyData?.upwork,
    portfolio_2_skill_2_pic: readyData?.upwork,
    portfolio_2_skill_2_title_pic: readyData?.upwork,
    portfolio_2_skill_3_pic: readyData?.upwork,
    portfolio_2_skill_3_title_pic: readyData?.upwork,
    portfolio_2_skill_4_pic: readyData?.upwork,
    portfolio_2_skill_4_title_pic: readyData?.upwork,
    portfolio_2_skill_5_pic: readyData?.upwork,
    portfolio_2_skill_5_title_pic: readyData?.upwork,
    portfolio_2_skill_6_pic: readyData?.upwork,
    portfolio_2_skill_6_title_pic: readyData?.upwork,
    portfolio_2_skill_7_pic: readyData?.upwork,
    portfolio_2_skill_7_title_pic: readyData?.upwork,
    portfolio_2_skill_8_pic: readyData?.upwork,
    portfolio_2_skill_8_title_pic: readyData?.upwork,
    portfolio_2_skill_9_pic: readyData?.upwork,
    portfolio_2_skill_9_title_pic: readyData?.upwork,
    portfolio_3_picture: readyData?.upwork,
    portfolio_3_title: readyData?.upwork,
    portfolio_3_description: readyData?.upwork,
    portfolio_3_link: readyData?.upwork,
    portfolio_3_more_skills_count: readyData?.upwork,
    portfolio_3_skill_1_pic: readyData?.upwork,
    portfolio_3_skill_1_title_pic: readyData?.upwork,
    portfolio_3_skill_2_pic: readyData?.upwork,
    portfolio_3_skill_2_title_pic: readyData?.upwork,
    portfolio_3_skill_3_pic: readyData?.upwork,
    portfolio_3_skill_3_title_pic: readyData?.upwork,
    portfolio_3_skill_4_pic: readyData?.upwork,
    portfolio_3_skill_4_title_pic: readyData?.upwork,
    portfolio_3_skill_5_pic: readyData?.upwork,
    portfolio_3_skill_5_title_pic: readyData?.upwork,
    portfolio_3_skill_6_pic: readyData?.upwork,
    portfolio_3_skill_6_title_pic: readyData?.upwork,
    portfolio_3_skill_7_pic: readyData?.upwork,
    portfolio_3_skill_7_title_pic: readyData?.upwork,
    portfolio_3_skill_8_pic: readyData?.upwork,
    portfolio_3_skill_8_title_pic: readyData?.upwork,
    portfolio_3_skill_9_pic: readyData?.upwork,
    portfolio_3_skill_9_title_pic: readyData?.upwork,
    all_blogs: readyData?.upwork,
    blog_1_picture: readyData?.upwork,
    blog_1_title: readyData?.upwork,
    blog_1_link: readyData?.upwork,
    blog_1_descirption: readyData?.upwork,
    blog_2_picture: readyData?.upwork,
    blog_2_title: readyData?.upwork,
    blog_2_link: readyData?.upwork,
    blog_2_descirption: readyData?.upwork,
    blog_3_picture: readyData?.upwork,
    blog_3_title: readyData?.upwork,
    blog_3_link: readyData?.upwork,
    blog_3_descirption: readyData?.upwork,
    email_link: `mailto:${readyData?.email || "#"}`,
    whatsapp_link: `https://wa.me/${readyData?.phone_no}`,
    calendly_link: readyData?.calendly_link,
    instagram_link: readyData?.instagram,
    linkedIn_link: readyData?.linkedIn,
    contactme_link: "/contact-me",

  };

};

/**
 * Converts placeholders like {github_profile_link}GitHub{end} into anchor
 * tags using the injectLinks map (extracted verbatim from Faqs.tsx).
 */
export const injectDynamicLinks = (
  text: string,
  injectLinks: Record<string, string | number | undefined>
): string => {
  if (!text) return "";

  let result = text;

  const capitalizeFirstLetter = (s: string): string => {
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  Object.keys(injectLinks).forEach((key) => {
    // The regex captures the content $1 inside the curly braces
    const regex = new RegExp(`\\{${key}\\}(.*?)\\{end\\}`, "g");

    result = result.replace(
      regex,
      (match, content) => {
        // Capitalize the first character of the captured content ($1)
        const capitalizedContent = capitalizeFirstLetter(content);

        // Check if a link exists for the key
        if (injectLinks[key]) {
          // If the link exists, return the <a> tag with the capitalized content
          return `<a href="${injectLinks[key]}" target="_blank" rel="noopener noreferrer" class="text-primary underline">${capitalizedContent}</a>`;
        } else {
          // If the link does NOT exist, return just the capitalized content
          return capitalizedContent;
        }
      }
    );
  });

  return result;
};

/** Picks whose FAQ set to show based on the current hostname. */
export const getFaqsByDomain = (): string => {
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  if (hostname.includes("findusman.me")) return "Usman";
  if (hostname.includes("findahmad.me")) return "Ahmad";
  if (hostname.includes("usamaashraf.dev")) return "Usama";
  if (hostname.includes("farhanali.dev")) return "Farhan";

  return "Usman"; // default fallback
};
