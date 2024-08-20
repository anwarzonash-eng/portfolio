"use client";

import React from "react";
import Image from "next/image";

const Newsletter: React.FC = () => {
  return (
    <section className="mainContainer">
      <div className="w-full bg-sectionBG bg-Newslatter bg-no-repeat bg-contain bg-right flex items-center flex-wrap-reverse gap-[2rem] md:gap-[4rem] justify-start sm:justify-center md:justify-between p-[2rem] rounded-[1rem] lg:px-[3rem] xl:px-[4rem] lg:py-[6rem]">
        {/* Text */}
        <div className="flex flex-col gap-[2rem] lg:gap-[3rem]">
          <h2 className="text-[2.4rem] lg:text-[3.4rem] font-medium leading-[3rem] lg:leading-[4.5rem] text-white">
            Subscribe to never miss important tech{" "}
            <br className="hidden md:block" /> world updates.
          </h2>
          <form className="max-w-[44.6rem] w-full bg-white/20 relative rounded-[0.6rem] overflow-hidden">
            <input
              type="email"
              placeholder="Enter Email"
              className="bg-transparent h-full w-full py-[1.6rem] md:py-[2.3rem] px-[1.8rem] text-[1.6rem] outline-none text-white placeholder:text-white"
            />
            <button
              type="submit"
              className="h-full px-[3.4rem] py-[1rem] font-medium text-[1.6rem] bg-white text-primary top-0 right-0 absolute"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Image */}
        <div className="">
          <Image
            src="/images/MailIcon.svg"
            width={179}
            height={144}
            className="max-w-[10rem] sm:max-w-[18rem]"
            alt="Newsletter Icon"
          />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
