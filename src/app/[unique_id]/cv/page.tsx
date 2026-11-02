'use client';
import CV from '@/components/pages/cv';
import type { PageProps } from "@/types/page";

const cv = ({ params }: PageProps) => {
  return <CV params={params} />;
};

export default cv;
