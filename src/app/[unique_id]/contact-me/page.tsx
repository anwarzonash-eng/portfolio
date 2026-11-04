import ContactMePage from "@/components/pages/contact-me";
import { PageJsonLd } from "@/components/seo/JsonLd";
import {
  createGenerateMetadata,
  type SeoPageProps,
} from "@/utils/seo/pageSeo";

export const generateMetadata = createGenerateMetadata("contact");

const Page = ({ params, searchParams }: SeoPageProps) => (
  <>
    <PageJsonLd kind="contact" params={params} searchParams={searchParams} />
    <ContactMePage params={params} />
  </>
);

export default Page;
