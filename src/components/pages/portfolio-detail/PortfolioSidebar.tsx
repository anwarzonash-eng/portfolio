"use client";
import React from "react";
import { formatDate } from "@/hooks/formatdate";
import { dateFormatsOptions } from "@/data/JsonData";
import SideTestimonialPortfolioDetail from "@/components/SideTestimonialPortfolioDetail";
import type { Portfolio, ProfileReport } from "@/types/api";

interface PortfolioSidebarProps {
  portfolioDetails: Portfolio | null;
  listOfdata: ProfileReport | null;
  testimonialHeading: string;
}

/** The role / services / duration / client aside (extracted verbatim from pages/portfolio-detail). */
const PortfolioSidebar = ({
  portfolioDetails,
  listOfdata,
  testimonialHeading,
}: PortfolioSidebarProps) => (
  <aside
    className="shadow-xl
 rounded-[1rem] bg-surface p-[2rem] md:max-w-[36rem] w-full flex flex-col gap-[3.2rem]"
  >
    {portfolioDetails?.my_role && (
      <div className="">
        <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
          MY ROLE
        </p>
        <ul className="text-[1.8rem] text-heading font-medium leading-[2.6rem] list-inside list-disc">
          {portfolioDetails?.my_role}
        </ul>
      </div>
    )}
    {portfolioDetails?.services_i_provide && (
      <div className="">
        <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
          SERVICE I PROVIDE
        </p>
        <div
          className="text-[1.8rem] text-heading font-medium leading-[2.6rem] list-inside list-disc"
          dangerouslySetInnerHTML={{
            __html: portfolioDetails?.services_i_provide,
          }}
        ></div>
      </div>
    )}
    <div className="">
      <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
        PROJECT DURATION
      </p>
      <ul className="text-[1.8rem] text-heading font-medium leading-[2.6rem]">
        <li>
          {formatDate(
            portfolioDetails?.starting_date,
            dateFormatsOptions.shortMonthYear,
          )}{" "}
          -{" "}
          {formatDate(
            portfolioDetails?.ending_Date,
            dateFormatsOptions.shortMonthYear,
          )}
        </li>
      </ul>
      {listOfdata?.testimonials && (
        <SideTestimonialPortfolioDetail
          testimonials={listOfdata?.testimonials}
          designation={listOfdata?.designation}
          heading={testimonialHeading}
        />
      )}
    </div>
    {portfolioDetails?.client_name && (
      <div className="">
        <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
          Client
        </p>
        <ul className="text-[1.8rem] text-heading font-medium leading-[2.6rem]">
          <li>{portfolioDetails?.client_name}</li>
        </ul>
      </div>
    )}
    {portfolioDetails?.has_testimonial && (
      <div className="">
        <p className="text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]">
          CLIENT DESIGNATION
        </p>
        <ul className="text-[1.8rem] text-heading font-medium leading-[2.6rem]">
          <li>
            This slide is 100% editable. Adapt it to your needs and capture
            your audience’s attention.
          </li>
        </ul>
      </div>
    )}
  </aside>
);

export default PortfolioSidebar;
