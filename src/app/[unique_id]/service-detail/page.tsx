import ServiceDetail from "@/components/pages/service-detail";
import { PageJsonLd } from "@/components/seo/JsonLd";
import {
  createGenerateMetadata,
  type SeoPageProps,
} from "@/utils/seo/pageSeo";

export const generateMetadata = createGenerateMetadata("serviceDetail");

const Page = ({ params, searchParams }: SeoPageProps) => (
  <>
    <PageJsonLd kind="serviceDetail" params={params} searchParams={searchParams} />
    <ServiceDetail params={params} />
  </>
);

export default Page;
