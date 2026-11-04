import type { Metadata } from "next";
import type { ProfileApiData, Portfolio } from "@/types/api";
import type { PageParams, RouteParams } from "@/types/page";
import { loadProfile, type SeoSearchParams } from "./profile";
import {
  absoluteUrl,
  nameAndRole,
  profileName,
  profilePhoto,
  profileSummary,
  stripHtml,
  truncate,
} from "./text";
import {
  buildGraph,
  buildCreativeWork,
  buildPerson,
  buildServiceOffers,
  buildWorkList,
  type JsonLdObject,
} from "./jsonLd";

/**
 * Open Graph / Twitter cards and the JSON-LD graph, per page, built from the
 * tenant's own API content.
 *
 * This module deliberately does not set `title` or `description`: those are
 * the page-title layer, which is tracked separately. What it sets is the
 * share card (`og:*`, `twitter:*`) and the structured data.
 */

export type PageKind =
  | "home"
  | "portfolio"
  | "portfolioDetail"
  | "cv"
  | "services"
  | "serviceDetail"
  | "contact"
  | "offer"
  | "caseStudy";

const OG_TITLE_MAX = 70;
const OG_DESCRIPTION_MAX = 200;

const firstValue = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

const portfolioIdFrom = (params?: RouteParams): string | undefined =>
  params?.id ??
  (Array.isArray(params?.value)
    ? params?.value[0]
    : typeof params?.value === "object" && params?.value !== null
      ? params.value.id
      : (params?.value as string | undefined));

const findPortfolio = (
  profile: ProfileApiData | null,
  params?: RouteParams
): Portfolio | undefined => {
  const raw = portfolioIdFrom(params);
  if (!raw || !profile?.portfolios_ids?.length) return undefined;
  return profile.portfolios_ids.find((item) => String(item?.id) === String(raw));
};

/** Path prefix for the profile currently being viewed, if any. */
const profilePrefix = (params?: RouteParams): string =>
  params?.unique_id ? `/${encodeURIComponent(params.unique_id)}` : "";

const portfolioUrl = (
  domain: string,
  params: RouteParams | undefined,
  portfolio: Portfolio
): string | undefined =>
  portfolio?.id === undefined || portfolio?.id === null
    ? undefined
    : absoluteUrl(
        domain,
        `${profilePrefix(params)}/portfolio/${encodeURIComponent(String(portfolio.id))}`
      );

/** The text that appears on the share card. */
const shareCopy = (
  kind: PageKind,
  profile: ProfileApiData | null,
  params?: RouteParams,
  searchParams?: SeoSearchParams
): { title: string; description: string } | null => {
  const name = profileName(profile);
  // Nothing real to say about this domain: emit no card rather than a made-up one.
  if (!profile || !name) return null;

  const who = nameAndRole(profile);
  const summary = profileSummary(profile);
  const location = stripHtml(profile.location);

  switch (kind) {
    case "home":
      return {
        title: who,
        description:
          summary ||
          `The portfolio of ${who}${location ? ` based in ${location}` : ""}.`,
      };

    case "portfolio": {
      const count = profile.portfolios_ids?.length ?? 0;
      return {
        title: `Portfolio — ${name}`,
        description: `${
          count > 0
            ? `${count} selected project${count === 1 ? "" : "s"}`
            : "Selected projects"
        } by ${who}.`,
      };
    }

    case "portfolioDetail": {
      const portfolio = findPortfolio(profile, params);
      const projectTitle = stripHtml(portfolio?.title || portfolio?.name);
      if (!projectTitle) {
        return { title: `Portfolio — ${name}`, description: `A project by ${who}.` };
      }
      const brief =
        stripHtml(portfolio?.short_description) ||
        stripHtml(portfolio?.tagline_1) ||
        stripHtml(portfolio?.description);
      const client = stripHtml(portfolio?.client_name);
      return {
        title: `${projectTitle} — ${name}`,
        description:
          brief ||
          `${projectTitle}${client ? ` for ${client}` : ""}, a project by ${who}.`,
      };
    }

    case "cv": {
      const years = profile.no_of_experiences;
      return {
        title: `CV — ${who}`,
        description: `The full CV of ${who}${
          years ? ` with ${years} years of experience` : ""
        }.`,
      };
    }

    case "services": {
      const titles = (profile.services || [])
        .map((service) => stripHtml(service?.title))
        .filter(Boolean)
        .slice(0, 3);
      return {
        title: `Services — ${name}`,
        description: titles.length
          ? `${titles.join(", ")} and more from ${who}.`
          : `Development services from ${who}.`,
      };
    }

    case "serviceDetail": {
      const service = stripHtml(firstValue(searchParams?.service));
      return service
        ? {
            title: `${service} — ${name}`,
            description: `${service} delivered by ${who}.`,
          }
        : {
            title: `Services — ${name}`,
            description: `Development services from ${who}.`,
          };
    }

    case "contact":
      return {
        title: `Contact ${name}`,
        description: `Get in touch with ${who}${location ? ` in ${location}` : ""}.`,
      };

    case "offer":
      return {
        title: `Cover Letter — ${name}`,
        description: `A cover letter from ${who}.`,
      };

    case "caseStudy":
      return {
        title: `Case Studies — ${name}`,
        description: `In-depth case studies by ${who}.`,
      };
  }
};

