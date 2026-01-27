import React from "react";
import Image from "next/image";
import { formatDate } from "@/hooks/formatdate";

type CVLatestHeaderProps = {
  name: string;
  designation: string;
  headerInfo: { icon: any; value: string }[];
  listOfdata: any;
};

const CVLatestHeader = ({
  name,
  designation,
  headerInfo,
  listOfdata,
}: CVLatestHeaderProps) => {
  return (
    <header className="flex items-start justify-between gap-[2rem] border-b border-[#E5E7EB] pb-[2rem]">
      <div className="flex-1">
        <h1 className="text-[3rem] font-semibold leading-tight text-heading">
          {name}
        </h1>
        <p className="text-[1.8rem] text-primary font-medium mt-[0.4rem]">
          {designation}
        </p>
        <div>
          <div className="mt-[1rem] flex flex-wrap gap-x-[1.6rem] gap-y-[0.6rem] text-[1.2rem] text-[#374151]">
            {headerInfo.map((info, index) => {
              const IconComponent = info.icon;
              const value = info.value;
              return (
                <span
                  key={index}
                  className="inline-flex items-center gap-[0.5rem]"
                >
                  <IconComponent className="size-[1.6rem] text-primary" />
                  <span className="text-[1.6rem]">{value}</span>
                </span>
              );
            })}
          </div>
          {/* Availability */}
          <div className="mt-[2rem]">
            <p className="CVLatestHeading">
              NEXT AVAILABLE
            </p>
            <h4 className="text-[1.6rem] font-medium text-primary leading-normal">
              {formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h4>
          </div>
        </div>
      </div>
      {/* BG Picture */}
      <div className="flex-shrink-0">
        <div className="h-[16rem] w-[16rem] rounded-full overflow-hidden">
          <Image
            src={listOfdata?.profile_photo_1}
            height={200}
            width={200}
            alt="Profile Picture"
            className="h-full w-full bg-cover bg-no-repeat bg-center"
          />
        </div>
      </div>
    </header>
  );
};

export default CVLatestHeader;
