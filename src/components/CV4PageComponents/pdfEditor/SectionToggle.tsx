"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

/** Collapsible form section used throughout the CV4 PDF editor. */
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

export default SectionToggle;
