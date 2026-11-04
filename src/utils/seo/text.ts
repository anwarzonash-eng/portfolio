import type { ProfileApiData } from "@/types/api";

/**
 * Shared text helpers.
 *
 * `tag_line`, service intros and portfolio descriptions are rendered through
 * dangerouslySetInnerHTML elsewhere, so every value that reaches a meta tag
 * has to have its markup stripped first.
 */

export const stripHtml = (value?: string | null): string =>
  (value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#3[49];/g, "'")
    .replace(/\s+/g, " ")
    .trim();

/** Truncates on a word boundary so share text does not end mid-word. */
export const truncate = (value: string, max: number): string => {
  const clean = value.trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
};

/**
 * `designation` arrives pipe-separated ("Full-Stack Developer | Shopify
 * Expert"); the hero section already shows only the first entry.
 */
export const primaryDesignation = (profile?: ProfileApiData | null): string =>
  stripHtml(profile?.designation).split("|")[0].trim();

export const profileName = (profile?: ProfileApiData | null): string =>
  stripHtml(profile?.name);

/** Best one-line summary of the person, preferring the human-written field. */
export const profileSummary = (profile?: ProfileApiData | null): string =>
  stripHtml(profile?.ai_short_description) || stripHtml(profile?.tag_line);

/** "Jane Doe, Full-Stack Developer" — or whichever half exists. */
export const nameAndRole = (profile?: ProfileApiData | null): string => {
  const name = profileName(profile);
  const role = primaryDesignation(profile);
  if (name && role) return `${name}, ${role}`;
  return name || role;
};

/**
 * The person's photo as returned by the API, or undefined.
 *
 * There is deliberately no placeholder: a profile with no photo gets a share
 * card with no image rather than a stand-in that misrepresents the person.
 */
export const profilePhoto = (
  profile?: ProfileApiData | null
): string | undefined => {
  const candidates = [
    profile?.profile_photo_1,
    profile?.profile_photo_2,
    profile?.profile_photo_3,
  ];
  return candidates.find(
    (url) => typeof url === "string" && url.trim().length > 0
  );
};

/** Absolute URL, as required by Open Graph and schema.org. */
export const absoluteUrl = (domain: string, path: string): string =>
  `https://${domain}${path === "/" ? "" : path}`;
