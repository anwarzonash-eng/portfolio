"use client";

import PortfolioListing_p from "@/components/pages/print/portfolio/potfolio-listing";
import type { PageProps } from "@/types/page";

const portfolioListing = ({ params }: PageProps) => {
  return <PortfolioListing_p params={params} />;
};

export default portfolioListing;
