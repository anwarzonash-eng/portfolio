import { useAppSelector } from '@/store';
import React from 'react'

const CV4Header = ({ listOfdata }) => {
    const urlInfo = useAppSelector((state) => state.profile.profileUrlInfo);
    return (
        <>
            <header>
                <h1 className="cv-name">{listOfdata?.name}</h1>
                {!urlInfo?.u && <p className="cv-location">{listOfdata?.location}</p>}
                <p className="cv-contact">
                    {[
                        urlInfo?.u && listOfdata?.location,
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

export default CV4Header