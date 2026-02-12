"use client";

import React, { useEffect, useState } from "react";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { store } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";

const ContactMePage = ({ params }: { params: any }) => {
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  // Prev Code
  // useEffect(() => {
  //   setURLInfo(getRoutesDetails(params, searchParams));
  // }, [params, searchParams]);

  // New Code Use getRoutesDetails
  useEffect(() => {
    // 🛑 Must wrap in an async function and call it 🛑
    const fetchRoutes = async () => {
      setURLInfo(await getRoutesDetails(params, searchParams));
    };
    fetchRoutes();
  }, [params, searchParams]);

  useBodyBackgroundColor("#EFF5FD");

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        urlInfo,
        setLoading,
        setListOfData,
        setError,
      });
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  return <></>;
};

export default ContactMePage;
