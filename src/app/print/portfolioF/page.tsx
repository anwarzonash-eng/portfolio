"use client";

import PortfolioListing_p from "@/components/pages/print/portfolioF/potfolio-listing";
import React from "react";

const portfolioListing = ({ params }: { params: any }) => {
  return <PortfolioListing_p params={params} />;
};

export default portfolioListing;
