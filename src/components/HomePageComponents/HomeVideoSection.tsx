"use client";
import React from "react";
import type { ProfileReport } from "@/types/api";

/** Custom Video Player Section (extracted verbatim from pages/home). */
const HomeVideoSection = ({
  listOfdata,
}: {
  listOfdata: (ProfileReport & { video_attached?: { videoURL?: string } }) | null;
}) => {
  if (!listOfdata?.video_attached?.videoURL) return null;

  return (
    <div className="w-full mb-[10rem] xl:mb-[12rem] mainContainer print:hidden ">
      <video
        autoPlay
        muted
        loop
        controls
        className="rounded-xl h-[40rem] lg:h-[70rem] w-full object-cover"
      >
        <source src={listOfdata?.video_attached?.videoURL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HomeVideoSection;
