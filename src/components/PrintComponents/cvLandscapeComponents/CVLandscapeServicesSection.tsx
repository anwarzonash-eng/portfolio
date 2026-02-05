import NoteDomainForPint from "@/components/NoteDomainForPint";
import SkillsContainer from "@/components/SkillsContainer";
import { contactDetails, socialLinks } from "@/data/JsonData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CVLandscapeServicesSection = ({
  listOfdata,
  urlInfo,
  sortedSkills,
  hideLinks,
}) => {
  return (
    <section className="print:h-screen print:section flex items-center justify-center !w-full overflow-hidden relative my-[4rem] print:m-0">
      {!hideLinks && (
        <NoteDomainForPint direction={"hidden print:right-0 print:block"} />
      )}
      <div className="max-w-[1550px] w-full mx-auto flex gap-[3rem]">
        {/* Side Panel */}
        <aside className="max-w-[35rem] w-full flex-shrink-0 bg-cvSideBg bg-no-repeat bg-cover p-[2.5rem] px-[4rem]">
          <div className="flex flex-col items-center">
            {/* Email, Website, Phone, Location */}
            <div className="my-[2rem] w-full flex flex-col gap-[2rem]">
              {/* Iterate through the contact details array */}
              {contactDetails(listOfdata)
                .filter(({ alt }) => (urlInfo?.u ? alt === "Location" : true))
                .map((contact, index) => (
                  <div key={index} className="flex items-center gap-[1.78rem]">
                    {contact?.iconSrc && (
                      <div className="h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center relative">
                        <Image
                          src={contact?.iconSrc}
                          height={24}
                          width={24}
                          className="h-[2.4rem] w-[2.4rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          alt={contact.alt}
                          loading="eager"
                          priority={true}
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-[0.45rem]">
                      <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                        {contact.type}
                      </p>

                      {!hideLinks ? (
                        <Link
                          target="_blank"
                          href={contact.href || "#"}
                          className="hover:text-primary text-[1.55rem] font-medium leading-[2rem] text-heading"
                        >
                          {contact.value}
                        </Link>
                      ) : (
                        <p className="hover:text-primary text-[1.55rem] font-medium leading-[2rem] text-heading">
                          {contact.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            {!hideLinks && (
              <>
                {/* Divider */}
                <hr className="w-full h-[0.2rem] bg-[#E2E6EE] inline-block" />

                {/* Work Proof */}
                <div className="my-[2rem] w-full flex flex-col gap-[2rem]">
                  {/* Title */}
                  <h3 className="text-heading text-[1.33rem] font-medium leading-[1.77rem]">
                    Work Proof
                  </h3>
                  {/* Iterating on Icons */}
                  {socialLinks(listOfdata)
                    .filter(({ alt }) =>
                      urlInfo?.u ? alt === "Github" || alt === "Upwork" : true,
                    )
                    .map((social, index) => (
                      <>
                        {social?.href && (
                          <Link
                            target="_blank"
                            href={social.href || "#"}
                            key={index}
                            className="flex items-center gap-[1.78rem]"
                          >
                            {social?.iconSrc && (
                              <Image
                                src={social?.iconSrc}
                                height={35}
                                width={35}
                                alt={social.alt}
                                className="h-[3.5rem] w-[3.5rem]"
                                loading="eager"
                                priority={true}
                              />
                            )}
                            <div className="flex flex-col gap-[0.45rem]">
                              <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                                {social.platform}
                              </p>
                              <div className="break-all hover:text-primary text-[1.55rem] font-medium leading-[2rem] text-heading">
                                {social.username}
                              </div>
                            </div>
                          </Link>
                        )}
                      </>
                    ))}
                </div>
              </>
            )}
          </div>
        </aside>
        {listOfdata?.skills && (
          <div className="w-full">
            {/* Badge*/}
            <div className="flex items-center justify-center mb-[4rem]">
              <h2 className="badge">Skills</h2>
            </div>
            {/* Skills List */}
            <SkillsContainer
              list={sortedSkills}
              variant="print"
              numColumns={5}
              numSkills={20}
              hideLinks={hideLinks}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CVLandscapeServicesSection;
