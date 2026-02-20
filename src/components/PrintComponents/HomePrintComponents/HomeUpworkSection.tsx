import React from "react";
import NoteDomainForPint from "@/components/NoteDomainForPint";
import Link from "next/link";
import UpwrokIdentityPrint from "./UpwrokIdentityPrint";
import { Clock, CheckCircle, Star, TrendingUp, MapPin, Crown } from "lucide-react";

const HomeUpworkSection = ({ listOfdata, urlInfo, hideLinks }) => {
  const upworkActivityList = [
    {
      id: 1,
      icon: Clock,
      title: "10000+ Hour Tracked for Clients",
      content:
        "Over 2500 hours logged, extensive experience in delivering exceptional web development projects drive results.",
      highlight: "extensive experience",
    },
    {
      id: 2,
      icon: CheckCircle,
      title: "70+ Project Completed",
      content:
        "Successfully completed over 35 web development projects, proven track record of building innovative websites.",
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
    <section className={`h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] mt-20 print:mt-0 relative bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50`}>
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
            {hideLinks ?
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
            }
          </div>

          {/* Bottom Content */}
          <div className="px-4 grid grid-cols-2 w-full gap-x-[8rem]">
            {/*Financial Activity Column */}
            <div>
              <h2 className={`text-[3rem] font-bold mb-[1rem]`}>
                My{" "}
                <Link
                  href={listOfdata?.upwork ?? "#"}
                  target="_blank"
                  className="text-primary"
                >
                  Upwork
                </Link>{" "}
                Finanancial Activities
              </h2>
              <div className="space-y-4">
                {upworkFinancialActivityList.map((item) => (
                  <div key={item.id}>
                    <p className="text-heading text-[1.8rem]">{item.title}</p>
                    <p className="text-[2.4rem] font-semibold">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upwork Activity Column */}
            <div>
              <h2 className={`text-[3rem] font-bold mb-[1rem]`}>
                My{" "}
                <Link
                  href={listOfdata?.upwork ?? "#"}
                  target="_blank"
                  className="text-primary"
                >
                  Upwork
                </Link>{" "}
                Activities
              </h2>
              <ul className="space-y-4">
                {upworkActivityList.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <li className="flex" key={item.id}>
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 rounded-full bg-[#00473c] flex items-center justify-center mt-2">
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <div>
                        <p
                          className="text-[1.6rem] lg:text-[2.4rem] 
                     font-semibold"
                        >
                          {item.title}
                        </p>
                        <p className="text-heading text-[1.4rem] lg:text-[1.5rem]">
                          {item.content}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeUpworkSection;
