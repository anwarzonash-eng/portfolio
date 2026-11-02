import React from "react";
import Image from "next/image";
import { Phone, AtSign, MapPin, GithubIcon, Link } from "lucide-react";
import { useAppSelector } from "@/store";
import type { ProfileReport } from "@/types/api";

type CV3HeaderProps = {
    listOfdata: ProfileReport | null;
    hideLinks?: boolean;
};

const CV3HeaderP: React.FC<CV3HeaderProps> = ({ listOfdata }) => {
    const urlInfo = useAppSelector((state) => state.profile.profileUrlInfo);
    const headerInfo = [
        listOfdata?.phone_no && { key: "phone", icon: Phone, value: listOfdata.phone_no },
        listOfdata?.email && { key: "email", icon: AtSign, value: listOfdata.email },
        listOfdata?.location && { key: "location", icon: MapPin, value: listOfdata.location },
        listOfdata?.github && { key: "github", icon: GithubIcon, value: listOfdata.github },
        listOfdata?.linkedIn && { key: "linkedin", icon: Link, value: listOfdata.linkedIn },
    ].filter(Boolean) as { key: string; icon: React.ComponentType<{ size?: number | string; className?: string }>; value: string }[];

    const visibleHeaderInfo = urlInfo?.u ? headerInfo.filter(h => h.key === "location" || h.key === "github") : headerInfo;

    return (
        <header className="flex items-start justify-between gap-[1rem]">
            <div className="flex-1">
                <h2 className="text-[38px] font-bold text-black">
                    {listOfdata?.name}
                </h2>
                <p className="mt-1 text-[19px] text-[#1e90ff] font-semibold">
                    {listOfdata?.designation}
                </p>
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
                                    <IconComponent className="size-[1.5rem] text-[#1e90ff] font-medium" />
                                    <span className="text-[14px] font-medium">{value}</span>
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* Profile Picture */}
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

export default CV3HeaderP;