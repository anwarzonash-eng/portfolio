'use client';

import PortfolioListing from '@/components/pages/potfolio-listing';
import type { PageProps } from "@/types/page";

const portfolioListing = ({ params }: PageProps) => {
  return <PortfolioListing params={params} />;
};

export default portfolioListing;
