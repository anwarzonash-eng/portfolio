import React from "react";

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
  if (isNaN(d.getTime())) return String(value);
  // format as MM/YYYY (e.g., 01/2023)
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear());
  return `${month}/${year}`;
};

const CV2Experiences: React.FC<Props> = ({
  rawExperiences = [],
  listOfdata,
  isMobile = false,
}) => {
  const FIVE_YEARS_MS = 5 * 365 * 24 * 60 * 60 * 1000;

  const filtered = (rawExperiences || []).filter((exp: any) => {
    if (!exp) return false;
    const company = (exp.company_name || exp.company || exp.companyname || "")
      .toString()
      .toLowerCase();
    if (company.includes("upwork")) return false;

    const startVal = exp.starting_date ?? exp.start_date ?? exp.startDate;
    if (!startVal) return false;
    const d = new Date(startVal);
    if (isNaN(d.getTime())) return false;

    return Date.now() - d.getTime() <= FIVE_YEARS_MS;
  });

  const shuffleArray = (arr: string[]) => {
    const a = Array.isArray(arr) ? arr.slice() : [];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

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
    const allBullets =
      longBullets.length > 0
        ? longBullets
        : extractBulletsFromHtml(exp?.short_description);

    const bullets = shuffleArray(allBullets).slice(0, 5); // pick 5 random bullets

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
    <section className="mt-[1.2rem]">
      <h2 className="cv2SecondaryHeading">EMPLOYMENT HISTORY</h2>
      <div className="mt-[1rem] space-y-[1.4rem]">
        {experiences.map((exp, index) => (
          <div key={exp.id || index} className="flex gap-[1.6rem]">
            <div className="w-[16rem] flex-shrink-0">
              <div className="cv2SDateStyles">{exp.date}</div>
              <div className="mt-[0.4rem] text-[1.4rem] text-paragraph1">{exp.location}</div>
            </div>
            <div className="flex-1 border-l border-[#E5E7EB] pl-[1.6rem] relative">
              <span className="absolute -left-[0.7rem] top-0 h-[1.2rem] w-[1.2rem] rounded-full bg-primary" />
              <div className="text-[1.6rem] font-semibold text-heading">
                {exp.title}
              </div>
              <div className="text-[1.5rem] text-primary font-medium">
                {exp.company}
              </div>
              {exp.bullets?.length > 0 && (
                <ul className="mt-[0.8rem] list-disc pl-[1.6rem] text-[1.4rem] text-paragraph1 space-y-[0.4rem]">
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
                  <div className="flex items-center gap-[1rem] mt-3 lg:gap-[0.7rem] flex-wrap text-[1.4rem] w-full">
                    {(() => {
                      const skills = exp.skills || [];
                      const isSkillsNested =
                        Array.isArray(skills) &&
                        skills.length > 0 &&
                        Array.isArray(skills[0]);
                      const flatSkills = isSkillsNested ? skills.flat() : skills;
                      const skillsToShow = Array.isArray(flatSkills)
                        ? flatSkills
                        : [];

                      return (
                        skillsToShow.length > 0 && (
                          <div
                            className="text-paragraph1 text-[1.4rem] leading-normal capitalize"
                          >
                            {skillsToShow.map(skill => skill?.title).join(", ")}
                          </div>
                        )
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

export default CV2Experiences;
