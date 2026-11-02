"use client";
import { useAppSelector } from "@/store";
import Link from "next/link";

interface NoteDomainForPintProps {
  direction?: string; // optional prop
isPrimary?: boolean; 
}

function NoteDomainForPint({ direction, isPrimary }: NoteDomainForPintProps) {
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );
  
  const urlInfo = useAppSelector(
    (state) => state.profile.profileUrlInfo
  );

  // 🛑 NULL CHECK
  if (!listOfdatas || !listOfdatas.domain || !urlInfo?.uniqueID) return null;

  // ✅ Fallback to default direction if not provided
  const positionClass = direction ? direction : "right-0";

  // Create the exact link format: https://${listOfdata?.domain}/${url?.uniqueID}
  const linkHref = `https://${listOfdatas.domain}/${urlInfo.uniqueID}`;

  return (
    <div
      className={`absolute top-0 z-[1000] ${positionClass} max-w-max px-4 py-2`}
    >
      <Link
        className={`${isPrimary ? "text-white" : "text-primary"} font-medium text-[1.5rem] underline`}
        href={linkHref}
      >
        {listOfdatas.domain}
      </Link>
    </div>
  );
}

export default NoteDomainForPint;
