"use client";
import PortfolioDetails_p from "@/components/pages/print/portfolio/portfolio-detail";
import React from "react";

const portfolioDetails = ({ params }: { params: any }) => {
  return <PortfolioDetails_p params={params} />;
};

export default portfolioDetails;
