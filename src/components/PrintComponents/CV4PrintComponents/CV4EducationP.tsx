const CV4EducationP = ({ listOfdata }) => {
    // helper to convert YYYY-MM-DD or YYYY-MM to "Month YYYY" (e.g. May 2022)

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