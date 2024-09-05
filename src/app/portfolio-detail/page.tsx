'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import OurBlogs from '@/components/OurBlogs';
import SliderXL from '@/components/Sliders/SliderXL';
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor';
import { useSearchParams } from 'next/navigation';
import Reports from '@/apiCalls/reports';
import { formatDate } from '@/hooks/formatdate';
import Portfoliodetailbg from '@/components/portfoliodetailbg';
import { dateFormatsOptions } from '@/data/JsonData';
import WebsiteLoader from '@/components/WebsiteLoader';
import { modifiedContent } from '@/hooks/modifiedContent';
import Skills from '@/apiCalls/skills';

const portfolioDetails = () => {
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get('portfolio_id');
  const [portfolioDetails, setPortfolioDetails] = useState(null);

  const { listOfdata, loading } = Reports('portfolioById', portfolioId);
  const { listOfskills } = Skills();

  useEffect(() => {
    if (listOfdata && listOfdata.portfolios_ids.length > 0) {
      setPortfolioDetails(listOfdata?.portfolios_ids[0]);
    }
  }, [listOfdata]);

  console.log({ portfolioDetails, portfolioId, loading, listOfdata });
  useBodyBackgroundColor('#EFF5FD');

  if (!loading && portfolioId && portfolioDetails) {
    return (
      <div className='bg-[#EFF5FD]'>
        {/* Hero Section */}
        <section className='mainContainer w-full max-ultraSmall:h-[45rem] h-[78rem] lg:h-[90rem] relative '>
          {/* Background SVG */}
          <Portfoliodetailbg />
          {/* Hero Top Content */}
          <div className='mainContainer w-full flex items-center justify-center flex-col text-center pt-[12.5rem] pb-[8rem] relative z-20'>
            {/* info */}
            <div className='flex items-center text-white text-[1.4rem] leading-[2rem] font-medium'>
              <p className=''>9 min read</p>
              {/* SVG Dot */}
              <div className='mx-[1.2rem]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='5'
                  height='6'
                  viewBox='0 0 5 6'
                  fill='none'
                >
                  <circle cx='2.5' cy='3' r='2.5' fill='white' opacity='0.6' />
                </svg>
              </div>
              <p className=''>
                {formatDate(
                  portfolioDetails?.updated_date,
                  dateFormatsOptions.dayMonthYear
                )}
              </p>
            </div>
            {/* Heading */}
            <h1 className='text-[4rem] lg:text-[6rem] leading-[5rem] lg:leading-[8rem] font-medium break-all text-white mt-[1.6rem] mb-[2.4rem]'>
              {portfolioDetails?.title}
            </h1>
          </div>
        </section>
        {/* Blog Content Section */}
        <section className='mainContainer w-full relative max-ultraSmall:mt-0  mt-[-45rem] lg:mt-[-58rem]'>
          <div className='w-full mt-[8rem]'>
            {/* Blog Detail Pic Desktop*/}
            <Image
              src={portfolioDetails?.thumbnail}
              height={1500}
              width={3000}
              alt='Banner'
              className='hidden md:block h-[70rem] object-cover rounded-[1rem]'
            />
            {/* Mobile */}
            <Image
              src={portfolioDetails?.thumbnail}
              height={410}
              width={800}
              alt='Banner'
              className='h-[41rem] w-full object-cover md:hidden rounded-[1rem]'
            />
            {/* Blog Detail Content */}
            <article className='mt-[6rem] flex gap-[4rem] flex-col items-center justify-center md:flex-row md:items-start md:justify-normal'>
              {/* Aside */}
              <aside className='rounded-[1rem] bg-white p-[2.4rem] md:max-w-[31.2rem] w-full flex flex-col gap-[3.2rem] '>
                {/* Aside Child */}
                {portfolioDetails?.my_role && (
                  <div className=''>
                    <p className='text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]'>
                      MY ROLE
                    </p>
                    <ul className='text-[1.8rem] text-heading font-medium leading-[2.6rem] list-inside list-disc'>
                      {portfolioDetails?.my_role}
                    </ul>
                  </div>
                )}
                {/* Aside Child */}
                {portfolioDetails?.services_i_provide && (
                  <div className=''>
                    <p className='text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]'>
                      SERVICE I PROVIDE
                    </p>
                    {/* <ul className='text-[1.8rem] text-heading font-medium leading-[2.6rem] list-inside list-disc'>
                  <li>UI/UX Designer</li>
                  <li>Webflow Development</li>
                  <li>Product Marketing</li>
                  <li>Website Content Writing</li>
                </ul> */}
                    <div
                      className='text-[1.8rem] text-heading font-medium leading-[2.6rem] list-inside list-disc'
                      dangerouslySetInnerHTML={{
                        __html: portfolioDetails?.services_i_provide,
                      }}
                    ></div>
                  </div>
                )}
                {/* Aside Child */}
                <div className=''>
                  <p className='text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]'>
                    PROJECT DURATION
                  </p>
                  <ul className='text-[1.8rem] text-heading font-medium leading-[2.6rem]'>
                    <li>
                      {formatDate(
                        portfolioDetails?.starting_date,
                        dateFormatsOptions.shortMonthYear
                      )}{' '}
                      -{' '}
                      {formatDate(
                        portfolioDetails?.ending_Date,
                        dateFormatsOptions.shortMonthYear
                      )}
                    </li>
                  </ul>
                </div>
                {/* Aside Child */}
                {portfolioDetails?.client_name && (
                  <div className=''>
                    <p className='text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]'>
                      Client
                    </p>
                    <ul className='text-[1.8rem] text-heading font-medium leading-[2.6rem]'>
                      <li>{portfolioDetails?.client_name}</li>
                    </ul>
                  </div>
                )}
                {/* Aside Child */}
                <div className=''>
                  <p className='text-[1.4rem] font-normal text-paragraph1 leading-[2rem] mb-[0.8rem]'>
                    CLIENT DESIGNATION
                  </p>
                  <ul className='text-[1.8rem] text-heading font-medium leading-[2.6rem]'>
                    <li>
                      This slide is 100% editable. Adapt it to your needs and
                      capture your audience’s attention.
                    </li>
                  </ul>
                </div>
              </aside>
              {/* Content */}
              <div className='w-full '>
                {/* Heading and Para */}
                <div className='text-heading'>
                  <Link
                    href={portfolioDetails?.link || '#'}
                    className='text-primary  text-[1.6rem] leading-[2.4rem] font-medium max-sm:w-full text-center mb-[1.2rem]'
                  >
                    {portfolioDetails?.title}
                  </Link>
                  {/* Heading */}
                  <h1 className='text-[3.2rem] font-medium leading-[4rem]'>
                    Client/Project Brief Description
                  </h1>
                  {/* Para */}
                  <p className='text-[2rem] leading-[3.2rem] font-normal mt-[1rem] text-paragraph1 my-[3.2rem]'>
                    {portfolioDetails?.tagline_1}
                  </p>
                  {/* Para */}
                  <p
                    className='text-[2rem] leading-[3.2rem] font-normal mt-[1rem] text-paragraph1 my-[3.2rem]'
                    dangerouslySetInnerHTML={{
                      __html: modifiedContent(
                        portfolioDetails?.tagline_2,
                        listOfskills
                      ),
                    }}
                  ></p>
                </div>

                {/* Skills Badges */}
                <div className='flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap text-[1.2rem] my-[3.2rem]'>
                  {portfolioDetails?.skills?.map((skill, index) => (
                    <Link
                      href={skill?.url || '#'}
                      className='hover:bg-primary hover:text-white py-[0.4rem] px-[2rem] text-heading bg-[#A3DDD3] rounded-[1.8rem] text-[1.4rem] font-medium leading-normal'
                    >
                      {skill.title}
                    </Link>
                  ))}
                </div>

                {/* Links */}
                <div className='flex flex-col text-nowrap  gap-[1.4rem]'>
                  {portfolioDetails?.link && (
                    <Link
                      href={portfolioDetails?.link || '#'}
                      className='text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-center btn-primary inline-block max-w-max'
                    >
                      Launch Project - Live Preview
                    </Link>
                  )}
                  {portfolioDetails?.has_testimonial && (
                    <Link
                      href={'/'}
                      className='text-primary  max-w-max text-[1.6rem] leading-[2.4rem] font-medium inline-block text-center'
                    >
                      Check Client Testimonial
                    </Link>
                  )}
                </div>
              </div>
            </article>

            {/* Paragraph Text */}
            <div
              dangerouslySetInnerHTML={{
                __html: modifiedContent(
                  portfolioDetails?.features_short,
                  listOfskills
                ),
              }}
              className='w-full my-[6.4rem] text-[2rem] leading-[3.2rem] text-paragraph1 font-normal'
            ></div>

            {/* Detiald Banner 2 */}
            <div className='w-full h-auto my-[6.4rem]'>
              <Image
                src={portfolioDetails?.thumbnail}
                height={1500}
                width={1500}
                alt='Banner'
                className=' object-contain rounded-[1rem]'
              />
              {/* Mobile */}
              {/* <Image
              src={portfolioDetails?.thumbnail}
              height={500}
              width={1000}
              alt='Banner'
              className='h-[55.6rem] w-full object-contain md:hidden rounded-[1rem]'
            /> */}
            </div>

            {/* Key Modules and Contributions */}
            <div
              className='my-[6.4rem] text-[2rem] '
              dangerouslySetInnerHTML={{
                __html: modifiedContent(
                  portfolioDetails?.features_long,
                  listOfskills
                ),
              }}
            ></div>

            {/* My Tools and Technologies */}
            <article className='my-[6.4rem]'>
              {/* Heading */}
              <div className='text-heading text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] '>
                The skills, tools and technologies I used in this project:
              </div>
              {/* Skills Container */}
              <div className='flex items-center justify-center flex-wrap xl:grid xl:grid-cols-8 xl:grid-rows-2 gap-[1.5rem] mt-[6rem]'>
                {portfolioDetails?.skills?.map((skill, index) => (
                  <div
                    key={index}
                    className='flex flex-col items-center justify-center gap-[0.8rem] max-w-[100px] lg:max-w-[130px] w-full'
                  >
                    <div className='flex items-center justify-center'>
                      <Image
                        src={skill?.icon}
                        alt={skill?.title}
                        height={64}
                        width={64}
                        className='h-[6.4rem] w-[6.4rem] rounded-[1.2rem]'
                      />
                    </div>
                    <p className='text-paragraph1 text-[1.8rem] leading-[2.8rem] text-center overflow-hidden text-ellipsis whitespace-nowrap'>
                      {skill?.title}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* SliderXL */}
            {portfolioDetails !== null && (
              <article className='w-full flex items-center justify-center'>
                <SliderXL portfolioPictures={portfolioDetails?.pictures} />
              </article>
            )}
          </div>
        </section>
        {/* Our Blogs Section */}
        <div className='w-full my-[10rem] lg:my-[12rem]'>
          <OurBlogs />
        </div>
        {/* Newsletter */}
        <section className='w-full mb-[10rem] lg:mb-[12rem]'>
          <Newsletter />
        </section>
      </div>
    );
  } else {
    return <WebsiteLoader />;
  }
};

export default portfolioDetails;
