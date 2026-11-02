/**
 * Route params handed to the page components by the Next.js App Router.
 *
 * `unique_id` is the tenant profile segment; `id`/`value` are the
 * detail-route identifiers (`value` is a catch-all, so it can arrive as a
 * string, an array, or a nested object — the detail pages narrow it).
 */
export interface RouteParams {
  unique_id?: string;
  id?: string;
  value?: string | string[] | { id?: string };
}

/**
 * In Next 15 the App Router passes `params` as a Promise, which
 * `getRoutesDetails` awaits. Some detail pages additionally read the fields
 * synchronously off the same object; the intersection models both usages so
 * the existing runtime behaviour is described rather than changed.
 */
export type PageParams = Promise<RouteParams> & Partial<RouteParams>;

/** Standard props for the route-level page components. */
export interface PageProps {
  params: PageParams;
}
