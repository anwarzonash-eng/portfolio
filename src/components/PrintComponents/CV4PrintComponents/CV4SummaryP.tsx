import React from 'react'

const CV4SummaryP = ({ summary }) => {
    return (
        <>
            <section>
                <h2 className="cv4-print-section-header cv4-print-section-header-summary">
                    Summary
                </h2>
                <p className="cv4-print-body-text">
                    {summary}
                </p>
            </section>
        </>
    )
}

export default CV4SummaryP