"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import PrintHeader from "./PrintHeader";
import { buildHeaderLinks } from "./headerData";

interface HeaderProps {
  initialBgColor?: string;
}

const Header = ({ initialBgColor = "bg-transparent" }: HeaderProps) => {
  // Use localStorage or initialBgColor for initial background state
  const [bgColor, setBgColor] = useState(initialBgColor);

  const listOfdata = useAppSelector((state) => state.profile.listOfProfileData);
  const urlInfo = useAppSelector((state) => state.profile.profileUrlInfo);
  const loading = useAppSelector((state) => state.profile.profileLoading);
  const pathname = usePathname(); // Gets the current pathname
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);

  const [isResourceOpen, setIsResourceOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const resourceDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarHamburgerButtonRef = useRef<HTMLImageElement | null>(null);
  const servivesDropdownButtonRef = useRef(null);
  const resourcesDropdownButtonRef = useRef(null);
  const resourcesDivRef = useRef(null);
  const servicesDivRef = useRef(null);

  const headerLinks = buildHeaderLinks(listOfdata);

  const handleToggleResource = () => {
    setIsResourceOpen(!isResourceOpen);
  };

  const handleToggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const handleSidebar = () => {
    setSideBarOpen((prev) => !prev);
  };

  useEffect(() => {
    // Check if `window` is available to safely access `localStorage`
    if (typeof window !== "undefined") {
      const savedBgColor = localStorage.getItem("bgColor");
      if (savedBgColor) {
        // Older sessions stored the pre-theme class name.
        setBgColor(savedBgColor === "bg-white" ? "bg-surface" : savedBgColor);
      }
    }
  }, [initialBgColor]);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (scroll > 10) {
        setBgColor("bg-surface");
        localStorage.setItem("bgColor", "bg-surface");
      } else {
        setBgColor(initialBgColor);
        localStorage.setItem("bgColor", initialBgColor);
      }
    };

    // Initial check to set the background color based on the current scroll position
    handleScroll();

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [initialBgColor]);

  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsResourceOpen(false);
      setIsServicesOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resourceDropdownRef.current &&
        !resourceDropdownRef.current.contains(event.target as Node) &&
        resourcesDropdownButtonRef.current &&
        !resourcesDropdownButtonRef.current.contains(event.target as Node) &&
        resourcesDivRef.current &&
        !resourcesDivRef.current.contains(event.target as Node)
      ) {
        setIsResourceOpen(false);
      }
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node) &&
        servivesDropdownButtonRef.current &&
        !servivesDropdownButtonRef.current.contains(event.target as Node) &&
        servicesDivRef.current &&
        !servicesDivRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        sidebarHamburgerButtonRef.current &&
        !sidebarHamburgerButtonRef.current.contains(event.target as Node)
      ) {
        setSideBarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sharedProps = {
    listOfdata,
    urlInfo,
    pathname,
    headerLinks,
    isServicesOpen,
    isResourceOpen,
    handleToggleServices,
    handleToggleResource,
    servicesDropdownRef,
    resourceDropdownRef,
  };

  return (
    <>
      {!loading && (
        <>
          {/* header for desktop */}
          <header
            className={`sticky top-0 left-0 w-full  z-[100]  transition-colors duration-300 print:hidden block  ${bgColor}`}
          >
            {/* Header Navbar */}
            <div className="w-full print:hidden block ">
              {/* Desktop Header */}
              <DesktopHeader
                {...sharedProps}
                servivesDropdownButtonRef={servivesDropdownButtonRef}
                resourcesDropdownButtonRef={resourcesDropdownButtonRef}
                servicesDivRef={servicesDivRef}
                resourcesDivRef={resourcesDivRef}
              />

              {/* Mobile Header  */}
              <MobileHeader
                {...sharedProps}
                sideBarOpen={sideBarOpen}
                setSideBarOpen={setSideBarOpen}
                handleSidebar={handleSidebar}
                sidebarRef={sidebarRef}
                sidebarHamburgerButtonRef={sidebarHamburgerButtonRef}
              />
            </div>
          </header>

          {/* header for print */}
          <PrintHeader
            listOfdata={listOfdata}
            urlInfo={urlInfo}
            bgColor={bgColor}
          />
        </>
      )}
    </>
  );
};

export default Header;
