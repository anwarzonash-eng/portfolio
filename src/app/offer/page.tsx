import Offer from "@/components/pages/offer";
import { PageJsonLd } from "@/components/seo/JsonLd";
import {
  createGenerateMetadata,
  type SeoPageProps,
} from "@/utils/seo/pageSeo";

export const generateMetadata = createGenerateMetadata("offer");

const Page = ({ params, searchParams }: SeoPageProps) => (
  <>
    <PageJsonLd kind="offer" params={params} searchParams={searchParams} />
    <Offer params={params} />
  </>
);

export default Page;
