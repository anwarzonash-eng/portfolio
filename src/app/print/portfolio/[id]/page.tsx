"use client";
import PortfolioDetails_p from "@/components/pages/print/portfolio/portfolio-detail";
import type { PageProps } from "@/types/page";

const portfolioDetails = ({ params }: PageProps) => {
  return <PortfolioDetails_p params={params} />;
};

export default portfolioDetails;
