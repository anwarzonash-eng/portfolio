import React from "react";
import Image from "next/image";
import { formatDate } from "@/hooks/formatdate";
import { Phone, AtSign, MapPin, GithubIcon, Link } from "lucide-react";
import { useAppSelector } from "@/store";

type CV2HeaderProps = {
  listOfdata: any;
  hideLinks?: boolean;
};

const CV2Header: React.FC<CV2HeaderProps> = ({ listOfdata, hideLinks }) => {
  const urlInfo = useAppSelector((state) => state.profile.profileUrlInfo);
  const headerInfo = [
    listOfdata?.phone_no && { key: "phone", icon: Phone, value: listOfdata.phone_no },
    listOfdata?.email && { key: "email", icon: AtSign, value: listOfdata.email },
    listOfdata?.location && { key: "location", icon: MapPin, value: listOfdata.location },
    listOfdata?.github && { key: "github", icon: GithubIcon, value: listOfdata.github },
    // listOfdata?.linkedIn && { key: "linkedin", icon: Link, value: listOfdata.linkedIn },
  ].filter(Boolean) as { key: string; icon: any; value: string }[];

  const visibleHeaderInfo = urlInfo?.u ? headerInfo.filter(h => h.key === "location" || h.key === "github") : headerInfo;
  return (
    <header className="flex items-start justify-between gap-[2rem]">
      <div className="flex-1">
        <h1 className="cv2Heading">{listOfdata?.name}</h1>
        <p className="cv2Designation mt-[1rem]">{listOfdata?.designation}</p>
        <div>
          <div className="mt-[1rem] flex flex-wrap gap-x-[1.6rem] gap-y-[0.6rem] text-[1.2rem] text-[#374151]">
            {visibleHeaderInfo.map((info, index) => {
              const IconComponent = info.icon;
              const value = info.value;
              return (
                <span
                  key={index}
                  className="inline-flex items-center gap-[0.5rem]"
                >
                  <IconComponent className="size-[1.2rem] text-primary" />
                  <span className="text-[1.2rem]">{value}</span>
                </span>
              );
            })}
          </div>
          {/* Availability */}
          {/* <div className="mt-[2rem]">
            <p className="CVLatestHeading">NEXT AVAILABLE</p>
            <h4 className="text-[1.6rem] font-medium text-primary leading-normal">
              {formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h4>
          </div> */}
        </div>
      </div>
      {/* BG Picture */}
      <div className="flex-shrink-0">
        <div className="h-[14rem] w-[14rem] rounded-full overflow-hidden">
          <Image
            src={listOfdata?.profile_photo_1}
            height={140}
            width={140}
            alt="Profile Picture"
            className="h-full w-full bg-cover bg-no-repeat bg-center"
          />
        </div>
      </div>
    </header>
  );
};

export default CV2Header;
