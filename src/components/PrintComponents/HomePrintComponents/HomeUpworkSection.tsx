import React from "react";
import NoteDomainForPint from "@/components/NoteDomainForPint";
import Link from "next/link";
import UpwrokIdentityPrint from "./UpwrokIdentityPrint";

const HomeUpworkSection = ({ listOfdata, urlInfo }) => {
  const upworkActivityList = [
    {
      id: 1,
      title: "10000+ Hour Tracked for clients",
      content:
        "With over 2500 hours logged, I bring extensive experience in delivering exceptional web development projects that drive results.",
    },
    {
      id: 2,
      title: "70+ Project Completed",
      content:
        "Having successfully completed over 35 web development projects, I have a proven track record of building innovative and user-focused websites.",
    },
    {
      id: 3,
      title: "Rated 5 stars by Clients",
      content:
        "Rated 5 stars by my clients, I pride ourselves on exceeding expectations with high-quality web development services. Your satisfaction drives my commitment to excellence.",
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
    <section className="h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] mt-20 print:mt-0 relative bg-white">
      {/* Note and Domain For Each Page */}
      <NoteDomainForPint direction={"hidden print:right-0 print:block"} />
      <div className="max-w-[1550px] w-full mx-auto flex items-center justify-center gap-[2rem]">
        <div
          className={`${
            urlInfo?.domain === "findusman.me"
              ? "w-full  py-10 px-[4rem]"
              : "hidden"
          }`}
        >
          {/* Top Content */}
          <div className="flex items-center justify-between w-full gap-5 mb-[2rem]">
            {/* Upwork Identity */}
            <UpwrokIdentityPrint data={listOfdata} />
            <Link
              href={listOfdata?.upwork ?? "#"}
              target="_blank"
              className="py-2 inline-block"
            >
              <img src="/images/up-logo.png" alt="Upwork Logo" />
            </Link>
          </div>

          {/* Bottom Content */}
          <div className="px-4 grid grid-cols-2 w-full gap-8">
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
                {upworkActivityList.map((item) => (
                  <li className="flex" key={item.id}>
                    <span className="upworkSectionDot"></span>
                    <div>
                      <p className="text-[2.4rem] font-semibold">
                        {item.title}
                      </p>
                      <p className="text-heading text-[1.5rem]">
                        {item.content}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeUpworkSection;
