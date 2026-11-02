const CV4SkillsP = ({ sortedSkills }) => {
    return (
        <>
            {sortedSkills?.length > 0 && (
                <section>
                    <h2 className="cv4-print-section-header cv4-print-section-header-skills">
                        Skills
                    </h2>
                    <p className="cv4-print-skills-text">
                        {sortedSkills.map(skill => skill.title || skill.name).join(', ')}
                    </p>
                </section >)}
        </>
    )
}

export default CV4SkillsP