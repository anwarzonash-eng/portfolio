import Services from "@/components/pages/services";
import { PageJsonLd } from "@/components/seo/JsonLd";
import {
  createGenerateMetadata,
  type SeoPageProps,
} from "@/utils/seo/pageSeo";

export const generateMetadata = createGenerateMetadata("services");

const Page = ({ params, searchParams }: SeoPageProps) => (
  <>
    <PageJsonLd kind="services" params={params} searchParams={searchParams} />
    <Services params={params} />
  </>
);

export default Page;
