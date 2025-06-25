"use client";
import { useEffect, useState } from "react";
import { getColors, updateCSSVariables } from "@/hooks/colors";
import { useAppSelector } from "@/store";
import dynamic from "next/dynamic";
import Tawkto from "./Tawkto";
import GoogleAnalytics from "./GoogleAnalytics";
import OfferBanner from "./OfferBanner";
import { usePathname } from "next/navigation";

const Header = dynamic(() => import("./layouts/header/page"), {
  ssr: false,
});

const Footer = dynamic(() => import("./layouts/footer/page"), {
  ssr: false,
});

export default function ChildWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // const listOfdata = useAppSelector((state) => state.profile.listOfProfileData);
  // const [isScrolled, setIsScrolled] = useState(false);
  // const urlInfo = useAppSelector((state) => state.profile.profileUrlInfo);
  // const colors = getColors(listOfdata);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 10); // Adjust threshold as needed
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // useEffect(() => {
  //   document.title = listOfdata?.name;

  //   const updateFavicon = (url: string | undefined) => {
  //     let favicon = document.querySelector(
  //       'link[rel="icon"]'
  //     ) as HTMLLinkElement;
  //     if (!favicon) {
  //       favicon = document.createElement("link");
  //       favicon.rel = "icon";
  //       document.head.appendChild(favicon);
  //     }
  //     favicon.href = url || "";
  //   };

  //   // Update favicon based on listOfData
  //   updateFavicon(listOfdata?.profile_photo_1);
  // }, [listOfdata]);

  // useEffect(() => {
  //   updateCSSVariables(colors);
  // }, [colors]);
  const pathname = usePathname();

  const listOfdata = useAppSelector((state) => state.profile.listOfProfileData);
  const urlInfo = useAppSelector((state) => state.profile.profileUrlInfo);

  const [isScrolled, setIsScrolled] = useState(false);
  const colors = getColors(listOfdata);

  const hideHeaderFooterPaths = [
    "/print/homeF",
    "/print/portfolioF",
    "/print/cvF",
  ];

  const isHiddenPaths =
    hideHeaderFooterPaths.includes(pathname) ||
    pathname.startsWith("/print/portfolioF");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.title = listOfdata?.name;
    const updateFavicon = (url: string | undefined) => {
      let favicon = document.querySelector(
        'link[rel="icon"]'
      ) as HTMLLinkElement;
      if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }
      favicon.href = url || "";
    };
    updateFavicon(listOfdata?.profile_photo_1);
  }, [listOfdata]);

  useEffect(() => {
    updateCSSVariables(colors);
  }, [colors]);

  return (
    <>
      <GoogleAnalytics scriptNumber={listOfdata?.googleAnalyticsScript} />
      <Tawkto />

      {/* Offer Banner - conditionally shown */}
      {!urlInfo?.u && !isScrolled && (
        <div className="print:hidden">
          {isHiddenPaths ? false : <OfferBanner listOfdata={listOfdata} />}
        </div>
      )}
      {/* Header Wrapper */}
      {!isHiddenPaths && (
        <div className="print:hidden block sticky top-0 z-[100]">
          <Header />
        </div>
      )}
      {/* Content */}
      <div className="relative">{children}</div>

      {/* Footer */}
      {!isHiddenPaths && (
        <div className="print:hidden block">
          <Footer />
        </div>
      )}
    </>
  );
}
