import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { handleCategoryPicture } from '@/hooks/apihandlers/categoryApiHandler';
import Link from 'next/link';

const MyServicesCards = ({ services }) => {
  // const [categoryPictures, setCategoryPictures] = useState({});
  // useEffect(() => {
  //   if (Array.isArray(services)) {
  //     services.forEach((item) => {
  //       const category_id = item?.category_id;
  //       if (category_id) {
  //         handleCategoryPicture(category_id, setCategoryPictures);
  //       }
  //     });
  //   }
  // }, [services]);

  return (
    <>
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
              <div className='w-[8.8rem] h-[8.8rem] flex items-center justify-center rounded-[12rem] mx-auto '>
                <div className='text-center text-white text-[4.3rem] font-medium'>
                  <Image
                    src={service.picture}
                    height={100}
                    width={100}
                    alt='Icon'
                    className='w-[8.8rem] h-[8.8rem] rounded-[12rem] object-cover'
                  />
                </div>
              </div>
            )}
            {/* {service.category_id && categoryPictures[service?.category_id] && (
              <div className='w-[8.8rem] h-[8.8rem] flex items-center justify-center mx-auto rounded-[12rem]'>
                <div className=' text-white text-[4.3rem] font-medium'>
                  <Image
                    src={categoryPictures[service?.category_id]}
                    height={100}
                    width={100}
                    alt='Icon'
                    className=' w-[8.8rem] h-[8.8rem] rounded-[12rem] object-cover'
                  />
                </div>
              </div>
            )} */}
            {/* Title */}
            <h3 className='text-[2rem] font-bold text-white leading-[2.4rem] mt-[3rem] mb-[1.2rem]'>
              {service?.title}
            </h3>
            {/* Para */}
            <p
              dangerouslySetInnerHTML={{ __html: truncatedTagline }}
              className='text-[1.6rem] font-normal leading-[2.4rem] text-paragraph2 mb-[1.6rem] flex-grow'
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
    </>
  );
};

export default MyServicesCards;
