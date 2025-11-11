import DesignationDomain from "@/components/DesignationDomain";
import React from "react";

const PortfolioWelcome = ({listOfdatas, listOfdata, WorkProofLinks, urlInfo, ContactMeLinks}) => {
  return (
      <div className="text-center p-[2rem] bg-bannerBG !w-full  relative">
        <div className="items-center justify-strat gap-[4rem] flex flex-col w-full">
          <img
            src={listOfdatas?.profile_photo_1}
            alt=""
            className="size-[245px] rounded-full"
          />
          <div className="flex items-start justify-start flex-col">
            <h2 className="text-[7rem] font-bold"> {listOfdata?.name}</h2>
            <div className="text-[4rem] font-medium flex items-center justify-center flex-wrap gap-[3px] w-full">
              {" "}
              {listOfdatas?.designation?.split("|").map((item, index) => (
                <div key={index} className="text-center">
                  {item.trim()}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center w-full">
              <DesignationDomain />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-[2.1rem] mt-[4rem] mb-[0.8rem] ">
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
  );
};

export default PortfolioWelcome;
