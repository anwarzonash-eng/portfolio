"use client";
import BlogListing from "@/components/pages/blog-listing";
import React from "react";

const blogListing = ({ params }: { params: any }) => {
  return <BlogListing params={params} />;
};

export default blogListing;
