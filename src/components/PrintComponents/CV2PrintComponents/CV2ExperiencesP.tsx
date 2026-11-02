import React from "react";
import { modifiedContentHideLinks } from "@/hooks/modifiedContentHideLinks";
import type { Experience, ProfileReport, SkillRef } from "@/types/api";
type Props = {
  rawExperiences?: Experience[];
  listOfdata?: ProfileReport | null;
  bulletCount?: number;
};


const extractBulletsFromHtml = (html?: string,
  filteredSkills?: SkillRef[],
  listOfdata?: ProfileReport | null,) => {
  if (!html) return [] as string[];
  const processedHtml = modifiedContentHideLinks(html, filteredSkills, listOfdata);

  const matches = [...processedHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
  return matches.map((m) => m[1] || "").filter(Boolean);
};

const toMonthYear = (value: string | undefined) => {
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
  bulletCount,
}) => {
  // Remove the filtering logic since experiences should already be filtered by the hook
  const filtered = (rawExperiences || []).filter((exp: Experience) => {
    if (!exp) return false;

    // Basic validation - ensure we have valid experience data
    const startVal = exp.starting_date ?? exp.start_date ?? exp.startDate;
    if (!startVal) return false;
    const d = new Date(startVal);
    if (isNaN(d.getTime())) return false;

    return true; // Accept all valid experiences since filtering is done by the hook
  });

  const shuffleArray = (arr: string[]) => {
    const a = Array.isArray(arr) ? arr.slice() : [];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const formatType = (type: string) => {
    if (!type) return "";
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  const experiences = filtered.map((exp: Experience) => {
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

    // Use provided `bulletCount` prop when available, otherwise fallback to random 4-6
    const count =
      typeof bulletCount === "number" && bulletCount > 0
        ? Math.max(0, Math.floor(bulletCount))
        : Math.floor(Math.random() * 3) + 4; // 4-6 range fallback

    const bullets = shuffleArray(allBullets).slice(0, count);

    return {
      id: exp.id,
      date: [startLabel, exp.is_still_working ? "Present" : endLabel]
        .filter(Boolean)
        .join(" - "),
      location: exp?.location || exp?.city || listOfdata?.location || "",
      title: exp?.title || exp?.designation || "",
      company: exp?.company_name || "",
      bullets,
      skills: exp?.skills || [],
      type: formatType(exp?.type || ""),
      nature: exp?.nature || "",
    };
  });

  if (!experiences || experiences.length === 0) return null;

  return (
    <section className="mt-[1.2rem] mb-[2rem]">
      <div className="mt-[1rem] space-y-[1.4rem]">
        {experiences.map((exp, index) => (
          <div key={exp.id || index} className="flex gap-[1.6rem]">
            <div className="w-[16rem] flex-shrink-0">
              <div className="cv2SDateStyles">{exp.date}</div>
              <div className="mt-[0.4rem] text-[1.4rem] text-paragraph1">
                {exp.location}
              </div>

              <div className="text-[1.3rem] text-primary rounded-[0.4rem] mt-2   font-medium capitalize">
                {(exp.type || exp.nature) && (
                  <span className="text-primary font-medium ">
                    {[exp.type, exp.nature].filter(Boolean).join(", ")}
                  </span>
                )}
              </div>


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
                <ul className="mt-[0.8rem] list-disc pl-[1.6rem] text-[1.4rem] text-paragraph1 space-y-[0.4rem] border-dashed border-b border-gray-300 pb-6">
                  {exp.bullets.map((bullet: string, i: number) => (
                    <li
                      key={i}
                      dangerouslySetInnerHTML={{
                        __html: bullet,
                      }}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CV2Experiences;
