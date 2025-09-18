"use client";
import { useAppSelector } from "@/store";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

function DesignationDomain() {
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  // 🛑 NULL CHECK
  if (!listOfdatas || !listOfdatas.domain) return null;

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ✅ detect admin from URL only
  const isAdmin = searchParams.get("a") === "_";

  let uniqueID: string | null = null;
  let isU = false;

  if (isAdmin) {
    // ---------------- ADMIN MODE ----------------
    uniqueID = pathname.split("/")[1] || "a";
    isU = searchParams.get("u") === "_";
  } else {
    // ---------------- NON-ADMIN MODE ----------------
    uniqueID = localStorage.getItem("uniqueID") || "a";
    isU = localStorage.getItem("u") === "_";
  }

  if (!uniqueID) return null;

  // Build query params if needed
  const urlQuery = new URLSearchParams();
  if (isU && !urlQuery.has("u")) {
    urlQuery.append("u", "_");
  }
  if (isAdmin && !urlQuery.has("a")) {
    urlQuery.append("a", "_");
  }
  const queryStr = urlQuery.toString() ? "?" + urlQuery.toString() : "";

  const href = `https://www.${listOfdatas.domain}/${uniqueID}${queryStr}`;

  return (
    <Link
      className="bg-primary text-white font-medium text-[1.6rem] tracking-widest ml-2 flex items-center gap-2 rounded-[100px] px-4 py-2"
      href={href}
    >
      {listOfdatas.domain}
      <span className="inline-flex items-center justify-center h-8 w-8  rounded-[50%] bg-white text-primary">
        <ArrowRight className="h-7 w-7" />
      </span>
    </Link>
  );
}

export default DesignationDomain;
