"use client";
import { useEffect, useState } from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { getRoutesDetails, type RoutesInfo } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { store } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import type { ProfileReport } from "@/types/api";
import type { PageParams } from "@/types/page";

interface UseProfileReportOptions {
  params: PageParams;
  searchParams: ReadonlyURLSearchParams | URLSearchParams | null;
  /** Optional report item id (e.g. the portfolio id on the detail page). */
  itemID?: string | number | null;
  /**
   * When false (default) the urlInfo store dispatch is gated on `if (urlInfo)`,
   * matching the home/cv pages. portfolio-detail historically dispatched the
   * initial null too, so it sets this to true.
   */
  dispatchNullUrlInfo?: boolean;
}

/**
 * Shared page bootstrap: resolves the route info, fetches the profile report
 * and mirrors urlInfo/loading into the Redux store — the block every page
 * used to copy-paste.
 */
export const useProfileReport = ({
  params,
  searchParams,
  itemID = null,
  dispatchNullUrlInfo = false,
}: UseProfileReportOptions) => {
  const [urlInfo, setURLInfo] = useState<RoutesInfo | null>(null);
  const [listOfdata, setListOfData] = useState<ProfileReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setLoading,
        setListOfData,
        setError,
        ...(itemID !== null && itemID !== undefined ? { itemID } : {}),
      });
    }
  }, [urlInfo, itemID]);

  // Redux sync
  useEffect(() => {
    if (urlInfo || dispatchNullUrlInfo) {
      store.dispatch(setProfileUrlInfo(urlInfo));
    }
  }, [urlInfo, dispatchNullUrlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  return {
    urlInfo,
    listOfdata,
    setListOfData,
    loading,
    setLoading,
    error,
    setError,
  };
};

export default useProfileReport;
