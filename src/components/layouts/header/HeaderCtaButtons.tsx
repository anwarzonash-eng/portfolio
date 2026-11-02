"use client";
import Link from "next/link";
import { scrollToSection } from "@/hooks/scrollToSection";
import type { ProfileReport } from "@/types/api";
import type { RoutesInfo } from "@/hooks/url";

interface HeaderCtaButtonsProps {
  listOfdata: ProfileReport | null;
  urlInfo: RoutesInfo | null;
  /** "row" = desktop/print bar, "column" = mobile sidebar. */
  variant?: "row" | "column";
}

/** Contact Me + Schedule Call / Hire Me buttons (appeared three times in the header). */
const HeaderCtaButtons = ({
  listOfdata,
  urlInfo,
  variant = "row",
}: HeaderCtaButtonsProps) => {
  if (urlInfo?.u) return null;

  if (variant === "column") {
    return (
      <div className="w-full flex flex-col gap-[1rem] h-[200px] ">
        <Link prefetch={true} href={"/contact-me"}>
          <button className="w-full hover:cursor-pointer py-[1rem] px-[2.4rem] text-[1.6rem] font-medium  rounded-[0.6rem] btn-secondary">
            Contact Me
          </button>
        </Link>

        {listOfdata?.calendly_link ? (
          <Link
            target="_blank"
            prefetch={true}
            className="text-center btn-primary rounded-[0.6rem] border-2 border-border border-solid py-[1rem] px-[3.4rem] text-[1.6rem] font-medium text-onPrimary"
            href={listOfdata?.calendly_link || "#"}
          >
            Schedule Call
          </Link>
        ) : (
          <button
            onClick={() => scrollToSection("contact")}
            className="btn-primary rounded-[0.6rem] border-2 border-border border-solid py-[1rem] px-[3.4rem] text-[1.6rem] font-medium text-onPrimary"
          >
            Hire Me{" "}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-[1rem]">
      <Link prefetch={true} href={"/contact-me"}>
        <button className="btn-secondary  py-[1rem] px-[2.4rem] text-[1.6rem] font-medium rounded-[0.6rem]">
          Contact Me
        </button>
      </Link>
      {listOfdata?.calendly_link ? (
        <Link
          target="_blank"
          prefetch={true}
          className="text-center btn-primary rounded-[0.6rem] border-2 border-border border-solid py-[1rem] px-[3.4rem] text-[1.6rem] font-medium text-onPrimary"
          href={listOfdata?.calendly_link || "#"}
        >
          Schedule Call
        </Link>
      ) : (
        <button
          className="btn-primary rounded-[0.6rem] border-2 border-border border-solid py-[1rem] px-[3.4rem] text-[1.6rem] font-medium text-onPrimary"
          onClick={() => scrollToSection("contact")}
        >
          Hire Me
        </button>
      )}
    </div>
  );
};

export default HeaderCtaButtons;
