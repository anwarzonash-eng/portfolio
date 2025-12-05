import DesignationDomain from "@/components/DesignationDomain";
import Image from "next/image";
import React from "react";

const HomeWeclome = ({
  listOfdata,
  listOfdatas,
  urlInfo,
  WorkProofLinks,
  ContactMeLinks,
}) => {
  return (
    // Before Gradient BG: bg-bannerBG
    <section className="h-screen bg-cvSideBg bg-no-repeat bg-cover w-full  flex items-center justify-center relative">
      <div className="text-center">
        <div className="flex items-center justify-center w-full">
          <div
            className="bg-primary text-white font-bold text-[3rem]  rounded-[100px] max-w-max px-10 tracking-wider"
          >
            Portfolio
          </div>
        </div>
        <div className="items-center justify-strat gap-[4rem] flex w-full">
          <Image
            src={listOfdatas?.profile_photo_1}
            alt="Profile Photo"
            height={245}
            width={245}
            loading="eager"
            priority={true}
            className="size-[245px] rounded-full"
          />
          <div className="flex items-start justify-start flex-col">
            <h2 className="text-[7rem] font-bold"> {listOfdata?.name}</h2>
            <div className="text-[4rem] font-medium flex flex-wrap gap-[3px] mb-[1rem]">
              {" "}
              {listOfdatas?.designation?.split("|").map((item, index) => (
                <div key={index} className="text-center">
                  {item.trim()}
                </div>
              ))}
            </div>

            {/* Designation Domain */}
            <div className="mb-[1rem]">
              <DesignationDomain />
            </div>

          </div>
        </div>
        <div className="flex items-center gap-[2rem] mb-[0.8rem] justify-start ml-[280px]">
          {urlInfo?.u ? (
            <WorkProofLinks
              props={{
                upwork: listOfdata?.upwork,
                github: listOfdata?.github,
                linkedIn: listOfdata?.linkedIn,
                behance_link: listOfdata?.behance_link,
                u: urlInfo?.u,
              }}
            />
          ) : (
            <>
              <WorkProofLinks
                props={{
                  upwork: listOfdata?.upwork,
                  github: listOfdata?.github,
                  linkedIn: listOfdata?.linkedIn,
                  behance_link: listOfdata?.behance_link,
                  u: urlInfo?.u,
                }}
              />
              <ContactMeLinks
                props={{
                  email: listOfdata?.email,
                  phone_no: listOfdata?.phone_no,
                }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeWeclome;
