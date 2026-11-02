'use client';
import BlogDetails from '@/components/pages/blog-detail';
import type { PageProps } from "@/types/page";

const blogDetail = ({ params }: PageProps) => {
  return <BlogDetails params={params} />;
};

export default blogDetail;
