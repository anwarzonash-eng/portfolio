import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MyServicesCards = ({ services }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:flex xl:grid lg:grid-cols-4 place-items-center items-center justify-center gap-[2.4rem] mt-[6rem] md:flex-wrap '>
      {services.map((service, index) => {
        const truncatedTagline =
          service?.tagline?.split(' ')?.slice(0, 8)?.join(' ') +
          (service?.tagline?.split(' ').length > 8 ? '...' : '');

        return (
          <div
            key={index}
            className='bg-white/20 rounded-[1.8rem] md:max-w-[30.12rem] w-full p-[2rem] flex flex-col justify-between min-h-[30rem]'
          >
            {/* Circle */}
            {service.picture && (
              <div className='w-[8.8rem] h-[8.8rem] flex items-center justify-center rounded-[12rem] mx-auto image-wrapper'>
                <div className='text-center text-white text-[4.3rem] font-medium'>
                  <Image
                    src={service.picture}
                    height={100}
                    width={100}
                    alt='Icon'
                    className='w-[8.8rem] h-[8.8rem] rounded-[12rem] object-cover'
                    onError={(e) => {
                      (
                        (e.target as HTMLElement).closest(
                          '.image-wrapper'
                        ) as HTMLElement
                      ).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Title with max height */}
            <h3
              className='text-[2rem] font-bold text-white leading-[2.4rem] mt-[3rem] mb-[1.2rem] max-h-[4.8rem] overflow-hidden text-ellipsis'
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {service?.title}
            </h3>

            {/* Truncated Tagline with max height */}
            <p
              dangerouslySetInnerHTML={{ __html: truncatedTagline }}
              className='text-[1.6rem] font-normal leading-[2.4rem] text-paragraph2 mb-[1.6rem] flex-grow max-h-[4.8rem] overflow-hidden text-ellipsis'
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {/* Placeholder to keep the height consistent */}
            </p>

            {/* Arrow */}
            <div className='flex gap-[0.8rem] items-center group'>
              <Link
                href={`/offer?service=${service?.title}`}
                className='text-[1.6rem] text-white font-normal cursor-pointer inline-block'
              >
                Read More
                <Image
                  src='/images/ArrowRight.svg'
                  height={24}
                  width={24}
                  className='group-hover:translate-x-[1rem] duration-300 inline-block ms-3'
                  alt='Arrow Right'
                />{' '}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyServicesCards;
