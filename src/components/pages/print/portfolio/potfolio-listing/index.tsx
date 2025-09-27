"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import "@/styles/printStyles/portfolio_p.css";
import Link from "next/link";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import PortfolioPopUp from "@/components/PortfolioPopUp";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { store } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import { modifiedContent } from "@/hooks/modifiedContent";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import ShowmoreSkills from "@/components/showmoreSkills";
import { useAppSelector } from "@/store";
import WorkProofLinks from "@/components/WorkProofLinks";
import ContactMeLinks from "@/components/ContactMeLinks";
import NoteDomainForPint from "@/components/NoteDomainForPint";
import DesignationDomain from "@/components/DesignationDomain";
import NoteClickable from "@/components/NoteClickable";
import EducationBlogsPortrait from "@/components/EducationBlogsPortrait";
import ContactMePrint from "@/components/ContactMePrint";
import HomeSliderPrint from "@/components/Sliders/HomeSliderPrint";

const PortfolioListing_p = ({ params }: { params: any }) => {
  const [
    selectedPorfolioPicturesforPopup,
    setSelectedPorfolioPicturesforPopup,
  ] = useState(null);
  const [showMoreSkills, setShowMoreSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlInfo, setURLInfo] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   setURLInfo(getRoutesDetails(params, searchParams));
  // }, [params, searchParams]);

  // Use getRoutesDetails
  useEffect(() => {
    // 🛑 Must wrap in an async function and call it 🛑
    const fetchRoutes = async () => {
      setURLInfo(await getRoutesDetails(params, searchParams));
    };
    fetchRoutes();
  }, [params, searchParams]);

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        actionType: "portfolio",
        urlInfo,
        setError,
        setLoading,
        setListOfData,
      });
  }, [urlInfo]);

  useBodyBackgroundColor("#EFF5FD");

  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills });
  }, []);

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  return (
    <div className="bg-[#EFF5FD]">
      {/* Welcome ✅ */}
      <section className="print:h-screen print:section bg-bannerBG !w-full print:FlexWrapContainer flex items-center justify-center relative">
        {/* Note For BTN */}
        <NoteClickable />
        {/* Welcome Card */}
        <div className="text-center p-[4rem] print:p-0">
          <div className="items-center justify-strat gap-[4rem] flex flex-col w-full">
            <img
              src={listOfdatas?.profile_photo_1}
              alt=""
              className="size-[245px] rounded-full"
            />
            <div className="flex items-start justify-start flex-col">
              <h2 className="text-[7rem] font-bold"> {listOfdata?.name}</h2>
              <div className="text-[4rem] font-medium flex items-center justify-center flex-wrap gap-[3px] w-full">
                {" "}
                {listOfdatas?.designation?.split("|").map((item, index) => (
                  <div key={index} className="text-center">
                    {item.trim()}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center w-full">
                <DesignationDomain />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-[2.1rem] mt-[4rem] mb-[0.8rem] ">
            {urlInfo?.u ? (
              <WorkProofLinks
                props={{
                  upwork: listOfdata?.upwork,
                  github: listOfdata?.github,
                  linkedIn: listOfdata?.linkedIn,
                  behance_link: listOfdata?.behance_link,
                  u: urlInfo?.u,
                }}
              />
            ) : (
              <>
                <WorkProofLinks
                  props={{
                    upwork: listOfdata?.upwork,
                    github: listOfdata?.github,
                    linkedIn: listOfdata?.linkedIn,
                    behance_link: listOfdata?.behance_link,
                    u: urlInfo?.u,
                  }}
                />
                <ContactMeLinks
                  props={{
                    email: listOfdata?.email,
                    phone_no: listOfdata?.phone_no,
                  }}
                />
              </>
            )}
          </div>
        </div>
      </section>

      {listOfdata && listOfdata?.portfolios_ids?.length > 0 && (
        <>
          {/* Portfolio Timeline Section */}
          <div className="bg-white max-w-[1550px] w-full mx-auto flex items-center justify-center">
            {/* Timeline items Container */}
            <div className="space-y-[3.5rem] print:space-y-0">
              {listOfdata?.portfolios_ids?.map((portfolio, index) => {
                const skills: {
                  [key: string]: {
                    title: string;
                    url?: string;
                    order?: string;
                  }[];
                } = skillsGrouping(
                  showMoreSkills[index]
                    ? portfolio?.skills
                    : portfolio?.skills?.slice(0, 15)
                );
                return (
                  <section
                    className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center overflow-hidden relative bg-white"
                    key={index}
                  >
                    <NoteDomainForPint
                      direction={"hidden print:right-0 print:block"}
                    />

                    <div className="max-w-[1550px] w-full mx-auto px-[4rem]">
                      <HomeSliderPrint
                        portfolios={[portfolio]}
                        isPortraitMode={true}
                        companyType={listOfdata?.companytype}
                        locationLink={`/?sectionId=myWork`}
                        portfolioId={portfolio?.id}
                        from={0}
                        max={1}
                      />
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
          {!urlInfo?.u && <ContactMePrint listOfdata={listOfdata} />}

          {/* Education & Blogs Section */}
          <EducationBlogsPortrait />
        </>
      )}
    </div>
  );
};

export default PortfolioListing_p;
