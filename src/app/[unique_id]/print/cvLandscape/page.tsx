"use client";
import CV_Landscape from "@/components/pages/print/cvLandscape";
import type { PageProps } from "@/types/page";

const cv = ({ params }: PageProps) => {
  return <CV_Landscape params={params} />;
};

export default cv;
