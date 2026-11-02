"use client";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import UserProfileBrand from "./UserProfileBrand";
import HeaderCtaButtons from "./HeaderCtaButtons";
import ResourcesDropdownContent from "./ResourcesDropdownContent";
import type { HeaderSharedProps } from "./DesktopHeader";

interface MobileHeaderProps extends HeaderSharedProps {
  sideBarOpen: boolean;
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSidebar: () => void;
  sidebarRef: React.MutableRefObject<HTMLDivElement | null>;
  sidebarHamburgerButtonRef: React.MutableRefObject<HTMLImageElement | null>;
}

/** Mobile bar + slide-in sidebar (extracted verbatim from layouts/header). */
const MobileHeader = ({
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
  sideBarOpen,
  setSideBarOpen,
  handleSidebar,
  sidebarRef,
  sidebarHamburgerButtonRef,
}: MobileHeaderProps) => (
  <div className="min-[1100px]:hidden mainContainer  print:hidden  flex items-center justify-between bg-surface py-[1.2rem] relative z-[200]">
    {/* User Profile  */}
    <UserProfileBrand listOfdata={listOfdata} />
    {/* Hamburger Icon */}
    <Image
      src={"/images/menu.svg"}
      height={24}
      width={24}
      className={`cursor-pointer`}
      onClick={handleSidebar}
      ref={sidebarHamburgerButtonRef}
      alt="menu"
    />
    {/* Positioned Sidebar */}
    <div
      className={`fixed top-[7.2rem] w-[35rem] right-0 z-[100] h-full bg-surface shadow-lg  duration-300  ${sideBarOpen
        ? "translate-x-0 opacity-100"
        : "translate-x-[30rem] opacity-0"
        }`}
    >
      <div className="overflow-y-auto h-full">
        {/* Navinks and Buttons */}
        <div className="flex flex-col p-[1rem]">
          <div className="flex flex-col">
            {/* Nav Link */}
            <nav
              ref={sidebarRef}
              className="text-[#101828] dark:text-heading text-[1.6rem] font-medium leading-[2.4rem] flex flex-col  gap-[2.4rem]"
            >
              {headerLinks.map((link, index) =>
                link.isDropdown ? (
                  <div key={index} className="flex flex-col" ref={servicesDropdownRef}>
                    <div
                      className="text-paragraph1 text-[1.6rem] font-normal leading-normal hover:text-primary duration-300 cursor-pointer flex gap-[0.2rem]"
                      onClick={handleToggleServices}
                    >
                      <p className="font-medium">{link?.title}</p>
                      <Image
                        src="/images/dropDown.svg" // Use a relative path starting with '/'
                        alt="dropMenu"
                        height={24}
                        width={24}
                        className={`cursor-pointer duration-300 ${isServicesOpen ? "rotate-180" : "rotate-0"
                          }`}
                      />
                    </div>
                    {/* Positioned DropDown Menu */}
                    {isServicesOpen && (
                      <nav
                        className={`rounded-[0.8rem] duration-300 shadow-md bg-surface z-50
                    ${isServicesOpen ? "opacity-100" : "h-0 opacity-0"}

                       p-[2rem] text-primary text-[1.6rem] font-normal leading-normal flex flex-col gap-[1.5rem] max-w-[32rem] w-full text-nowrap`}
                      >
                        <div className="w-full">
                          {listOfdata?.services
                            ?.filter(({ type }) => type !== "main")
                            .map((service, index) => (
                              <Link
                                prefetch={true}
                                href={`/service-detail?service=${encodeURIComponent(
                                  service?.title
                                )}`}
                                key={index}
                                className={`w-full flex items-center gap-[1.4rem] px-4 py-2 hover:bg-primary hover:text-onPrimary hover:rounded-lg transition-all duration-300 ease-in-out cursor-pointer text-wrap border-b border-gray-200 dark:border-border last:border-b-0`}
                              >
                                {service?.title}
                              </Link>
                            ))}
                        </div>
                      </nav>
                    )}
                  </div>
                ) : (
                  <div
                    key={index}
                    className={`hover:text-primary duration-300  ${pathname === link.src ||
                      (link.src !== "/" && pathname.includes(link.src))
                      ? "font-extrabold text-primary"
                      : null
                      }`}
                    onClick={() => setSideBarOpen(!sideBarOpen)}
                  >
                    <Link prefetch={true} href={link.src}>
                      {link.title}
                    </Link>
                  </div>
                )
              )}
              {/* Resources DropDwon Menu */}
              <div className="flex flex-col mb-[2rem]" ref={resourceDropdownRef}>
                <div
                  className="text-paragraph1 text-[1.6rem] font-normal leading-normal hover:text-primary duration-300 cursor-pointer flex gap-[0.2rem]"
                  onClick={handleToggleResource}
                >
                  <p className="font-medium">Resources</p>
                  <Image
                    src="/images/dropDown.svg" // Use a relative path starting with '/'
                    alt="dropMenu"
                    height={24}
                    width={24}
                    className={`cursor-pointer duration-300 ${isResourceOpen ? "rotate-180" : "rotate-0"
                      }`}
                  />
                </div>
                {/* Positioned DropDown Menu */}
                {isResourceOpen && (
                  <nav className="rounded-[0.8rem] duration-300 shadow-md bg-surface z-50 p-[2rem] text-primary text-[1.6rem] font-normal leading-normal flex flex-col gap-[1.5rem] w-full">
                    <ResourcesDropdownContent
                      listOfdata={listOfdata}
                      urlInfo={urlInfo}
                    />
                  </nav>
                )}
              </div>{" "}
            </nav>
          </div>
          {/* Theme toggle: always rendered, even in admin (?u=_) mode */}
          <div className="w-full mb-[1rem]">
            <ThemeToggle variant="row" />
          </div>
          {/* Buttons */}
          <HeaderCtaButtons
            listOfdata={listOfdata}
            urlInfo={urlInfo}
            variant="column"
          />
        </div>
      </div>
    </div>
  </div>
);

export default MobileHeader;
