"use client";
import UserProfileBrand from "./UserProfileBrand";
import HeaderCtaButtons from "./HeaderCtaButtons";
import type { ProfileReport } from "@/types/api";
import type { RoutesInfo } from "@/hooks/url";

interface PrintHeaderProps {
  listOfdata: ProfileReport | null;
  urlInfo: RoutesInfo | null;
  bgColor: string;
}

/** Print-only header bar (extracted verbatim from layouts/header). */
const PrintHeader = ({ listOfdata, urlInfo, bgColor }: PrintHeaderProps) => (
  <header className={`print:block hidden w-full ${bgColor}`}>
    {/* Header Navbar */}
    {/* Desktop Header */}
    <div className=" print:block !w-full bg-surface  h-[7.5rem] m-0 px-0 py-[2rem]  !flex !justify-between items-center !flex-row ">
      {/* User Profile */}
      <UserProfileBrand listOfdata={listOfdata} />
      {/* NavLinks and Buttons */}
      <div className="flex justify-center items-center">
        {/* Buttons */}
        <HeaderCtaButtons listOfdata={listOfdata} urlInfo={urlInfo} />
      </div>
    </div>
  </header>
);

export default PrintHeader;
