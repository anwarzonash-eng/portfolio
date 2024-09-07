'use client';
import PortfolioListing from '@/components/pages/potfolio-listing';
import React from 'react';

const portfolioListing = ({ params }: { params: { slug: string } }) => {
  return <PortfolioListing params={params} />;
};

export default portfolioListing;
