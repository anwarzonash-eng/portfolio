import { useAppSelector } from '@/store';
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
                        !urlInfo?.u && listOfdata?.email,
                        !urlInfo?.u && listOfdata?.phone_no,
                        listOfdata?.linkedIn?.replace(/^https?:\/\//, ""),
                        listOfdata?.github?.replace(/^https?:\/\//, ""),
                        !urlInfo?.u && listOfdata?.linkedin?.replace(/^https?:\/\//, ""),
                        listOfdata?.location,
                    ]
                        .filter(Boolean)
                        .join(" | ")}
                </p>
            </header>
        </>
    )
}

export default CV4HeaderP