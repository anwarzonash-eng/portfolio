"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { formatDate } from "@/hooks/formatdate";
import { dateFormatsOptions } from "@/data/JsonData";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";

/** ---------- SIMPLE IN-MEMORY CACHE ---------- **/
const cache: {
  urlInfo?: any;
  listOfdata?: any;
  error?: string | null;
} = {};

const EducationComponent: React.FC = () => {
  const searchParams = useSearchParams();

  const [urlInfo, setURLInfo] = useState<any>(cache.urlInfo ?? null);
  const [listOfdata, setListOfData] = useState<any>(cache.listOfdata ?? null);
  const [error, setError] = useState<string | null>(cache.error ?? null);
  const [loading, setLoading] = useState(!cache.listOfdata);

  // console.log("Data:", listOfdata);

  /** STEP 1: derive URL info once (Asynchronously) */
  useEffect(() => {
    // Only proceed if urlInfo hasn't been set yet (either in state or cache)
    if (!urlInfo) {
      // 🛑 Define and call an async function inside useEffect 🛑
      const fetchAndSetUrlInfo = async () => {
        try {
          // Await the asynchronous function call
          const info = await getRoutesDetails({}, searchParams);

          // Update state and cache with the resolved info object
          setURLInfo(info);
          cache.urlInfo = info;
        } catch (e) {
          // It's good practice to handle potential errors in the async operation
          console.error("Failed to get URL details:", e);
          setError("Failed to retrieve necessary URL parameters.");
        }
      };

      fetchAndSetUrlInfo();
    }
    // Dependencies are correct: [urlInfo, searchParams]
  }, [urlInfo, searchParams]);

  /** STEP 2: fetch education data */
  useEffect(() => {
    if (urlInfo && !listOfdata) {
      reportsApiHandler({
        actionType: "cv",
        urlInfo,
        setError: (err: string | null) => {
          setError(err);
          cache.error = err;
        },
        setLoading,
        setListOfData: (data: any) => {
          setListOfData(data);
          cache.listOfdata = data;
        },
      });
    }
  }, [urlInfo, listOfdata]);

  if (loading) {
    return <p className="text-center py-6">Loading education...</p>;
  }

  if (error) {
    return <p className="text-center py-6 text-red-500">Error: {error}</p>;
  }

  if (!listOfdata?.education_ids?.length) {
    return null;
  }

  return (
    <section className="w-full mainContainer">
      {/* Title */}
      <h2 className="text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] py-[3rem]">
        Education
      </h2>

      {/* Education Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.2rem] w-full">
        {listOfdata.education_ids.map((edu: any) => (
          <div
            key={edu.id}
            className="p-[2rem] w-full rounded-[0.8rem] border border-solid border-[#E2E6EE] bg-[#F7F9FC] border-b-[4px]"
          >
            {/* University + Logo */}
            <div className="flex items-center gap-[1.8rem]">
              {edu?.thumbnail && (
                <Image
                  src={edu.thumbnail}
                  height={34}
                  width={34}
                  alt={edu.university_name}
                  className="h-[34px] w-[34px]"
                />
              )}
              <h3 className="text-[1.4rem] text-heading font-medium leading-[1.8rem]">
                {edu.university_name}
              </h3>
            </div>

            {/* Divider */}
            <hr className="w-full h-[0.2rem] bg-[#E2E6EE] my-[2rem]" />

            {/* Degree Info */}
            <div>
              <h2 className="text-heading font-medium text-[1.6rem] leading-[2rem]">
                {edu.degree_name}
              </h2>
              <p className="text-[1.2rem] font-normal text-[#3E3E3E]">
                {formatDate(
                  edu.degree_start_date,
                  dateFormatsOptions.shortMonthYear
                )}{" "}
                -{" "}
                {isNaN(new Date(edu.degree_end_date).getFullYear())
                  ? edu.degree_end_date
                  : formatDate(
                      edu.degree_end_date,
                      dateFormatsOptions.shortMonthYear
                    )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationComponent;
