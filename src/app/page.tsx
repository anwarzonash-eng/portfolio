"use client";
import Image from "next/image";
import VideoPlayer from "@/components/VideoPlayer";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import HomeSlider from "@/components/Sliders/HomeSlider";
import Faq from "@/components/Faqs";
import WorkProofLinks from "@/components/WorkProofLinks";
import ContactMeLinks from "@/components/ContactMeLinks";
import TechSkills from "@/components/TechSkills";
import MyServices from "@/components/MyServicesCards";
import TestimonialSlider from "@/components/Sliders/TestimonialSlider";
import TimeLineItem from "@/components/TimeLineItem";
import FreeTrialPopup from "@/components/FreeTrialPopup";
import Welcome from "@/components/Welcome";

const index = () => {
  useBodyBackgroundColor("#f8f9fa");

  // Skills
  const mySkills = [
    "Java",
    "React",
    "iOS",
    "Odoo",
    ".NET",
    "React Native",
    "Vue js",
    "Angular",
    "AWS",
    "DevOps",
    "Backend",
    "node.js",
    "Shopify",
    "Python",
    "Android",
  ];

  return (
    <main className="w-full">
      <FreeTrialPopup />
      {/* <Welcome /> */}

      {/* Hero Section */}
      <div className="w-full overflow-hidden relative top-[-9rem] bg-bannerBG pt-[9rem]">
        {/*Hero Section For Mobile and Tablet Devices*/}
        <div className="mainContainer relative xl:hidden">
          {/* Hero Section Mobile Content */}
          <div className="text-center mt-[7.6rem]">
            <p className="text-heading text-[2rem] md:text-[3.66rem] font-normal">
              Hello! I’m
            </p>
            <div className="mt-[0.5rem] font-bold text-[4rem] md:text-[8rem] lg:text-[12rem] text-primary  gap-[1rem] relative inline-block">
              <h1>Derek Kesseler</h1>
              {/* Positioned Image */}
              <Image
                src={"/images/mobileStars.svg"}
                height={45}
                width={45}
                alt="Mobile Stars"
                className="max-[365px]:hidden block mt-[1rem] h-[4.5rem] w-[4.5rem] absolute top-0 right-[-4.5rem]"
              />
            </div>
            {/* Badge */}
            <div className="flex items-center justify-center lg:justify-start max-w-[88rem] mx-auto">
              <button className="px-[2rem] py-[1.5rem] md:py-[2rem] md:px-[4rem] bg-primary rounded-[5rem] text-center text-[1.6rem] md:text-[2.4rem] font-bold text-white border-none outline-none my-[2rem] lg:mb-auto">
                UI Designer
              </button>
            </div>
            <p className="mb-[2rem] text-primary leading-[2rem] text-[1.6rem] text-center lg:hidden">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi.
            </p>
            <div className="w-full p-[1.5rem] flex justify-center items-center gap-[0.6rem] flex-wrap lg:hidden">
              {mySkills.map((skill, index) => (
                <div
                  key={index}
                  className="px-[1.4rem] py-[0.7rem] bg-white rounded-[5rem] shadow border border-[#767676] border-solid flex justify-center items-center gap-[1rem]"
                >
                  <div className="text-center text-primary text-[1.4rem] font-medium">
                    {skill}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/*Hero Section Developer Image */}
          <div className="relative mt-[-3rem]  md:flex justify-center">
            <Image
              width={731}
              height={707}
              alt="Developer Image"
              src={"/images/NewDevPics/HeroBanner(391x379).png"}
            />
            {/* Positioned Elementes Price */}
            <div className="flex gap-[0.35rem]  text-primary text-[1.4rem] font-medium rounded-[3.5rem] py-[0.69rem] bg-white shadow-lg w-[10rem] px-[0.9rem] absolute top-[22%] left-[80%] translate-x-[-60%] animate-pulse text-nowrap">
              <Image
                src={"./images/dollar-symbol.svg"}
                height={14}
                width={14}
                alt="Dollar Symbol"
                className="h-[auto] w-[auto]"
              />
              <p>$26 /hour</p>
            </div>
            {/* Positioned Elementes Availability */}
            <div className="flex  gap-[0.35rem] text-nowrap  text-primary text-[1.4rem] font-medium rounded-[3.5rem] py-[0.69rem] bg-white shadow-lg max-w-max px-[0.9rem] pr-[1.4rem] absolute bottom-[38%] left-[20%] translate-x-[-20%] animate-pulse">
              <Image
                src={"./images/clock.svg"}
                height={14}
                width={14}
                alt="Clock"
              />
              <p>45 hr/Week Availability</p>
            </div>
          </div>
        </div>
        {/* Hero Section For Desktop */}
        <div className="mainContainer hidden xl:block">
          <div className="text-center mt-[3rem]">
            <p className="text-heading text-[3.66rem] font-normal leading-normal mb-[1rem]">
              Hello! I’m
            </p>
            <h1 className="font-bold md:text-[8rem] lg:text-[12rem] text-primary mt-[-3.5rem]">
              Derek Kesseler
            </h1>
            {/* Badge */}
            <div className="flex items-center justify-center lg:justify-start max-w-[88rem] mx-auto mt-[-1.5rem] relative z-[50]">
              <button className="px-[2rem] py-[1.5rem] lg:py-[1rem] lg:px-[4rem] bg-primary rounded-[5rem] text-center text-[1.6rem] lg:text-[2.4rem] font-bold text-white border-none outline-none mb-[2rem] cursor-pointer ">
                UI Designer
              </button>
            </div>
            <div className="mt-[-15rem] flex justify-center relative">
              {/* Center Dev Image */}
              <Image
                width={731}
                height={707}
                alt="Developer Image"
                src={"/images/NewDevPics/HeroBanner(731x707).png"}
                className=""
              />
              {/* Left Pricing and Hours Badge Positoned */}
              <div className="absolute left-0 top-[24rem] w-[33.5rem] h-[18rem] inline-flex items-center justify-center bg-Circle bg-no-repeat bg-contain animate-bounce">
                <div className="h-[100px] p-5 rounded  justify-center items-center gap-5 inline-flex">
                  <div className="text-primary">
                    <h3 className="text-[4rem] font-medium leading-[4rem]">
                      $26
                    </h3>
                    <p className="text-[2rem] font-normal">hour</p>
                  </div>
                  <hr className="h-[6rem] w-[0.1rem] bg-border" />
                  <div className="text-primary">
                    <h3 className="text-[4rem] font-medium leading-[4rem]">
                      40hr
                    </h3>
                    <p className="text-[2rem] font-normal">week</p>
                  </div>
                </div>
              </div>
              {/* Positioned Skills and Text Desktop */}
              <div className="max-w-[55rem] w-full absolute right-[-4rem] top-[7rem]">
                <p className="w-full text-primary text-[2.2rem] font-medium leading-[3rem] mb-[2rem] text-left">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                  massa mi.
                </p>
                <div className="max-w-[49rem] w-full rounded-[0.6rem] border border-border border-solid overflow-hidden">
                  <div className="h-[4.8rem] w-full p-[1.5rem] bg-primary border-b border-border flex justify-start items-center gap-2.5 text-center text-white text-[1.8rem] font-medium">
                    My Skills
                  </div>

                  <div className="w-full p-[1.5rem] bg-white/70 backdrop-blur-xl justify-start items-center gap-[0.6rem] flex flex-wrap">
                    {mySkills.map((skill, index) => (
                      <div
                        key={index}
                        className="px-[21px] py-[0.8rem] bg-white rounded-[5rem] shadow border border-[#757575] justify-center items-center gap-[1rem] flex opacity-0 animate-fadeIn"
                        style={{ animationDelay: `${index * 0.3}s` }}
                      >
                        <div className="text-center text-primary text-[1.8rem] font-medium">
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
        {/* Custom Shape Divider */}
        <div className="custom-shape-divider-bottom-1722849639">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            />
          </svg>
        </div>
      </div>

      {/* About Section Completed*/}
      <section className="w-full mb-[10rem] xl:mb-[12rem] lg:mt-[5rem]">
        {/* Container Div*/}
        <div className="mainContainer flex flex-col-reverse gap-[5rem] xl:gap-0 xl:flex-row items-center justify-center xl:justify-between">
          {/* Container For Image and Badges */}
          <div className="w-full h-full xl:w-[67rem] xl:h-[64rem] flex-shrink-0 max-xl:flex  justify-center">
            <div className="relative h-[44rem] xl:h-[65rem] max-w-[56rem] bg-center bg-cover bg-no-repeat w-full bg-aboutBG rounded-[1rem]">
              {/* Experience Badge */}
              <div className="bg-white rounded-[0.8rem] absolute  bottom-[12rem] left-[1rem] xl:bottom-auto xl:left-auto xl:top-[7rem] xl:right-[-8rem] p-[1.4rem] xl:h-[12rem] xl:w-[26rem] xl:rounded-[2rem] flex items-center shadow-md gap-[1rem] xl:gap-[2rem] animate-bounce">
                {/* Badge SVG */}
                <div className="bg-[#2A97FC] rounded-[50%] flex items-center justify-center h-[4.9rem] w-[4.9rem] xl:h-[6.8rem] xl:w-[6.8rem]">
                  <img
                    src="./images/experience.svg"
                    alt="Experience"
                    className="h-[2.4rem] w-[2.4rem] xl:h-[3.4rem] xl:w-[3.4rem]"
                  />
                </div>
                {/* Badge Content */}
                <div className="flex flex-col justify-center">
                  <h3 className="uppercase text-[1.4rem] xl:text-[1.8rem] font-semibold  text-heading leading-none mt-[1rem]">
                    Experience
                  </h3>
                  <p className="text-[2.4rem] xl:text-[3rem] font-bold text-primary">
                    4+
                  </p>
                </div>
              </div>

              {/* Projects Badge */}
              <div
                className="
              bg-white rounded-[0.8rem] xl:rounded-[2rem] p-[1.4rem] xl:h-[12rem] flex items-center shadow-md gap-[1rem] xl:gap-[2rem]
              absolute bottom-[2rem] left-[1rem] xl:bottom-[3rem] xl:left-[3rem]"
              >
                {/* Badge SVG */}
                <div className="bg-[#FC822A] rounded-[50%] flex items-center justify-center h-[4.9rem] w-[4.9rem] xl:h-[6.8rem] xl:w-[6.8rem]">
                  <img
                    src="./images/badge.svg"
                    alt="Experience"
                    className="h-[2.4rem] w-[2.4rem] xl:h-[3.4rem] xl:w-[3.4rem]"
                  />
                </div>
                {/* Badge Content */}
                <div className="flex flex-col justify-center">
                  <h3 className="uppercase text-[1.4rem] xl:text-[1.8rem] font-semibold  text-heading leading-none mt-[1rem]">
                    Project Completed
                  </h3>
                  <p className="text-[2.4rem] xl:text-[3rem] font-bold text-primary">
                    5+
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Details */}
          <div className="w-full">
            {/* About Context */}
            <div className="w-full">
              {/* Badge */}
              <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium  font-Inter leading-[2rem]">
                About us
              </div>
              {/* Heading */}
              <div className="text-heading text-[2.4rem] mt-[2rem] mb-[1.2rem] font-medium leading-[2.8rem] lg:text-[3rem] lg:leading-[3.8rem]">
                A single, efficient man for managing all your technical needs.
              </div>
              {/* Paragraph */}
              <p className="text-[1.6rem] font-normal text-paragraph1 leading-[2.4rem]">
                Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                sapien fringilla, mattis ligula consectetur, ultrices mauris.
                Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
              </p>
            </div>
            {/* Info Cards */}
            <div className="my-[2rem] rounded-[0.8rem] overflow-hidden border border-border border-solid border-collapse w-full grid grid-cols-1 sm:grid-cols-2">
              <div className="w-full border border-border border-solid py-[3rem] px-[2rem]">
                <div className="w-full">
                  <h4 className="text-[2rem] font-normal text-primary">
                    Farhan Khan
                  </h4>
                  <p className="text-[1.4rem] font-normal text-paragraph1">
                    Name
                  </p>
                </div>
              </div>
              <div className="w-full border border-border border-solid py-[3rem] px-[2rem] ">
                <div className="w-full">
                  <h4 className="text-[2rem] font-normal text-primary">
                    farhan@gmail.com
                  </h4>
                  <p className="text-[1.4rem] font-normal text-paragraph1">
                    Email
                  </p>
                </div>
              </div>
              <div className="w-full border border-border border-solid py-[3rem] px-[2rem] ">
                <div className="w-full">
                  <h4 className="text-[2rem] font-medium text-primary">
                    +92 98243 91845
                  </h4>
                  <p className="text-[1.4rem] font-normal text-paragraph1">
                    Contact
                  </p>
                </div>
              </div>
              <div className="w-full border border-border border-solid py-[3rem] px-[2rem] flex items-center justify-between">
                <div className="w-full">
                  <h4 className="text-[2rem] font-normal text-primary">
                    Lahor, Pakistan
                  </h4>
                  <p className="text-[1.4rem] font-normal text-paragraph1">
                    Address
                  </p>
                </div>
                <div>
                  <Image
                    src={"/images/Pakistan.png"}
                    height={35}
                    width={35}
                    alt="Pakistan"
                  />
                </div>
              </div>
              <div className="w-full border border-border border-solid py-[3rem] px-[2rem]">
                <div className="w-full flex items-center gap-[1.4rem] mb-[0.8rem]">
                  <WorkProofLinks />
                </div>
                <p className="text-[1.35rem] font-normal text-paragraph1">
                  My Work Proof
                </p>
              </div>
              <div className="w-full border border-border border-solid py-[3rem] px-[2rem]">
                <div className="w-full flex items-center  gap-[1.4rem] mb-[0.8rem]">
                  <ContactMeLinks />
                </div>
                <p className="text-[1.35rem] font-normal text-paragraph1">
                  Contact Me
                </p>
              </div>
            </div>
            {/* Button Line */}
            <div>
              <button className="btn-primary rounded-[0.6rem] text-white py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-custom">
                Download CV
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Video Player Section */}
      <div className="w-full">
        <VideoPlayer
          videoSrc="/videos/testVideo.mp4"
          videoClassName="h-full w-full h-[40rem] lg:h-[70rem] object-cover"
          thumbnailSrc="/images/thumbnail.png"
          containerClassName="max-w-[1550px] mx-auto w-full"
          thumbnailClassName="h-[40rem] lg:h-[70rem]"
          thumbnailImage="object-cover h-full w-full"
          playButtonClassName="w-[100px] h-[100px] relative border-[0.4rem] rounded-[3.2rem] flex items-center justify-center backdrop-blur-[2.2rem] "
          closeButtonClassName="custom-close-button"
          playIcon="/images/Play.svg"
          closeIcon="/images/close-icon.svg"
        />
      </div>

      {/* Skills Section Completed */}
      <div className="mainContainer my-[10rem] xl:my-[12rem]">
        {/* Badge */}
        <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight mx-auto">
          Skills
        </div>
        {/* Heading */}
        <div className="text-center text-heading text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
          The skills, tools and technologies I am really good at:
        </div>
        {/* Skills Container */}
        <div className="flex items-center justify-center flex-wrap xl:grid xl:grid-cols-8 xl:grid-rows-2 gap-[1.5rem] mt-[6rem]">
          <TechSkills />
        </div>
      </div>

      {/* Services Section Completed */}
      <section className="w-full bg-sectionBG">
        <div className="mainContainer py-[5rem] xl:py-[10rem]">
          {/* Badge */}
          <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight mx-auto">
            My Services
          </div>
          {/* Heading */}
          <div className="text-center text-paragraph2 text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
            I am not limited with this only services. Together we can do more
          </div>
          {/* Services Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex xl:grid lg:grid-cols-4 place-items-center items-center justify-center gap-[2.4rem] mt-[6rem] md:flex-wrap ">
            <MyServices />
          </div>
        </div>
      </section>

      {/* My Work Section Slider  */}
      <section className="w-full">
        <div className="mainContainer my-[12rem]">
          {/* Badge */}
          <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight mx-auto">
            My Work
          </div>
          {/* Heading */}
          <div className="text-center text-heading text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
            Explore My Technical Endeavors
          </div>

          {/* Home Page Slider */}
          <HomeSlider />
        </div>
      </section>

      {/* Professional Experience Timeline Section Completed */}
      <section className="w-full">
        <div className="mainContainer my-[12rem]">
          {/* Badge */}
          <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight mx-auto">
            Professional Experience
          </div>
          {/* Heading */}
          <div className="text-center text-heading text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
            My Professional Career Journey
          </div>
          {/* Timeline */}
          <div className="mainContainer flex items-center justify-center mt-[4rem] lg:mt-[6rem]">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[10rem] top-[3rem] w-[0.4rem] h-[95%] bg-border  mx-[2.1rem] hidden lg:block" />
              {/* Timeline items Container */}
              <div className="space-y-[1rem] lg:space-y-[3rem] lg:space-x-[9rem]">
                {/* Date and divider */}
                <div className="ml-[0.5rem] lg:mb-auto lg:ml-auto lg:absolute left-[-1.6rem] z-10 text-[1.8rem] text-paragraph1">
                  2018 / 2019
                </div>
                {/* Timeline item */}
                <TimeLineItem />
                {/* Date and divider */}
                <div className="ml-[0.5rem] lg:ml-auto lg:absolute left-[-10rem] z-10 text-[1.8rem] text-paragraph1">
                  2018 / 2019
                </div>
                {/* Timeline item */}
                <TimeLineItem />
                {/* Date and divider */}
                <div className="ml-[0.5rem]  lg:ml-auto lg:absolute left-[-10rem] z-10 text-[1.8rem] text-paragraph1">
                  2018 / 2019
                </div>
                {/* Timeline item */}
                <TimeLineItem />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-sectionBG py-[7rem] lg:py-[10rem]">
        <div className="mainContainer">
          {/* Badge and Heading */}
          <div className="w-full lg:hidden">
            {/* Badge */}
            <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight">
              Professional Experience
            </div>
            {/* Heading */}
            <div className="text-paragraph2 text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
              My Professional Career Journey
            </div>
          </div>
          {/* Testimonial and Card Image */}
          <div className="w-full flex gap-[2rem] lg:gap-[10rem] flex-col md:flex-row-reverse  mt-[4rem] lg:items-end">
            <div className="h-[37.2rem] lg:h-[56.8rem]  max-w-[36.3rem] lg:w-[39.4rem] w-full rounded-[2rem] bg-testmonialBG bg-center bg-no-repeat bg-cover relative  overflow-hidden flex-shrink-0">
              <div className="absolute bottom-0 left-0 p-[2rem] flex items-center justify-between w-full bg-[rgba(0,0,0,0.05)] ">
                <p className="text-[1.8rem] font-bold text-white leading-[2.4rem]">
                  Founder of <br /> GearUp
                </p>
                <div className="w-[5.8rem] h-[5.8rem] relative border-[0.4rem] rounded-[1.9rem] flex items-center justify-center backdrop-blur-[2.2rem]">
                  <Image
                    src={"/images/Play.svg"}
                    height={20}
                    width={20}
                    className="mr-[-0.5rem]"
                    alt="Play Icon"
                  />
                </div>
              </div>
            </div>
            {/* Testimonial Box */}
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* FAQ Section Completed */}
      <Faq />
    </main>
  );
};

export default index;
