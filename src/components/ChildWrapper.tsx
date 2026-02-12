"use client";
import { useEffect, useState } from "react";
import { getColors, updateCSSVariables } from "@/hooks/colors";
import { useAppSelector } from "@/store";
import dynamic from "next/dynamic";
import Tawkto from "./Tawkto";
import GoogleAnalytics from "./GoogleAnalytics";
import OfferBanner from "./OfferBanner";
import { usePathname } from "next/navigation";
import Tooltip from "./Tooltip";
import Link from "next/link";
import Image from "next/image";

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
  const pathname = usePathname();

  const listOfdata = useAppSelector((state) => state.profile.listOfProfileData);

  const urlInfo = useAppSelector((state) => state.profile.profileUrlInfo);

  const [isScrolled, setIsScrolled] = useState(false);
  const colors = getColors(listOfdata);

  const printPathFragments = [
    "/print/home",
    "/print/portfolio",
    "/print/cvPortrait",
    "/print/cvLandscape",
    "/cv2",
  ];

  // reuse the same path list for both hiding header/footer and enabling zoom-100
  const isPrintPath = printPathFragments.some((frag) => (pathname || "").includes(frag));
  const isHiddenPaths = isPrintPath;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (listOfdata?.name) {
      document.title = listOfdata.name;
    }

    const updateFavicon = (url: string | undefined) => {
      if (!url) return;
      
      const distinctFavicons = document.querySelectorAll('link[rel*="icon"]');
      if (distinctFavicons.length > 0) {
        distinctFavicons.forEach((icon) => {
           (icon as HTMLLinkElement).href = url;
        });
      } else {
        const favicon = document.createElement("link");
        favicon.rel = "icon";
        favicon.href = url;
        document.head.appendChild(favicon);
      }
    };
    
    if (listOfdata?.profile_photo_1) {
      updateFavicon(listOfdata?.profile_photo_1);
    }
  }, [listOfdata]);

  useEffect(() => {
    updateCSSVariables(colors);
  }, [colors]);

  // Toggle per-page zoom for routes that should render at 100%
  useEffect(() => {
    const shouldZoom100 = isPrintPath;

    if (shouldZoom100) {
      document.body.classList.add("zoom-100");
      document.body.classList.remove("zoom-85");
    } else {
      document.body.classList.add("zoom-85");
      document.body.classList.remove("zoom-100");
    }

    // cleanup both classes to avoid forcing one state on unmount
    return () => {
      document.body.classList.remove("zoom-100");
      document.body.classList.remove("zoom-85");
    };
  }, [isPrintPath]);

  return (
    <>
      <GoogleAnalytics scriptNumber={listOfdata?.googleAnalyticsScript} />
      {/* WhatsApp Icon */}
      {!urlInfo?.u && listOfdata && listOfdata?.phone_no && (
        <div className="fixed bottom-[10rem] right-[2.5rem] z-[1000] print:hidden">
          <Tooltip text={`My Whatsapp`} key={"whatsapp"}>
            <Link
              href={`https://wa.me/${listOfdata?.phone_no}`}
              target="_blank"
            >
              <Image
                src={"/images/whatsapp.svg"}
                height={60}
                width={60}
                alt={"whatsapp"}
              />
            </Link>
          </Tooltip>
        </div>
      )}
      {!urlInfo?.u && <Tawkto />}

      {/* Offer Banner - conditionally shown */}
      {/* {!urlInfo?.u && !isScrolled && (
        <div className="print:hidden">
          {isHiddenPaths ? false : <OfferBanner listOfdata={listOfdata} />}
        </div>
      )} */}
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
