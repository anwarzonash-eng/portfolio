import React from "react";
import Image from "next/image";
import { Phone, AtSign, MapPin, GithubIcon, Link, Mail } from "lucide-react";
import { socialLinks } from "@/data/JsonData";
import CV2ClickableLinkedinGihubLinks from "./CV2ClickableLinkedinGihubLinks";

type CV2HeaderProps = {
  listOfdata: any;
  urlInfo: any;
};

const CV2Header: React.FC<CV2HeaderProps> = ({ listOfdata, urlInfo }) => {
  const headerInfo = [
    listOfdata?.phone_no && { icon: Phone, value: listOfdata.phone_no },
    listOfdata?.email && { icon: Mail, value: listOfdata.email },
    listOfdata?.location && { icon: MapPin, value: listOfdata.location },
  ];
  return (
    <header className="flex items-start justify-between gap-[2rem]">
      <div className="flex-1">
        <h1 className="cv2Heading">{listOfdata?.name}</h1>
        <p className="cv2Designation mt-[1rem]">{listOfdata?.designation}</p>
        <div>
          <div className="mt-[1rem] flex flex-wrap gap-x-[1.6rem] gap-y-[0.6rem] text-[1.2rem] text-[#374151]">
            {headerInfo.map((info, index) => {
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
            <CV2ClickableLinkedinGihubLinks
              listOfdata={listOfdata}
              socialLinks={socialLinks}
            />
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
