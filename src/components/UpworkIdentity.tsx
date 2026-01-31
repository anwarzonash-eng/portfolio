import { Crown, MapPin, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BlueTick from "./SVGI-Icons/BlueTick";

interface UpworkIdentityProps {
  data?: {
    upwork?: string;
    name?: string;
    location?: string;
    profile_photo_1?: string;
  };
  columnFormat?: boolean;
}

const UpworkIdentity: React.FC<UpworkIdentityProps> = ({
  data = {
    upwork: "#",
    name: "John D.",
    location: "Manchester, United Kingdom",
    profile_photo_1: "https://via.placeholder.com/80", // Fallback image
  },
  columnFormat = false,
}) => {
  const profileImageSrc =
    data.profile_photo_1 || "https://via.placeholder.com/80";
  return (
    <div className="bg-white rounded-[1rem] shadow-md p-[2rem]">
      <div className="flex items-center">
        <div className="flex gap-[1rem]">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-[1.4rem] h-[1.4rem] border-white border-2 border-solid shadow-lg bg-green-500 rounded-full absolute top-[0.5rem] left-[-0.5rem]"></div>

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
              {/* Blue Verified Checkmark */}
              {/* <Image
                src="/images/blueTickIcon.png"
                height={20}
                width={20}
                alt="Verfied Blue Tick Icon"
              /> */}
              <BlueTick className="size-[2rem] text-blue-600" />
            </div>

            {/* Location */}
            <div>
              <div className="flex items-center space-x-2 text-gray-600 mt-[-0.5rem] mb-[0.5rem]">
                {/* Location Pin Icon */}
                <MapPin className="size-[1.6rem]" />
                <span className="text-[1.4rem] font-medium">
                  {data.location}
                </span>
              </div>
              {/* Available Now Badge */}
              <div className="flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium max-w-max">
                <svg
                  className="w-4 h-4 mr-1"
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
      <div
        className={`grid ${columnFormat ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"} gap-[1rem]`}
      >
        {/* Badges */}
        <div className="">
          {/* 100% Job Success */}
          <div className="flex items-center gap-[0.5rem] my-[1rem]">
            <div className="rounded-full border-2 border-solid border-blue-500 size-[3rem] flex items-center justify-center">
              <Crown className="size-[2rem] text-blue-500" />
            </div>
            <span className="font-medium text-[1.4rem]">100% Job Success</span>
          </div>

          {/* Top Rated Plus */}
          <div className="flex items-center gap-[0.5rem] ">
            <Image
              height={30}
              width={30}
              src={"/images/topRatedBadge.png"}
              alt="Top Ratted Badge"
            />
            <span className="font-medium text-[1.4rem]">Top Rated Plus</span>
          </div>
        </div>

        {/* Check My Upwork Profile Section */}
        <div className="flex items-center max-lg:justify-center gap-4 mt-6">
          <Link
            href={data.upwork ?? "#"}
            target="_blank"
            className="bg-black text-white border border-transparent hover:border-primary hover:bg-white hover:text-primary duration-300 text-nowrap flex items-center justify-center text-[1.6rem] rounded-[20rem] px-[2rem] py-[1rem] group"
          >
            <span>Check My</span>
            {/* <div className="h-[3rem] w-[3rem] rounded-full relative mx-2 inline-block">
              <Image
                src="/images/upwork.svg"
                alt="Upwork Logo"
                width={30}
                height={30}
                className="h-full w-full object-cover rounded-full group-hover:border-primary border border-transparent duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div> */}
            <div className="h-[3.5rem] w-[10rem] relative mx-2 inline-block overflow-hidden rounded-[10rem] px-2 bg-white">
              <Image
                src="/images/upworkText.svg"
                alt="Upwork Logo"
                width={100}
                height={35}
                loading="eager"
                priority={true}
                className="h-full w-full object-contain object-center p-[0.5rem]
                             border-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <span>Profile</span>
          </Link>

          {/* <Link
            href={data.upwork ?? "#"}
            target="_blank"
            className="h-[4rem] w-[4rem] rounded-full relative bg-sectionBG text-white flex items-center justify-center animate-bounce cursor-pointer hover:bg-white hover:text-primary border border-transparent hover:border-primary duration-300"
          >
            <MoveUpRight className="w-8 h-8" />
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default UpworkIdentity;
