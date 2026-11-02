"use client";
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import SectionToggle from "./SectionToggle";

interface CV4SkillsFormProps {
    skills: string[];
    setSkill: (idx: number, value: string) => void;
    addSkill: () => void;
    removeSkill: (idx: number) => void;
}

/** Skills list editor (extracted verbatim from CV4PdfEditorModal). */
const CV4SkillsForm = ({ skills, setSkill, addSkill, removeSkill }: CV4SkillsFormProps) => (
    <SectionToggle title={`Skills (${skills.length})`}>
        {skills.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-2">
                <input
                    type="text"
                    value={skill}
                    onChange={(e) => setSkill(idx, e.target.value)}
                    className="flex-1 text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <button
                    onClick={() => removeSkill(idx)}
                    className="p-1 text-red-400 hover:text-red-600"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        ))}
        <button
            onClick={addSkill}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1"
        >
            <Plus className="w-3.5 h-3.5" /> Add Skill
        </button>
    </SectionToggle>
);

export default CV4SkillsForm;
