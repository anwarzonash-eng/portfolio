"use client";
import { useAppSelector } from "@/store";
import { ArrowRight, Globe } from "lucide-react";
import Link from "next/link";
import React from "react";

function DesignationDomain() {
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  const urlInfo = useAppSelector(
    (state) => state.profile.profileUrlInfo
  );

  // console.log("listOfdatas in DesignationDomain:", listOfdatas);
  // console.log("urlInfo in DesignationDomain:", urlInfo);

  // 🛑 NULL CHECK
  if (!listOfdatas || !listOfdatas.domain || !urlInfo?.uniqueID) return null;

  // Create the exact link format: https://${listOfdata?.domain}/${url?.uniqueID}
  const href = `https://${listOfdatas.domain}/${urlInfo.uniqueID}`;

  return (
    <Link
      className="bg-primary text-white font-medium text-[1.6rem] tracking-widest  flex items-center gap-2 rounded-[100px] px-4 py-2"
      href={href}
    >
      <Globe className="h-7 w-7" />
      {listOfdatas.domain}
      {/* <span className="inline-flex items-center justify-center h-8 w-8  rounded-[50%] bg-white text-primary">
        <ArrowRight className="h-7 w-7" />
      </span> */}
    </Link>
  );
}

export default DesignationDomain;
