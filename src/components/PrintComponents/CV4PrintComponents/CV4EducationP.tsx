import React from 'react'

const CV4EducationP = ({ listOfdata }) => {
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
            {listOfdata?.education_ids && listOfdata.education_ids.length > 0 && (<section>
                <h2 className="cv4-print-section-header cv4-print-section-header-education">
                    Education
                </h2>

                {listOfdata.education_ids?.map((edu) => (
                    <div key={edu.id} className="cv4-print-education-item">
                        <div className="cv4-print-education-header">
                            <div className="cv4-print-job-title">
                                {edu?.degree_name} | {edu.university_name}
                            </div>
                        </div>
                    </div>
                ))}

            </section>)}
        </>
    )
}

export default CV4EducationP