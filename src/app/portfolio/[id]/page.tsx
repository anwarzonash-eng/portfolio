'use client';
import PortfolioDetails from '@/components/pages/portfolio-detail';
import React from 'react';

const portfolioDetails = ({ params }: { params: { slug: string } }) => {
  return <PortfolioDetails params={params} />;
};

export default portfolioDetails;
