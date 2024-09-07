'use client';
import BlogListing from '@/components/pages/blog-listing';
import React from 'react';

const blogListing = ({ params }: { params: { slug: string } }) => {
  return <BlogListing params={params} />;
};

export default blogListing;
