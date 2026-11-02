"use client";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import UserProfileBrand from "./UserProfileBrand";
import HeaderCtaButtons from "./HeaderCtaButtons";
import ResourcesDropdownContent from "./ResourcesDropdownContent";
import {
  defaultServiceContent,
  serviceContentMap,
  type HeaderLink,
} from "./headerData";
import type { ProfileReport } from "@/types/api";
import type { RoutesInfo } from "@/hooks/url";

export interface HeaderSharedProps {
  listOfdata: ProfileReport | null;
  urlInfo: RoutesInfo | null;
  pathname: string;
  headerLinks: HeaderLink[];
  isServicesOpen: boolean;
  isResourceOpen: boolean;
  handleToggleServices: () => void;
  handleToggleResource: () => void;
  servicesDropdownRef: React.MutableRefObject<HTMLDivElement | null>;
  resourceDropdownRef: React.MutableRefObject<HTMLDivElement | null>;
}

interface DesktopHeaderProps extends HeaderSharedProps {
  servivesDropdownButtonRef: React.MutableRefObject<HTMLDivElement | null>;
  resourcesDropdownButtonRef: React.MutableRefObject<HTMLDivElement | null>;
  servicesDivRef: React.MutableRefObject<HTMLDivElement | null>;
  resourcesDivRef: React.MutableRefObject<HTMLDivElement | null>;
}

/** Desktop navigation bar (extracted verbatim from layouts/header). */
const DesktopHeader = ({
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
  servivesDropdownButtonRef,
  resourcesDropdownButtonRef,
  servicesDivRef,
  resourcesDivRef,
}: DesktopHeaderProps) => (
  <div className="max-[1100px]:hidden  print:hidden  mainContainer h-[7.5rem] py-[2rem] border-b border-border flex justify-between items-center ">
    {/* User Profile */}
    <UserProfileBrand listOfdata={listOfdata} />
    {/* NavLinks and Buttons */}
    <div className="flex justify-center items-center">
      <div className="flex items-center gap-[2.4rem]">
        {/* Nav Link */}
        <nav className="text-paragraph1 text-[1.6rem] font-normal leading-normal flex justify-center items-center gap-[2.4rem]">
          {headerLinks.map((link, index) =>
            link.isDropdown ? (
              <div
                key={index}
                className="flex items-center relative"
                ref={servicesDropdownRef}
              >
                <div
                  className="flex gap-[0.2rem] text-paragraph1 text-[1.6rem] font-normal leading-normal hover:text-primary duration-300 cursor-pointer"
                  onClick={handleToggleServices}
                  ref={servivesDropdownButtonRef}
                >
                  {link.title}
                  <Image
                    src="/images/dropDown.svg"
                    height={24}
                    width={24}
                    alt="Dropdown"
                    className={`cursor-pointer duration-300 ${isServicesOpen ? "rotate-180" : "rotate-0"
                      }`}
                  />
                </div>

                {/* Positioned DropDown Menu */}
                {isServicesOpen && (
                  <nav
                    ref={servicesDivRef}
                    className={`rounded-[0.8rem] duration-300 shadow-lg bg-surface absolute top-[4rem] left-[50%] ${urlInfo?.u
                      ? "translate-x-[-70%]"
                      : "translate-x-[-50%]"
                      } z-50
                                ${isServicesOpen ? "opacity-100" : "opacity-0"}
                                p-[2rem] w-[90rem]`}
                  >
                    {/* Services Grid - 3 columns */}
                    <div className="grid grid-cols-3 gap-6">
                      {listOfdata?.services
                        ?.filter(({ type }) => type !== "main")
                        .map((service, index) => {
                          const content =
                            serviceContentMap[service.title] ||
                            defaultServiceContent;

                          return (
                            <Link
                              prefetch={true}
                              href={`/service-detail?service=${encodeURIComponent(
                                service?.title
                              )}`}
                              key={index}
                              className="group p-4 hover:bg-gray-50 dark:hover:bg-surfaceMuted rounded-lg transition-all duration-300 border border-gray-100 dark:border-border hover:border-primary/20 hover:shadow-sm"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-blue-50 dark:bg-surfaceMuted rounded-lg flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-border">
                                  <Image
                                    src={content.image}
                                    width={20}
                                    height={20}
                                    alt={service.title}
                                    className="text-blue-500"
                                  />
                                </div>
                                <h3 className="text-[1.6rem] font-semibold text-gray-800 dark:text-heading group-hover:text-primary">
                                  {service?.title}
                                </h3>
                              </div>

                              <p className="text-[1.4rem] text-gray-600 dark:text-paragraph1 pl-[3.2rem]">
                                {content.description}
                              </p>
                            </Link>
                          );
                        })}
                    </div>
                  </nav>
                )}
              </div>
            ) : (
              <div
                key={index}
                className={`hover:text-primary duration-300 ${pathname === link.src ||
                  (link.src !== "/" && pathname.includes(link.src))
                  ? "font-bold text-primary"
                  : ""
                  }`}
              >
                <Link prefetch={true} href={link.src}>
                  {link.title}
                </Link>
              </div>
            )
          )}
        </nav>

        {/* New Updated Drop  */}
        <div
          className="flex items-center relative mr-[2.4rem]"
          ref={resourceDropdownRef}
        >
          <div
            className="text-paragraph1 flex gap-[0.2rem] text-[1.6rem] font-normal leading-normal hover:text-primary duration-300 cursor-pointer"
            onClick={handleToggleResource}
            ref={resourcesDropdownButtonRef}
          >
            Resources
            <Image
              src="/images/dropDown.svg"
              height={24}
              width={24}
              alt="Dropdown"
              className={`cursor-pointer duration-300 ${isResourceOpen ? "rotate-180" : "rotate-0"
                }`}
            />{" "}
          </div>
          {/* Positioned DropDown Menu */}
          {isResourceOpen && (
            <nav
              ref={resourcesDivRef}
              className={`rounded-[0.8rem] duration-300 shadow-md bg-surface absolute top-[4rem] left-[50%] ${urlInfo?.u
                ? "translate-x-[-70%]"
                : "translate-x-[-50%]"
                } z-50 p-[2rem] text-primary text-[1.6rem] font-normal leading-normal flex flex-col gap-[1.5rem] w-[40rem]`}
            >
              <ResourcesDropdownContent
                listOfdata={listOfdata}
                urlInfo={urlInfo}
              />
            </nav>
          )}
        </div>
      </div>
      {/* Buttons */}
      <div className="flex items-center gap-[1rem]">
        {/* Theme toggle: always rendered, even in admin (?u=_) mode */}
        <ThemeToggle />
        <HeaderCtaButtons listOfdata={listOfdata} urlInfo={urlInfo} />
      </div>
    </div>
  </div>
);

export default DesktopHeader;
