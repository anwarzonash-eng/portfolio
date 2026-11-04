import type { RouteParams } from "@/types/page";
import { loadPageJsonLd, type PageKind } from "@/utils/seo/pageSeo";
import type { SeoSearchParams } from "@/utils/seo/profile";
import type { JsonLdObject } from "@/utils/seo/jsonLd";

/**
 * Renders a schema.org graph as a JSON-LD script tag.
 *
 * `<` is escaped so a stray "</script>" inside profile text cannot close the
 * tag early; JSON.stringify handles the rest of the escaping.
 */
const JsonLd = ({ data }: { data: JsonLdObject | null }) => {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
};

export default JsonLd;

/**
 * Server component that loads the tenant profile and emits the page's graph.
 * The profile fetch is shared with generateMetadata via React `cache()`, so
 * adding this to a page costs no extra request.
 */
export const PageJsonLd = async ({
  kind,
  params,
  searchParams,
}: {
  kind: PageKind;
  params?: Promise<RouteParams> | RouteParams;
  searchParams?: Promise<SeoSearchParams> | SeoSearchParams;
}) => {
  const data = await loadPageJsonLd(
    kind,
    params ? await params : undefined,
    searchParams ? await searchParams : undefined
  );
  return <JsonLd data={data} />;
};
