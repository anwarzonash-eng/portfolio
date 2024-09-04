'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Confetti from './Confetti';
import VideoPlayer from './VideoPlayer';

const FreeTrialPopup: React.FC = () => {
  const mySkills: string[] = [
    'Java',
    'React',
    'Vue js',
    'Angular',
    'iOS',
    'DevOps',
    'Backend',
    'node.js',
    '.Net',
    'AWS',
    'Shopify',
    'Python',
    'Odoo',
    'Android',
  ];

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const introPopupViewed = localStorage.getItem('IntropopupViewed');

    if (!introPopupViewed) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('IntropopupViewed', 'true');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <>
      <div className='fixed top-0 left-0 w-full h-full bg-primary bg-opacity-50 z-[500]'>
        <div className='relative w-full h-full overflow-y-auto  py-[10rem]'>
          <Confetti />
          {/* Free Trial PopUp */}
          <div className='max-w-[102.4rem] mx-auto w-full bg-trialPopUpGradient relative'>
            {/* Close Icon */}
            <div className='absolute top-[-1rem] right-[-1rem] cursor-pointer z-[60]'>
              <Image
                src='/images/close-icon.svg'
                height={50}
                width={50}
                className='h-[3rem] w-[3rem]'
                alt='Close Icon'
                onClick={handleClose} // Close popup on click
              />
            </div>
            {/* Top Content */}
            <div className='relative w-full min-h-[44rem] sm:min-h-[62rem]'>
              {/* Image */}
              <Image
                src='/images/popupLine.svg'
                height={620}
                width={1024}
                className='absolute h-full w-full bg-cover z-10'
                alt='Popup Line'
              />
              {/* Content */}
              <div className='relative w-full h-full z-20'>
                <div className='text-white text-center flex flex-col gap-[1.2rem] items-center justify-center py-[3rem]'>
                  <h1 className='text-[3.2rem] lg:text-[5rem] font-bold leading-normal'>
                    2 Weeks Free Trial Development!
                  </h1>
                  <p className='text-[1.8rem] lg:text-[2.2rem] font-normal leading-normal'>
                    Work with me for 2 weeks with guaranteed satisfaction.
                  </p>
                </div>
                <div className='relative flex items-end justify-center max-w-[97.7rem] w-full px-[1.5rem] mx-auto'>
                  {/* Video Section */}
                  <VideoPlayer
                    videoSrc='/videos/testVideo.mp4'
                    videoClassName='h-full w-full h-[28.8rem] sm:h-[44rem] object-cover'
                    thumbnailSrc='/images/popUpPic.png'
                    containerClassName='max-w-[1200px] w-full'
                    thumbnailClassName='h-[28.8rem] sm:h-[44rem]'
                    thumbnailImage='object-cover h-full w-full rounded-[1rem]'
                    playButtonClassName='!w-[100px] !h-[100px] relative flex items-center justify-center'
                    closeButtonClassName='custom-close-button'
                    playIcon='/images/popUpPlay.svg'
                    closeIcon='/images/close-icon.svg'
                  />
                </div>
              </div>
            </div>
            {/* Bottom Content */}
            <div className='bg-white'>
              {/* Heading and Button */}
              <div className='flex flex-wrap justify-center lg:justify-between lg:flex-nowrap lg:items-center gap-[2rem] py-[2rem] px-[3rem] border-b border-solid border-border'>
                <div className='max-w-[614px] w-full flex-shrink-0'>
                  <p className="text-primary text-[3rem] font-bold font-['Helvetica Neue'] leading-[45px]">
                    Full Stack Developer
                  </p>
                  <p className='text-black text-[1.8rem] font-normal leading-[150%]'>
                    10+ years of experience in front-end and back-end web
                    development. Ambitious and communicative. Good mentor and
                    tech lead.
                  </p>
                </div>
                <div>
                  <button className='btn-primary px-[3.4rem] py-[1.5rem] rounded-[0.4rem] text-[2rem] text-white'>
                    Keep Exploring My Website
                  </button>
                </div>
              </div>
              {/* Social Profiles and Skills */}
              <div className='flex flex-wrap md:flex-nowrap'>
                {/* Social links */}
                <div className='md:max-w-[40.8rem] w-full rounded-[0.8rem] overflow-hidden flex flex-col gap-[1.2rem] py-[2rem] md:pl-[3rem] max-md:px-[1rem] md:pr-[1rem]'>
                  <div className='w-full flex flex-col md:flex-row gap-[1.2rem]'>
                    {/* Pricing and Availability */}
                    <div className='bg-[#F7F9FC] border border-solid border-[#E2E6EE] rounded-[0.8rem] py-[2.5rem] md:max-w-[15rem] w-full flex items-center justify-center h-[9.4rem]'>
                      <div className='text-primary font-medium flex md:flex-col max-md:items-center max-md:px-[2rem] max-md:justify-between max-md:w-full'>
                        <p className='md:mb-[1rem]'>
                          <span className='text-[2rem]'>$26</span>
                          <span className='text-[1.6rem]'>/ hour</span>
                        </p>
                        {/* Divider Visible only Up to Medium Devices */}
                        <div className='h-[5.2rem] w-[1px] bg-border md:hidden'></div>
                        <p>
                          <span className='text-[2rem]'>45 hr</span>{' '}
                          <span className='text-[1.6rem]'>/ week</span>
                        </p>
                      </div>
                    </div>
                    {/* Contact */}
                    <div className='bg-[#F7F9FC] border border-solid border-[#E2E6EE] py-[2.5rem] px-[2rem] md:max-w-[22rem] w-full flex items-center justify-start rounded-[0.8rem] h-[9.4rem]'>
                      <div>
                        <div className='w-full flex items-center gap-[1.4rem] mb-[1rem]'>
                          <Link href=''>
                            <Image
                              src='/images/gmail.svg'
                              height={45}
                              width={45}
                              alt='Gmail'
                              className='h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]'
                            />
                          </Link>
                          <Link href=''>
                            <Image
                              src='/images/whatsapp.svg'
                              height={45}
                              width={45}
                              alt='WhatsApp'
                              className='h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]'
                            />
                          </Link>
                          <Link href=''>
                            <Image
                              src='/images/number.svg'
                              height={45}
                              width={45}
                              alt='Phone Number'
                              className='h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]'
                            />
                          </Link>
                        </div>
                        <p className='text-[1.2rem] font-normal text-paragraph1'>
                          Contact Me
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='bg-[#F7F9FC] border border-solid border-[#E2E6EE] w-full px-[2rem] rounded-[0.8rem] h-[9.4rem] flex flex-col justify-center gap-[1rem]'>
                    <div className='w-full flex items-center gap-[1.4rem]'>
                      <Link href=''>
                        <Image
                          src='/images/upwork.svg'
                          height={100}
                          width={100}
                          alt='Upwork'
                          className='h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]'
                        />
                      </Link>
                      <Link href=''>
                        <Image
                          src='/images/github.svg'
                          height={100}
                          width={100}
                          alt='GitHub'
                          className='h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]'
                        />
                      </Link>
                      <Link href=''>
                        <Image
                          src='/images/linkedin.svg'
                          height={100}
                          width={100}
                          alt='LinkedIn'
                          className='h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]'
                        />
                      </Link>
                      <Link href=''>
                        <Image
                          src='/images/dribbble.svg'
                          height={100}
                          width={100}
                          alt='Dribbble'
                          className='h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]'
                        />
                      </Link>
                      <Link href=''>
                        <Image
                          src='/images/behance.svg'
                          height={100}
                          width={100}
                          alt='Behance'
                          className='h-[3.4rem] w-[3.4rem] md:h-[4.5rem] md:w-[4.5rem]'
                        />
                      </Link>
                    </div>
                    <p className='text-[1.2rem] font-normal text-paragraph1'>
                      My Work Proof
                    </p>
                  </div>
                </div>
                {/* Skills */}
                <div className='md:max-w-[62rem] w-full overflow-hidden max-md:p-[1rem] md:py-[2rem] md:pr-[3rem] md:pl-[1rem]'>
                  <h3 className='text-[1.8rem] font-bold text-primary mb-[1.2rem]'>
                    My Skills
                  </h3>
                  <div className='w-full p-[1rem] md:p-[2rem] flex items-center justify-center border border-border border-solid gap-[1rem] flex-wrap flex-shrink-0 rounded-[1rem]'>
                    <div className='md:max-w-[536px] w-full bg-white/70 backdrop-blur-[1.2rem] flex flex-wrap flex-shrink-0 gap-[1rem]'>
                      {mySkills.map((skill, index) => (
                        <div
                          key={index}
                          className='px-[1.5rem] md:px-[2.1rem] py-[0.4rem] md:py-[0.8rem] bg-white rounded-[5rem] shadow-skillShadow border-[1.5px] flex-shrink-0 border-solid border-[#DDD] justify-center items-center gap-[1rem] flex'
                          style={{ animationDelay: `${index * 0.3}s` }}
                        >
                          <div className='text-center text-primary text-[1.8rem] font-medium'>
                            {skill}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreeTrialPopup;
