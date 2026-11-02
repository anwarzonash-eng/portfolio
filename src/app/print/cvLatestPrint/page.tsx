"use client";
import CVLatestPrint from "@/components/pages/print/cv2";
import type { PageProps } from "@/types/page";

const cvLatestPrint = ({ params }: PageProps) => {
  return <CVLatestPrint params={params} />;
};

export default cvLatestPrint;
