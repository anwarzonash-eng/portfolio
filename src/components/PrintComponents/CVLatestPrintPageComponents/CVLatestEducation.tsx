import React from "react";
import { formatDate } from "@/hooks/formatdate";
import { dateFormatsOptions } from "@/data/JsonData";

type Props = {
  education?: any[] | null;
  location?: string | null;
};

const toMonthYear = (value: any) => {
  if (!value) return "";
  const d = new Date(value);
  return isNaN(d.getTime()) ? String(value) : formatDate(value, dateFormatsOptions.shortMonthYear);
};

const CVLatestEducation = ({ education, location }: Props) => {
  if (!education || education.length === 0) return null;

  return (
    <section className="mt-[1.8rem]">
      <h2 className="text-[1.6rem] font-semibold text-heading tracking-wide">EDUCATION</h2>
      <div className="mt-[1rem] space-y-[1.2rem]">
        {education.map((edu, index) => (
          <div key={index} className="flex gap-[1.6rem]">
            <div className="w-[16rem] flex-shrink-0 text-[1.2rem] text-[#4B5563]">
              <div className="font-semibold text-heading">
                {`${toMonthYear(edu?.degree_start_date)} - ${toMonthYear(edu?.degree_end_date)}`.trim()}
              </div>
              <div className="mt-[0.4rem]">{edu?.location || location}</div>
            </div>
            <div className="flex-1 border-l border-[#E5E7EB] pl-[1.6rem] relative">
              <span className="absolute -left-[0.45rem] top-[0.35rem] h-[0.8rem] w-[0.8rem] rounded-full bg-[#C98B12]" />
              <div className="text-[1.4rem] font-semibold text-heading">
                {edu?.degree_name || edu?.degree}
              </div>
              <div className="text-[1.3rem] text-primary font-medium">
                {edu?.university_name || edu?.school}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CVLatestEducation;
