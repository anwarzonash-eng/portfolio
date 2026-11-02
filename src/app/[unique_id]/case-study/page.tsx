"use client";
import CaseStudyListing from "@/components/pages/case-study";
import type { PageProps } from "@/types/page";

const CaseStudyPage = ({ params }: PageProps) => {
  return <CaseStudyListing params={params} />;
};

export default CaseStudyPage;
