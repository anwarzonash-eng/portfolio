'use client';
import BlogDetails from '@/components/pages/blog-detail';
import React from 'react';

const blogDetail = ({ params }: { params: any }) => {
  return <BlogDetails params={params} />;
};

export default blogDetail;
