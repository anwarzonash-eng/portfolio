import React from "react";
import { CalendarDays, MapPin } from "lucide-react";
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

const CV3ExperiencesP: React.FC<Props> = ({
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

        // Use provided `bulletCount` prop when available, otherwise fallback to random 5-9
        const count = typeof bulletCount === "number" && bulletCount > 0
            ? Math.max(0, Math.floor(bulletCount))
            : Math.floor(Math.random() * 5) + 5; // 5-9 range fallback

        const bullets = shuffleArray(allBullets).slice(0, count);
        const formatType = (type: string) => {
            if (!type) return "";
            return type
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(" ");
        };
        return {
            id: exp.id,
            date: [startLabel, endLabel].filter(Boolean).join(" - "),
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
        <>
            {experiences.map((exp, index) => (
                <div key={exp.id || index} className="mb-6 border-dashed border-b border-gray-300 pb-4">
                    <h3 className="text-[18px] font-semibold text-black">{exp.title}</h3>
                    <div className="flex flex-col gap-2 mb-2">
                        <span className="text-blue-600 text-[15px] font-bold">{exp.company}
                            {(exp.type || exp.nature) && (
                                <span className="text-primary font-medium ml-2">
                                    ({[exp.type, exp.nature].filter(Boolean).join(", ")})
                                </span>
                            )}
                        </span>
                        <div className='flex gap-6 items-center font-medium'>

                            <span className="text-[12px] flex items-center gap-2 text-gray-600">
                                <CalendarDays className='w-5 h-5' /> {exp.date}
                            </span>
                            <span className="text-[12px] flex items-center gap-1 text-gray-600">
                                <MapPin className='w-5 h-5' /> {exp.location}
                            </span>
                        </div>
                    </div>
                    {exp.bullets?.length > 0 && (
                        <ul className="list-disc ml-8 text-[13px] text-gray-700 space-y-1  leading-normal">
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
            ))}
        </>
    );
};

export default CV3ExperiencesP;