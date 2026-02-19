import DesignationDomain from "@/components/DesignationDomain";
import NoteDomainForPint from "@/components/NoteDomainForPint";
import { useAppSelector } from "@/store";
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
  skills: Record<string, Skill[]>; // 👈 FIX HERE
  hideLinks?: boolean;
}

const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({
  listOfdata,
  isOverflowing,
  scrollToSection,
  skillsContainerRef,
  skills,
  hideLinks,
}) => {
  const urlInfo = useAppSelector((state) => state.profile.profileUrlInfo);

  return (
    <div className="print:h-screen print:section bg-bannerBG !w-full overflow-hidden relative">
      {/* Hero Section  */}
      <div className="max-w-[1550px] w-full mx-auto px-[4rem]">
        <div className="text-center mt-[3rem] print:mt-0 print:pt-[3rem]">

          <div className="mt-[-8rem] flex justify-end relative">
            <div className="mt-[17rem] flex flex-col items-start absolute left-0 w-[70%]">
              <div className="flex gap-5 justify-center items-center">
                <p className="text-heading text-[4.66rem] font-normal mt-5">Hi, I'm</p>
                <h2 className="font-bold md:text-[5rem] text-primary">
                  {listOfdata?.name}
                </h2>
              </div>

              <p className="text-heading text-[3.66rem] font-normal start">
                {listOfdata?.designation.split("|")[0].trim()}
              </p>

              {hideLinks ? null : (
                <div className="ml-0 mt-2">
                  {/* <DesignationDomain /> */}
                </div>
              )}

              <p
                dangerouslySetInnerHTML={{
                  __html: listOfdata?.tag_line,
                }}
                className="w-[90%] text-primary text-[2rem] font-medium leading-[3rem] mb-[2rem] mt-[2rem] text-left"
              ></p>

              {/* compact skill chips */}
              {listOfdata && listOfdata.skills_ids && listOfdata.skills_ids.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 w-[80%]">
                  {Object.values(skills).flat().slice(0, 10).map((skill, i) => {
                    const key = `hero-skill-${i}-${(skill?.title || '').replace(/\s+/g, '-')}`;

                    return skill?.url && !hideLinks ? (
                      <Link href={skill.url || "#"} legacyBehavior key={key}>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ animationDelay: `${i * 0.03}s` }}
                          className="text-[16px] text-black bg-white px-3 py-2 rounded-lg flex gap-2 items-center hover:bg-primary hover:text-white"
                        >
                          {skill?.title}
                        </a>
                      </Link>
                    ) : (
                      <div
                        key={key}
                        style={{ animationDelay: `${i * 0.03}s` }}
                        className="text-[16px] hover:bg-primary hover:text-white text-black bg-white px-3 py-2 rounded-lg flex gap-2 items-center"
                      >
                        {skill?.title}
                      </div>
                    );
                  })}
                </div>
              )}

              {!hideLinks && (
                <div className="mt-16 space-x-5">
                  {!urlInfo?.u && listOfdata?.calendly_link && <Link
                    prefetch={true}
                    target="_blank"
                    className="text-center rounded-[0.6rem] py-[1.5rem] px-[4.4rem] text-[2.6rem] font-medium bg-[#FCDC2A] text-black hover:bg-primary hover:text-white transition-colors"
                    href={listOfdata?.calendly_link || "#"}
                  >
                    Schedule Call
                  </Link>}
                  <Link
                    prefetch={true}
                    className="text-center rounded-[0.6rem] py-[1.5rem] px-[4.4rem] text-[2.6rem] font-medium mt-12 text-black transition-colors bg-white hover:bg-primary hover:text-white"
                    href={"/portfolio"}
                  >
                    View Portfolio
                  </Link>
                </div>
              )}

              <div className="w-full inline-flex items-center justify-center bg-no-repeat bg-contain animate-bounce mt-20">
                <div className="rounded flex w-full relative">
                  <div className="flex items-center gap-[0.35rem] text-nowrap text-primary text-[2rem] font-medium rounded-[3.5rem] py-[0.69rem] max-w-max pr-[1.4rem]">
                    <Image
                      src={"/images/dollar-symbol.svg"}
                      height={24}
                      width={24}
                      alt="Dollar Symbol"
                      className="h-[2.4rem] w-[2.4rem]"
                    />
                    <p>
                      ${listOfdata?.hourly_rate} /
                      {listOfdata?.salary_type === "per_day" ? "day" : "hour"}
                    </p>
                  </div>
                  <div className="flex gap-[0.35rem] text-nowrap text-primary text-[2rem] font-medium rounded-[3.5rem] py-[0.69rem] min-w-max">
                    <Image
                      src={"/images/clock.svg"}
                      height={26}
                      width={26}
                      alt="Clock"
                      className="h-[2.6rem] w-[2.6rem]"
                    />
                    <p>40 hr / Week Availability</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Dev Image */}
            <Image
              width={731}
              height={707}
              alt="Profile Photo"
              loading="eager"
              priority={true}
              src={listOfdata?.profile_photo_2.trim()}
              className="print:mr-[-25rem] mr-[-18rem] mt-[13rem]"
            />
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
