/**
 * TypeScript models for the API responses used across the site.
 *
 * Naming follows the API payloads verbatim — including the historical typos
 * (`ending_Date`, `paragrapgh1_color`) — because these are the exact keys the
 * backend sends. Renaming them is a backend-coordinated task, not a typing one.
 *
 * Almost every field is optional: the handlers and components consistently use
 * optional chaining, and tenant profiles differ in which sections they fill in.
 */

/** Common wrapper returned by the cypexsoft API: payload lives under `data`. */
export interface ApiEnvelope<T> {
  status?: string | number;
  statusCode?: number;
  message?: string;
  data: T;
}

// ---------------------------------------------------------------------------
// Profile report (POST /detail-profiles/report)
// ---------------------------------------------------------------------------

export interface SkillRef {
  id: string | number;
  title?: string;
  icon?: string;
  url?: string;
  order?: string | number;
  mainOrder?: string | number;
  variation?: string;
  description?: string;
}

/** Per-job-type overrides stored under experience.meta_data.job_types. */
export interface JobTypeMeta {
  start_date?: string;
  end_date?: string;
  is_continue?: boolean;
  is_show?: boolean;
  type?: string; // Full Time, Contract, Freelance, ...
  job_nature?: string; // Remote, Onsite, ...
}

export interface Experience {
  id?: string | number;
  title?: string;
  company_name?: string;
  company_website?: string;
  thumbnail?: string;
  location?: string;
  city?: string;
  designation?: string;
  starting_date?: string;
  /** Capital D is what the API actually sends. */
  ending_Date?: string;
  /**
   * Alternate date spellings the CV2/CV3 layouts fall back to
   * (`starting_date || start_date || startDate`).
   */
  start_date?: string;
  startDate?: string;
  end_date?: string;
  endDate?: string;
  ending_date?: string;
  is_still_working?: boolean;
  short_description?: string;
  long_description?: string;
  tech_descriptions?: string;
  skills?: SkillRef[];
  meta_data?: {
    job_types?: Record<string, JobTypeMeta>;
  };
  // Fields written client-side by the adjust* transforms in reportsApiHandlers
  type?: string;
  nature?: string;
  isShow?: boolean;
}

export interface Portfolio {
  id?: string | number;
  title?: string;
  thumbnail?: string;
  client_name?: string;
  my_role?: string;
  link?: string;
  tagline_1?: string;
  tagline_2?: string;
  features_short?: string;
  features_long?: string;
  short_description?: string;
  /** JSON-encoded array of image URLs on some profiles, a plain array on others. */
  pictures?: string | (string | null)[];
  child_hero_banner?: string;
  key_modules?: string;
  services_i_provide?: string;
  has_testimonial?: boolean;
  company_icon?: string;
  companytype?: string;
  starting_date?: string;
  ending_Date?: string;
  updated_date?: string;
  display_order?: number;
  /** Alternate spellings the CV3 project layouts fall back to. */
  name?: string;
  date?: string;
  period?: string;
  start_date?: string;
  description?: string;
  website_purpose?: string;
  skills?: SkillRef[];
}

export interface Education {
  id?: string | number;
  degree_name?: string;
  university_name?: string;
  school?: string;
  degree?: string;
  location?: string;
  thumbnail?: string;
  degree_start_date?: string;
  degree_end_date?: string;
}

export interface Testimonial {
  id?: string;
  client_name?: string;
  client_designation?: string;
  client_company?: string;
  client_company_website?: string;
  client_pic?: string;
  designation?: string;
  review_text?: string;
  thumbnail?: string;
  video?: string;
  upwork?: string;
  linked_in?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  portfolio_id?: number;
  website_purpose?: string | null;
  Prototype?: Array<{ video?: string }>;
}

/**
 * A reusable description block matched against the profile's skills.
 * The nested `skills_ids.skills_ids` shape is real — see getMatchedSkillsGroups.
 */
export interface SkillGroup {
  description?: string;
  skills_ids?: { skills_ids?: (string | number)[] };
  portfolio_variations?: Record<string, string>;
  /** experience_variation1, experience_variation2, ... */
  [experienceVariation: `experience_variation${number}`]: string | undefined;
}

export interface SkillCategory {
  id?: string | number;
  title?: string;
  tagline?: string;
  thumbnail?: string;
  intro?: string;
  intro_heading?: string;
  /** title1, title2, ... keyed by experience position. */
  experience_titles?: Record<string, string>;
  /** intro1, intro2, ... keyed by experience position. */
  experience_intro?: Record<string, string>;
}

export interface ServiceSkill {
  id: string | number;
  title?: string;
}

