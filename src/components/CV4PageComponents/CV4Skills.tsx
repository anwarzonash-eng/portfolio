import React from 'react'

const CV4Skills = ({ sortedSkills }) => {
    return (
        <>

            {sortedSkills && sortedSkills.length > 0 && (<section>
                <h2 className="cv-section-header">Skills</h2>
                <p className="cv-skills-text">
                    <strong>{sortedSkills?.map(skill => skill.title)?.join(', ')}</strong>
                </p>
            </section>)}

        </>
    )
}

export default CV4Skills