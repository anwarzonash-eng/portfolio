"use client";
import React from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import SectionToggle from "./SectionToggle";
import Field from "./Field";
import type { CV4Experience } from "@/components/CV4PageComponents/CV4PdfDocument";

interface CV4ExperienceFormProps {
    experiences: CV4Experience[];
    openExpIdx: number | null;
    setOpenExpIdx: (idx: number | null) => void;
    setExpField: (expIdx: number, key: keyof CV4Experience, value: string | boolean | string[]) => void;
    setExpPoint: (expIdx: number, ptIdx: number, value: string) => void;
    addExpPoint: (expIdx: number) => void;
    removeExpPoint: (expIdx: number, ptIdx: number) => void;
    addExperience: () => void;
    removeExperience: (idx: number) => void;
}

/** Work experience editor with per-entry accordion (extracted verbatim from CV4PdfEditorModal). */
const CV4ExperienceForm = ({
    experiences,
    openExpIdx,
    setOpenExpIdx,
    setExpField,
    setExpPoint,
    addExpPoint,
    removeExpPoint,
    addExperience,
    removeExperience,
}: CV4ExperienceFormProps) => (
    <SectionToggle title={`Work Experience (${experiences.length})`}>
        {experiences.map((exp, expIdx) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
                <button
                    onClick={() => setOpenExpIdx(openExpIdx === expIdx ? null : expIdx)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 text-sm font-medium text-gray-700"
                >
                    <span className="truncate">{exp.title || exp.company_name || `Experience ${expIdx + 1}`}</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); removeExperience(expIdx); }}
                            className="p-1 text-red-400 hover:text-red-600"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        {openExpIdx === expIdx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                </button>
                {openExpIdx === expIdx && (
                    <div className="px-3 py-3 space-y-2.5">
                        <Field label="Job Title" value={exp.title} onChange={(v) => setExpField(expIdx, "title", v)} />
                        <Field label="Company" value={exp.company_name} onChange={(v) => setExpField(expIdx, "company_name", v)} />
                        <div className="grid grid-cols-2 gap-2">
                            <Field label="Start Date (YYYY-MM-DD)" value={exp.starting_date} onChange={(v) => setExpField(expIdx, "starting_date", v)} />
                            {!exp.is_still_working && (
                                <Field label="End Date (YYYY-MM-DD)" value={exp.ending_Date} onChange={(v) => setExpField(expIdx, "ending_Date", v)} />
                            )}
                        </div>
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={exp.is_still_working}
                                onChange={(e) => setExpField(expIdx, "is_still_working", e.target.checked)}
                                className="rounded"
                            />
                            Currently working here
                        </label>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Bullet Points</label>
                            {exp.points.map((pt, ptIdx) => (
                                <div key={ptIdx} className="flex items-start gap-1 mb-1.5">
                                    <textarea
                                        rows={2}
                                        value={pt}
                                        onChange={(e) => setExpPoint(expIdx, ptIdx, e.target.value)}
                                        className="flex-1 text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
                                    />
                                    <button
                                        onClick={() => removeExpPoint(expIdx, ptIdx)}
                                        className="mt-1 p-1 text-red-400 hover:text-red-600"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addExpPoint(expIdx)}
                                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1"
                            >
                                <Plus className="w-3.5 h-3.5" /> Add Bullet
                            </button>
                        </div>
                    </div>
                )}
            </div>
        ))}
        <button
            onClick={addExperience}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1"
        >
            <Plus className="w-3.5 h-3.5" /> Add Experience
        </button>
    </SectionToggle>
);

export default CV4ExperienceForm;
