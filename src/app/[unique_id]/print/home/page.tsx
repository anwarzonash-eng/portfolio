"use client";
import Home_p from "@/components/pages/print/home";
import type { PageProps } from "@/types/page";

const home_p = ({ params }: PageProps) => {
  return <Home_p params={params} />;
};

export default home_p;
