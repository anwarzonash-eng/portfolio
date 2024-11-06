import { openChat } from '@/hooks/openTawkTochat';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ThankyouPopup = ({ setIsModalOpen, listOfdata, text = null }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-opacity-50 backdrop-blur-3xl z-[500]'>
      <div className='rounded-[1.2rem] relative w-full h-full overflow-y-auto py-[10rem]'>
        <div className='mx-6'>
          <div className='rounded-[1.2rem] max-w-[60.4rem] w-full mx-auto bg-white relative shadow-2xl shadow-primary'>
            {/* Close Icon */}
            <div className='absolute top-[-1rem] right-[-1rem] cursor-pointer z-[60]'>
              <Image
                src='/images/close-icon.svg'
                height={50}
                width={50}
                className='h-[3rem] w-[3rem]'
                alt='Close Icon'
                onClick={() => setIsModalOpen(false)} // Close popup on click
              />
            </div>
            <div className='p-[5rem] text-center'>
              <h3 className='text-[2.8rem] font-medium text-primary mb-4'>
                Thank you for {text ? text : 'subscribing'} !
              </h3>
              <p className='text-[1.7rem] mb-6 px-5'>
                We will be in touch with you within the next hour. For a quicker
                response, please explore the following options:
              </p>
              <div className='flex items-start justify-center flex-wrap gap-[1.6rem] mt-[2.4rem]'>
                {listOfdata?.phone_no && (
                  <Link
                    href={`https://wa.me/${listOfdata?.phone_no}`}
                    target='_blank'
                  >
                    <Image
                      alt=''
                      src='/images/whatsappforContactComponent.svg'
                      width={100}
                      height={100}
                      className='h-[4rem] w-[4rem]'
                    />
                  </Link>
                )}
                {listOfdata?.upwork && (
                  <Link href={listOfdata?.upwork} target='_blank'>
                    <Image
                      alt=''
                      src='/images/upworkforContactComponent.svg'
                      width={100}
                      height={100}
                      className='h-[4rem] w-[4rem]'
                    />
                  </Link>
                )}
                {listOfdata?.calendly_link && (
                  <Link href={listOfdata?.calendly_link} target='_blank'>
                    <div className='h-[4rem] w-[4rem] bg-[#006bff] rounded-lg flex items-center justify-center'>
                      <Image
                        alt=''
                        src='/images/calendlyicon.svg'
                        width={100}
                        height={100}
                        className='h-[3rem] w-[3rem]'
                      />
                    </div>
                  </Link>
                )}

                <button
                  onClick={(e) => openChat(e)}
                  className='text-primary font-bold text-lg'
                >
                  <div className='h-[4rem] w-[4rem] bg-[#22357b] rounded-lg flex items-center justify-center'>
                    <Image
                      alt=''
                      src='/images/chatNowIcon.svg'
                      width={100}
                      height={100}
                      className='h-[3rem] w-[3rem]'
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankyouPopup;
