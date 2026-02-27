import React from 'react'


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
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const monthName = monthNames[monthNum - 1] || parts[1];
        return `${monthName} ${year}`;
    }
    return d;
}

const CV4Experiences = ({ experiences_for_cv4 }) => {
    return (
        <>

            {experiences_for_cv4 && experiences_for_cv4.length > 0 && <section>
                <h2 className="cv-section-header">Work Experience</h2>

                {experiences_for_cv4?.map((experience) => (
                    <div key={experience.id}>


                        <div className="cv-job-header" >
                            <div>
                                <div className="cv-job-title">{experience?.title} | {experience?.company_name}</div>
                                {/* <div className="cv-company">Stripe</div> */}
                            </div>
                            <div className="cv-job-title">
                                <div>{formatDate(experience?.starting_date)} - {experience?.ending_Date === "Present" ? "Present" : formatDate(experience?.ending_Date)}</div>

                            </div>
                        </div>

                        {experience?.long_description?.map((experience, index) => (<ul className="cv-bullets" key={index}>
                            <li>{experience.point}</li>
                        </ul>))}
                    </div>
                ))}
            </section>}
        </>
    )
}

export default CV4Experiences