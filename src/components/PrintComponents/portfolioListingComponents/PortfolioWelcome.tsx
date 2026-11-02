import DesignationDomain from "@/components/DesignationDomain";
import Image from "next/image";

const PortfolioWelcome = ({
  listOfdatas,
  listOfdata,
  WorkProofLinks,
  urlInfo,
  ContactMeLinks,
  hideLinks,
}) => {
  return (
    // Before Gradient BG: bg-bannerBG
    <div className="text-center  bg-cvSideBg bg-no-repeat bg-cover relative !w-full !h-screen flex items-center justify-center flex-col gap-[2rem]">
      <div className="items-center justify-strat gap-[4rem] flex flex-col w-full">
        <Image
          loading="eager"
          priority={true}
          src={listOfdatas?.profile_photo_1}
          alt={listOfdata?.name}
          height={245}
          width={245}
          className="size-[245px] rounded-full"
        />
        <div className="bg-primary text-white font-bold text-[3rem]  rounded-[100px] max-w-max px-10 tracking-wider">
          Portfolios
        </div>
        <div className="flex items-center justify-start flex-col">
          <h2 className="text-[7rem] font-bold"> {listOfdata?.name}</h2>
          <div className="text-[4rem] font-medium flex items-center justify-center flex-wrap gap-[3px] w-full">
            {" "}
            {listOfdatas?.designation?.split("|").map((item, index) => (
              <div key={index} className="text-center">
                {item.trim()}
              </div>
            ))}
          </div>
          {!hideLinks && (
            <div className="flex items-center mt-8 justify-center w-full">
              <DesignationDomain />
            </div>
          )}
        </div>
      </div>
      {!hideLinks && (
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
      )}
    </div>
  );
};

export default PortfolioWelcome;
