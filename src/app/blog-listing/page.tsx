'use client';
import BlogListing from '@/components/pages/blog-listing';
import type { PageProps } from "@/types/page";

const blogListing = ({ params }: PageProps) => {
  return <BlogListing params={params} />;
};

export default blogListing;
