import PortfolioDetails from "@/components/pages/portfolio-detail";
import { PageJsonLd } from "@/components/seo/JsonLd";
import {
  createGenerateMetadata,
  type SeoPageProps,
} from "@/utils/seo/pageSeo";

export const generateMetadata = createGenerateMetadata("portfolioDetail");

const Page = ({ params, searchParams }: SeoPageProps) => (
  <>
    <PageJsonLd kind="portfolioDetail" params={params} searchParams={searchParams} />
    <PortfolioDetails params={params} />
  </>
);

export default Page;
