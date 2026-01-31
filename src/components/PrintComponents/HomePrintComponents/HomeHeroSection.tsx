import DesignationDomain from "@/components/DesignationDomain";
import NoteDomainForPint from "@/components/NoteDomainForPint";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Skill {
  title: string;
  url?: string | null;
}

interface HomeHeroSectionProps {
  listOfdata: any;
  isOverflowing: boolean;
  scrollToSection: (key: string) => void;
  skillsContainerRef: React.RefObject<HTMLDivElement>;
  skills: Record<string, Skill[]>;   // 👈 FIX HERE
}

const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({
  listOfdata,
  isOverflowing,
  scrollToSection,
  skillsContainerRef,
  skills,
}) => {
  return (
    <div className="print:h-screen print:section bg-bannerBG !w-full overflow-hidden relative">
      {/* Note and Domain For Each Page */}
      <NoteDomainForPint direction={"hidden print:right-0 print:block"} />
      {/* Hero Section  */}
      <div className="max-w-[1550px] w-full mx-auto px-[4rem]">
        <div className="text-center mt-[3rem] print:mt-0 print:pt-[3rem]">
          <p className="text-heading text-[3.66rem] font-normal leading-normal mb-[1rem]">
            Hello! I’m
          </p>
          <h1 className="font-bold md:text-[8rem] lg:text-[12rem] text-primary mt-[-3.5rem]">
            {listOfdata?.name}
          </h1>
          {/* Badge */}
          <div className="relative z-[50] mt-[1rem] flex flex-col items-start">
            <div
              className="inline-block py-[1rem] px-[4rem] bg-primary
                             max-w-[45rem] rounded-[5rem] text-center text-[2.4rem] font-bold text-white border-none outline-none mb-[0.5rem]"
            >
              {listOfdata?.designation?.split("|").map((item, index) => (
                <div key={index} className="text-center">
                  {item.trim()}
                </div>
              ))}
            </div>
            <div className="ml-10">
              <DesignationDomain />
            </div>
          </div>
          <div className="mt-[-12rem] flex justify-center relative">
            {/* Center Dev Image */}
            <Image
              width={731}
              height={707}
              alt="Profile Photo"
              loading="eager"
              priority={true}
              src={listOfdata?.profile_photo_2.trim()}
              className="mr-[12rem]"
            />

            {/* Left Pricing and Hours Badge Positoned */}
            <div className="absolute left-0 top-[24rem] w-[33.5rem] h-[18rem] inline-flex items-center justify-center bg-Circle bg-no-repeat bg-contain animate-bounce">
              <div className="h-[100px] p-5 rounded  justify-center items-center gap-5 inline-flex">
                <div className="text-primary">
                  <h3 className="text-[4rem] font-medium leading-[4rem]">
                    ${listOfdata?.hourly_rate}
                  </h3>
                  <p className="text-[2rem] font-normal">{listOfdata?.salary_type === "per_day" ? "day" : "hour"}</p>
                </div>
                <hr className="h-[6rem] w-[0.1rem] bg-border" />
                <div className="text-primary">
                  <h3 className="text-[4rem] font-medium leading-[4rem]">
                    40hr
                  </h3>
                  <p className="text-[2rem] font-normal">week</p>
                </div>
              </div>
            </div>
            {/* Positioned Skills and Text Desktop */}
            <div className="max-w-[55rem] print:max-w-[42rem] w-full absolute right-[-4rem] print:right-[-2rem] top-[7rem]">
              <p
                dangerouslySetInnerHTML={{
                  __html: listOfdata?.tag_line,
                }}
                className="w-full text-primary text-[2.2rem] print:text-[1.8rem] font-medium leading-[3rem] mb-[2rem] text-left"
              ></p>

              {listOfdata &&
                listOfdata.skills_ids &&
                listOfdata.skills_ids.length > 0 && (
                  <div className="z-[50] absolute max-w-[49rem] w-full rounded-[0.6rem] border border-border border-solid overflow-hidden">
                    <div className="flex justify-between bg-primary border-b border-border w-full py-[1rem] px-[2rem]">
                      <div className="text-left text-white text-[1.8rem] font-medium">
                        My Skills
                      </div>
                      {isOverflowing && (
                        <button
                          onClick={() => scrollToSection("skills_ids")}
                          className="py-[3px] px-[1.6rem] text-center text-primary text-[1rem] font-medium bg-white rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn"
                        >
                          See More Skills
                        </button>
                      )}
                    </div>

                    <div
                      ref={skillsContainerRef}
                      className="w-full p-[1.5rem] bg-white/70 backdrop-blur-xl justify-start items-center gap-[0.6rem] flex flex-wrap overflow-y-auto hide-scrollbar"
                      style={{ maxHeight: "46.3rem" }}
                    >
                      {Object.values(skills)
                        .flat()
                        .slice(0, 15)
                        .map((skill, i) => {
                          return (
                            <>
                              {skill.url ? (
                                <Link
                                  href={skill.url || "#"}
                                  legacyBehavior
                                  key={i}
                                >
                                  <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      animationDelay: `${i * 0.1}s`,
                                    }}
                                    className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium px-[21px] py-[0.5rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
                                  >
                                    {skill?.title}
                                  </a>
                                </Link>
                              ) : (
                                <div
                                  key={i}
                                  style={{
                                    animationDelay: `${i * 0.1}s`,
                                  }}
                                  className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium px-[21px] py-[0.5rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group"
                                >
                                  {skill?.title}
                                </div>
                              )}
                            </>
                          );
                        })}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Shape Divider */}
      <div className="custom-shape-divider-bottom-1722849639 z-[10]">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          />
        </svg>
      </div>
    </div>
  );
};

export default HomeHeroSection;
