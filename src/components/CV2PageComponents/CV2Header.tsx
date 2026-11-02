import React from "react";
import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";
import { socialLinks } from "@/data/JsonData";
import CV2ClickableLinkedinGihubLinks from "./CV2ClickableLinkedinGihubLinks";
import { useAppSelector } from "@/store";
import type { ProfileReport } from "@/types/api";
import type { RoutesInfo } from "@/hooks/url";

type CV2HeaderProps = {
  listOfdata: ProfileReport | null;
  urlInfo: RoutesInfo | null;
};

const CV2Header: React.FC<CV2HeaderProps> = ({ listOfdata }) => {
  const url = useAppSelector((state) => state.profile.profileUrlInfo);

  const headerInfo = [
    listOfdata?.phone_no && { key: "phone", icon: Phone, value: listOfdata.phone_no },
    listOfdata?.email && { key: "email", icon: Mail, value: listOfdata.email },
    listOfdata?.location && { key: "location", icon: MapPin, value: listOfdata.location },
  ].filter(Boolean) as { key: string; icon: React.ComponentType<{ size?: number | string; className?: string }>; value: string }[];

  const visibleHeaderInfo = url?.u ? headerInfo.filter((h) => h.key === "location") : headerInfo;
  return (
    <header className="flex items-start justify-between gap-[2rem]">
      <div className="flex-1">
        <h1 className="cv2Heading">{listOfdata?.name}</h1>
        <p className="cv2Designation mt-[1rem]">{listOfdata?.designation}</p>
        <div>
          <div className="mt-[1rem] flex flex-wrap gap-x-[1.6rem] gap-y-[0.6rem] text-[1.2rem] text-[#374151]">
            {visibleHeaderInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <span
                  key={index}
                  className="inline-flex items-center gap-[0.5rem]"
                >
                  <IconComponent className="size-[1.2rem] text-primary" />
                  <span className="text-[1.2rem]">{info.value}</span>
                </span>
              );
            })}
            {!url?.u && (
              <CV2ClickableLinkedinGihubLinks
                listOfdata={listOfdata}
                socialLinks={socialLinks}
              />
            )}
          </div>
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
