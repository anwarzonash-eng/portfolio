import CV from "@/components/pages/cv";
import { PageJsonLd } from "@/components/seo/JsonLd";
import {
  createGenerateMetadata,
  type SeoPageProps,
} from "@/utils/seo/pageSeo";

export const generateMetadata = createGenerateMetadata("cv");

const Page = ({ params, searchParams }: SeoPageProps) => (
  <>
    <PageJsonLd kind="cv" params={params} searchParams={searchParams} />
    <CV params={params} />
  </>
);

export default Page;
