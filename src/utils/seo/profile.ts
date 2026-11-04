import { cache } from "react";
import { headers } from "next/headers";
import type { ProfileApiData, ReportsResponse } from "@/types/api";
import type { RouteParams } from "@/types/page";

/**
 * Server-side profile lookup for the Open Graph tags and the JSON-LD block.
 *
 * The page bodies still fetch their own copy through the client hooks; this is
 * a separate, read-only path that runs before the HTML is sent, because social
 * scrapers and search crawlers read the markup without executing JavaScript.
 *
 * It mirrors the domain/profile resolution in src/hooks/url.ts rather than
 * reusing it, because that module reads `window` and `localStorage`.
 */

/** Share tags must never hold up the response: fall back rather than hang. */
const FETCH_TIMEOUT_MS = 2000;

/** The id src/hooks/url.ts falls back to: "the main profile for this domain". */
export const MAIN_PROFILE_ID = "a";

/** Matches getCleanDomain() in src/hooks/url.ts. */
export const cleanDomain = (host: string): string => {
  let domain = (host || "").split(":")[0];
  if (domain.startsWith("www.")) domain = domain.substring(4);
  if (domain.startsWith("dev.")) domain = domain.substring(4);
  return domain;
};

export type SeoSearchParams = Record<string, string | string[] | undefined>;

export const firstValue = (
  value: string | string[] | undefined
): string | undefined => (Array.isArray(value) ? value[0] : value);

/** The host this request was made to, cleaned. */
export const requestHost = async (): Promise<string> =>
  cleanDomain((await headers()).get("host") || "");

/**
 * The domain whose profile should be described. `?d=` wins over the Host
 * header, matching src/hooks/url.ts, so the admin preview describes the
 * person being previewed rather than the host it is viewed on.
 */
export const resolveDomain = async (
  searchParams?: SeoSearchParams
): Promise<string> => {
  const override = firstValue(searchParams?.d);
  if (override) return cleanDomain(override);
  return requestHost();
};

/**
 * The profile id to request. On `/[unique_id]/...` it is in the path. On the
 * plain routes the client reads it from localStorage, which the server cannot
 * see, so we ask for the main profile — also the right answer for a scraper,
 * which has no stored profile either.
 */
export const resolveUniqueId = (params?: RouteParams): string =>
  params?.unique_id || MAIN_PROFILE_ID;

/**
 * Fetches the profile report. Returns null on any failure, so a slow or down
 * CMS costs the share card and the JSON-LD but never the page.
 *
 * `cache()` dedupes within a single request, so generateMetadata and the
 * page's JSON-LD block share one round trip.
 */
export const getProfile = cache(
  async (domain: string, uniqueId: string): Promise<ProfileApiData | null> => {
    // Read at call time: API_BASE_URL is supplied by the runtime environment.
    const baseUrl = process.env.API_BASE_URL;
    if (!baseUrl || !domain) return null;

    try {
      const response = await fetch(`${baseUrl}/detail-profiles/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, uniqueId }),
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        cache: "no-store",
      });
      if (!response.ok) return null;

      const body = (await response.json()) as ReportsResponse;
      // The report endpoint nests the profile two levels deep: data[0][0].
      const profile = body?.data?.[0]?.[0];
      return profile &&
        typeof profile === "object" &&
        Object.keys(profile).length > 0
        ? profile
        : null;
    } catch {
      return null;
    }
  }
);

/** Resolve domain + id from the route, then fetch. */
export const loadProfile = async (
  params?: RouteParams,
  searchParams?: SeoSearchParams
): Promise<{ profile: ProfileApiData | null; domain: string }> => {
  const domain = await resolveDomain(searchParams);
  const profile = await getProfile(domain, resolveUniqueId(params));
  return { profile, domain };
};
