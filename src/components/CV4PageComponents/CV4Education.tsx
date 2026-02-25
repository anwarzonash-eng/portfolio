import React from 'react'

const CV4Education = ({ listOfdata }) => {
    return (
        <>

            {listOfdata?.education_ids && listOfdata.education_ids.length > 0 && (<section>
                <h2 className="cv-section-header">Education</h2>

                {listOfdata.education_ids.map((edu: any) => (
                    <div key={edu.id} className="mb-4">
                        <div className="cv-job-header">
                            <div className="cv-job-title">{edu?.degree_name} | {edu.university_name}</div>

                        </div>
                    </div>
                ))}

            </section>)}
        </>
    )
}

export default CV4Education
