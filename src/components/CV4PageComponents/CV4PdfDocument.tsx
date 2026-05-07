import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface CV4Experience {
    id: string;
    title: string;
    company_name: string;
    starting_date: string;
    ending_Date: string;
    is_still_working: boolean;
    points: string[];
}

export interface CV4Education {
    id: string;
    degree_name: string;
    university_name: string;
}

export interface CV4DraftData {
    name: string;
    location: string;
    email: string;
    phone_no: string;
    linkedin: string;
    github: string;
    summary: string;
    skills: string[];
    experiences: CV4Experience[];
    education: CV4Education[];
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
    page: {
        paddingTop: 45,
        paddingBottom: 45,
        paddingLeft: 55,
        paddingRight: 55,
        fontFamily: "Helvetica",
        fontSize: 10,
        color: "#1a1a1a",
    },
    name: {
        fontSize: 22,
        fontFamily: "Helvetica-Bold",
        textAlign: "center",
        marginBottom: 4,
    },
    contact: {
        fontSize: 9,
        textAlign: "center",
        color: "#444",
        marginBottom: 16,
    },
    sectionHeader: {
        fontSize: 10.5,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        borderBottomWidth: 1,
        borderBottomColor: "#1a1a1a",
        paddingBottom: 2,
        marginTop: 14,
        marginBottom: 6,
    },
    bodyText: {
        fontSize: 9.5,
        lineHeight: 1.5,
        textAlign: "justify",
    },
    skillsText: {
        fontSize: 9.5,
        lineHeight: 1.5,
    },
    jobHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 3,
    },
    jobTitle: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        flex: 1,
    },
    jobDate: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        textAlign: "right",
    },
    bulletRow: {
        flexDirection: "row",
        marginBottom: 2,
        marginLeft: 10,
    },
    bulletDot: {
        width: 10,
        fontSize: 9.5,
    },
    bulletText: {
        flex: 1,
        fontSize: 9.5,
        lineHeight: 1.4,
    },
    educationTitle: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        marginBottom: 3,
    },
    expBlock: {
        marginBottom: 8,
    },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const formatDate = (d: string) => {
    if (!d) return "";
    if (d.includes(" ")) return d;
    const parts = d.split("-");
    if (parts.length >= 2) {
        return `${MONTHS[parseInt(parts[1], 10) - 1] || parts[1]} ${parts[0]}`;
    }
    return d;
};

// ─── Component ────────────────────────────────────────────────────────────────
const CV4PdfDocument = ({ data }: { data: CV4DraftData }) => {
    const contactParts = [
        data.location,
        data.email,
        data.phone_no,
        data.linkedin,
        data.github,
    ].filter(Boolean);

    return (
        <Document>
            <Page size="A4" style={S.page}>
                {/* ── Header ─────────────────────────────────── */}
                <Text style={S.name}>{data.name}</Text>
                <Text style={S.contact}>{contactParts.join(" | ")}</Text>

                {/* ── Summary ────────────────────────────────── */}
                {data.summary ? (
                    <View>
                        <Text style={S.sectionHeader}>Summary</Text>
                        <Text style={S.bodyText}>{data.summary}</Text>
                    </View>
                ) : null}

                {/* ── Skills ─────────────────────────────────── */}
                {data.skills.length > 0 ? (
                    <View>
                        <Text style={S.sectionHeader}>Skills</Text>
                        <Text style={S.skillsText}>{data.skills.join(", ")}</Text>
                    </View>
                ) : null}

                {/* ── Work Experience ─────────────────────────── */}
                {data.experiences.length > 0 ? (
                    <View>
                        <Text style={S.sectionHeader}>Work Experience</Text>
                        {data.experiences.map((exp) => (
                            <View key={exp.id} style={S.expBlock}>
                                <View style={S.jobHeader}>
                                    <Text style={S.jobTitle}>
                                        {exp.title}{exp.company_name ? ` | ${exp.company_name}` : ""}
                                    </Text>
                                    <Text style={S.jobDate}>
                                        {formatDate(exp.starting_date)} –{" "}
                                        {exp.is_still_working ? "Present" : formatDate(exp.ending_Date)}
                                    </Text>
                                </View>
                                {exp.points.filter(Boolean).map((point, i) => (
                                    <View key={i} style={S.bulletRow}>
                                        <Text style={S.bulletDot}>•</Text>
                                        <Text style={S.bulletText}>{point}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                ) : null}

                {/* ── Education ──────────────────────────────── */}
                {data.education.length > 0 ? (
                    <View>
                        <Text style={S.sectionHeader}>Education</Text>
                        {data.education.map((edu) => (
                            <Text key={edu.id} style={S.educationTitle}>
                                {edu.degree_name}{edu.university_name ? ` | ${edu.university_name}` : ""}
                            </Text>
                        ))}
                    </View>
                ) : null}
            </Page>
        </Document>
    );
};

export default CV4PdfDocument;
