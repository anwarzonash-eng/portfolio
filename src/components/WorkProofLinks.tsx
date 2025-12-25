import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tooltip from "@/components/Tooltip"; // adjust import path

const WorkProofLinks = ({ props }) => {
  interface ProofLinks {
    href: string;
    src: string;
    alt: string;
    label: string;
  }

  const workProofLinks: ProofLinks[] = [
    {
      href: props?.upwork,
      src: "/images/upwork.svg",
      alt: "upwork",
      label: "My Upwork",
    },
    {
      href: props?.github,
      src: "/images/github.svg",
      alt: "github",
      label: "My GitHub",
    },
    {
      href: props?.linkedIn,
      src: "/images/linkedin.svg",
      alt: "linkedin",
      label: "My LinkedIn",
    },
    {
      href: props?.behance_link,
      src: "/images/behance.svg",
      alt: "behance",
      label: "My Behance",
    },
  ];

  return (
    <>
      {workProofLinks
        .filter(({ alt }) =>
          props.u
            ? alt === "upwork" || alt === "github" 
            : true
        )
        .map(({ href, src, alt, label }) =>
          href ? (
            <Tooltip text={label} key={alt}>
              <Link href={href} target="_blank">
                <Image
                  src={src}
                  height={45}
                  width={45}
                  alt={alt}
                  className="size-[50px] print:size-[40px]"
                />
              </Link>
            </Tooltip>
          ) : null
        )}
    </>
  );
};

export default WorkProofLinks;
