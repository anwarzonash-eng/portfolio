import { useAppSelector } from '@/store';
import React from 'react'

const CV4HeaderP = ({ listOfdata }) => {
    const urlInfo = useAppSelector((state) => state.profile.profileUrlInfo);
    return (
        <>
            <header>
                <h1 className="cv4-print-name">
                    {listOfdata?.name}
                </h1>

                <p className="cv4-print-contact">
                    {[
                        listOfdata?.location,
                        !urlInfo?.u && listOfdata?.email,
                        !urlInfo?.u && listOfdata?.phone_no,
                        listOfdata?.github?.replace(/^https?:\/\//, ""),
                        !urlInfo?.u && listOfdata?.linkedin?.replace(/^https?:\/\//, ""),
                    ]
                        .filter(Boolean)
                        .join(" | ")}
                </p>
            </header>
        </>
    )
}

export default CV4HeaderP