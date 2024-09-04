import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const WorkProofLinks = ({ props }) => {
  interface ProofLinks {
    href: string;
    src: string;
    alt: string;
  }
  const workProofLinks: ProofLinks[] = [
    { href: props?.upwork, src: '/images/upwork.svg', alt: 'upwork' },
    { href: props?.github, src: '/images/github.svg', alt: 'github' },
    {
      href: props?.linkedIn,
      src: '/images/linkedin.svg',
      alt: 'linkedin',
    },
    // { href: '/', src: "/images/dribbble.svg", alt: "dribble" },
    {
      href: props?.behance_link,
      src: '/images/behance.svg',
      alt: 'behance',
    },
  ];

  return (
    <>
      {workProofLinks.map(({ href, src, alt }) =>
        href ? (
          <Link href={href} key={alt} target='_blank'>
            <Image src={src} height={45} width={45} alt={alt} />
          </Link>
        ) : null
      )}
    </>
  );
};

export default WorkProofLinks;
