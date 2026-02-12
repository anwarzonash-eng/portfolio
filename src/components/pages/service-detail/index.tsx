"use client";
import React, { useEffect, useState } from "react";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { handleCategoryPicture } from "@/hooks/apihandlers/categoryApiHandler";
import PageRendering from "@/components/PageRendering";
import { useAppSelector } from "@/store";
import OurBlogs from "@/components/OurBlogs";
import Newsletter from "@/components/Newsletter";
import ExpandableServiceCard from "@/components/ExpandableServiceCard";
import EducationComponent from "@/components/EducationComponent";
import UpworkActivitySection from "@/components/UpworkActivitySection";
import { formatDate } from "@/hooks/formatdate";
import { dateFormatsOptions } from "@/data/JsonData";

const ServiceDetail = ({ params }: { params: any }) => {
  useBodyBackgroundColor("#EFF5FD");

  const searchParams = useSearchParams();
  const selectedService = searchParams.get("service");

  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [mainService, setMainService] = useState(null);
  const [detailService, setDetailService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [categoryPictures, setCategoryPictures] = useState({});
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );
  const [activeDropdown, setActiveDropdown] = useState(0);

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

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
    if (urlInfo) {
      reportsApiHandler({
        urlInfo,
        setError,
        setLoading,
        setListOfData,
      });
    }
  }, [urlInfo]);

  useEffect(() => {
    if (urlInfo && listOfdata) {
      setMainService(
        listOfdata?.services?.find((service) => service.type === "main")
      );
      setDetailService(
        listOfdata?.services?.filter((service) => service.type === "detail")
      );
    }
  }, [listOfdata]);

  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills });
  }, []);

  useEffect(() => {
    if (Array.isArray(detailService)) {
      detailService.forEach((item) => {
        const category_id = item?.category_id;
        if (category_id) {
          handleCategoryPicture(category_id, setCategoryPictures);
        }
      });
    }
  }, [detailService]);

  const filteredServices = selectedService
    ? detailService?.filter((service) => service.title === selectedService)
    : detailService;

  return (
    <div className="bg-[#EFF5FD] print:my-[3rem]">
      <PageRendering
        props={{
          list: listOfdata,
          loading,
          error,
          actualPage: (
            <div className="mainContainer w-full mt-[6rem] relative">
              {filteredServices &&
                filteredServices
                  .filter((service) => service.title)
                  .map((service, index) => (
                    <ExpandableServiceCard
                      key={index}
                      service={service}
                      index={index}
                      activeDropdown={activeDropdown}
                      setActiveDropdown={setActiveDropdown}
                      // serviceRefs={serviceRefs}
                      listOfskills={listOfskills}
                      listOfdata={listOfdata}
                    />
                  ))}
            </div>
          ),
        }}
      />
      <>
        <div className="mt-[2rem] lg:mt-[3rem]">
          <UpworkActivitySection
            urlInfo={urlInfo}
            cvTrue={false}
            data={listOfdata}
          />
        </div>

        {/* Education Section */}
        <div id="education" className="my-[5rem]">
          {listOfdata && (
            <EducationComponent
              listOfdata={listOfdata}
              formatDate={formatDate}
              dateFormatsOptions={dateFormatsOptions}
            />
          )}
        </div>

        {/* Our Blogs */}
        <div className="my-[5rem]">
          <OurBlogs domain={listOfdata?.domain} />
        </div>
        {/* Newsletter */}
        {!urlInfo?.u && (
          <div className="w-full mb-[5rem]">
            <Newsletter listOfdata={listOfdata} />
          </div>
        )}
      </>
    </div>
  );
};

export default ServiceDetail;
