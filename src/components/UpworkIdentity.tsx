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
  Header?: boolean;
  cvTrue?: boolean;
}

const UpworkIdentity: React.FC<UpworkIdentityProps> = ({
  data = {
    upwork: "#",
    name: "John D.",
    location: "London, United Kingdom",
    profile_photo_1: "https://via.placeholder.com/80", // Fallback image
  },
  columnFormat = false,
  Header = false,
  cvTrue = false,
}) => {
  const profileImageSrc =
    data?.profile_photo_1 || "https://via.placeholder.com/80";
  return (
    <div className={`bg-surface flex lg:justify-between items-center rounded-[1.8rem] shadow-[0_0_10px_rgba(0,0,0,0.2)] p-[2rem] ${Header || cvTrue ? "w-[100%]" : "w-full md:w-4/5"} m-auto flex-wrap justify-center gap-10`}>


      <div className="flex  flex-col ">
        <div className="flex gap-[1rem]">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-[1.4rem] h-[1.4rem] border-white border-2 border-solid shadow-lg bg-green-500 rounded-full absolute top-[0.7rem] left-[-0.4rem]"></div>

            <Image
              src={profileImageSrc}
              alt="Profile"
              width={80}
              height={80}
              className=" lg:w-30 lg:h-30  rounded-full object-cover"
            />
          </div>

          {/* Name and Verified Badge */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <h1 className={`${Header ? "text-[1.8rem] lg-[2rem]" : "text-[2.5rem] lg:text-[3rem]"} font-bold text-gray-800 dark:text-heading`}>
                {data?.name}
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
              <div className="flex  flex-wrap  gap-1 space-x-2 text-gray-600 dark:text-paragraph1 mt-0 mb-[0.5rem] items-center">
                {/* Location Pin Icon */}
                <MapPin className="size-[1.7rem]" />
                <span className="text-[1.7rem] font-medium">
                  {data?.location}
                </span>
                {/* Available Now Badge */}
                <div className="flex  items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-[1.3rem] font-medium max-w-max">
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
            <div className={`rounded-full border-2 border-solid border-blue-500 ${Header ? "size-[2.5rem]" : "size-[3rem]"} flex items-center justify-center`}>
              <Crown className={`${Header ? "size-[1.5rem]" : "size-[2rem]"} text-blue-500`} />
            </div>
            <span className={`${Header ? "text-[1.5rem]" : "text-[1.8rem]"} font-medium`}>100% Job Success</span>
          </div>

          {/* Top Rated Plus */}
          <div className="flex items-center gap-[0.5rem] ">
            <Image
              height={30}
              width={30}
              src={"/images/topRatedBadge.png"}
              alt="Top Ratted Badge"
            />
            <span className={`${Header ? "text-[1.5rem]" : "text-[1.8rem]"} font-medium`}>Top Rated Plus</span>
          </div>
        </div>



      </div>



      {/* Check My Upwork Profile Section */}
      <div className={`flex items-center max-lg:justify-center gap-4 ${Header ? "m-auto" : ""}`}>
        <Link
          href={data?.upwork ?? "#"}
          target="_blank"
          className="bg-[#0F3C3C] text-white border border-transparent hover:border-primary hover:bg-surface hover:text-primary duration-300 text-nowrap flex items-center justify-center text-[1.8rem] rounded-[20rem] px-[2rem] py-[1.5rem] group"
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
              className="h-full w-full object-contain object-[revert-layer]  p-[0.5rem]
                             border-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <span>Profile</span>
        </Link>

      </div>
    </div>

  );
};

export default UpworkIdentity;
