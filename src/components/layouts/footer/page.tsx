'use client';

import React, { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactMe from '@/components/ContactMe';
import { useAppSelector } from '@/store';

const Footer = () => {
  interface FooterLink {
    href: string;
    title: string;
  }

  const listOfdata = useAppSelector((state) => state.profile.listOfProfileData);
  const urlInfo = useAppSelector((state) => state.profile.profileUrlInfo);
  const loading = useAppSelector((state) => state.profile.profileLoading);

  const footerLinks: FooterLink[] = [
    { href: '/', title: 'Home' },

    ...(listOfdata?.services && listOfdata?.services?.length > 0
      ? [{ title: 'Cover Letter', href: '/offer' }]
      : []),

    { href: '/portfolio', title: 'Projects' },

    { href: '/blog-listing', title: 'Blog' },
    { href: '/cv', title: 'CV' },
    { href: '/contact-me', title: 'Contact Me' },
    { href: listOfdata?.calendly_link, title: 'Schedule Call' },
    { href: listOfdata?.github, title: 'GitHub' },
    { href: listOfdata?.upwork, title: 'Upwork' },
    { href: listOfdata?.behance_link, title: 'Behance' },
    { href: listOfdata?.linkedIn, title: 'LinkedIn' },
  ];

  return (
    <>
      {!loading && (
        <>
          {/* Contact Form Section */}
          {!urlInfo?.u && (
            <section className='bg-transparent'>
              <div className='mainContainer'>
                <ContactMe listOfdata={listOfdata} />
              </div>
            </section>
          )}
          {/* Footer  */}
          <footer className=''>
            <div
              className={`bg-footerBg ${
                urlInfo?.u ? '' : 'h-[40.4rem] lg:h-[57.6rem]'
              }  py-[6rem]  w-full bg-center bg-cover bg-no-repeat flex flex-col items-center justify-end`}
            >
              <div className='mainContainer flex items-center justify-center'>
                {/* Footer Links */}
                <div className=' max-w-[63.5rem] w-full flex items-center justify-center flex-wrap gap-[4rem] text-heading text-[1.8rem] font-medium'>
                  {footerLinks
                    .filter(({ title }) =>
                      urlInfo?.u
                        ? title !== 'Behance' &&
                          title !== 'Contact Me' &&
                          title !== 'Schedule Call'
                        : true
                    )
                    .map(({ href, title }) =>
                      href ? (
                        <Link
                          href={href}
                          key={title}
                          className='footerLink'
                          target='_blank'
                        >
                          {title}
                        </Link>
                      ) : null
                    )}
                </div>
              </div>
            </div>
            <p className='text-center text-heading text-[1.8rem] font-normal  py-[1.5rem] px-[2rem] bg-white'>
              All Rights Reserved ©{' '}
              <span className='capitalize'>
                {listOfdata?.name || 'Cypexsoft'}
              </span>{' '}
              2024
            </p>
          </footer>
        </>
      )}
    </>
  );
};
export default Footer;
