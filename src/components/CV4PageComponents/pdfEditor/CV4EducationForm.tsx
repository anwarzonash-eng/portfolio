"use client";
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import SectionToggle from "./SectionToggle";
import Field from "./Field";
import type { CV4Education } from "@/components/CV4PageComponents/CV4PdfDocument";

interface CV4EducationFormProps {
    education: CV4Education[];
    setEduField: (eduIdx: number, key: keyof CV4Education, value: string) => void;
    addEducation: () => void;
    removeEducation: (idx: number) => void;
}

/** Education list editor (extracted verbatim from CV4PdfEditorModal). */
const CV4EducationForm = ({
    education,
    setEduField,
    addEducation,
    removeEducation,
}: CV4EducationFormProps) => (
    <SectionToggle title={`Education (${education.length})`}>
        {education.map((edu, eduIdx) => (
            <div key={edu.id} className="flex flex-col gap-2 border border-gray-200 rounded p-3 mb-2">
                <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500">Entry {eduIdx + 1}</span>
                    <button
                        onClick={() => removeEducation(eduIdx)}
                        className="p-1 text-red-400 hover:text-red-600"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
                <Field label="Degree / Qualification" value={edu.degree_name} onChange={(v) => setEduField(eduIdx, "degree_name", v)} />
                <Field label="University / Institution" value={edu.university_name} onChange={(v) => setEduField(eduIdx, "university_name", v)} />
            </div>
        ))}
        <button
            onClick={addEducation}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1"
        >
            <Plus className="w-3.5 h-3.5" /> Add Education
        </button>
    </SectionToggle>
);

export default CV4EducationForm;
