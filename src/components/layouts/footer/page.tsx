'use client';

import React, { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactMe from '@/components/ContactMe';
import Reports from '@/apiCalls/reports';

const Footer = forwardRef<
  HTMLDivElement,
  { listOfdata: any; loading: boolean; urlInfo: any }
>(({ listOfdata, loading, urlInfo }, ref) => {
  interface FooterLink {
    href: string;
    title: string;
  }
  const footerLinks: FooterLink[] = [
    { href: '/', title: 'Home' },
    { href: '/offer', title: 'Cover Letter' },
    { href: '/portfolio-listing', title: 'Projects' },
    { href: '/cv', title: 'CV' },
    { href: '/', title: 'Skill' },
    { href: '/', title: 'Services' },
    { href: listOfdata?.github, title: 'GitHub' },
    { href: listOfdata?.upwork, title: 'Upwork' },
    { href: '/', title: 'Dribble' },
    { href: listOfdata?.behance_link, title: 'Behance' },
    { href: '/blog-listing', title: 'Blog' },
  ];
  if (!loading) {
    return (
      <>
        {/* Contact Form Section */}
        {!urlInfo?.is_u && (
          <section className='bg-transparent' id='contact'>
            <div className='mainContainer'>
              <ContactMe listOfdata={listOfdata} ref1={ref} />
            </div>
          </section>
        )}
        {/* Footer  */}
        <footer className=''>
          <div
            className={`bg-footerBg ${
              urlInfo?.is_u ? '' : 'h-[46.4rem] lg:h-[57.6rem]'
            }  py-[6rem] lg:py-[10rem] w-full bg-center bg-cover bg-no-repeat flex flex-col items-center justify-end`}
          >
            <div className='mainContainer flex items-center justify-center'>
              {/* Footer Links */}
              <div className=' max-w-[63.5rem] w-full flex items-center justify-center flex-wrap gap-[4rem] text-heading text-[1.8rem] font-medium'>
                {footerLinks
                  .filter(({ title }) =>
                    urlInfo?.is_u
                      ? title !== 'Dribble' && title !== 'Behance'
                      : true
                  )
                  .map(({ href, title }) =>
                    href ? (
                      <Link href={href} key={title} className='footerLink'>
                        {title}
                      </Link>
                    ) : null
                  )}
              </div>
            </div>
          </div>
          <p className='text-center text-heading text-[1.8rem] font-normal  py-[1.5rem] px-[2rem] bg-white'>
            All Rights Reserved © Cypexsoft 2024
          </p>
        </footer>
      </>
    );
  }
});
export default Footer;
