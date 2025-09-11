"use client";

import React from "react";
import Image from "next/image";
import { formatDate } from "@/hooks/formatdate";
import { dateFormatsOptions } from "@/data/JsonData";

// Define education type
interface EducationType {
  id: string | number;
  university_name: string;
  degree_name: string;
  degree_start_date: string;
  degree_end_date: string;
  thumbnail?: string;
}

interface CVEducationProps {
  educationList: EducationType[];
}

const CVEducation: React.FC<CVEducationProps> = ({ educationList }) => {
  return (
    <div className="overflow-hidden ml-[2rem] md:ml-[3rem] lg:ml-[5rem] print_p_m print:flex print:flex-col items-start justify-center">
      {/* Title */}
      <h2 className="text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] py-[3rem]">
        Education
      </h2>

      {/* Desktop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1.2rem] w-full print:hidden">
        {educationList?.map((edu) => (
          <div
            key={edu.id}
            className="p-[2rem] w-full rounded-[0.8rem] border border-solid border-[#E2E6EE] bg-[#F7F9FC]"
          >
            <div className="flex items-center gap-[1.8rem]">
              {edu?.thumbnail && (
                <Image
                  src={edu.thumbnail}
                  height={34}
                  width={34}
                  alt={edu.university_name}
                />
              )}
              <h3 className="text-[1.4rem] text-heading font-medium leading-[1.8rem]">
                {edu.university_name}
              </h3>
            </div>

            {/* Divider */}
            <hr className="w-full h-[0.2rem] bg-[#E2E6EE] my-[2rem] inline-block" />

            <div>
              <h2 className="text-heading font-medium text-[1.6rem] leading-[2rem]">
                {edu.degree_name}
              </h2>
              <p className="text-[1.2rem] font-normal text-[#3E3E3E]">
                {formatDate(
                  edu.degree_start_date,
                  dateFormatsOptions.shortMonthYear
                )}{" "}
                -{" "}
                {isNaN(new Date(edu.degree_end_date).getFullYear())
                  ? edu.degree_end_date
                  : formatDate(
                      edu.degree_end_date,
                      dateFormatsOptions.shortMonthYear
                    )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVEducation;
