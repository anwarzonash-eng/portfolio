"use client";
import { useAppSelector } from "@/store";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function DesignationDomain() {
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  // 🛑 NULL CHECK
  if (!listOfdatas || !listOfdatas.domain) return null;
  return (
    <Link
      className="bg-primary text-white font-medium text-[1.6rem] tracking-widest ml-2 flex items-center gap-2 rounded-[100px] px-4 py-2"
      href={`https://www.${listOfdatas.domain}`}
    >
      {listOfdatas.domain}
      <span className="inline-flex items-center justify-center h-8 w-8  rounded-[50%] bg-white text-primary">
        <ArrowRight className="h-7 w-7" />
      </span>
    </Link>
  );
}

export default DesignationDomain;
