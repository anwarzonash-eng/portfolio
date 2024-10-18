'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import OurBlogs from '@/components/OurBlogs';
import HomeSlider from '@/components/Sliders/HomeSlider';
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor';
import { cardData } from '@/data/JsonData';
import { useSearchParams } from 'next/navigation';
import { getRoutesDetails } from '@/hooks/url';
import { reportsApiHandler } from '@/hooks/apihandlers/reportsApiHandlers';
import WebsiteLoader from '@/components/WebsiteLoader';
import { handleSkillsApiCall } from '@/hooks/apihandlers/skillsApiHandlers';
import { modifiedContent } from '@/hooks/modifiedContent';
import { handleCategoryPicture } from '@/hooks/apihandlers/categoryApiHandler';
import PageRendering from '@/components/PageRendering';

const Offer = ({ params }: { params: any }) => {
  // This is the Custom Hook That
  // use to SET the Background Color
  // OF THE Current Page
  useBodyBackgroundColor('#EFF5FD');
  const searchParams = useSearchParams();

  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [mainService, setMainService] = useState(null);
  const [detailService, setDetailService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listOfskills, setListOfSkills] = useState([]);
  const [categoryPictures, setCategoryPictures] = useState({});
  const serviceRefs = useRef([]);

  const serviceToScroll = searchParams.get('service');

  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, [searchParams]);

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        actionType: 'home',
        urlInfo,
        setLoading,
        setListOfData,
      });
  }, [urlInfo]);

  useEffect(() => {
    if (urlInfo) {
      const tmpMainservice = listOfdata.services?.find((service) => {
        return service.type === 'main';
      });

      setMainService(tmpMainservice);

      setDetailService(
        listOfdata.services?.filter((service) => {
          return service.type === 'detail';
        })
      );
    }
  }, [listOfdata]);

  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills });
  }, []);

  useEffect(() => {
    if (Array.isArray(detailService)) {
      detailService.forEach((item) => {
        const category_id = item?.category_id;
        if (category_id) {
          handleCategoryPicture(category_id, setCategoryPictures);
        }
      });
    }
  }, [detailService]);

  useEffect(() => {
    if (
      serviceRefs?.current &&
      serviceToScroll &&
      serviceRefs?.current[serviceToScroll]
    ) {
      serviceRefs?.current[serviceToScroll]?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [serviceToScroll, detailService]);

  return (
    <div className='bg-[#EFF5FD]'>
      <PageRendering
        props={{
          list: listOfdata,
          loading: loading,

          actualPage: (
            <>
              {/* Hero Banner */}
              <section className='w-full relative'>
                <div className='mainContainer h-[70rem] lg:h-[60rem] w-full relative'>
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
                          <stop
                            offset='1'
                            stop-color='white'
                            stop-opacity='0'
                          />
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
                          <stop
                            offset='1'
                            stop-color='white'
                            stop-opacity='0'
                          />
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
                          <stop
                            offset='1'
                            stop-color='white'
                            stop-opacity='0'
                          />
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
                          <stop
                            offset='1'
                            stop-color='white'
                            stop-opacity='0'
                          />
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
                          <stop
                            offset='1'
                            stop-color='white'
                            stop-opacity='0'
                          />
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
                          <stop
                            offset='1'
                            stop-color='white'
                            stop-opacity='0'
                          />
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
                          <stop
                            offset='1'
                            stop-color='white'
                            stop-opacity='0'
                          />
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
                          <stop
                            offset='1'
                            stop-color='white'
                            stop-opacity='0'
                          />
                        </radialGradient>
                        <clipPath id='clip0_411_2212'>
                          <rect width='393' height='770' fill='white' />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  {/* Badge Heading and Para Text */}
                  <div className='max-w-[1024px] mx-auto text-center px-[2rem] pt-[7rem] relative z-20'>
                    {/* Heading */}
                    <div className='text-center text-primary text-[4rem] lg:text-[6rem] font-medium  leading-[5rem] lg:leading-[6rem] mt-[1.6rem] mb-[2.4rem]'>
                      Cover Letter
                    </div>
                    {/* Badge */}
                    {mainService?.tagline && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: mainService?.tagline,
                        }}
                        className='px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium  leading-tight mx-auto mb-[1.6rem]'
                      ></div>
                    )}
                  </div>
                </div>
              </section>

              {/* Offer Letter Section */}
              <div className='mainContainer w-full mt-[-42rem] lg:mt-[-28rem] relative'>
                {/* Content Box Top */}
                {mainService && (
                  <div className='w-full bg-white rounded-[1rem] border border-border border-solid mb-[4rem]'>
                    {mainService?.intro_main && (
                      <div className='p-[1rem] lg:p-[3rem]'>
                        <h3
                          dangerouslySetInnerHTML={{
                            __html: modifiedContent(
                              mainService?.intro_main,
                              listOfskills,
                              listOfdata
                            ),
                          }}
                          className='text-center list-div text-[1.8rem] lg:text-[2.2rem] text-heading leading-[3rem] lg:leading-[3.4rem] font-medium border border-border border-solid p-[1rem] lg:p-[3rem] shadow-lg'
                        ></h3>
                      </div>
                    )}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: modifiedContent(
                          mainService?.intro_detail,
                          listOfskills,
                          listOfdata
                        ),
                      }}
                      className=' p-[1rem] list-div text-[1.6rem] lg:p-[3rem] rounded-[1rem] bg-white'
                    ></div>
                    {mainService?.skills && mainService?.skills.length > 0 && (
                      <SkillsComponent service={mainService} />
                    )}
                  </div>
                )}
                {/* Content Box Bottom 4 */}
                {detailService &&
                  detailService.map((service, index) => (
                    <div
                      key={index}
                      ref={(el) => {
                        serviceRefs.current[service?.title] = el;
                      }}
                      className='w-full bg-white rounded-[1rem] border border-border border-solid mb-[3rem] overflow-hidden'
                    >
                      <div className='p-[1rem] lg:p-[3rem] mb-[5rem] bg-sectionBG bg-cvBoxMobile sm:bg-cvBoxDesktop bg-center bg-no-repeat bg-cover lg:bg-contain'>
                        <div className='flex flex-col md:flex-row items-start md:items-center gap-[2rem] mb-[2rem]'>
                          {/* Circle Icon */}
                          {/* {service.category_id &&
                            categoryPictures[service?.category_id] && ( */}
                          {service?.picture && (
                            <div className='w-[9.3rem] h-[9.3rem] flex items-center justify-center rounded-[12rem] shadow relative'>
                              <div className='absolute inset-0 flex items-center justify-center'>
                                <Image
                                  src={service?.picture}
                                  alt='Icon'
                                  layout='fill'
                                  objectFit='cover'
                                  className='rounded-[12rem] w-[9.3rem] h-[9.3rem] object-contain'
                                />
                              </div>
                            </div>
                          )}
                          {/* Title */}
                          <h3 className='text-[2.4rem] lg:text-[3rem] text-white leading-[3rem] lg:leading-[3.4rem] font-medium'>
                            {service.title}
                          </h3>
                        </div>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: service.intro_main,
                          }}
                          className='text-white list-div text-[1.6rem] leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium mb-[2rem]'
                        ></p>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: modifiedContent(
                            service.intro_detail,
                            listOfskills,
                            listOfdata
                          ),
                        }}
                        className=' p-[1rem] list-div text-[1.6rem] lg:p-[3rem] rounded-[1rem] mt-[-6rem] lg:mt-[-8rem] bg-white'
                      ></div>
                      {service?.skills && service?.skills.length > 0 && (
                        <SkillsComponent service={service} />
                      )}
                    </div>
                  ))}
              </div>
              {/* My Work Section Slider  */}
              {listOfdata && listOfdata?.portfolios_ids?.length > 0 && (
                <section className='w-full'>
                  <div className='mainContainer my-[5rem]'>
                    {/* Badge */}
                    <div className='px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight mx-auto'>
                      My Work
                    </div>
                    {/* Heading */}
                    <div className='text-center text-heading text-[3rem] font-medium leading-[2.8rem] mt-[2rem]'>
                      Explore My Technical Endeavors
                    </div>

                    {/* Home Page Slider */}
                    <HomeSlider portfolios={listOfdata?.portfolios_ids} />
                  </div>
                </section>
              )}
              {/* Our Blogs */}
              <div className='my-[10rem] lg:my-[12.6rem]'>
                <OurBlogs listOfdata={listOfdata} />
              </div>
              {/* Newsletter */}
              {!urlInfo?.u && (
                <div className='w-full mb-[5rem]'>
                  <Newsletter />
                </div>
              )}
            </>
          ),
        }}
      />
    </div>
  );
};

export default Offer;

const SkillsComponent = ({ service }) => {
  return (
    <div className='px-[1rem]  lg:px-[3rem] text-black list-div text-[1.6rem] leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium mb-[2rem]'>
      AREAS OF EXPERTISE I'VE WORKED IN
      <div className='flex items-center gap-[1rem] lg:gap-[0.7rem] my-[2.4rem] text-nowrap flex-wrap'>
        {service?.skills.map((skill, idx) => (
          <div
            // Link
            // href={skill?.url || '#'}
            key={idx}
            className='hover:bg-primary capitalize hover:text-white py-[0.4rem] px-[2rem] bg-bannerBG text-heading rounded-[1.2rem] text-[1.4rem] font-medium leading-[2rem]'
          >
            {skill.title}
          </div>
        ))}
      </div>
    </div>
  );
};
