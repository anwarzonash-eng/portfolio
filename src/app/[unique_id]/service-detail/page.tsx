"use client";
import ServiceDetail from "@/components/pages/service-detail";
import type { PageProps } from "@/types/page";

const offer = ({ params }: PageProps) => {
  return <ServiceDetail params={params} />;
};

export default offer;
