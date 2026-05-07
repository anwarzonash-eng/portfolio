"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { X, Download, Plus, Trash2, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import CV4PdfDocument, { CV4DraftData, CV4Experience, CV4Education } from "./CV4PdfDocument";

// ─── PDFViewer is browser-only — load dynamically ────────────────────────────
const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((m) => ({ default: m.PDFViewer })),
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center h-full bg-gray-100">
                <Loader2 className="animate-spin w-8 h-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Loading preview…</span>
            </div>
        ),
    }
);

// ─── Constants ────────────────────────────────────────────────────────────────
const LS_KEY = "cv4_pdf_draft";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function buildDraft(listOfdata: any, experiences_for_cv4: any[]): CV4DraftData {
    return {
        name: listOfdata?.name || "",
        location: listOfdata?.location || "",
        email: listOfdata?.email || "",
        phone_no: listOfdata?.phone_no || "",
        linkedin: (listOfdata?.linkedIn || listOfdata?.linkedin || "").replace(/^https?:\/\//, ""),
        github: (listOfdata?.github || "").replace(/^https?:\/\//, ""),
        summary: listOfdata?.ai_short_description || "",
        skills: (listOfdata?.skills_ids || []).map((s: any) => s.title).filter(Boolean),
        experiences: (experiences_for_cv4 || []).map((exp: any) => ({
            id: exp.id || crypto.randomUUID(),
            title: exp.title || "",
            company_name: exp.company_name || "",
            starting_date: exp.starting_date || "",
            ending_Date: exp.ending_Date || exp.ending_date || "",
            is_still_working: !!exp.is_still_working,
            points: (exp.long_description || []).map((p: any) => p.point || "").filter(Boolean),
        })),
        education: (listOfdata?.education_ids || []).map((edu: any) => ({
            id: edu.id || crypto.randomUUID(),
            degree_name: edu.degree_name || "",
            university_name: edu.university_name || "",
        })),
    };
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionToggle({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(true);
    return (
        <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 text-sm font-semibold text-gray-700 transition-colors"
            >
                {title}
                {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {open && <div className="px-4 py-4 space-y-3">{children}</div>}
        </div>
    );
}

function Field({
    label,
    value,
    onChange,
    multiline = false,
    rows = 3,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    multiline?: boolean;
    rows?: number;
}) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
            {multiline ? (
                <textarea
                    rows={rows}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-y"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
            )}
        </div>
    );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
interface Props {
    listOfdata: any;
    experiences_for_cv4: any[];
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

    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleCancel(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

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

    const setExpField = (expIdx: number, key: keyof CV4Experience, value: any) =>
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

    const handleCancel = () => {
        localStorage.removeItem(LS_KEY);
        onClose();
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
                    <SectionToggle title={`Skills (${formData.skills.length})`}>
                        {formData.skills.map((skill, idx) => (
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

                    {/* Work Experience */}
                    <SectionToggle title={`Work Experience (${formData.experiences.length})`}>
                        {formData.experiences.map((exp, expIdx) => (
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

                    {/* Education */}
                    <SectionToggle title={`Education (${formData.education.length})`}>
                        {formData.education.map((edu, eduIdx) => (
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
                </div>

                {/* Right: Live PDF Preview */}
                <div className="flex-1 bg-gray-200 flex flex-col">
                    <div className="text-xs text-center text-gray-500 py-2 bg-gray-100 border-b border-gray-300">
                        Live Preview — updates as you type
                    </div>
                    <div className="flex-1">
                        <PDFViewer width="100%" height="100%" showToolbar={false}>
                            <CV4PdfDocument data={formData} />
                        </PDFViewer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CV4PdfEditorModal;
