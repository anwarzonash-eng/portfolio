'use client';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor';
import PortfolioPopUp from '@/components/PortfolioPopUp';
import Reports from '@/apiCalls/reports';
import WebsiteLoader from '@/components/WebsiteLoader';

const portfolioListing = () => {
  const { listOfdata, loading } = Reports('portfolio');
  useBodyBackgroundColor('#EFF5FD');
  const [
    selectedPorfolioPicturesforPopup,
    setSelectedPorfolioPicturesforPopup,
  ] = useState(null);
  // This Code is use to Open Popup
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = (pictures) => {
    setSelectedPorfolioPicturesforPopup(pictures);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedPorfolioPicturesforPopup(null);
    setIsModalOpen(false);
  };
  if (!loading) {
    return (
      <div className='bg-[#EFF5FD]'>
        {/* Hero Banner */}
        <section className='w-full relative '>
          <div className='mainContainer h-[60.7rem] lg:h-[65rem] w-full relative '>
            {/* Background SVG */}
            <div className='absolute top-0 left-0 w-full h-auto'>
              {/* Desktop */}
              <svg
                viewBox='0 0 1550 770'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='h-full w-full hidden lg:block'
              >
                <g clip-path='url(#clip0_411_2212)'>
                  <path
                    d='M-480 -11H1920V458.556L-480 758.555V-11Z'
                    className='fill-bannerBG'
                  />
                  <path
                    d='M1375 526.006L1841.67 467.653V538.764L1375 597.117V526.006Z'
                    className='fill-primary'
                    fill-opacity='0.4'
                  />
                  <path
                    d='M1375 526.006L1841.67 467.653V538.764L1375 597.117V526.006Z'
                    fill='url(#paint0_radial_411_2212)'
                  />
                  <path
                    d='M895 515.787L1575 430.444V501.555L895 586.898V515.787Z'
                    className='fill-bannerBG'
                  />
                  <path
                    d='M1088 421.352L1554.67 363V434.111L1088 492.463V421.352Z'
                    className='fill-primary'
                  />
                  <path
                    d='M1088 421.352L1554.67 363V434.111L1088 492.463V421.352Z'
                    fill='url(#paint1_radial_411_2212)'
                  />
                  <path
                    d='M-25 630.463L441.667 572.11V643.221L-25 701.574V630.463Z'
                    className='fill-primary'
                    fill-opacity='0.4'
                  />
                  <path
                    d='M-25 630.463L441.667 572.11V643.221L-25 701.574V630.463Z'
                    fill='url(#paint2_radial_411_2212)'
                  />
                  <path
                    d='M-193.889 722.673L272.778 664.32V735.431L-193.889 793.784V722.673Z'
                    className='fill-primary'
                  />
                  <path
                    d='M-193.889 722.673L272.778 664.32V735.431L-193.889 793.784V722.673Z'
                    fill='url(#paint3_radial_411_2212)'
                  />
                </g>
                <defs>
                  <radialGradient
                    id='paint0_radial_411_2212'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='translate(1608.33 467.653) rotate(90) scale(129.463 466.667)'
                  >
                    <stop stop-color='white' stop-opacity='0.3' />
                    <stop offset='1' stop-color='white' stop-opacity='0' />
                  </radialGradient>
                  <radialGradient
                    id='paint1_radial_411_2212'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='translate(1321.33 363) rotate(90) scale(129.463 466.667)'
                  >
                    <stop stop-color='white' stop-opacity='0.3' />
                    <stop offset='1' stop-color='white' stop-opacity='0' />
                  </radialGradient>
                  <radialGradient
                    id='paint2_radial_411_2212'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='translate(208.333 572.11) rotate(90) scale(129.463 466.667)'
                  >
                    <stop stop-color='white' stop-opacity='0.3' />
                    <stop offset='1' stop-color='white' stop-opacity='0' />
                  </radialGradient>
                  <radialGradient
                    id='paint3_radial_411_2212'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='translate(39.4447 664.32) rotate(90) scale(129.463 466.667)'
                  >
                    <stop stop-color='white' stop-opacity='0.3' />
                    <stop offset='1' stop-color='white' stop-opacity='0' />
                  </radialGradient>
                  <clipPath id='clip0_411_2212'>
                    <rect width='1550' height='770' fill='white' />
                  </clipPath>
                </defs>
              </svg>
              {/* Mobile */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='393'
                height='770'
                viewBox='0 0 393 770'
                fill='none'
                className='h-full w-full lg:hidden'
              >
                <g clip-path='url(#clip0_411_2212)'>
                  <path
                    d='M-480 -11H1920V458.556L-480 758.555V-11Z'
                    className='fill-bannerBG'
                  />
                  <path
                    d='M342.3 548.79L606 515.816V555.999L342.3 588.972V548.79Z'
                    className='fill-primary'
                    fill-opacity='0.4'
                  />
                  <path
                    d='M342.3 548.79L606 515.816V555.999L342.3 588.972V548.79Z'
                    fill='url(#paint0_radial_411_2212)'
                  />
                  <path
                    d='M71.0664 543.016L455.314 494.791V534.974L71.0664 583.198V543.016Z'
                    className='fill-bannerBG'
                  />
                  <path
                    d='M180.125 489.654L443.825 456.681V496.863L180.125 529.837V489.654Z'
                    className='fill-primary'
                  />
                  <path
                    d='M180.125 489.654L443.825 456.681V496.863L180.125 529.837V489.654Z'
                    fill='url(#paint1_radial_411_2212)'
                  />
                  <path
                    d='M-98.4546 607.816L165.245 574.843V615.026L-98.4546 647.999V607.816Z'
                    className='fill-primary'
                    fill-opacity='0.4'
                  />
                  <path
                    d='M-98.4546 607.816L165.245 574.843V615.026L-98.4546 647.999V607.816Z'
                    fill='url(#paint2_radial_411_2212)'
                  />
                  <path
                    d='M-193.889 659.92L69.8109 626.947V667.13L-193.889 700.103V659.92Z'
                    className='fill-primary'
                  />
                  <path
                    d='M-193.889 659.92L69.8109 626.947V667.13L-193.889 700.103V659.92Z'
                    fill='url(#paint3_radial_411_2212)'
                  />
                </g>
                <defs>
                  <radialGradient
                    id='paint0_radial_411_2212'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='translate(474.15 515.816) rotate(90) scale(73.1559 263.7)'
                  >
                    <stop stop-color='white' stop-opacity='0.3' />
                    <stop offset='1' stop-color='white' stop-opacity='0' />
                  </radialGradient>
                  <radialGradient
                    id='paint1_radial_411_2212'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='translate(311.975 456.681) rotate(90) scale(73.1559 263.7)'
                  >
                    <stop stop-color='white' stop-opacity='0.3' />
                    <stop offset='1' stop-color='white' stop-opacity='0' />
                  </radialGradient>
                  <radialGradient
                    id='paint2_radial_411_2212'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='translate(33.3952 574.843) rotate(90) scale(73.1559 263.7)'
                  >
                    <stop stop-color='white' stop-opacity='0.3' />
                    <stop offset='1' stop-color='white' stop-opacity='0' />
                  </radialGradient>
                  <radialGradient
                    id='paint3_radial_411_2212'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    gradientTransform='translate(-62.0389 626.947) rotate(90) scale(73.1559 263.7)'
                  >
                    <stop stop-color='white' stop-opacity='0.3' />
                    <stop offset='1' stop-color='white' stop-opacity='0' />
                  </radialGradient>
                  <clipPath id='clip0_411_2212'>
                    <rect width='393' height='770' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </div>
            {/* Badge Heading and Paara Text */}
            <div className='max-w-[1024px] mx-auto text-center px-[2rem] pt-[8rem] relative z-20'>
              {/* Badge */}
              <div className='px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight mx-auto mb-[1.6rem]'>
                Portfolio
              </div>
              {/* Heading */}
              <div className='text-center text-primary text-[4rem] lg:text-[6rem] font-medium  leading-[5rem] lg:leading-[6rem] mt-[1.6rem] mb-[2.4rem]'>
                My Recent Work
              </div>
              {/* Pars Text */}
              <p className='text-[2rem] leading-[3rem] font-normal text-heading'>
                Check out some of the best work i have done.
              </p>
            </div>
          </div>
        </section>
        {isModalOpen && selectedPorfolioPicturesforPopup !== null && (
          <PortfolioPopUp
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            portfolioPictures={selectedPorfolioPicturesforPopup}
          />
        )}

        {/* Portfolio Timeline Section */}
        <div className='mainContainer mt-[-30rem] lg:mt-[-40rem] xl:mt-[-36rem]  w-full '>
          {/* Timeline */}
          <div className='flex items-center justify-center mt-[4rem] lg:mt-[6rem]'>
            <div className='relative'>
              {/* Vertical line */}
              <div className='absolute left-[-1rem] lg:left-[1rem] top-0 w-[2px] h-[100%] bg-[#7B869E;] mx-[2.1rem] ' />
              {/* Timeline items Container */}
              <div className='space-y-[1rem] lg:space-y-[3rem]'>
                {listOfdata?.portfolios_ids?.map((portfolio, index) => (
                  <div className='relative flex items-start ' key={index}>
                    {/* Dot */}
                    <div className='absolute top-0 left-0 lg:left-[1.8rem]'>
                      <div className='w-[2.6rem] h-[2.6rem] bg-white rounded-full flex items-center shadow-md justify-center'>
                        <div className='w-[0.7rem] h-[0.7rem] bg-[#5531A7] rounded-full'></div>
                      </div>
                    </div>
                    <div className='ml-[3rem] lg:ml-[6rem]'>
                      {/* Year */}
                      <h1 className='text-heading text-[2rem] leading-[2.7rem] font-bold mb-[1rem] max-lg:ml-[0.5rem]'>
                        {new Date(portfolio.starting_date).getFullYear()} -{' '}
                        {isNaN(new Date(portfolio.ending_Date).getFullYear())
                          ? portfolio.ending_Date
                          : new Date(portfolio.ending_Date).getFullYear()}
                      </h1>
                      {/* Card */}
                      <div className='flex flex-col-reverse lg:flex-row max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden p-[2.4rem] gap-[2.4rem]'>
                        {/* Content */}
                        <div className='lg:max-w-[68rem] w-full'>
                          <div className='bg-[#1B6393] p-[1.46rem] rounded-[1rem] inline-block mb-[1rem]'>
                            <Image
                              src={portfolio?.company_icon}
                              alt='Case'
                              height={34}
                              width={34}
                              className='h-[2rem] w-[2rem] rounded-[1rem]'
                            />
                          </div>
                          {/* Title and Description */}
                          <div className='text-heading'>
                            <h1 className='text-[1.8rem] lg:text-[2rem] font-bold leading-[2.69rem]'>
                              {portfolio?.title}
                            </h1>
                            <p className='text-[1.4rem] leading-[1.8rem] font-normal mt-[1rem]'>
                              {portfolio.tagline_1}
                            </p>
                            <hr className='w-full my-[1.6rem] h-px bg-border' />
                          </div>
                          {/* Points */}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: portfolio.features_short,
                            }}
                            className='text-[1.4rem] leading-[150%] text-heading mb-[2rem] ml-[2rem]'
                          ></div>
                          {/* Skills */}
                          <div>
                            <h4 className='text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]'>
                              AREAS OF EXPERTISE I'VE WORKED IN
                            </h4>
                            <div className='flex items-center gap-[1rem] lg:gap-[0.7rem] flex-wrap text-[1.2rem]'>
                              {portfolio.skills.map((skill, i) => (
                                <Link
                                  href={skill?.url}
                                  key={i}
                                  className='hover:bg-primary hover:text-white py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal'
                                >
                                  {skill.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                          <hr className='w-full my-[2.4rem] h-px bg-border' />
                          {/* Links */}
                          <div className='flex items-center flex-wrap max-sm:flex-col max-md:items-start gap-[1.4rem]'>
                            <Link
                              href={`/portfolio-detail?portfolio_id=${portfolio.id}`}
                              className='text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 max-sm:w-full text-center rounded-[0.6rem]'
                            >
                              View Details
                            </Link>
                            <Link
                              href={portfolio?.link}
                              className='py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-primary border border-solid hover:border-transparent border-primary duration-300 hover:bg-primary hover:text-white rounded-[0.6rem] max-sm:w-full text-center'
                            >
                              Launch Project - Live Preview
                            </Link>
                            {portfolio?.has_testimonial == true && (
                              <Link
                                href={'#'}
                                className='text-primary  text-[1.6rem] leading-[2.4rem] font-medium max-sm:w-full text-center'
                              >
                                Check Client Testimonial
                              </Link>
                            )}
                          </div>
                        </div>
                        {/* Image */}
                        <div className='lg:max-w-[51rem] w-full xl:flex-shrink-0 rounded-[1.2rem] relative  flex items-center'>
                          <Image
                            src={portfolio.thumbnail}
                            alt='Project Image'
                            height={800}
                            width={800}
                            className='object-contain w-full rounded-[1.2rem] border border-solid border-border'
                          />
                          <button
                            className='hover:tracking-[.25em] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-[1rem] lg:py-[1.4rem] px-[2rem] lg:px-[3.7rem] rounded-[7.77rem] border-2 border-solid border-[#fff] text-[1.8rem] lg:text-[2.2rem] font-medium  min-w-[137px] lg:min-w-[220px]  backdrop-blur-[0.8rem] duration-300 bg-primary hover:bg-opacity-80 text-white'
                            onClick={() => openModal(portfolio?.pictures)}
                          >
                            See All
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Newsletter */}
        <div className='w-full my-[9.6rem]'>
          <Newsletter />
        </div>
      </div>
    );
  } else {
    return <WebsiteLoader />;
  }
};

export default portfolioListing;