/** Next 15 hands both of these to generateMetadata as promises. */
interface GenerateMetadataArgs {
  params?: Promise<RouteParams> | RouteParams;
  searchParams?: Promise<SeoSearchParams> | SeoSearchParams;
}

/**
 * Builds the `generateMetadata` export for a route. Never throws: if the
 * profile cannot be loaded the page simply carries no share card.
 */
export const createGenerateMetadata =
  (kind: PageKind) =>
  async ({ params, searchParams }: GenerateMetadataArgs = {}): Promise<Metadata> => {
    const resolvedParams = params ? await params : undefined;
    const resolvedSearch = searchParams ? await searchParams : undefined;
    const { profile } = await loadProfile(resolvedParams, resolvedSearch);

    const copy = shareCopy(kind, profile, resolvedParams, resolvedSearch);
    if (!copy) return {};

    const title = truncate(copy.title, OG_TITLE_MAX);
    const description = truncate(copy.description, OG_DESCRIPTION_MAX);

    // The project's own thumbnail is the honest picture for a project page;
    // everywhere else it is the person. Absent either, the card has no image
    // and no placeholder is substituted.
    const portfolio =
      kind === "portfolioDetail" ? findPortfolio(profile, resolvedParams) : undefined;
    const image =
      (typeof portfolio?.thumbnail === "string" && portfolio.thumbnail.trim()
        ? portfolio.thumbnail
        : undefined) ?? profilePhoto(profile);

    const name = profileName(profile);

    return {
      // The real person this page is about, replacing the placeholder author
      // the root layout used to declare for every tenant alike.
      ...(name ? { authors: [{ name }] } : {}),
      openGraph: {
        title,
        description,
        siteName: name,
        type: "website",
        ...(image
          ? { images: [{ url: image, alt: name }] }
          : {}),
      },
      twitter: {
        // summary_large_image would reserve a banner slot we cannot fill.
        card: image ? "summary_large_image" : "summary",
        title,
        description,
        ...(image ? { images: [image] } : {}),
      },
    };
  };

/**
 * The JSON-LD graph for a page, or null when the profile carries nothing
 * worth describing.
 */
export const buildPageJsonLd = (
  kind: PageKind,
  profile: ProfileApiData | null,
  domain: string,
  params?: RouteParams
): JsonLdObject | null => {
  if (!profile) return null;
  const person = buildPerson(profile, domain);
  if (!person) return null;

  switch (kind) {
    case "portfolio":
      return buildGraph([
        person,
        buildWorkList(profile, domain, (portfolio) =>
          portfolioUrl(domain, params, portfolio)
        ),
      ]);

    case "portfolioDetail": {
      const portfolio = findPortfolio(profile, params);
      return buildGraph([
        person,
        portfolio
          ? buildCreativeWork(
              portfolio,
              profile,
              domain,
              portfolioUrl(domain, params, portfolio)
            )
          : null,
      ]);
    }

    case "services":
    case "serviceDetail":
      return buildGraph([person, buildServiceOffers(profile, domain)]);

    case "home":
      return buildGraph([
        person,
        buildWorkList(profile, domain, (portfolio) =>
          portfolioUrl(domain, params, portfolio)
        ),
      ]);

    default:
      return buildGraph([person]);
  }
};

/** Loads the profile and returns the page's JSON-LD graph in one step. */
export const loadPageJsonLd = async (
  kind: PageKind,
  params?: RouteParams,
  searchParams?: SeoSearchParams
): Promise<JsonLdObject | null> => {
  const { profile, domain } = await loadProfile(params, searchParams);
  return buildPageJsonLd(kind, profile, domain, params);
};

/** Props a route file receives from the App Router in Next 15. */
export interface SeoPageProps {
  params: PageParams;
  searchParams?: Promise<SeoSearchParams>;
}
