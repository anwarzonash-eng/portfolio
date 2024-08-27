import React from "react";
import Link from "next/link";
import Image from "next/image";

const WorkProofLinks = () => {
  interface ProofLinks {
    href: string;
    src: string;
    alt: string;
  }
  const workProofLinks: ProofLinks[] = [
    { href: "/", src: "/images/upwork.svg", alt: "upwork" },
    { href: "/", src: "/images/github.svg", alt: "github" },
    { href: "/", src: "/images/linkedin.svg", alt: "linkedin" },
    { href: "/", src: "/images/dribbble.svg", alt: "dribble" },
    { href: "/", src: "/images/behance.svg", alt: "behance" },
  ];

  return (
    <>
      {workProofLinks.map(({ href, src, alt }) => (
        <Link href={href} key={alt}>
          <Image src={src} height={45} width={45} alt={alt} />
        </Link>
      ))}
    </>
  );
};

export default WorkProofLinks;
