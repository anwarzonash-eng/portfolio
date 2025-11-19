import NoteDomainForPint from "@/components/NoteDomainForPint";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HomeAboutSectionProps {
  listOfdata: any;
  urlInfo: any;
  formatPhoneNumber: any;
  WorkProofLinks: any;
  ContactMeLinks: any;
}

const HomeAboutSection: React.FC<HomeAboutSectionProps> = ({listOfdata, urlInfo, formatPhoneNumber, WorkProofLinks, ContactMeLinks}) => {
  return (
    <section className="h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] mt-20 print:mt-0 relative">
      {/* Note and Domain For Each Page */}
      <NoteDomainForPint direction={"hidden print:right-0 print:block"} />
      {/* Container Div for print*/}
      <div className="max-w-[1550px] w-full mx-auto flex items-center justify-center gap-[2rem]">
        {/* Container For Image and Badges */}
        <div className="w-full max-w-[50%] flex items-center justify-center">
          <div
            className="relative h-[65rem] bg-top bg-cover bg-no-repeat w-full rounded-[1rem]"
            style={{
              backgroundImage: `url('${listOfdata?.profile_photo_3}')`,
            }}
          >
            {/* Experience Badge */}
            <div className="bg-white rounded-[0.8rem] absolute bottom-auto left-auto top-[-3rem] right-[3rem] p-[1.4rem] flex items-center shadow-md gap-[1rem]  animate-bounce">
              {/* Badge SVG */}
              <div className="bg-[#2A97FC] rounded-[50%] h-[6.8rem] w-[6.8rem] relative">
                <img
                  src="/images/experience.svg"
                  alt="Experience"
                  className="h-[3.4rem] w-[3.4rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              {/* Badge Content */}
              <div className="flex flex-col justify-center">
                <h3 className="uppercase text-[1.4rem] xl:text-[1.8rem] font-semibold  text-heading leading-none mt-[1rem]">
                  Experience
                </h3>
                <p className="text-[2.4rem] xl:text-[3rem] font-bold text-primary">
                  {listOfdata?.no_of_experiences}+{" "}
                  <span className="text-[2rem]">
                    {listOfdata?.no_of_experiences === 1 ? "year" : "years"}
                  </span>
                </p>
              </div>
            </div>

            {/* Projects Badge */}
            <div className="bg-white mb-3 rounded-[0.8rem] absolute top-auto right-auto bottom-[-4rem] left-[3rem] p-[1.4rem] xl:rounded-[2rem] flex items-center shadow-md gap-[1rem] animate-bounce">
              {/* Badge SVG */}
              <div className="bg-[#FC822A] rounded-[50%] h-[6.8rem] w-[6.8rem] relative">
                <img
                  src="/images/badge.svg"
                  alt="Experience"
                  className="h-[3.4rem] w-[3.4rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              {/* Badge Content */}
              <div className="flex flex-col justify-center">
                <h3 className="uppercase text-[1.4rem] xl:text-[1.8rem] font-semibold  text-heading leading-none mt-[1rem]">
                  Projects Completed
                </h3>
                <p className="text-[2.4rem] xl:text-[3rem] font-bold text-primary">
                  {listOfdata?.projects_completed}+
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Details */}
        <div className="w-full max-w-[50%]">
          {/* About Context */}
          <div className="w-full">
            {/* Badge */}
            <div
              className="px-[4rem] mt-[3rem] py-[1.4rem] bg-white rounded-[100px] border border-border border-solid text-center max-w-max text-heading
                              text-[2rem] font-medium font-Inter leading-[2rem]"
            >
              About Me
            </div>
            {/* Heading */}
            <div
              dangerouslySetInnerHTML={{
                __html: listOfdata?.tag_line,
              }}
              className="text-heading text-[2.4rem] mt-[2rem] mb-[1.2rem] font-medium leading-[2.8rem] lg:text-[3rem] lg:leading-[3.8rem]"
            ></div>
            {/* Paragraph */}
            {listOfdata?.designation && (
              <p className="text-[1.6rem] font-normal text-paragraph1  leading-[2.4rem]">
                Currently Open for full time position as a{" "}
                <span className="lowercase">{listOfdata?.designation}</span>.
              </p>
            )}
          </div>
          {/* Info Cards */}
          <div className="my-[2rem] rounded-[0.8rem] overflow-hidden  w-full grid grid-cols-12">
            <div
              className={`w-full border border-border border-solid py-[3rem] px-[2rem] col-span-12 ${
                urlInfo?.u ? "md:col-span-12" : "md:col-span-6"
              }`}
            >
              <div className="w-full">
                <h4 className="hover:font-bold  text-[1.6rem] duration-300 font-normal text-primary">
                  {listOfdata?.name}
                </h4>
                <p className="text-[1.4rem] font-normal text-paragraph1">
                  Name
                </p>
              </div>
            </div>
            {!urlInfo?.u && (
              <div className="md:col-span-6 col-span-12 w-full border border-border border-solid py-[3rem] px-[2rem]">
                <div className="w-full text-wrap break-words">
                  <Link
                    href={`mailto:${listOfdata?.email}`}
                    className="hover:font-bold  text-[1.6rem] duration-300  font-normal text-primary "
                  >
                    {listOfdata?.email}
                  </Link>
                  <p className="text-[1.4rem] font-normal text-paragraph1">
                    Email
                  </p>
                </div>
              </div>
            )}

            {!urlInfo?.u && (
              <div className="md:col-span-6 col-span-12 w-full border border-border border-solid py-[3rem] px-[2rem]">
                <div className="w-full">
                  <Link
                    href={`tel:${listOfdata?.phone_no}`}
                    className="hover:font-bold  text-[1.6rem] duration-300 font-normal text-primary"
                  >
                    {formatPhoneNumber(listOfdata?.phone_no)}
                  </Link>
                  <p className="text-[1.4rem] font-normal text-paragraph1">
                    Contact
                  </p>
                </div>
              </div>
            )}

            <div
              className={`w-full border border-border border-solid py-[3rem] px-[2rem]  col-span-12 ${
                urlInfo?.u ? "md:col-span-12" : "md:col-span-6"
              }`}
            >
              <div className="w-full flex justify-between">
                <div>
                  <Link
                    target="_blank"
                    href={`https://www.google.com/maps/place/${listOfdata?.location}
                    )}`}
                    className="hover:font-bold  text-[1.6rem] duration-300 font-normal text-primary"
                  >
                    {listOfdata?.location}
                  </Link>
                  <p className="text-[1.4rem] font-normal text-paragraph1">
                    Address
                  </p>{" "}
                </div>
                {listOfdata?.location?.includes("Manchester, UK") && (
                  <Image
                    src={"/images/ukFlag.svg"}
                    height={35}
                    width={35}
                    loading="eager"
                    priority={true}
                    className="h-[3rem] w-[3rem] rounded-full object-cover"
                    alt="Uk Flag"
                  />
                )}
              </div>
            </div>

            <div
              className={`w-full border border-border border-solid py-[3rem] px-[2rem]  col-span-12 ${
                urlInfo?.u ? "md:col-span-12" : "md:col-span-6"
              }`}
            >
              <div className="w-full flex items-center gap-[1.4rem] mb-[0.8rem]">
                <WorkProofLinks
                  props={{
                    upwork: listOfdata?.upwork,
                    github: listOfdata?.github,
                    linkedIn: listOfdata?.linkedIn,
                    behance_link: listOfdata?.behance_link,
                    u: urlInfo?.u,
                  }}
                />
              </div>
              <p className="text-[1.35rem] font-normal text-paragraph1">
                My Work Proof
              </p>
            </div>
            {!urlInfo?.u && (
              <div className="md:col-span-6 col-span-12 w-full border border-border border-solid py-[3rem] px-[2rem]">
                <div className="w-full flex items-center gap-[1.4rem] mb-[0.8rem]">
                  <ContactMeLinks
                    props={{
                      email: listOfdata?.email,
                      phone_no: listOfdata?.phone_no,
                    }}
                  />
                </div>
                <p className="text-[1.35rem] font-normal text-paragraph1">
                  Contact Me
                </p>
              </div>
            )}
          </div>
          {/* <Link href={"/?sectionId=about"}>
                            <button className="w-full md:max-w-max btn-primary rounded-[0.6rem] text-white py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-custom">
                              View CV Online
                            </button>
                          </Link> */}
          <Link href={"/cv"} target="_blank">
            <button className="w-full md:max-w-max btn-primary rounded-[0.6rem] text-white py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-custom">
              View CV Online
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutSection;
