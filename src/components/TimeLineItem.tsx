import React from "react";
import Image from "next/image";
import Link from "next/link";

const TimeLineItem = () => {
  return (
    <>
      {/* TimeLineItem */}
      <div className="relative flex items-start">
        {/* Dot */}
        <div className="absolute top-0 left-[2rem] hidden lg:block">
          <div className="w-[2.6rem] h-[2.6rem] bg-white rounded-full flex items-center shadow-md justify-center">
            <div className="w-[0.7rem] h-[0.7rem] bg-heading rounded-full"></div>
          </div>
        </div>
        {/* Card */}
        <div className="bg-white p-[1.5rem] lg:p-[2.4rem] rounded-[1rem] shadow lg:ml-[6rem]">
          <div className="flex items-center justify-between flex-wrap text-nowrap max-[375px]:justify-center">
            {/* About Content */}
            <div className="flex gap-[1rem]">
              <div className="h-[4.2rem] w-[4.2rem] lg:h-[4.9rem] lg:w-[4.9rem] bg-[#D1E9FF] rounded-[0.4rem] flex items-center justify-center">
                <Image
                  src={"./images/Logomark.svg"}
                  height={32}
                  width={32}
                  alt="Logo Mark"
                />
              </div>
              <div>
                <p className="text-[1.4rem] lg:text-[1.6rem] font-normal text-paragraph1">
                  Cypexsoft
                </p>
                <h3 className="text-[1.6rem] lg:text-[1.8rem] font-medium text-heading">
                  UI Developer
                </h3>
              </div>
            </div>
            {/* Link */}
            <div className="flex items-center gap-[0.52rem]">
              <Image
                src={"./images/link.svg"}
                height={18}
                width={18}
                alt="Link"
              />
              <Link
                href={"https://cpasxsoft.com"}
                className="text-[#1F4FE1] text-[1.6rem] leading-normal"
              >
                cpasxsoft.com
              </Link>
            </div>
          </div>
          <p className="mt-[2rem] text-[1.6rem] font-medium text-paragraph1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper
            ullamcorper quis. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Ullamcorper ullamcorper quis.
          </p>
          <ul className="my-[2rem] text-paragraph1 text-[1.4rem] list-disc pl-[2rem] flex flex-col gap-[0.8rem]">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Ullamcorper ullamcorper quis.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Ullamcorper ullamcorper quis.</li>
          </ul>
          <div className="w-full">
            <h4 className="text-paragraph1 text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
              AREAS OF EXPERTISE I'VE WORKED IN
            </h4>
            <div className="flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]">
              <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                AWS
              </div>
              <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                React
              </div>
              <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                jQuery
              </div>
              <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                Bootstrap 5
              </div>
              <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                HTML
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeLineItem;
