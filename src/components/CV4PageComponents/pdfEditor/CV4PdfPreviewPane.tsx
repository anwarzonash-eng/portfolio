"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import CV4PdfDocument, { type CV4DraftData } from "@/components/CV4PageComponents/CV4PdfDocument";

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

/** Right-hand live PDF preview column (extracted verbatim from CV4PdfEditorModal). */
const CV4PdfPreviewPane = ({ formData }: { formData: CV4DraftData }) => (
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
);

export default CV4PdfPreviewPane;