export interface Service {
  type?: string; // "main" | ...
  category_id?: string | number;
  title?: string;
  tagline?: string;
  picture?: string;
  /**
   * Raw API: an array of skill ids. adjustSkilledDescriptionInServices
   * rewrites it in place into `{ id, title }` objects.
   */
  skills?: (string | number)[] | ServiceSkill[];
  // Written client-side by adjustSkilledDescriptionInServices
  intro_main?: string;
  intro_detail?: string;
}

export interface PdfUrlEntry {
  type: string; // "cv" | "cv_with_u" | "home" | "home_with_u" | "portfolio_main" | ...
  url: string | null;
}

/** Profile payload exactly as the report endpoint returns it. */
export interface ProfileApiData {
  // identity & contact
  name?: string;
  designation?: string;
  location?: string;
  email?: string;
  non_business_email?: string;
  email_type?: string; // "personal" | "business"
  phone_no?: string;
  domain?: string;
  tag_line?: string;
  ai_short_description?: string;
  profile_photo_1?: string;
  profile_photo_2?: string;
  profile_photo_3?: string;
  video_attached?: string;

  // links
  upwork?: string;
  github?: string;
  linkedIn?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  behance_link?: string;
  calendly_link?: string;

  // stats & flags
  no_of_experiences?: number;
  projects_completed?: string | number;
  hourly_rate?: string | number;
  salary_type?: string;
  hide_earnings?: boolean;
  upwork_show_status?: boolean | string;
  website_purpose?: string; // "freelance" | "fulltime" | "contract" | ... (rewritten client-side)
  companytype?: string;
  googleAnalyticsScript?: string;
  designation_category?: string | number;

  // tenant colour scheme (feeds the light palette and dark-mode derivation)
  primary_color?: string;
  page_bg_color?: string;
  banner_bg_color?: string;
  section_bg_color?: string;
  heading_color?: string;
  paragrapgh1_color?: string;
  paragrapgh2_color?: string;
  border_color?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;

  // collections
  /** Raw: free text; adjustSkillsDescriptionForCV replaces it with generated <ul> HTML. */
  skills?: string;
  skills_ids?: SkillRef[];
  skills_groups?: SkillGroup[];
  skills_categories?: SkillCategory[];
  services?: Service[];
  experiences_ids?: Experience[];
  portfolios_ids?: Portfolio[];
  education_ids?: Education[];
  testimonials?: Testimonial[];
  pdf_urls?: PdfUrlEntry[];
  /** experience1, experience2, ... long descriptions used by the CV4 layout. */
  cv4_content?: Record<string, string>;
}

/**
 * The profile after the client-side adjust* transforms ran: same shape plus
 * the derived fields they add. This is what Redux stores and components read.
 */
export interface ProfileReport extends ProfileApiData {
  experiences_for_cv4?: Experience[] | null;
}

/** The report endpoint nests the profile one level deeper: data[0][0]. */
export type ReportsResponse = ApiEnvelope<ProfileApiData[][]>;

// ---------------------------------------------------------------------------
// Other endpoints
// ---------------------------------------------------------------------------

/** POST /detail-profiles/report request body. */
export interface ReportsPayload {
  domain?: string;
  uniqueId?: string;
  itemID?: string | number;
}

/** GET /skills response payload. */
export type SkillsResponse = ApiEnvelope<SkillRef[]>;

/** POST /category/filteredListforPictureOfServices */
export interface CategoryPicturePayload {
  id: string | number;
}
export type CategoryPictureResponse = ApiEnvelope<{ thumbnail?: string }>;

/** POST /leads/manual-add request body (shared by contact form and newsletters). */
export interface LeadContact {
  email: string;
  name?: string;
  contact?: string;
  source: string;
  website?: string;
}
export interface AddLeadPayload {
  action_type: "add";
  title: string;
  description?: string;
  lead_source: string;
  contact: LeadContact[];
}

/** POST /tiny_url/getTinyUrlDetail */
export interface TinyUrlPayload {
  uniqueId: string;
}
export interface TinyUrlDetail {
  target_link?: string;
}
/** The API returns either a single detail object or an array of them. */
export type TinyUrlResponse = ApiEnvelope<TinyUrlDetail | TinyUrlDetail[]>;

// ---------------------------------------------------------------------------
// WordPress blog source (blog.cypexsoft.com and local JSON files)
// ---------------------------------------------------------------------------

export interface WpPost {
  id: number;
  date?: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  _embedded?: {
    "wp:featuredmedia"?: { source_url?: string }[];
  };
}

/** Trimmed-down blog shape produced by loadBlogs for listing pages. */
export interface BlogSummary {
  id: number;
  title?: string;
  date?: string;
  excerpt?: string;
  featuredImage?: string;
}
