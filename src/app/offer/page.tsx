"use client";
import Offer from "@/components/pages/offer";
import type { PageProps } from "@/types/page";

const offer = ({ params }: PageProps) => {
  return <Offer params={params} />;
};

export default offer;
