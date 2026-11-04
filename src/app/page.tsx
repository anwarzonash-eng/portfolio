import Home from "@/components/pages/home";
import { PageJsonLd } from "@/components/seo/JsonLd";
import {
  createGenerateMetadata,
  type SeoPageProps,
} from "@/utils/seo/pageSeo";

export const generateMetadata = createGenerateMetadata("home");

const Page = ({ params, searchParams }: SeoPageProps) => (
  <>
    <PageJsonLd kind="home" params={params} searchParams={searchParams} />
    <Home params={params} />
  </>
);

export default Page;
