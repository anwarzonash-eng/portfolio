import type { ProfileApiData, Portfolio } from "@/types/api";
import {
  absoluteUrl,
  nameAndRole,
  primaryDesignation,
  profileName,
  profilePhoto,
  profileSummary,
  stripHtml,
  truncate,
} from "./text";

/**
 * schema.org structured data built from the tenant's own API content.
 *
 * Every field is omitted when the profile does not carry it, so a sparse
 * profile produces a smaller but still valid graph rather than one padded
 * with invented values.
 */

export type JsonLdObject = Record<string, unknown>;

const DESCRIPTION_MAX = 300;

/** Drops undefined, empty strings and empty arrays. */
const compact = (object: JsonLdObject): JsonLdObject =>
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "string") return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return true;
    })
  );

/** The person's public profiles, for schema.org `sameAs`. */
const socialLinks = (profile: ProfileApiData): string[] =>
  [
    profile.linkedIn,
    profile.linkedin,
    profile.github,
    profile.twitter,
    profile.instagram,
    profile.facebook,
    profile.behance_link,
    profile.upwork,
  ]
    .map((url) => (typeof url === "string" ? url.trim() : ""))
    .filter((url) => url.startsWith("http"))
    // The API exposes both linkedIn and linkedin; keep one if both are set.
    .filter((url, index, all) => all.indexOf(url) === index);

/**
 * The Person the whole site is about. `@id` is stable per domain so the other
 * nodes can reference this one instead of repeating it.
 */
export const personId = (domain: string): string =>
  `${absoluteUrl(domain, "/")}/#person`;

export const buildPerson = (
  profile: ProfileApiData,
  domain: string
): JsonLdObject | null => {
  const name = profileName(profile);
  if (!name) return null; // Without a name there is no Person to describe.

  const photo = profilePhoto(profile);
  const summary = profileSummary(profile);
  const location = stripHtml(profile.location);
  const skills = (profile.skills_ids || [])
    .map((skill) => stripHtml(skill?.title))
    .filter(Boolean);

  const education = (profile.education_ids || [])
    .map((entry) => stripHtml(entry?.university_name || entry?.school))
    .filter(Boolean)
    .map((institution) => ({
      "@type": "EducationalOrganization",
      name: institution,
    }));

  return compact({
    "@type": "Person",
    "@id": personId(domain),
    name,
    url: absoluteUrl(domain, "/"),
    jobTitle: primaryDesignation(profile),
    description: summary ? truncate(summary, DESCRIPTION_MAX) : undefined,
    image: photo,
    email: profile.email ? `mailto:${stripHtml(profile.email)}` : undefined,
    telephone: stripHtml(profile.phone_no) || undefined,
    address: location
      ? { "@type": "PostalAddress", addressLocality: location }
      : undefined,
    knowsAbout: skills,
    alumniOf: education,
    sameAs: socialLinks(profile),
  });
};

/** One project, as a CreativeWork authored by the Person. */
export const buildCreativeWork = (
  portfolio: Portfolio,
  profile: ProfileApiData,
  domain: string,
  url?: string
): JsonLdObject | null => {
  const title = stripHtml(portfolio.title || portfolio.name);
  if (!title) return null;

  const description =
    stripHtml(portfolio.short_description) ||
    stripHtml(portfolio.tagline_1) ||
    stripHtml(portfolio.description);
  const client = stripHtml(portfolio.client_name);
  const thumbnail =
    typeof portfolio.thumbnail === "string" && portfolio.thumbnail.trim()
      ? portfolio.thumbnail
      : undefined;
  const keywords = (portfolio.skills || [])
    .map((skill) => stripHtml(skill?.title))
    .filter(Boolean);

  return compact({
    "@type": "CreativeWork",
    name: title,
    url,
    description: description ? truncate(description, DESCRIPTION_MAX) : undefined,
    image: thumbnail,
    dateCreated: portfolio.starting_date || undefined,
    author: { "@id": personId(domain) },
    // The client the work was produced for, when the profile records one.
    sourceOrganization: client
      ? { "@type": "Organization", name: client }
      : undefined,
    keywords: keywords.length ? keywords.join(", ") : undefined,
  });
};

/** The person's projects as an ordered list, for the portfolio listing. */
export const buildWorkList = (
  profile: ProfileApiData,
  domain: string,
  urlForPortfolio: (portfolio: Portfolio) => string | undefined
): JsonLdObject | null => {
  const items = (profile.portfolios_ids || [])
    .map((portfolio) => ({
      portfolio,
      work: buildCreativeWork(
        portfolio,
        profile,
        domain,
        urlForPortfolio(portfolio)
      ),
    }))
    .filter((entry) => entry.work !== null);

  if (!items.length) return null;

  return {
    "@type": "ItemList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: entry.work,
    })),
  };
};

/** The services the person offers, attached to the Person as offers. */
export const buildServiceOffers = (
  profile: ProfileApiData,
  domain: string
): JsonLdObject | null => {
  const offers = (profile.services || [])
    .map((service) => {
      const title = stripHtml(service?.title);
      if (!title) return null;
      const tagline =
        stripHtml(service?.tagline) || stripHtml(service?.intro_main);
      return compact({
        "@type": "Offer",
        itemOffered: compact({
          "@type": "Service",
          name: title,
          description: tagline
            ? truncate(tagline, DESCRIPTION_MAX)
            : undefined,
          provider: { "@id": personId(domain) },
        }),
      });
    })
    .filter((offer): offer is JsonLdObject => offer !== null);

  if (!offers.length) return null;

  return {
    "@type": "ItemList",
    name: `Services offered by ${nameAndRole(profile) || profileName(profile)}`,
    itemListElement: offers.map((offer, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: offer,
    })),
  };
};

/** Wraps the nodes for one page into a single @graph document. */
export const buildGraph = (nodes: Array<JsonLdObject | null>): JsonLdObject | null => {
  const present = nodes.filter((node): node is JsonLdObject => node !== null);
  if (!present.length) return null;
  return { "@context": "https://schema.org", "@graph": present };
};
