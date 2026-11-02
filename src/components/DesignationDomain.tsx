"use client";
import { useAppSelector } from "@/store";
import { Globe } from "lucide-react";
import Link from "next/link";

function DesignationDomain() {
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  const urlInfo = useAppSelector(
    (state) => state.profile.profileUrlInfo
  );

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
    </Link>
  );
}

export default DesignationDomain;
