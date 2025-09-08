"use client";
import React, { forwardRef } from "react";
import Image from "next/image";
import { modifiedContent } from "@/hooks/modifiedContent";
import SkillsComponent from "./SkillsComponent";

interface ExpandableServiceCardProps {
  service: any;
  index: number;
  activeDropdown: number | null;
  setActiveDropdown: React.Dispatch<React.SetStateAction<number | null>>;
  serviceRefs?: React.MutableRefObject<any> | null; // ✅ optional now
  listOfskills: any[];
  listOfdata: any;
}

const ExpandableServiceCard = forwardRef<
  HTMLDivElement,
  ExpandableServiceCardProps
>(
  (
    {
      service,
      index,
      activeDropdown,
      setActiveDropdown,
      serviceRefs,
      listOfskills,
      listOfdata,
    },
    ref
  ) => {
    return (
      <div
        key={index}
        ref={(el) => {
          // ✅ Only attach ref if serviceRefs is provided
          if (serviceRefs) {
            serviceRefs.current[service?.title] = el;
          }
        }}
        className="w-full bg-white print:break-before-page block rounded-[1rem] 
        border border-border border-solid mb-[3rem] overflow-hidden relative print-section"
      >
        {/* Section where click to expand and collapse */}
        <div
          className={`p-[1rem] lg:p-[3rem] print:p-[17px] print:!mb-[2rem] 
            bg-primary bg-cvBoxDesktop bg-center bg-no-repeat bg-cover lg:bg-contain 
            print:text-white ${activeDropdown === index ? "bg-expanded" : ""}`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-[2rem] mb-[2rem]">
            <div className="w-full flex items-center justify-between">
              {/* Title + Image */}
              <div className="w-full flex items-center gap-3">
                {service?.picture && (
                  <div className="w-[9.3rem] print:hidden h-[9.3rem] flex items-center justify-center rounded-[12rem] shadow relative">
                    <div className="flex items-center justify-center w-[9.3rem] h-[9.3rem]">
                      <Image
                        src={service?.picture}
                        alt="Icon"
                        fill
                        className="rounded-[12rem] w-[9.3rem] h-[9.3rem] object-contain"
                      />
                    </div>
                  </div>
                )}
                <h3 className="text-[2.4rem] lg:text-[4.5rem] print:!font-semibold text-white leading-tight font-medium">
                  {service.title}
                </h3>
              </div>

              {/* Expand/Collapse Icons (clickable) */}
              {activeDropdown !== index ? (
                <img
                  src="/images/expand_icon.png"
                  alt="expand"
                  className="w-[52px] print:hidden block cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(index);

                    // ✅ Only scroll if serviceRefs is provided
                    const serviceRef = serviceRefs?.current?.[service?.title];
                    if (serviceRef) {
                      serviceRef.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  }}
                />
              ) : (
                <img
                  src="/images/collaps_icon.png"
                  alt="collapse"
                  className="w-[52px] print:hidden block cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(null);
                  }}
                />
              )}
            </div>
          </div>

          {/* Intro text */}
          <p
            dangerouslySetInnerHTML={{
              __html: service.intro_main,
            }}
            className="text-white print:!text-white list-div text-[1.6rem] print:!font-medium leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium mb-[2rem]"
          ></p>
        </div>

        {/* Expandable content */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            activeDropdown === index
              ? "h-auto opacity-100"
              : "max-h-0 opacity-0"
          } print-expanded`}
        >
          <div className="flex w-full flex-col items-start">
            <div
              dangerouslySetInnerHTML={{
                __html: modifiedContent(
                  service.intro_detail,
                  listOfskills,
                  listOfdata
                ),
              }}
              className="p-[1rem] offer_main list-div text-[1.6rem] rounded-[1rem] bg-white "
            ></div>

            {service?.skills && service?.skills.length > 0 && (
              <SkillsComponent
                service={service}
                skillsList={listOfskills}
                index={index}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

ExpandableServiceCard.displayName = "ExpandableServiceCard";

export default ExpandableServiceCard;
