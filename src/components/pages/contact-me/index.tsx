"use client";

import { useEffect, useState } from "react";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { store } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import type { PageProps } from "@/types/page";

const ContactMePage = ({ params }: PageProps) => {
  const [urlInfo, setURLInfo] = useState(null);
  const [, setListOfData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    // 🛑 Must wrap in an async function and call it 🛑
    const fetchRoutes = async () => {
      setURLInfo(await getRoutesDetails(params, searchParams));
    };
    fetchRoutes();
  }, [params, searchParams]);

  useBodyBackgroundColor("#EFF5FD");

  useEffect(() => {
    if (urlInfo) {
      reportsApiHandler({
        urlInfo,
        setLoading,
        setListOfData,
        setError,
      });
    }
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
