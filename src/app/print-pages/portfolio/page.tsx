'use client';

import PortfolioListing from '@/components/pages/print-pages/portfolio/potfolio-listing';
import React from 'react';

const portfolioListing = ({ params }: { params: any }) => {
  return <PortfolioListing params={params} />;
};

export default portfolioListing;
