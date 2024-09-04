import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PortfolioItemCard = () => {
  return (
    <>
      <div className='max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden p-[2.4rem] gap-[2.4rem] mb-[2rem]'>
        {/* Content */}
        <div className='w-full '>
          <div className='flex gap-[2.2rem] flex-wrap-reverse lg:flex-nowrap '>
            <div>
              <div className='bg-[#1B6393] p-[1.46rem] rounded-[1rem] inline-block mb-[1rem]'>
                <Image
                  src={'/images/case-white.svg'}
                  alt='Case'
                  height={34}
                  width={34}
                  className='h-[2rem] w-[2rem]'
                />
              </div>
              {/* Heading and Para */}
              <div className='text-heading'>
                {/* Heading */}
                <h1 className='text-[1.8rem] lg:text-[2rem] font-bold leading-[2.69rem]'>
                  EaseMyKid - Education Learning Management System
                </h1>
                {/* Para */}
                <p className='text-[1.4rem] leading-[1.8rem] font-normal mt-[1rem]'>
                  EaseMyKid is an{' '}
                  <span className='text-primary font-medium'>
                    education, courses, and online (LMS) &nbsp;
                  </span>
                  learning management system Figma template designed for people
                  who want to start teaching online, create an LMS etc.
                </p>
              </div>
              {/* Links */}
              <div className='flex items-center flex-wrap text-nowrap mt-[1rem]'>
                <Link
                  href={'/'}
                  className='text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold'
                >
                  Check Online
                </Link>
                <span className='inline-block text-border text-[1.5rem] px-[0.5rem] max-md:hidden'>
                  /
                </span>
                <Link
                  href={'/'}
                  className='text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold'
                >
                  View Details
                </Link>
                <span className='inline-block text-border text-[1.5rem] px-[0.5rem] max-md:hidden'>
                  /
                </span>
                <Link
                  href={'/'}
                  className='text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold'
                >
                  Check Client Testimonial
                </Link>
              </div>
            </div>
            {/* Image */}
            <div className='lg:max-w-[27.6rem] h-[20.4rem] w-full xl:flex-shrink-0 rounded-[0.45rem] relative border border-solid border-border'>
              <Image
                src={'/images/workSample.png'}
                alt='Project Image'
                height={800}
                width={800}
                className='object-cover h-full w-full'
              />
              {/* Centered Positioned Button */}
              <button className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-[0.8rem] px-[2rem] rounded-[4.2rem] border border-solid border-[#fff] text-[1.2rem] font-medium text-heading min-w-[11.9rem] bg-[rgba(0,0,0,0.20)] backdrop-blur-[0.8rem] duration-300 hover:bg-primary hover:bg-opacity-80 hover:text-white'>
                See All
              </button>
            </div>
          </div>
          {/* Line */}
          <hr className='w-full my-[2.1rem] h-px bg-border' />
          {/* List */}
          <ul className='mt-[2rem] text-heading text-[1.4rem] font-normal leading-[150%] list-disc pl-[2rem] flex flex-col gap-[0.8rem] mb-[2rem]'>
            <li>
              Lorem ipsum dolor sit amet,{' '}
              <span className='text-sectionBG'>
                consectetur adipiscing elit.&nbsp;
              </span>
              Ullamcorper ullamcorper quis.
            </li>
            <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</li>
            <li>
              Lorem ipsum <span className='text-sectionBG'>adipiscing</span> sit
              amet.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
              <span className='text-sectionBG'>
                Ullamcorper ullamcorper quis.
              </span>{' '}
            </li>
          </ul>
          {/* Skills Badges */}
          <div>
            <h4 className='text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]'>
              AREAS OF EXPERTISE I'VE WORKED IN
            </h4>
            <div className='flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]'>
              <div className='py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal'>
                AWS
              </div>
              <div className='py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal'>
                React
              </div>
              <div className='py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal'>
                jQuery
              </div>
              <div className='py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal'>
                Bootstrap 5
              </div>
              <div className='py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal'>
                HTML
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioItemCard;
