import React from 'react'

const CV4ExperiencesP = ({ experiences_for_cv4 }) => {
    // helper to convert YYYY-MM-DD or YYYY-MM to "Month YYYY" (e.g. May 2022)
    const formatDate = (d) => {
        if (!d) return "";
        // if already contains a space (e.g. "May 2022"), assume formatted
        if (d.includes(" ")) return d;
        const parts = d.split("-");
        if (parts.length >= 2) {
            const monthNum = parseInt(parts[1], 10);
            const year = parts[0];
            const monthNames = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ];
            const monthName = monthNames[monthNum - 1] || parts[1];
            return `${monthName} ${year}`;
        }
        return d;
    };

    return (
        <>
            {experiences_for_cv4 && experiences_for_cv4.length > 0 && <section>
                <h2 className="cv4-print-section-header cv4-print-section-header-experience">
                    Work Experience
                </h2>

                {experiences_for_cv4?.map((experience) => (
                    <div key={experience.id} className="cv4-print-experience-item">
                        <div className="cv4-print-job-header">
                            <div className="cv4-print-job-title">
                                {experience?.title} | {experience?.company_name}
                            </div>
                            <div className="cv4-print-job-date">
                                {formatDate(experience?.starting_date)} - {experience?.ending_Date === "Present" ? "Present" : formatDate(experience?.ending_Date)}
                            </div>
                        </div>

                        <ul className="cv4-print-bullets">
                            {experience?.long_description?.slice(0, 2).map((desc, index) => (
                                <li key={index}>
                                    {desc.point}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>}
        </>
    )
}

export default CV4ExperiencesP