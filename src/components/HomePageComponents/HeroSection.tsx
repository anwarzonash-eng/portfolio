import React from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  listOfdata: {
    name?: string;
    designation?: string;
    tag_line?: string;
    profile_photo_2?: string;
    hourly_rate?: number;
    skills_ids?: string[];
  };
  skills: Record<string, { title: string; url?: string }[]>;
  showAll: boolean;
  setShowAll: (value: boolean) => void;
  skillsContainerRef: React.RefObject<HTMLDivElement>;
  isOverflowing: boolean;
  scrollToSection: (section: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  listOfdata,
  skills,
  showAll,
  setShowAll,
  skillsContainerRef,
  isOverflowing,
  scrollToSection,
}) => {
  return (
    <div className="w-full overflow-hidden relative bg-bannerBG print:break-before-page print:h-screen print:m-0">
      {/* Hero Section For Mobile and Tablet Devices */}
      <div className="mainContainer relative xl:hidden print:hidden">
        {/* Hero Section Mobile Content */}
        <div className="text-center mt-[3rem]">
          <p className="text-heading text-[2rem] md:text-[3.66rem] font-normal">
            Hello! I’m
          </p>
          <div className="print:flex flex-col w-full print:mx-auto gap-8 items-center justify-center">
            <div className="mt-[1rem] font-bold text-[4rem] md:text-[8rem] lg:text-[12rem] text-primary gap-[1rem] relative inline-block">
              {listOfdata?.name}
            </div>
            {/* Badge */}
            <div className="flex items-center justify-center max-w-[88rem] mx-auto mb-[2rem]">
              <button className="px-[2rem] py-[1.5rem] lg:py-[2rem] lg:px-[4rem] bg-primary rounded-[5rem] text-center text-[1.6rem] lg:text-[3rem] font-semibold text-white border-none outline-none lg:mb-auto">
                {listOfdata?.designation?.split("|").map((item, index) => (
                  <div key={index} className="text-center">
                    {item.trim()}
                  </div>
                ))}
              </button>
            </div>
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: listOfdata?.tag_line,
            }}
            className="mb-[2rem] text-primary leading-[2rem] text-[1.6rem] text-center lg:hidden"
          ></p>
          {/* for small screen */}
          {listOfdata &&
            listOfdata.skills_ids &&
            listOfdata.skills_ids.length > 0 && (
              <div className="w-full p-[1.5rem] hidden justify-center items-center flex-col gap-[1rem]">
                <div className="w-full flex justify-center items-center gap-[0.6rem] flex-wrap">
                  {/* Normal view (shows limited skills) */}
                  {Object.values(skills)
                    .flat()
                    .slice(0, !showAll ? 10 : undefined)
                    .map((skill, i) => {
                      const groupIndex = Object.values(skills).findIndex(
                        (group) => group.includes(skill)
                      );
                      const skillNumber = `${groupIndex + 1}.${
                        skills[Object.keys(skills)[groupIndex]].indexOf(skill) +
                        1
                      }`;

                      return (
                        <Link
                          href={skill.url || "#"}
                          legacyBehavior
                          key={`${groupIndex}-${i}`}
                        >
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              animationDelay: `${i * 0.1}s`,
                            }}
                            className="hover:bg-primary capitalize hover:text-white text-center text-primary text-[1.3rem] font-medium px-[21px] py-[0.5rem] bg-white flex items-center justify-center gap-[8px] rounded-[5rem] shadow border border-[#757575] opacity-0 animate-fadeIn relative group print:opacity-100"
                          >
                            {skill?.title}
                          </a>
                        </Link>
                      );
                    })}
                </div>

                {/* Buttons hidden on print */}
                {!showAll && Object.values(skills).flat().length > 10 && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="mt-4 bg-primary text-white px-4 py-2 mb-[15px] rounded hover:bg-primary-dark transition-colors print:hidden"
                  >
                    Show More Skills
                  </button>
                )}

                {showAll && (
                  <button
                    onClick={() => setShowAll(false)}
                    className="mt-4 bg-primary text-white px-4 py-2 mb-[15px] rounded hover:bg-primary-dark transition-colors print:hidden"
                  >
                    Show Less
                  </button>
                )}
              </div>
            )}
        </div>
        {/* Hero Section Developer Image */}
        <div className="print:flex gap-3 print:w-full items-start justify-center">
          <div className="relative print:w-[50%] md:flex justify-center">
            <Image
              width={731}
              height={907}
              alt=""
              src={listOfdata?.profile_photo_2}
              className="print:h-[700px] print-w-[640px]"
            />
            {/* Positioned Elements Price */}
            <div className="flex gap-[0.35rem] text-nowrap text-primary text-[1.4rem] font-medium rounded-[3.5rem] py-[0.69rem] bg-white shadow-lg px-[1.2rem] absolute top-[25%] left-[98%] translate-x-[-90%] md:left-[80%] md:translate-x-[-80%] animate-pulse min-w-max">
              <Image
                src={"/images/clock.svg"}
                height={14}
                width={14}
                alt="Clock"
                className="h-[2rem] w-[2rem]"
              />
              <p>45 hr / Week</p>
            </div>

            {/* Positioned Elements Availability */}
            <div className="flex gap-[0.35rem] text-nowrap text-primary text-[2rem] font-medium rounded-[3.5rem] py-[0.69rem] bg-white shadow-lg max-w-max px-[0.9rem] pr-[1.4rem] absolute bottom-[25%] left-[10%] translate-x-[-15%] md:left-[20%] md:translate-x-[-20%] animate-pulse">
              <Image
                src={"/images/dollar-symbol.svg"}
                height={14}
                width={14}
                alt="Dollar Symbol"
                className="h-[auto] w-[auto]"
              />
              <p>${listOfdata?.hourly_rate} / hour</p>
            </div>
          </div>
          <div className="print:w-[50%] print:block hidden print:mt-[45px]">
            <p
              dangerouslySetInnerHTML={{
                __html: listOfdata?.tag_line,
              }}
              className="mb-[2rem] text-primary text-[2.6rem] leading-[40px] text-start"
            ></p>
            {listOfdata &&
              listOfdata.skills_ids &&
              listOfdata.skills_ids.length > 0 && (
                <div>
                  <div className="flex justify-between bg-primary border-b border-border w-full py-[1rem] px-[2rem]">
                    <div className="text-left text-white text-[1.8rem] font-medium">
                      My Skills
                    </div>
                  </div>

                  <div
                    ref={skillsContainerRef}
                    className="w-full p-[1.5rem] bg-white/70 backdrop-blur-xl justify-start items-center gap-[0.6rem] flex flex-wrap"
                    style={{ maxHeight: "46.3rem" }}
                  >
                    {Object?.values(skills)?.map((group, groupIndex) => (
                      <React.Fragment key={groupIndex}>
                        {group.map((skill, i) => {
                          const skillNumber = `${groupIndex + 1}.${i + 1}`;

                          return (
                            <Link
                              href={skill.url || "#"}
                              legacyBehavior
                              key={`${groupIndex}-${i}`}
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
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
      {/* Hero Section For Desktop */}
      <div className="mainContainer hidden xl:block print:hidden">
        <div className="text-center mt-[3rem]">
          <p className="text-heading text-[3.66rem] font-normal leading-normal mb-[1rem]">
            Hello! I’m
          </p>
          <h1 className="font-bold md:text-[8rem] lg:text-[12rem] text-primary mt-[-3.5rem]">
            {listOfdata?.name}
          </h1>
          {/* Badge */}
          <div className="relative z-[50] mt-[1rem] flex items-center justify-start">
            <div className="inline-block px-[2rem] py-[1.5rem] lg:py-[1rem] lg:px-[4rem] bg-primary lg:max-w-[45rem] rounded-[5rem] text-center text-[1.6rem] lg:text-[2.4rem] font-bold text-white border-none outline-none mb-[2rem]">
              {listOfdata?.designation?.split("|").map((item, index) => (
                <div key={index} className="text-center">
                  {item.trim()}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[-12rem] flex justify-center relative">
            {/* Center Dev Image */}
            <Image
              width={731}
              height={707}
              alt=""
              src={listOfdata?.profile_photo_2}
              className="mr-[12rem]"
            />

            {/* Left Pricing and Hours Badge Positioned */}
            <div className="absolute left-0 top-[24rem] w-[33.5rem] h-[18rem] inline-flex items-center justify-center bg-Circle bg-no-repeat bg-contain animate-bounce">
              <div className="h-[100px] rounded flex gap-4 flex-col w-full px-10 relative">
                {/* Hourly Rate */}
                <div className="flex items-center gap-[0.35rem] text-nowrap text-primary text-[2rem] font-medium rounded-[3.5rem] py-[0.69rem] bg-white shadow-lg max-w-max px-[0.9rem] pr-[1.4rem]">
                  <Image
                    src={"/images/dollar-symbol.svg"}
                    height={24}
                    width={24}
                    alt="Dollar Symbol"
                    className="h-[2.4rem] w-[2.4rem]"
                  />
                  <p>${listOfdata?.hourly_rate} / hour</p>
                </div>
                {/* Availability */}
                <div className="flex gap-[0.35rem] text-nowrap text-primary text-[2rem] font-medium rounded-[3.5rem] py-[0.69rem] bg-white shadow-lg px-[1.2rem] min-w-max">
                  <Image
                    src={"/images/clock.svg"}
                    height={26}
                    width={26}
                    alt="Clock"
                    className="h-[2.6rem] w-[2.6rem]"
                  />
                  <p>45 hr / Week Availability</p>
                </div>
              </div>
            </div>
            {/* Positioned Skills and Text Desktop */}
            <div className="max-w-[55rem] w-full absolute right-[-4rem] top-[7rem]">
              <p
                dangerouslySetInnerHTML={{
                  __html: listOfdata?.tag_line,
                }}
                className="w-full text-primary text-[2.2rem] font-medium leading-[3rem] mb-[2rem] text-left"
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
                      {Object?.values(skills)?.map((group, groupIndex) => (
                        <React.Fragment key={groupIndex}>
                          {group.map((skill, i) => {
                            const skillNumber = `${groupIndex + 1}.${i + 1}`;

                            return (
                              <Link
                                href={skill.url || "#"}
                                legacyBehavior
                                key={`${groupIndex}-${i}`}
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
                            );
                          })}
                        </React.Fragment>
                      ))}
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

export default HeroSection;
