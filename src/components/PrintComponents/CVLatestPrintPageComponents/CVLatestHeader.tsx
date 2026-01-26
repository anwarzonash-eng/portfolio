import React from "react";
import Image from "next/image";
import { formatDate } from "@/hooks/formatdate";

type CVLatestHeaderProps = {
  name: string;
  designation: string;
  headerInfo: { icon: any; value: string }[];
  listOfdata: any;
};

const CVLatestHeader = ({ name, designation, headerInfo, listOfdata }: CVLatestHeaderProps) => {
  return (
    <header className="flex items-start justify-between gap-[2rem] border-b border-[#E5E7EB] pb-[2rem]">
      <div className="flex-1">
        <h1 className="text-[2.8rem] font-semibold leading-tight text-heading">
          {name}
        </h1>
        <p className="text-[1.5rem] text-primary font-medium mt-[0.4rem]">
          {designation}
        </p>
        <div className="mt-[1rem] flex flex-wrap gap-x-[1.6rem] gap-y-[0.6rem] text-[1.2rem] text-[#374151]">
          {headerInfo.map((info, index) => {
            const IconComponent = info.icon;
            const value = info.value;
            return (
              <span
                key={index}
                className="inline-flex items-center gap-[0.5rem]"
              >
                <IconComponent className="h-[1.4rem] w-[1.4rem] text-primary" />
                {value}
              </span>
            );
          })}
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
      {/* Availability */}
      <div className="text-center border border-solid border-[#E2E6EE] rounded-[0.6rem] overflow-hidden">
        <div className="bg-[#F7F9FC] p-[1.5rem]">
          <p className="text-[1.6rem] leading-normal font-normal text-heading">
            Next available
          </p>
          <h4 className="text-[2rem] font-medium text-primary leading-normal">
            {formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h4>
        </div>
      </div>
    </header>
  );
};

export default CVLatestHeader;
