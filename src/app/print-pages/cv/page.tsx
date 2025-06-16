"use client";
import CV_p from "@/components/pages/print-pages/cv";
import React from "react";

const cv = ({ params }: { params: any }) => {
  return <CV_p params={params} />;
};

export default cv;
