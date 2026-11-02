import Link from "next/link";
import React from "react";
import { Clock, CheckCircle, Star } from "lucide-react";
import UpworkIdentity from "./UpworkIdentity";

function UpworkActivitySection({ urlInfo, cvTrue, data }) {

  console.log("Upwork Profile Pic:", data?.profile_photo_1,)

  const upworkActivityList = [
    {
      id: 1,
      icon: Clock,
      title: "7000+ Hours Tracked ",
      content:
        "Over 7000+ hours logged, extensive experience in delivering exceptional web development projects drive results.",
      highlight: "extensive experience",
    },
    {
      id: 2,
      icon: CheckCircle,
      title: "70+ Projects Completed",
      content:
        "Successfully completed over 70+ web development projects, proven track record of building innovative websites.",
      highlight: "completed over 35 web",
    },
    {
      id: 3,
      icon: Star,
      title: "Rated 5 Stars by Clients",
      content:
        "Rated 5 stars for exceeding expectations with high quality web development services.",
      highlight: "exceeding expectations",
    },
  ];



  return (
    <section
      className={`${urlInfo?.domain === "findusman.me" ? "w-full " : "hidden"
        } ${cvTrue ? "py-0 border rounded-2xl" : "py-10"} bg-surface `}
    >
      <div className={`${cvTrue ? "p-[2rem] lg:p-[3rem] pt-20 " : "mainContainer lg:mt-20 "}`}>
        {/* Main Grid Layout */}
        <div className="">

          {/* LEFT COLUMN - Profile Card */}
          <div className=" py-8 lg:pr-8 ">
            {/* Profile Header */}

            <UpworkIdentity data={data} cvTrue={cvTrue} />
            <div className="flex justify-center flex-col items-center ">
              <h2
                className={`lg:text-[4rem] text-[3rem]  mt-14 font-medium mb-[1rem] text-center`}
              >
                My{" "}
                <Link
                  href={data?.upwork ?? "#"}
                  target="_blank"
                  className="text-primary"
                >
                  Upwork
                </Link>{" "}
                Activities
              </h2>
              <p className="text-[1.8rem] lg:text-[2.5rem] w-full lg:w-2/3 text-center text-gray-600 dark:text-paragraph1">Proven performance, consistent delivery, and client satisfaction across long-term projects.</p>
            </div>

            <div className="flex flex-wrap gap-8">
              {upworkActivityList.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className="md:flex-1 flex gap-4 p-10 bg-surface rounded-3xl  min-w-[220px] mt-14 shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                  >
                    <div className="">

                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="flex gap-4 ">
                        <div className={`${cvTrue ? "w-16 h-16" : "w-16 h-14  md:w-12 md:h-12  lg:w-20 lg:h-20"} rounded-full bg-primary flex items-center justify-center`}>
                          <IconComponent className=" w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-onPrimary" />
                        </div>
                        <p
                          className={`${cvTrue ? "text-[2.4rem]" : "text-[2.4rem] lg:text-[2.8rem]"} font-semibold w-full lg:w-[200px]`}
                        >
                          {item.title}
                        </p>
                      </div>
                      <p className={`text-heading ${cvTrue ? "text-[1.8rem]" : "text-[1.8rem] lg:text-[2.2rem]"}`}>
                        {item.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}

            {/* Financial Activities */}
          </div>

          {/* RIGHT COLUMN - Activities */}
          <div
          // className="space-y-6"
          >
            {/* Upwork Logo */}

            {/* Activities Heading */}

            {/* Activity Items */}
            <div className="space-y-6">

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default UpworkActivitySection;
