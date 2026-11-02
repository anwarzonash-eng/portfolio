"use client";

import Image from "next/image";
import type { Education } from "@/types/api";

const EducationComponent = ({
  listOfdata,
  formatDate,
  dateFormatsOptions,
  // domain,
  // loadingblogs,
  // blogsList,
  // getImageForIndex,
}) => {
  // ✅ FIX 1: Safety Check / Early Return
  // If listOfdata is missing OR education_ids is missing/empty, don't render anything.
  if (!listOfdata?.education_ids?.length) {
    return <p className=" text-center">Loading...</p>
  }
  return (
    <section className="w-full mainContainer">
      {/* Title */}
      <h2 className="text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] py-[3rem] text-center">
        Education & Certifications
      </h2>

      {/* Education Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.2rem] w-full">
        {listOfdata && listOfdata.education_ids.map((edu: Education) => (
          <div
            key={edu.id}
            className="p-[2rem] w-full rounded-[0.8rem] border border-solid border-[#E2E6EE] dark:border-border bg-[#F7F9FC] dark:bg-surfaceMuted border-b-[4px]"
          >
            {/* University + Logo */}
            <div className="flex items-center gap-[1.8rem]">
              {edu?.thumbnail && (
                <Image
                  src={edu.thumbnail}
                  height={34}
                  width={34}
                  alt={edu.university_name}
                  className="h-[34px] w-[34px]"
                />
              )}
              <h3 className="text-[1.4rem] text-heading font-medium leading-[1.8rem]">
                {edu.university_name}
              </h3>
            </div>

            {/* Divider */}
            <hr className="w-full h-[0.2rem] bg-[#E2E6EE] dark:bg-border my-[2rem]" />

            {/* Degree Info */}
            <div>
              <h2 className="text-heading font-medium text-[1.6rem] leading-[2rem]">
                {edu.degree_name}
              </h2>
              {edu.degree_start_date && edu.degree_end_date && <p className="text-[1.2rem] font-normal text-paragraph1">
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
              </p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationComponent;
