"use client"; // This makes the component a Client Component

import { usePathname, useSearchParams } from "next/navigation";
import OfferBanner from "@/components/OfferBanner";
import Header from "./layouts/header/page";
import Footer from "./layouts/footer/page";
import { useEffect, useRef, useState } from "react";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { getColors, updateCSSVariables } from "@/hooks/colors";

export default function ClientWrapper({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const pathname = usePathname(); // Get the current route
  const isHomepage = pathname === "/"; // Check if it's the homepage

  const contactRef = useRef(null);

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, []);

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        actionType: "home",
        urlInfo,
        setLoading,
        setListOfData,
      });
  }, [urlInfo]);

  useEffect(() => {
    document.title = listOfdata?.name || "Loading...";
  }, [listOfdata]);

  const colors = getColors(listOfdata);

  useEffect(() => {
    updateCSSVariables(colors);
  }, [colors]);

  return (
    <>
      {isHomepage && <OfferBanner />}
      <Header
        scrollToContact={scrollToContact}
        listOfdata={listOfdata}
        loading={loading}
        urlInfo={urlInfo}
      />

      {children}
      <Footer
        ref={contactRef}
        listOfdata={listOfdata}
        loading={loading}
        urlInfo={urlInfo}
      />
    </>
  );
}
