import DesignationDomain from "@/components/DesignationDomain";
import { modifiedContent } from "@/hooks/modifiedContent";
import Link from "next/link";
import Image from "next/image";
import { modifiedContentHideLinks } from "@/hooks/modifiedContentHideLinks";

const CVLandscapeOverviewSection = ({
  listOfdata,
  skillsListCount,
  filteredSkills,
  scrollToSection,
  formatDate,
  urlInfo,
  dateFormatsOptions,
  hideLinks,
}) => {
  return (
    <section className="print:h-screen print:section !w-full overflow-hidden relative">
      <div className="max-w-[1550px] w-full mx-auto flex gap-[3rem] h-full">
        {/* Side Panel */}
        <aside className="max-w-[35rem] w-full flex-shrink-0 bg-cvSideBg bg-no-repeat bg-cover p-[2.5rem] h-full">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center gap-2">
              {/* Profile Bg */}
              {!hideLinks ? (
                <Link href="/" className=" block">
                  <Image
                    src={listOfdata?.profile_photo_1}
                    height={1200}
                    width={1200}
                    alt="Profile Picture"
                    className="h-[18rem] w-[18rem] rounded-[50%] bg-cover bg-no-repeat bg-center"
                  />
                </Link>
              ) : (
                <Image
                  src={listOfdata?.profile_photo_1}
                  height={1200}
                  width={1200}
                  alt="Profile Picture"
                  className="h-[18rem] w-[18rem] rounded-[50%] bg-cover bg-no-repeat bg-center"
                />
              )}
              {/* Name */}
              {!hideLinks ? (
                <Link
                  href={"/"}
                  className="text-heading text-[3.2rem] font-medium leading-[4.4rem] mt-[1.2rem] text-center"
                >
                  {listOfdata?.name}
                </Link>
              ) : (
                <p className="text-heading text-[3.2rem] font-medium leading-[4.4rem] mt-[1.2rem] text-center">
                  {listOfdata?.name}
                </p>
              )}
              {/* Designation */}
              <h3 className="text-primary text-[1.8rem] font-medium leading-normal">
                {listOfdata?.designation?.split("|").map((item, index) => (
                  <div key={index} className="text-center">
                    {item.trim()}
                  </div>
                ))}
              </h3>

              {!hideLinks &&
              <div className="flex items-center justify-center">
                <DesignationDomain />
              </div>
              }
              {/* Info Description*/}
              <p className="my-[2rem] text-[1.4rem] leading-[2rem] text-heading font-normal text-justify">
                Reach out today and I&apos;ll provide you with my comprehensive
                onboarding package designed for full-time employment or Contract
                Based Jobs. This package covers various aspects that potential
                employers often inquire about, such as my salary expectations
                and the seamless integration process into your company.
              </p>
            </div>
            {/* Divider */}
            <hr className="w-full h-[0.2rem] bg-[#E2E6EE] inline-block" />

            {/* Availability */}
            <div className="my-[2.5rem] w-full text-center border border-solid border-[#E2E6EE] rounded-tl-[0.6rem] rounded-tr-[0.6rem] rounded-bl-[0.6rem] rounded-br-[0.6rem] overflow-hidden">
              <div className="bg-[#F7F9FC] p-[1.2rem]">
                <p className="text-[1.5rem] leading-normal font-normal text-heading">
                  Next available
                </p>
                <h4 className="text-[1.8rem] font-medium text-primary leading-normal">
                  {formatDate(
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth() + 1,
                    ),
                    dateFormatsOptions.longMonthYear,
                  )}
                </h4>
              </div>
              {!urlInfo?.u && !hideLinks && (
                <>
                  {listOfdata?.calendly_link ? (
                    <Link
                      target="_blank"
                      href={listOfdata?.calendly_link || "#"}
                    >
                      <button
                        className="text-[1.8rem] text-white w-full py-[1.3rem]
                                     px-[3.4rem] bg-gradient-to-b from-white/30 to-transparent bg-primary shadow-[0px_0px_0px_1px_#FFF] hover:bg-white hover:text-primary hover:border-primary hover:border-t border-solid duration-300"
                      >
                        Schedule Call
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="text-[2rem] text-white w-full py-[1.6rem] px-[3.4rem] bg-gradient-to-b from-white/30 to-transparent bg-primary shadow-[0px_0px_0px_1px_#FFF] hover:bg-white hover:text-primary hover:border-primary hover:border-t border-solid duration-300"
                    >
                      Hire Me
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </aside>
        <div className="">
          {/* 10 Years Experience */}
          <div
            dangerouslySetInnerHTML={{ __html: listOfdata?.tag_line }}
            className="p-[1.5rem] block primaryGradient text-white text-[2rem] 
                          leading-normal font-bold rounded-[0.5rem] text-center m-[2rem] ml-0"
          ></div>
          {listOfdata?.skills && (
            <div className="w-full">
              {/* Title */}
              <h2
                className="text-heading leading-[3.56rem] text-[3.67rem] font-medium 
                            mb-[2rem]"
              >
                Overview
              </h2>
              {/* Skills List */}
              <div
                className="text-heading services_main limit-height-landscape list-div text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem] list-inside "
                dangerouslySetInnerHTML={{
                  __html:!hideLinks ?  modifiedContent(
                    listOfdata?.skills,
                    filteredSkills,
                    listOfdata,
                  ) :  modifiedContentHideLinks(
                    listOfdata?.skills,
                    filteredSkills,
                    listOfdata,
                  ),
                }}
              ></div>
              {/** Only show Read More when actual list items exceed visible print limit **/}
              {skillsListCount > 9 && !hideLinks && (
                <Link
                  href={"/cv"}
                  className="px-[4rem] py-[1.4rem] bg-primary rounded-[2.2rem] hover:bg-white hover:text-primary hover:border-primary border border-border border-solid text-center max-w-max text-white text-[1.4rem] font-medium font-Inter leading-tight my-[2.5rem] block"
                >
                  Read More
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CVLandscapeOverviewSection;
