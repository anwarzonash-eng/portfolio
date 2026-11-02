"use client";
import React from "react";

/** Labelled text input / textarea used throughout the CV4 PDF editor. */
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

export default Field;
