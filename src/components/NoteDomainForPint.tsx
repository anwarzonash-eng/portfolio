"use client";
import { useAppSelector } from "@/store";
import Link from "next/link";

interface NoteDomainForPintProps {
  direction?: string; // optional prop
}

function NoteDomainForPint({ direction }: NoteDomainForPintProps) {
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  // 🛑 NULL CHECK
  if (!listOfdatas || !listOfdatas.domain) return null;

  // ✅ Fallback to default direction if not provided
  const positionClass = direction ? direction : "right-0";

  return (
    <div
      className={`absolute top-5 z-[1000] ${positionClass} max-w-max px-20`}
    >
      <Link
        className="text-primary font-medium text-[2rem] underline ml-2"
        href={`https://www.${listOfdatas.domain}`}
      >
        {listOfdatas.domain}
      </Link>
    </div>
  );
}

export default NoteDomainForPint;
