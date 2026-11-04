import PortfolioListing from "@/components/pages/potfolio-listing";
import { PageJsonLd } from "@/components/seo/JsonLd";
import {
  createGenerateMetadata,
  type SeoPageProps,
} from "@/utils/seo/pageSeo";

export const generateMetadata = createGenerateMetadata("portfolio");

const Page = ({ params, searchParams }: SeoPageProps) => (
  <>
    <PageJsonLd kind="portfolio" params={params} searchParams={searchParams} />
    <PortfolioListing params={params} />
  </>
);

export default Page;
