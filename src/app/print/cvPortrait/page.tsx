"use client";
import CV_Portrait from "@/components/pages/print/cvPortrait";
import type { PageProps } from "@/types/page";

const cv = ({ params }: PageProps) => {
  return <CV_Portrait params={params} />;
};

export default cv;
