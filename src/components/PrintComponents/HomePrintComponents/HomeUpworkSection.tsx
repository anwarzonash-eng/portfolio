import React from "react";
import NoteDomainForPint from "@/components/NoteDomainForPint";
import Link from "next/link";
import UpwrokIdentityPrint from "./UpwrokIdentityPrint";
import { Clock, CheckCircle, Star, TrendingUp, MapPin, Crown } from "lucide-react";

const HomeUpworkSection = ({ listOfdata, urlInfo, hideLinks }: any) => {
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

  const upworkFinancialActivityList = [
    {
      id: 1,
      title: "Hourly rate",
      content: "$10.00 - $30.00",
    },

    {
      id: 2,
      title: "Total earned",
      content: "$200K+",
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "Total hours completed on Upwork",
      content: "10,000+",
    },
    {
      id: 4,
      title: "Total jobs on Upwork",
      content: "70+",
    },
    {
      id: 5,
      title: "Upwork Member since",
      content: "Jan 31, 2022",
    },
  ];
  return (
    <section className={`h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] mt-20 print:mt-0 relative bg-white`}>
      {/* Note and Domain For Each Page */}
      {hideLinks ? null :
        <NoteDomainForPint direction={"hidden print:right-0 print:block"} />
      }
      <div className="max-w-[1550px] w-full mx-auto flex items-center justify-center gap-[2rem]">
        <div
          className={`${urlInfo?.domain === "findusman.me"
            ? "w-full  py-10 px-[4rem]"
            : "hidden"
            }`}
        >
          {/* Top Content */}
          <div className="flex items-center justify-between w-full gap-5 mb-[2rem]">
            {/* Upwork Identity */}
            <UpwrokIdentityPrint data={listOfdata} hideLinks={hideLinks} />
            {/* {hideLinks ?
              <div
                className="py-2 inline-block"
              >
                <img src="/images/up-logo.png" alt="Upwork Logo" className="mix-blend-darken " />
              </div>
              :
              <Link
                href={listOfdata?.upwork ?? "#"}
                target="_blank"
                className="py-2 inline-block"
              >
                <img src="/images/up-logo.png" alt="Upwork Logo" className="mix-blend-darken " />
              </Link>
            } */}
          </div>

          {/* Bottom Content */}
          <div className="px-4">
            <div className="flex justify-center flex-col items-center">
              <h2 className={`lg:text-[4rem] text-[3rem] mt-14 font-medium mb-[1rem] text-center`}>
                My{" "}
                {hideLinks ? (
                  <span className="text-primary">Upwork</span>
                ) : (
                  <Link
                    href={listOfdata?.upwork ?? "#"}
                    target="_blank"
                    className="text-primary"
                  >
                    Upwork
                  </Link>
                )}{" "}
                Activities
              </h2>
              <p className="text-[1.8rem] lg:text-[2.5rem] w-full lg:w-2/3 text-center text-gray-600">
                Proven performance, consistent delivery, and client satisfaction across long-term projects.
              </p>
            </div>

            <div className="flex flex-wrap gap-8">
              {upworkActivityList.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className="md:flex-1 flex gap-4 p-10 bg-white rounded-3xl min-w-[220px] mt-14 shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                  >
                    <div className="flex flex-col gap-6">
                      <div className="flex gap-4">
                        <div className="w-14 h-12 rounded-full bg-primary flex items-center justify-center">
                          <IconComponent className="w-7 h-7  text-white" />
                        </div>
                        <p className="text-[2.4rem] lg:text-[2.8rem] font-semibold w-full ">
                          {item.title}
                        </p>
                      </div>
                      <p className="text-heading text-[1.8rem] lg:text-[2.2rem]">
                        {item.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeUpworkSection;
