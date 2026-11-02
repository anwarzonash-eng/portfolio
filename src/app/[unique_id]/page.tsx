"use client";
import Home from "@/components/pages/home";
import type { PageProps } from "@/types/page";

const index = ({ params }: PageProps) => {
  return <Home params={params} />;
};

export default index;
