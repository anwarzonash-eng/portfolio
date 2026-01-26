import React from "react";
import { formatDate } from "@/hooks/formatdate";
import { dateFormatsOptions } from "@/data/JsonData";
import Link from "next/link";

type Props = {
  rawExperiences?: any[];
  listOfdata?: any;
  isMobile?: boolean;
};

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

const extractBulletsFromHtml = (html?: string) => {
  if (!html) return [] as string[];
  const matches = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
  return matches.map((m) => stripHtml(m[1] || "")).filter(Boolean);
};

const toMonthYear = (value: any) => {
  if (!value) return "";
  const d = new Date(value);
  return isNaN(d.getTime())
    ? String(value)
    : formatDate(value, dateFormatsOptions.shortMonthYear);
};

const CVLatestExperiences: React.FC<Props> = ({
  rawExperiences = [],
  listOfdata,
  isMobile = false,
}) => {
  const FIVE_YEARS_MS = 5 * 365 * 24 * 60 * 60 * 1000;

  const filtered = (rawExperiences || []).filter((exp: any) => {
    if (!exp) return false;
    const company = (
      exp.company_name || exp.company || exp.companyname || ""
    )
      .toString()
      .toLowerCase();
    if (company.includes("upwork")) return false;

    const startVal = exp.starting_date ?? exp.start_date ?? exp.startDate;
    if (!startVal) return false;
    const d = new Date(startVal);
    if (isNaN(d.getTime())) return false;

    return Date.now() - d.getTime() <= FIVE_YEARS_MS;
  });

  const experiences = filtered.map((exp: any) => {
    const startLabel = toMonthYear(
      exp?.starting_date ?? exp?.start_date ?? exp?.startDate,
    );
    const endRaw = exp?.ending_Date ?? exp?.end_date ?? exp?.endDate;
    const endLabel =
      endRaw == null || String(endRaw).trim().toLowerCase() === "present"
        ? "Present"
        : toMonthYear(endRaw);

    const longBullets = extractBulletsFromHtml(exp?.long_description);
    const bullets = (
      longBullets.length > 0
        ? longBullets
        : extractBulletsFromHtml(exp?.short_description)
    ).slice(0, 7); // limit to 7 bullets

    return {
      id: exp.id,
      date: [startLabel, endLabel].filter(Boolean).join(" - "),
      location: exp?.location || exp?.city || listOfdata?.location || "",
      title: exp?.title || exp?.designation || "",
      company: exp?.company_name || "",
      bullets,
      skills: exp?.skills || [],
    };
  });

  if (!experiences || experiences.length === 0) return null;

  return (
    <section className="mt-[1.8rem]">
      <h2 className="text-[1.6rem] font-semibold text-heading tracking-wide">
        EXPERIENCE
      </h2>
      <div className="mt-[1rem] space-y-[1.6rem]">
        {experiences.map((exp, index) => (
          <div key={exp.id || index} className="flex gap-[1.6rem]">
            <div className="w-[16rem] flex-shrink-0 text-[1.2rem] text-[#4B5563]">
              <div className="font-semibold text-heading">{exp.date}</div>
              <div className="mt-[0.4rem]">{exp.location}</div>
            </div>
            <div className="flex-1 border-l border-[#E5E7EB] pl-[1.6rem] relative">
              <span className="absolute -left-[0.45rem] top-[0.35rem] h-[0.8rem] w-[0.8rem] rounded-full bg-[#C98B12]" />
              <div className="text-[1.4rem] font-semibold text-heading">{exp.title}</div>
              <div className="text-[1.3rem] text-primary font-medium">{exp.company}</div>
              {exp.bullets?.length > 0 && (
                <ul className="mt-[0.8rem] list-disc pl-[1.6rem] text-[1.2rem] text-[#4B5563] space-y-[0.4rem]">
                  {exp.bullets.map((bullet: string, i: number) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
              {/* Areas of expertise for this experience */}
              {Array.isArray(exp.skills) && exp.skills.length > 0 && (
                <div className="w-full mt-[1.6rem]">
                  <h4 className="text-primary text-[1.5rem] font-medium mb-[1.2rem]">
                    AREAS OF EXPERTISE I'VE WORKED IN
                  </h4>
                  <div className="flex items-center gap-[1rem] mt-3 lg:gap-[0.7rem] flex-wrap text-[1.2rem] w-full">
                          {(() => {
                            const skills = exp.skills || [];
                            const isSkillsNested =
                              Array.isArray(skills) && skills.length > 0 && Array.isArray(skills[0]);
                            const flatSkills = isSkillsNested ? skills.flat() : skills;
                            const initialSkillLimit = isMobile ? 6 : 15;
                            const skillsToShow = flatSkills.slice(0, initialSkillLimit);

                            return (
                              Array.isArray(skillsToShow) &&
                              skillsToShow.length > 0 &&
                              skillsToShow.map((skill: any, i: number) => (
                                skill?.url ? (
                                  <Link
                                    key={skill.url || skill.title || i}
                                    href={skill.url || "#"}
                                    target="_blank"
                                    className="hover:bg-primary hover:text-white py-[0.4rem] print:py-[0.1rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                                  >
                                    {skill.title}
                                  </Link>
                                ) : (
                                  <div
                                    key={skill.title || i}
                                    className="hover:bg-primary hover:text-white py-[0.4rem] print:py-[0.1rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                                  >
                                    {skill.title}
                                  </div>
                                )
                              ))
                            );
                          })()}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CVLatestExperiences;