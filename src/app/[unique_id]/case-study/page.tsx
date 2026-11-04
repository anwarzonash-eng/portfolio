import CaseStudyListing from "@/components/pages/case-study";
import { PageJsonLd } from "@/components/seo/JsonLd";
import {
  createGenerateMetadata,
  type SeoPageProps,
} from "@/utils/seo/pageSeo";

export const generateMetadata = createGenerateMetadata("caseStudy");

const Page = ({ params, searchParams }: SeoPageProps) => (
  <>
    <PageJsonLd kind="caseStudy" params={params} searchParams={searchParams} />
    <CaseStudyListing params={params} />
  </>
);

export default Page;
