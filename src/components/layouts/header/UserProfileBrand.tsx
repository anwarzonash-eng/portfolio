"use client";
import Link from "next/link";
import Image from "next/image";
import type { ProfileReport } from "@/types/api";

/** Logo block: profile photo + name linking home (appeared three times in the header). */
const UserProfileBrand = ({
  listOfdata,
}: {
  listOfdata: ProfileReport | null;
}) => (
  <Link
    prefetch={true}
    href={"/"}
    className="flex justify-center items-center gap-[1.2rem] "
  >
    <Image
      src={listOfdata?.profile_photo_1}
      height={48}
      width={48}
      alt="Profile Picture"
      className="rounded-[50%]"
    />

    <div className="text-heading text-[1.6rem] font-normal leading-tight break-all capitalize">
      {listOfdata?.name}
    </div>
  </Link>
);

export default UserProfileBrand;
