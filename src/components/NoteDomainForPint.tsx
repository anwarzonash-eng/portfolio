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
      className={`absolute top-0 z-[1000] ${positionClass} max-w-max px-4 py-2`}
    >
      <Link
        className="text-primary font-medium text-[1.5rem] underline"
        href={`https://www.${listOfdatas.domain}`}
      >
        {listOfdatas.domain}
      </Link>
    </div>
  );
}

export default NoteDomainForPint;
