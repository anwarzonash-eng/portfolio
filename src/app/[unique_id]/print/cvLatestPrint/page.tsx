"use client";
import CVLatestPrint from "@/components/pages/print/cvLatestPrint";
import React from "react";

const cvLatestPrintDynamic = ({ params }: { params: any }) => {
  return <CVLatestPrint params={params} />;
};

export default cvLatestPrintDynamic;
