import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ContactMeLinks = ({ props }) => {
  interface ContactLinks {
    href: string;
    src: string;
    alt: string;
  }

  const contactLinks: ContactLinks[] = [
    {
      href: `mailto:${props?.email}`,
      src: '/images/gmail.svg',
      alt: 'gmail',
    },
    {
      href: `https://wa.me/${props?.phone_no}`,
      src: '/images/whatsapp.svg',
      alt: 'whatsapp',
    },
    {
      href: `tel:${props?.phone_no}`,
      src: '/images/number.svg',
      alt: 'number',
    },
  ];
  return (
    <>
      {contactLinks.map(({ href, src, alt }) =>
        href ? (
          <Link href={href} key={alt} target='_blank'>
            <Image src={src} height={45} width={45} alt={alt} className='size-[50px] print:size-[80px]'/>
          </Link>
        ) : null
      )}
    </>
  );
};

export default ContactMeLinks;
