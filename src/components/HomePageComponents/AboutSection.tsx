import React from "react";
import Image from "next/image";
import Link from "next/link";
import WorkProofLinks from "../WorkProofLinks";
import ContactMeLinks from "../ContactMeLinks";

interface AboutSectionProps {
  listOfdata: {
    profile_photo_3?: string;
    no_of_experiences?: number;
    projects_completed?: number;
    website_purpose?: string;
    tag_line?: string;
    designation?: string;
    name?: string;
    email?: string;
    phone_no?: string;
    location?: string;
    upwork?: string;
    github?: string;
    linkedIn?: string;
    behance_link?: string;
    is_pdf_generated?: boolean;
    pdf_urls?: { type: string; url: string | null }[];
    // pdf_urls?: Array<{
    //   type: string;
    //   url: string | null;
    // }>;
  };
  urlInfo?: { u?: string };
  formatPhoneNumber: (phone: string | undefined) => string;
  downloadFile: (url: string, fileName: string) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  listOfdata,
  urlInfo,
  formatPhoneNumber,
  downloadFile,
}) => {
  const cvLink = listOfdata?.pdf_urls?.find(
    (link) =>
      (urlInfo?.u ? link.type === "cv_with_u" : link.type === "cv") && link.url
  );

  // console.log("About Section Data:", listOfdata);
  // console.log("CV Link:", cvLink);

  // Response Structure Sample 
  // let pdf_urls = [
  //   {
  //     type: "home",
  //     url: null,
  //   },
  //   {
  //     type: "home_with_u",
  //     url: null,
  //   },
  //   {
  //     type: "cv",
  //     url: "https://personalwebsites-pdfs.s3.eu-north-1.amazonaws.com/1766654279959_document-2025-12-25T09-17-32-008Z-cv.pdf",
  //   },
  //   {
  //     type: "cv_with_u",
  //     url: "https://personalwebsites-pdfs.s3.eu-north-1.amazonaws.com/1766654304420_document-2025-12-25T09-18-01-360Z-cv_with_u.pdf",
  //   },
  //   {
  //     type: "portfolio_main",
  //     url: null,
  //   },
  //   {
  //     type: "portfolio_main_with_u",
  //     url: null,
  //   },
  // ];

  return (
    <section
      id="about"
      className="w-full flex items-center justify-center mb-[5rem] print:hidden"
    >
      {/* Container Div for desktop */}
      <div className="mainContainer flex flex-col-reverse gap-[5rem] xl:gap-0 xl:flex-row items-center justify-center xl:justify-between">
        {/* Container For Image and Badges */}
        <div className="w-full h-full xl:w-[67rem] xl:h-[64rem] flex-shrink-0 max-xl:flex justify-center">
          <div
            className="relative h-[44rem] xl:h-[65rem] max-w-[56rem] bg-center bg-cover bg-no-repeat w-full rounded-[1rem]"
            style={{
              backgroundImage: `url('${listOfdata?.profile_photo_3}')`,
            }}
          >
            {/* Experience Badge */}
            <div className="bg-surface rounded-[0.8rem] absolute bottom-auto left-auto top-[-3rem] right-[3rem] xl:top-[7rem] xl:right-[-8rem] p-[1.4rem] xl:h-[12rem] xl:w-[26rem] xl:rounded-[2rem] flex items-center shadow-md gap-[1rem] xl:gap-[2rem] animate-bounce">
              {/* Badge SVG */}
              <div className="bg-[#2A97FC] rounded-[50%] flex items-center justify-center h-[4.9rem] w-[4.9rem] xl:h-[6.8rem] xl:w-[6.8rem]">
                <img
                  src="./images/experience.svg"
                  alt="Experience"
                  className="h-[2.4rem] w-[2.4rem] xl:h-[3.4rem] xl:w-[3.4rem]"
                />
              </div>
              {/* Badge Content */}
              <div className="flex flex-col justify-center">
                <h3 className="uppercase text-[1.4rem] xl:text-[1.8rem] font-semibold text-heading leading-none mt-[1rem]">
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
            {listOfdata && listOfdata?.website_purpose !== "contract" && (
              <div className="bg-surface mb-3 rounded-[0.8rem] absolute top-auto right-auto bottom-[-4rem] xl:bottom-[3rem] xl:left-[3rem] left-[3rem] p-[1.4rem] xl:h-[12rem] xl:rounded-[2rem] flex items-center shadow-md gap-[1rem] xl:gap-[2rem] animate-bounce xl:animate-none">
                {/* Badge SVG */}
                <div className="bg-[#FC822A] rounded-[50%] flex items-center justify-center h-[4.9rem] w-[4.9rem] xl:h-[6.8rem] xl:w-[6.8rem]">
                  <img
                    src="./images/badge.svg"
                    alt="Experience"
                    className="h-[2.4rem] w-[2.4rem] xl:h-[3.4rem] xl:w-[3.4rem]"
                  />
                </div>
                {/* Badge Content */}
                <div className="flex flex-col justify-center">
                  <h3 className="uppercase text-[1.4rem] xl:text-[1.8rem] font-semibold text-heading leading-none mt-[1rem]">
                    Projects Completed
                  </h3>
                  <p className="text-[2.4rem] xl:text-[3rem] font-bold text-primary">
                    {listOfdata?.projects_completed}+
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Contact Details */}
        <div className="w-full">
          {/* About Context */}
          <div className="w-full">
            {/* Badge */}
            <div className="flex items-center max-lg:justify-center mt-[2rem]">
              <div className="badge">About Me</div>
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
              <p className="text-[1.6rem] font-normal text-paragraph1 leading-[2.4rem]">
                Currently open for a position as a{" "}
                <span className="lowercase">
                  {listOfdata?.designation.replace(/\s*\|\s*|\s+,/g, (match) =>
                    match.includes("|") ? ", " : ","
                  )}
                </span>.
              </p>
            )}
          </div>
          {/* Info Cards */}
          <div className="my-[2rem] rounded-[0.8rem] overflow-hidden w-full grid grid-cols-12">
            <div
              className={`w-full border border-border border-solid py-[3rem] px-[2rem] col-span-12 ${urlInfo?.u ? "md:col-span-12" : "md:col-span-6"
                }`}
            >
              <div className="w-full">
                <h4 className="hover:font-bold text-[1.6rem] duration-300 font-normal text-primary">
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
                    className="hover:font-bold text-[1.6rem] duration-300 font-normal text-primary"
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
                    className="hover:font-bold text-[1.6rem] duration-300 font-normal text-primary"
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
              className={`w-full border border-border border-solid py-[3rem] px-[2rem] col-span-12 ${urlInfo?.u ? "md:col-span-12" : "md:col-span-6"
                }`}
            >
              <div className="w-full flex justify-between">
                <div>
                  <Link
                    target="_blank"
                    href={`https://www.google.com/maps/place/${listOfdata?.location}`}
                    className="hover:font-bold text-[1.6rem] duration-300 font-normal text-primary"
                  >
                    {listOfdata?.location}
                  </Link>
                  <p className="text-[1.4rem] font-normal text-paragraph1">
                    Location
                  </p>
                </div>
                {listOfdata?.location?.includes("Manchester, UK") && (
                  <Image
                    src={"/images/ukFlag.svg"}
                    height={35}
                    width={35}
                    className="h-[3rem] w-[3rem] rounded-full object-cover"
                    alt="Uk Flag"
                  />
                )}
              </div>
            </div>
            <div
              className={`w-full border border-border border-solid py-[3rem] px-[2rem] col-span-12 ${urlInfo?.u ? "md:col-span-12" : "md:col-span-6"
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
          {/* Button Line */}
          <div className="md:space-x-5 py-[2rem]">
            <Link href={"/cv"}>
              <button className="w-full md:max-w-max btn-primary rounded-[0.6rem] text-onPrimary py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-custom">
                View CV Online
              </button>
            </Link>
            {/* {listOfdata?.pdf_urls?.urls.length > 0 &&
              listOfdata?.pdf_urls?.urls
                .filter((link) => link.type === "cv")
                .map((cvLink, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      downloadFile(cvLink.url, `${listOfdata?.name} - CV`)
                    }
                    className="w-full md:max-w-max mt-5 md:mt-0 btn-primary rounded-[0.6rem] text-onPrimary py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-custom"
                  >
                    Download CV
                  </button>
                ))} */}
            {cvLink && (
              <button
                onClick={() =>
                  downloadFile(cvLink.url, `${listOfdata?.name} - CV`)
                }
                className="w-full md:max-w-max mt-5 md:mt-0 btn-primary rounded-[0.6rem] text-onPrimary py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-custom"
              >
                Download CV
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
