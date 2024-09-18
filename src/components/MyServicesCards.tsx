import React from 'react';
import Image from 'next/image';

const MyServicesCards = ({ services }) => {
  return (
    <>
      {services.map((service, index) => (
        <div
          key={index}
          className='bg-white/20 rounded-[1.8rem] md:max-w-[30.12rem] w-full p-[2rem] flex flex-col justify-between min-h-[30rem]'
        >
          {/* Circle */}
          {service.picture && (
            <div className='w-[8.8rem] h-[8.8rem] flex items-center justify-center bg-white/20 rounded-[12rem] shadow'>
              <div className='text-center text-white text-[4.3rem] font-medium'>
                <Image
                  src={service.picture}
                  height={100}
                  width={100}
                  alt='Icon'
                />
              </div>
            </div>
          )}
          {/* Title */}
          <h3 className='text-[2rem] font-bold text-white leading-[2.4rem] mt-[3rem] mb-[1.2rem]'>
            {service?.title}
          </h3>
          {/* Para */}
          <p
            dangerouslySetInnerHTML={{ __html: service?.tagline }}
            className='text-[1.6rem] font-normal leading-[2.4rem] text-paragraph2 mb-[1.6rem] flex-grow'
          >
            {/* Placeholder to keep the height consistent */}
          </p>
          {/* Arrow */}
          <div className='flex gap-[0.8rem] items-center group'>
            <a
              href={`/offer?service=${service?.title}`}
              className='text-[1.6rem] text-white font-normal cursor-pointer'
            >
              Read More
            </a>
            <Image
              src='/images/ArrowRight.svg'
              height={24}
              width={24}
              className='group-hover:translate-x-[1rem] duration-300'
              alt='Arrow Right'
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default MyServicesCards;
