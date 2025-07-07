"use client";
import { useAppSelector } from "@/store";
import Link from "next/link";

function NoteDomainForPint({ direction }) {
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );

  return (
    <div className={`absolute top-10 z-[1000] ${direction} max-w-max px-20`}>
      <Link
        className="text-primary font-medium text-[2rem] underline ml-2"
        href={`https://www.${listOfdatas.domain}`}
      >
        {listOfdatas.domain}
      </Link>
      <p className="text-white font-medium px-4 py-1 text-[1.6rem] rounded-[100px] bg-primary">
        Note: All The Buttons are Clickable
      </p>
    </div>
  );
}

export default NoteDomainForPint;
