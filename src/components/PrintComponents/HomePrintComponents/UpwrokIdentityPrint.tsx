import { Crown, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BlueTick from "@/components/SVGI-Icons/BlueTick";

interface UpwrokIdentityPrintProps {
  data?: {
    upwork?: string;
    name?: string;
    location?: string;
    profile_photo_1?: string;
  };
  hideLinks?: boolean;
}

const UpwrokIdentityPrint: React.FC<UpwrokIdentityPrintProps> = ({
  data = {
    upwork: "#",
    name: "John D.",
    location: "London, United Kingdom",
    profile_photo_1: "https://via.placeholder.com/80", // Fallback image
  },
  hideLinks,
}) => {
  const profileImageSrc =
    data.profile_photo_1 || "https://via.placeholder.com/80";
  return (
    <div className={`bg-white flex lg:justify-between items-center rounded-[1.8rem] shadow-[0_0_10px_rgba(0,0,0,0.2)] p-[2rem] ${hideLinks ? 'w-auto' : 'w-full md:w-4/5'} m-auto flex-wrap justify-center gap-10`}>
      <div className="flex flex-col">
        <div className="flex gap-[1rem]">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-[1.4rem] h-[1.4rem] border-white border-2 border-solid shadow-lg bg-green-500 rounded-full absolute top-[0.7rem] left-[-0.4rem]"></div>

            <Image
              src={profileImageSrc}
              alt="Profile"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>

          {/* Name and Verified Badge */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <h1 className="text-[2rem] font-bold text-gray-800">
                {data.name}
              </h1>
              <BlueTick className="size-[2rem] text-blue-600" />
            </div>

            {/* Location */}
            <div>
              <div className="flex flex-wrap gap-1 space-x-2 text-gray-600 mt-0 mb-[0.5rem] items-center">
                {/* Location Pin Icon */}
                <MapPin className="size-[1.7rem]" />
                <span className="text-[1.5rem] font-medium">
                  {data.location}
                </span>
                {/* Available Now Badge */}
                <div className="flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-[1.3rem] font-medium max-w-max">
                  <svg
                    className="w-6 h-6 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>Available now</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-3">
          {/* 100% Job Success */}
          <div className="flex items-center gap-[0.5rem] my-[1rem]">
            <div className="rounded-full border-2 border-solid border-blue-500 size-[2.5rem] flex items-center justify-center">
              <Crown className="size-[1.8rem] text-blue-500" />
            </div>
            <span className="font-medium text-[1.4rem]">100% Job Success</span>
          </div>

          {/* Top Rated Plus */}
          <div className="flex items-center gap-[0.5rem]">
            <Image
              height={30}
              width={30}
              src={"/images/topRatedBadge.png"}
              alt="Top Rated Badge"
              className="size-[2.5rem] print:mt-4"
            />
            <span className="font-medium text-[1.4rem]">Top Rated Plus</span>
          </div>
        </div>
      </div>

      {/* Check My Upwork Profile Section */}
      {hideLinks ? null : (
        <div className="flex items-center max-lg:justify-center gap-4">
          <Link
            href={data.upwork ?? "#"}
            target="_blank"
            className="bg-[#0F3C3C] text-white border border-transparent hover:border-primary hover:bg-white hover:text-primary duration-300 text-nowrap flex items-center justify-center text-[1.8rem] rounded-[20rem] px-[2rem] py-[1.5rem] group"
          >
            <span>Check My</span>
            <div className="h-[3.5rem] w-[10rem] relative mx-2 inline-block overflow-hidden rounded-[10rem] px-2 bg-white">
              <Image
                src="/images/upworkText.svg"
                alt="Upwork Logo"
                width={100}
                height={35}
                loading="eager"
                priority={true}
                className="h-full w-full object-contain object-[revert-layer] p-[0.5rem]
                                      border-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <span>Profile</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpwrokIdentityPrint;
