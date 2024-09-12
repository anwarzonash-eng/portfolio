'use client';

import PortfolioListing from '@/components/pages/potfolio-listing';
import React from 'react';

const portfolioListing = ({ params }: { params: any }) => {
  return <PortfolioListing params={params} />;
};

export default portfolioListing;
