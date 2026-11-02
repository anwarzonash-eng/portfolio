"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Download, Loader2 } from "lucide-react";
import CV4PdfDocument, { CV4DraftData, CV4Experience, CV4Education } from "./CV4PdfDocument";
import SectionToggle from "./pdfEditor/SectionToggle";
import Field from "./pdfEditor/Field";
import CV4SkillsForm from "./pdfEditor/CV4SkillsForm";
import CV4ExperienceForm from "./pdfEditor/CV4ExperienceForm";
import CV4EducationForm from "./pdfEditor/CV4EducationForm";
import CV4PdfPreviewPane from "./pdfEditor/CV4PdfPreviewPane";
import type { Education, Experience, ProfileReport, SkillRef } from "@/types/api";

// ─── Constants ────────────────────────────────────────────────────────────────
const LS_KEY = "cv4_pdf_draft";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function buildDraft(listOfdata: ProfileReport | null, experiences_for_cv4: Experience[]): CV4DraftData {
    return {
        name: listOfdata?.name || "",
        location: listOfdata?.location || "",
        email: listOfdata?.email || "",
        phone_no: listOfdata?.phone_no || "",
        linkedin: (listOfdata?.linkedIn || listOfdata?.linkedin || "").replace(/^https?:\/\//, ""),
        github: (listOfdata?.github || "").replace(/^https?:\/\//, ""),
        summary: listOfdata?.ai_short_description || "",
        skills: (listOfdata?.skills_ids || []).map((s: SkillRef) => s.title).filter(Boolean),
        experiences: (experiences_for_cv4 || []).map((exp: Experience) => ({
            id: String(exp.id || crypto.randomUUID()),
            title: exp.title || "",
            company_name: exp.company_name || "",
            starting_date: exp.starting_date || "",
            ending_Date: exp.ending_Date || exp.ending_date || "",
            is_still_working: !!exp.is_still_working,
            points: (Array.isArray(exp.long_description) ? exp.long_description : [])
                .map((p: { point?: string }) => p.point || "")
                .filter(Boolean),
        })),
        education: (listOfdata?.education_ids || []).map((edu: Education) => ({
            id: String(edu.id || crypto.randomUUID()),
            degree_name: edu.degree_name || "",
            university_name: edu.university_name || "",
        })),
    };
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
interface Props {
    listOfdata: ProfileReport | null;
    experiences_for_cv4: Experience[];
    onClose: () => void;
}

const CV4PdfEditorModal = ({ listOfdata, experiences_for_cv4, onClose }: Props) => {
    // Initialise from localStorage if present, otherwise build from live data
    const [formData, setFormData] = useState<CV4DraftData>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(LS_KEY);
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch { /* fall through */ }
            }
        }
        return buildDraft(listOfdata, experiences_for_cv4);
    });

    const [downloading, setDownloading] = useState(false);
    const [openExpIdx, setOpenExpIdx] = useState<number | null>(null);

    // Persist every change to localStorage
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(formData));
    }, [formData]);

    const handleCancel = useCallback(() => {
        localStorage.removeItem(LS_KEY);
        onClose();
    }, [onClose]);

    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleCancel(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [handleCancel]);

    // Prevent body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    // ── Update helpers ──────────────────────────────────────────────────────
    const setField = <K extends keyof CV4DraftData>(key: K, value: CV4DraftData[K]) =>
        setFormData((prev) => ({ ...prev, [key]: value }));

    const setSkill = (idx: number, value: string) =>
        setFormData((prev) => {
            const skills = [...prev.skills];
            skills[idx] = value;
            return { ...prev, skills };
        });

    const addSkill = () => setFormData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));

    const removeSkill = (idx: number) =>
        setFormData((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));

    const setExpField = (expIdx: number, key: keyof CV4Experience, value: string | boolean | string[]) =>
        setFormData((prev) => {
            const experiences = prev.experiences.map((e, i) =>
                i === expIdx ? { ...e, [key]: value } : e
            );
            return { ...prev, experiences };
        });

    const setExpPoint = (expIdx: number, ptIdx: number, value: string) =>
        setFormData((prev) => {
            const experiences = prev.experiences.map((e, i) => {
                if (i !== expIdx) return e;
                const points = [...e.points];
                points[ptIdx] = value;
                return { ...e, points };
            });
            return { ...prev, experiences };
        });

    const addExpPoint = (expIdx: number) =>
        setFormData((prev) => {
            const experiences = prev.experiences.map((e, i) =>
                i === expIdx ? { ...e, points: [...e.points, ""] } : e
            );
            return { ...prev, experiences };
        });

    const removeExpPoint = (expIdx: number, ptIdx: number) =>
        setFormData((prev) => {
            const experiences = prev.experiences.map((e, i) =>
                i === expIdx ? { ...e, points: e.points.filter((_, j) => j !== ptIdx) } : e
            );
            return { ...prev, experiences };
        });

    const addExperience = () =>
        setFormData((prev) => ({
            ...prev,
            experiences: [
                ...prev.experiences,
                {
                    id: crypto.randomUUID(),
                    title: "",
                    company_name: "",
                    starting_date: "",
                    ending_Date: "",
                    is_still_working: false,
                    points: [""],
                },
            ],
        }));

    const removeExperience = (idx: number) =>
        setFormData((prev) => ({
            ...prev,
            experiences: prev.experiences.filter((_, i) => i !== idx),
        }));

    const setEduField = (eduIdx: number, key: keyof CV4Education, value: string) =>
        setFormData((prev) => {
            const education = prev.education.map((e, i) =>
                i === eduIdx ? { ...e, [key]: value } : e
            );
            return { ...prev, education };
        });

    const addEducation = () =>
        setFormData((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                { id: crypto.randomUUID(), degree_name: "", university_name: "" },
            ],
        }));

    const removeEducation = (idx: number) =>
        setFormData((prev) => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== idx),
        }));

    // ── Actions ────────────────────────────────────────────────────────────
    const handleDownload = async () => {
        setDownloading(true);
        try {
            const { pdf } = await import("@react-pdf/renderer");
            const blob = await pdf(<CV4PdfDocument data={formData} />).toBlob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${formData.name || "cv"}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            localStorage.removeItem(LS_KEY);
            onClose();
        } finally {
            setDownloading(false);
        }
    };


    // ── Render ──────────────────────────────────────────────────────────────
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col bg-black/60 backdrop-blur-sm">
            {/* ── Top Bar ─────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shrink-0">
                <h2 className="text-lg font-bold text-gray-800">Edit & Preview CV</h2>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">Changes auto-saved locally</span>
                    <button
                        onClick={handleDownload}
                        disabled={downloading}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                        {downloading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Download className="w-4 h-4" />
                        )}
                        {downloading ? "Generating…" : "Download PDF"}
                    </button>
                    <button
                        onClick={handleCancel}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Cancel
                    </button>
                </div>
            </div>

            {/* ── Body: Editor + Preview ───────────────────────────────────── */}
            <div className="flex flex-1 min-h-0">
                {/* Left: Form */}
                <div className="w-[42%] overflow-y-auto bg-white p-6 border-r border-gray-200">
                    {/* Personal Info */}
                    <SectionToggle title="Personal Information">
                        <Field label="Full Name" value={formData.name} onChange={(v) => setField("name", v)} />
                        <Field label="Location" value={formData.location} onChange={(v) => setField("location", v)} />
                        <Field label="Email" value={formData.email} onChange={(v) => setField("email", v)} />
                        <Field label="Phone" value={formData.phone_no} onChange={(v) => setField("phone_no", v)} />
                        <Field label="LinkedIn URL" value={formData.linkedin} onChange={(v) => setField("linkedin", v)} />
                        <Field label="GitHub URL" value={formData.github} onChange={(v) => setField("github", v)} />
                    </SectionToggle>

                    {/* Summary */}
                    <SectionToggle title="Summary">
                        <Field
                            label="Professional Summary"
                            value={formData.summary}
                            onChange={(v) => setField("summary", v)}
                            multiline
                            rows={5}
                        />
                    </SectionToggle>

                    {/* Skills */}
                    <CV4SkillsForm
                        skills={formData.skills}
                        setSkill={setSkill}
                        addSkill={addSkill}
                        removeSkill={removeSkill}
                    />

                    {/* Work Experience */}
                    <CV4ExperienceForm
                        experiences={formData.experiences}
                        openExpIdx={openExpIdx}
                        setOpenExpIdx={setOpenExpIdx}
                        setExpField={setExpField}
                        setExpPoint={setExpPoint}
                        addExpPoint={addExpPoint}
                        removeExpPoint={removeExpPoint}
                        addExperience={addExperience}
                        removeExperience={removeExperience}
                    />

                    {/* Education */}
                    <CV4EducationForm
                        education={formData.education}
                        setEduField={setEduField}
                        addEducation={addEducation}
                        removeEducation={removeEducation}
                    />
                </div>

                {/* Right: Live PDF Preview */}
                <CV4PdfPreviewPane formData={formData} />
            </div>
        </div>
    );
};

export default CV4PdfEditorModal;
