"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import VideoPlayer from "@/components/VideoPlayer";
import Slider from "@/components/Sliders/Slider";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import HomeSlider from "@/components/Sliders/HomeSlider";
// import FreeTrialPopup from "@/components/FreeTrialPopup";

const index = () => {
  useBodyBackgroundColor("#f8f9fa");
  // Define the types for the skills
  interface Skill {
    src: string;
    title: string;
  }

  interface FAQ {
    question: string;
    answer: string;
  }

  // Update the skills and FAQs arrays
  const mySkills: string[] = [
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

  const skillsSectionDesktop: Skill[] = [
    { src: "./images/skills/javascript.svg", title: "Javascript" },
    { src: "./images/skills/typescript.svg", title: "TypeScript" },
    { src: "./images/skills/react.svg", title: "React" },
    { src: "./images/skills/next.svg", title: "Next.js" },
    { src: "./images/skills/node.svg", title: "Node.js" },
    { src: "./images/skills/express.svg", title: "Express.js" },
    { src: "./images/skills/nest.svg", title: "Nest.js" },
    { src: "./images/skills/socket.svg", title: "Socket.io" },
    { src: "./images/skills/postgre.svg", title: "PostgreSQL" },
    { src: "./images/skills/mongodb.svg", title: "MongoDB" },
    { src: "./images/skills/sass.svg", title: "Sass/Scss" },
    { src: "./images/skills/tailwind.svg", title: "Tailwindcss" },
    { src: "./images/skills/figma.svg", title: "Figma" },
    { src: "./images/skills/cypress.svg", title: "Cypress" },
    { src: "./images/skills/storybook.svg", title: "Storybook" },
    { src: "./images/skills/git.svg", title: "Git" },
  ];

  const faqs: FAQ[] = [
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "Can I change my plan later?",
      answer: "Yes you can change your plan whenever you want.",
    },
    {
      question: "What is your cancellation policy?",
      answer: "Our cancellation policy is very customer friendly.",
    },
    {
      question: "How does billing work?",
      answer: "Billing works around the same day you make payment.",
    },
    {
      question: "How do I change my account email?",
      answer:
        "You can easily change your account via connecting our customer support experts.",
    },
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  // Slides Array
  const slides = [
    // Slide One
    () => (
      <div key="slide1">
        {/* Add your first slide content here */}
        <div className="w-full hidden lg:block mb-[5rem]">
          {/* Badge */}
          <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-['Inter'] leading-tight">
            Professional Experience
          </div>
          {/* Heading */}
          <div className="text-paragraph2 text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
            My Professional Career Journey
          </div>
        </div>
        <div className="p-[2rem] lg:p-[4rem] bg-[rgba(255,255,255,0.2)] rounded-[1.2rem] w-full">
          {/* DoubleQuotes */}
          <Image
            src={"/images/DoubleQuotes.svg"}
            height={40}
            width={40}
            alt="Double Quotes"
          />
          <h3 className="text-[2rem] lg:text-[2.4rem] leading-[3.2rem] font-normal text-white my-[2rem]">
            “Great Designer, does great work and is very flexible with change.
            if you’re a programmer and are looking for UI/UX designer is
            definitely well qualified for the job.”
          </h3>
          <hr className="h-[0.1rem] w-full bg-border mb-[2rem]" />
          {/* Testimonial Client Info */}
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h4 className="text-[2rem] font-normal">EaseMyKid</h4>
              <p className="text-[1.4rem] font-normal">Project</p>
            </div>
            <div>
              <Link href={"#"} className="flex items-center gap-[0.8rem] group">
                <p className="text-[1.6rem] font-medium text-white">
                  Check Project
                </p>
                <img
                  src="./images/ArrowRight.svg"
                  alt="Arrow"
                  className="group-hover:translate-x-[1rem] duration-300"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:flex items-center justify-between">
          {/* Client Info Box */}
          <div className="flex items-center gap-[1.5rem] mt-[3.2rem] mb-[2.4rem]">
            <Image
              src={"/images/cameron.png"}
              height={72}
              width={72}
              alt="Cameron"
            />
            <div className="lg:flex items-end ">
              <div>
                <h3 className="text-[1.8rem] font-bold leading-[2.6rem] text-paragraph2">
                  Cameron Williamson
                </h3>
                <h4 className="text-[1.6rem] font-bold leading-[2.4rem] text-paragraph2">
                  Founder of cypexsoft
                </h4>
              </div>
              <hr className="hidden lg:block w-[0.1rem] h-[2.5rem] bg-border mx-[1rem]" />
              {/* Link */}
              <div className="flex items-center gap-[0.52rem]">
                <Image
                  src={"./images/link.svg"}
                  height={18}
                  width={18}
                  alt="Link"
                />
                <Link
                  href={"https://cpasxsoft.com"}
                  className="text-[#1F4FE1] text-[1.6rem] leading-normal"
                >
                  cpasxsoft.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    // Slide Two
    () => (
      <div key="slide2">
        {/* Add your first slide content here */}
        <div className="w-full hidden lg:block mb-[5rem]">
          {/* Badge */}
          <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-['Inter'] leading-tight">
            Professional Experience
          </div>
          {/* Heading */}
          <div className="text-paragraph2 text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
            My Professional Career Journey
          </div>
        </div>
        <div className="p-[2rem] lg:p-[4rem] bg-[rgba(255,255,255,0.2)] rounded-[1.2rem] w-full">
          {/* DoubleQuotes */}
          <Image
            src={"/images/DoubleQuotes.svg"}
            height={40}
            width={40}
            alt="DoubleQuotes"
          />
          <h3 className="text-[2rem] lg:text-[2.4rem] leading-[3.2rem] font-normal text-white my-[2rem]">
            “Great Designer, does great work and is very flexible with change.
            if you’re a programmer and are looking for UI/UX designer is
            definitely well qualified for the job.”
          </h3>
          <hr className="h-[0.1rem] w-full bg-border mb-[2rem]" />
          {/* Testimonial Client Info */}
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h4 className="text-[2rem] font-normal">EaseMyKid</h4>
              <p className="text-[1.4rem] font-normal">Project</p>
            </div>
            <div>
              <Link href={"#"} className="flex items-center gap-[0.8rem] group">
                <p className="text-[1.6rem] font-medium text-white">
                  Check Project
                </p>
                <img
                  src="./images/ArrowRight.svg"
                  alt="Arrow"
                  className="group-hover:translate-x-[1rem] duration-300"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:flex items-center justify-between">
          {/* Client Info Box */}
          <div className="flex items-center gap-[1.5rem] mt-[3.2rem] mb-[2.4rem]">
            <Image
              src={"/images/cameron.png"}
              height={72}
              width={72}
              alt="cameron"
            />
            <div className="lg:flex items-end ">
              <div>
                <h3 className="text-[1.8rem] font-bold leading-[2.6rem] text-paragraph2">
                  Cameron Williamson
                </h3>
                <h4 className="text-[1.6rem] font-bold leading-[2.4rem] text-paragraph2">
                  Founder of cypexsoft
                </h4>
              </div>
              <hr className="hidden lg:block w-[0.1rem] h-[2.5rem] bg-border mx-[1rem]" />
              {/* Link */}
              <div className="flex items-center gap-[0.52rem]">
                <Image
                  src={"./images/link.svg"}
                  height={18}
                  width={18}
                  alt="Link"
                />
                <Link
                  href={"https://cpasxsoft.com"}
                  className="text-[#1F4FE1] text-[1.6rem] leading-normal"
                >
                  cpasxsoft.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    // Slide Three
    () => (
      <div key="slide3">
        {/* Add your first slide content here */}
        <div className="w-full hidden lg:block mb-[5rem]">
          {/* Badge */}
          <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-['Inter'] leading-tight">
            Professional Experience
          </div>
          {/* Heading */}
          <div className="text-paragraph2 text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
            My Professional Career Journey
          </div>
        </div>
        <div className="p-[2rem] lg:p-[4rem] bg-[rgba(255,255,255,0.2)] rounded-[1.2rem] w-full">
          {/* DoubleQuotes */}
          <Image
            src={"/images/DoubleQuotes.svg"}
            height={40}
            width={40}
            alt="Double Quotes"
          />
          <h3 className="text-[2rem] lg:text-[2.4rem] leading-[3.2rem] font-normal text-white my-[2rem]">
            “Great Designer, does great work and is very flexible with change.
            if you’re a programmer and are looking for UI/UX designer is
            definitely well qualified for the job.”
          </h3>
          <hr className="h-[0.1rem] w-full bg-border mb-[2rem]" />
          {/* Testimonial Client Info */}
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h4 className="text-[2rem] font-normal">EaseMyKid</h4>
              <p className="text-[1.4rem] font-normal">Project</p>
            </div>
            <div>
              <Link href={"#"} className="flex items-center gap-[0.8rem] group">
                <p className="text-[1.6rem] font-medium text-white">
                  Check Project
                </p>
                <img
                  src="./images/ArrowRight.svg"
                  alt="Arrow"
                  className="group-hover:translate-x-[1rem] duration-300"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:flex items-center justify-between">
          {/* Client Info Box */}
          <div className="flex items-center gap-[1.5rem] mt-[3.2rem] mb-[2.4rem]">
            <Image
              src={"/images/cameron.png"}
              height={72}
              width={72}
              alt="Cameron"
            />
            <div className="lg:flex items-end ">
              <div>
                <h3 className="text-[1.8rem] font-bold leading-[2.6rem] text-paragraph2">
                  Cameron Williamson
                </h3>
                <h4 className="text-[1.6rem] font-bold leading-[2.4rem] text-paragraph2">
                  Founder of cypexsoft
                </h4>
              </div>
              <hr className="hidden lg:block w-[0.1rem] h-[2.5rem] bg-border mx-[1rem]" />
              {/* Link */}
              <div className="flex items-center gap-[0.52rem]">
                <Image
                  src={"./images/link.svg"}
                  height={18}
                  width={18}
                  alt="Link"
                />
                <Link
                  href={"https://cpasxsoft.com"}
                  className="text-[#1F4FE1] text-[1.6rem] leading-normal"
                >
                  cpasxsoft.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ];

  return (
    <main className="w-ful">
      {/* <FreeTrialPopup /> */}

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
              <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-['Inter'] leading-[2rem]">
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
                  <Link href={""}>
                    <Image
                      src={"./images/upwork.svg"}
                      height={45}
                      width={45}
                      alt="upwork"
                    />
                  </Link>
                  <Link href={""}>
                    <Image
                      src={"./images/github.svg"}
                      height={45}
                      width={45}
                      alt="github"
                    />
                  </Link>
                  <Link href={""}>
                    <Image
                      src={"./images/linkedin.svg"}
                      height={45}
                      width={45}
                      alt="linkedin"
                    />
                  </Link>
                  <Link href={""}>
                    <Image
                      src={"./images/dribbble.svg"}
                      height={45}
                      width={45}
                      alt="dribbble"
                    />
                  </Link>
                  <Link href={""}>
                    <Image
                      src={"./images/behance.svg"}
                      height={45}
                      width={45}
                      alt="behance"
                    />
                  </Link>
                </div>
                <p className="text-[1.35rem] font-normal text-paragraph1">
                  My Work Proof
                </p>
              </div>
              <div className="w-full border border-border border-solid py-[3rem] px-[2rem]">
                <div className="w-full flex items-center  gap-[1.4rem] mb-[0.8rem]">
                  <Link href={""}>
                    <Image
                      src={"./images/gmail.svg"}
                      height={45}
                      width={45}
                      alt="gmail"
                    />
                  </Link>
                  <Link href={""}>
                    <Image
                      src={"./images/whatsapp.svg"}
                      height={45}
                      width={45}
                      alt="whatsapp"
                    />
                  </Link>
                  <Link href={""}>
                    <Image
                      src={"./images/number.svg"}
                      height={45}
                      width={45}
                      alt="number"
                    />
                  </Link>
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
        <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-['Inter'] leading-tight mx-auto">
          Skills
        </div>
        {/* Heading */}
        <div className="text-center text-heading text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
          The skills, tools and technologies I am really good at:
        </div>
        {/* Skills Container */}
        <div className="flex items-center justify-center flex-wrap xl:grid xl:grid-cols-8 xl:grid-rows-2 gap-[1.5rem] mt-[6rem]">
          {skillsSectionDesktop.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-[0.8rem] max-w-[10rem] lg:max-w-[13rem] w-full"
            >
              <Image
                src={skill.src}
                alt={skill.title}
                height={64}
                width={64}
                className="h-[6.4rem] w-[6.4rem] "
              />
              <p className="text-paragraph1 text-[1.8rem] leading-[2.8rem]">
                {skill.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section Completed */}
      <section className="w-full bg-sectionBG">
        <div className="mainContainer py-[5rem] xl:py-[10rem]">
          {/* Badge */}
          <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-['Inter'] leading-tight mx-auto">
            My Services
          </div>
          {/* Heading */}
          <div className="text-center text-paragraph2 text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]">
            I am not limited with this only services. Together we can do more
          </div>
          {/* Services Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex xl:grid lg:grid-cols-4 place-items-center items-center justify-center gap-[2.4rem] mt-[6rem] md:flex-wrap ">
            <div className="bg-white/20 rounded-[1.8rem] md:max-w-[30.12rem] w-full p-[2rem]">
              {/* Circle */}
              <div className="w-[8.8rem] h-[8.8rem] flex items-center justify-center bg-white/20 rounded-[12rem] shadow">
                <div className="text-center text-white text-[4rem] font-medium ">
                  🛠️
                </div>
              </div>
              {/* Title */}
              <h3 className="text-[2rem] font-bold text-white leading-[2.4rem] mt-[3rem] mb-[1.2rem]">
                Back-end Development
              </h3>
              {/* Para */}
              <p className="text-[1.6rem] font-normal leading-[2.4rem] text-paragraph2 mb-[1.6rem]">
                Vivamus in quam ut felis consectetur imperdiet et sed metus.
                Nullam tristique scelerisque metus id dignissim.
              </p>
              {/* Arrow */}
              <div className="flex gap-[0.8rem] items-center group">
                <p className="text-[1.6rem] text-white font-normal cursor-pointer">
                  Let’s Work Together{" "}
                </p>
                <Image
                  src={"./images/ArrowRight.svg"}
                  height={24}
                  width={24}
                  className="group-hover:translate-x-[1rem] duration-300"
                  alt="Arrow Right"
                />
              </div>
            </div>
            <div className="bg-white/20 rounded-[1.8rem] md:max-w-[30.12rem] w-full p-[2rem]">
              {/* Circle */}
              <div className="w-[8.8rem] h-[8.8rem] flex items-center justify-center bg-white/20 rounded-[12rem] shadow">
                <div className="text-center text-white text-[4rem] font-medium ">
                  📢
                </div>
              </div>
              {/* Title */}
              <h3 className="text-[2rem] font-bold text-white leading-[2.4rem] mt-[3rem] mb-[1.2rem]">
                Front-end Development
              </h3>
              {/* Para */}
              <p className="text-[1.6rem] font-normal leading-[2.4rem] text-paragraph2 mb-[1.6rem]">
                Vivamus in quam ut felis consectetur imperdiet et sed metus.
                Nullam tristique scelerisque metus id dignissim.
              </p>
              {/* Arrow */}
              <div className="flex gap-[0.8rem] items-center group">
                <p className="text-[1.6rem] text-white font-normal cursor-pointer">
                  Let’s Work Together{" "}
                </p>
                <Image
                  src={"./images/ArrowRight.svg"}
                  height={24}
                  width={24}
                  alt="Arrow Right"
                  className="group-hover:translate-x-[1rem] duration-300"
                />
              </div>
            </div>
            <div className="bg-white/20 rounded-[1.8rem] md:max-w-[30.12rem] w-full p-[2rem]">
              {/* Circle */}
              <div className="w-[8.8rem] h-[8.8rem] flex items-center justify-center bg-white/20 rounded-[12rem] shadow">
                <div className="text-center text-white text-[4rem] font-medium ">
                  🚀
                </div>
              </div>
              {/* Title */}
              <h3 className="text-[2rem] font-bold text-white leading-[2.4rem] mt-[3rem] mb-[1.2rem]">
                SEO Optimization
              </h3>
              {/* Para */}
              <p className="text-[1.6rem] font-normal leading-[2.4rem] text-paragraph2 mb-[1.6rem]">
                Vivamus in quam ut felis consectetur imperdiet et sed metus.
                Nullam tristique scelerisque metus id dignissim.
              </p>
              {/* Arrow */}
              <div className="flex gap-[0.8rem] items-center group">
                <p className="text-[1.6rem] text-white font-normal cursor-pointer">
                  Let’s Work Together{" "}
                </p>
                <Image
                  src={"./images/ArrowRight.svg"}
                  height={24}
                  width={24}
                  alt="Arrow Right"
                  className="group-hover:translate-x-[1rem] duration-300"
                />
              </div>
            </div>
            <div className="bg-white/20 rounded-[1.8rem] md:max-w-[30.12rem] w-full p-[2rem]">
              {/* Circle */}
              <div className="w-[8.8rem] h-[8.8rem] flex items-center justify-center bg-white/20 rounded-[12rem] shadow">
                <div className="text-center text-white text-[4rem] font-medium ">
                  ✍
                </div>
              </div>
              {/* Title */}
              <h3 className="text-[2rem] font-bold text-white leading-[2.4rem] mt-[3rem] mb-[1.2rem]">
                Content Writing
              </h3>
              {/* Para */}
              <p className="text-[1.6rem] font-normal leading-[2.4rem] text-paragraph2 mb-[1.6rem]">
                Vivamus in quam ut felis consectetur imperdiet et sed metus.
                Nullam tristique scelerisque metus id dignissim.
              </p>
              {/* Arrow */}
              <div className="flex gap-[0.8rem] items-center group">
                <p className="text-[1.6rem] text-white font-normal cursor-pointer">
                  Let’s Work Together{" "}
                </p>
                <Image
                  src={"./images/ArrowRight.svg"}
                  height={24}
                  width={24}
                  alt="Arrow Right"
                  className="group-hover:translate-x-[0.5rem] duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Work Section Slider  */}
      <section className="w-full">
        <div className="mainContainer my-[12rem]">
          {/* Badge */}
          <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-['Inter'] leading-tight mx-auto">
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
          <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-['Inter'] leading-tight mx-auto">
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
                <div className="relative flex items-start">
                  {/* Dot */}
                  <div className="absolute top-0 left-[2rem] hidden lg:block">
                    <div className="w-[2.6rem] h-[2.6rem] bg-white rounded-full flex items-center shadow-md justify-center">
                      <div className="w-[0.7rem] h-[0.7rem] bg-heading rounded-full"></div>
                    </div>
                  </div>
                  {/* Card */}
                  <div className="bg-white p-[1.5rem] lg:p-[2.4rem] rounded-[1rem] shadow lg:ml-[6rem]">
                    <div className="flex items-center justify-between flex-wrap text-nowrap max-[375px]:justify-center">
                      {/* About Content */}
                      <div className="flex gap-[1rem]">
                        <div className="h-[4.2rem] w-[4.2rem] lg:h-[4.9rem] lg:w-[4.9rem] bg-[#D1E9FF] rounded-[0.4rem] flex items-center justify-center">
                          <Image
                            src={"./images/Logomark.svg"}
                            height={32}
                            width={32}
                            alt="Logo Mark"
                          />
                        </div>
                        <div>
                          <p className="text-[1.4rem] lg:text-[1.6rem] font-normal text-paragraph1">
                            Cypexsoft
                          </p>
                          <h3 className="text-[1.6rem] lg:text-[1.8rem] font-medium text-heading">
                            UI Developer
                          </h3>
                        </div>
                      </div>
                      {/* Link */}
                      <div className="flex items-center gap-[0.52rem]">
                        <Image
                          src={"./images/link.svg"}
                          height={18}
                          width={18}
                          alt="Link"
                        />
                        <Link
                          href={"https://cpasxsoft.com"}
                          className="text-[#1F4FE1] text-[1.6rem] leading-normal"
                        >
                          cpasxsoft.com
                        </Link>
                      </div>
                    </div>
                    <p className="mt-[2rem] text-[1.6rem] font-medium text-paragraph1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ullamcorper ullamcorper quis. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Ullamcorper ullamcorper quis.
                    </p>
                    <ul className="my-[2rem] text-paragraph1 text-[1.4rem] list-disc pl-[2rem] flex flex-col gap-[0.8rem]">
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </li>
                      <li>Ullamcorper ullamcorper quis.</li>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </li>
                      <li>Ullamcorper ullamcorper quis.</li>
                    </ul>
                    <div className="w-full">
                      <h4 className="text-paragraph1 text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                        AREAS OF EXPERTISE I'VE WORKED IN
                      </h4>
                      <div className="flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]">
                        <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                          AWS
                        </div>
                        <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                          React
                        </div>
                        <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                          jQuery
                        </div>
                        <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                          Bootstrap 5
                        </div>
                        <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                          HTML
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Date and divider */}
                <div className="ml-[0.5rem] lg:ml-auto lg:absolute left-[-10rem] z-10 text-[1.8rem] text-paragraph1">
                  2018 / 2019
                </div>
                {/* Timeline item */}
                <div className="relative flex items-start">
                  {/* Dot */}
                  <div className="absolute top-0 left-[2rem] hidden lg:block">
                    <div className="w-[2.6rem] h-[2.6rem] bg-white rounded-full flex items-center shadow-md justify-center">
                      <div className="w-[0.7rem] h-[0.7rem] bg-heading rounded-full"></div>
                    </div>
                  </div>
                  {/* Card */}
                  <div className="bg-white p-[1.5rem] lg:p-[2.4rem] rounded-[1rem] shadow lg:ml-[6rem]">
                    <div className="flex items-center justify-between flex-wrap text-nowrap max-[375px]:justify-center">
                      {/* About Content */}
                      <div className="flex gap-[1rem]">
                        <div className="h-[4.2rem] w-[4.2rem] lg:h-[4.9rem] lg:w-[4.9rem] bg-[#D1E9FF] rounded-[0.4rem] flex items-center justify-center">
                          <Image
                            src={"./images/Logomark.svg"}
                            height={32}
                            width={32}
                            alt="Logo Mark"
                          />
                        </div>
                        <div>
                          <p className="text-[1.4rem] lg:text-[1.6rem] font-normal text-paragraph1">
                            Cypexsoft
                          </p>
                          <h3 className="text-[1.6rem] lg:text-[1.8rem] font-medium text-heading">
                            UI Developer
                          </h3>
                        </div>
                      </div>
                      {/* Link */}
                      <div className="flex items-center gap-[0.52rem]">
                        <Image
                          src={"./images/link.svg"}
                          height={18}
                          width={18}
                          alt="Link"
                        />
                        <Link
                          href={"https://cpasxsoft.com"}
                          className="text-[#1F4FE1] text-[1.6rem] leading-normal"
                        >
                          cpasxsoft.com
                        </Link>
                      </div>
                    </div>
                    <p className="mt-[2rem] text-[1.6rem] font-medium text-paragraph1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ullamcorper ullamcorper quis. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Ullamcorper ullamcorper quis.
                    </p>
                    <ul className="my-[2rem] text-paragraph1 text-[1.4rem] list-disc pl-[2rem] flex flex-col gap-[0.8rem]">
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </li>
                      <li>Ullamcorper ullamcorper quis.</li>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </li>
                      <li>Ullamcorper ullamcorper quis.</li>
                    </ul>
                    <div className="w-full">
                      <h4 className="text-paragraph1 text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                        AREAS OF EXPERTISE I'VE WORKED IN
                      </h4>
                      <div className="flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]">
                        <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                          AWS
                        </div>
                        <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                          React
                        </div>
                        <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                          jQuery
                        </div>
                        <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                          Bootstrap 5
                        </div>
                        <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                          HTML
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Date and divider */}
                <div className="ml-[0.5rem]  lg:ml-auto lg:absolute left-[-10rem] z-10 text-[1.8rem] text-paragraph1">
                  2018 / 2019
                </div>
                {/* Timeline item */}
                <div className="relative flex items-start">
                  {/* Dot */}
                  <div className="absolute top-0 left-[2rem] hidden lg:block">
                    <div className="w-[2.6rem] h-[2.6rem] bg-white rounded-full flex items-center shadow-md justify-center">
                      <div className="w-[0.7rem] h-[0.7rem] bg-heading rounded-full"></div>
                    </div>
                  </div>
                  {/* Card */}
                  <div className="bg-white p-[1.5rem] lg:p-[2.4rem] rounded-[1rem] shadow lg:ml-[6rem]">
                    <div className="flex items-center justify-between flex-wrap text-nowrap max-[375px]:justify-center">
                      {/* About Content */}
                      <div className="flex gap-[1rem]">
                        <div className="h-[4.2rem] w-[4.2rem] lg:h-[4.9rem] lg:w-[4.9rem] bg-[#D1E9FF] rounded-[0.4rem] flex items-center justify-center">
                          <Image
                            src={"./images/Logomark.svg"}
                            height={32}
                            width={32}
                            alt="Logo Mark"
                          />
                        </div>
                        <div>
                          <p className="text-[1.4rem] lg:text-[1.6rem] font-normal text-paragraph1">
                            Cypexsoft
                          </p>
                          <h3 className="text-[1.6rem] lg:text-[1.8rem] font-medium text-heading">
                            UI Developer
                          </h3>
                        </div>
                      </div>
                      {/* Link */}
                      <div className="flex items-center gap-[0.52rem]">
                        <Image
                          src={"./images/link.svg"}
                          height={18}
                          width={18}
                          alt="Link"
                        />
                        <Link
                          href={"https://cpasxsoft.com"}
                          className="text-[#1F4FE1] text-[1.6rem] leading-normal"
                        >
                          cpasxsoft.com
                        </Link>
                      </div>
                    </div>
                    <p className="mt-[2rem] text-[1.6rem] font-medium text-paragraph1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ullamcorper ullamcorper quis. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Ullamcorper ullamcorper quis.
                    </p>
                    <ul className="my-[2rem] text-paragraph1 text-[1.4rem] list-disc pl-[2rem] flex flex-col gap-[0.8rem]">
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </li>
                      <li>Ullamcorper ullamcorper quis.</li>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </li>
                      <li>Ullamcorper ullamcorper quis.</li>
                    </ul>
                    <div className="w-full">
                      <h4 className="text-paragraph1 text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                        AREAS OF EXPERTISE I'VE WORKED IN
                      </h4>
                      <div className="flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]">
                        <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                          AWS
                        </div>
                        <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                          React
                        </div>
                        <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                          jQuery
                        </div>
                        <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                          Bootstrap 5
                        </div>
                        <div className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal">
                          HTML
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section !Slider Completed */}
      <section className="bg-sectionBG py-[7rem] lg:py-[10rem]">
        <div className="mainContainer">
          {/* Badge and Heading */}
          <div className="w-full lg:hidden">
            {/* Badge */}
            <div className="px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-['Inter'] leading-tight">
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
            <Slider slides={slides} />
          </div>
        </div>
      </section>

      {/* FAQ Section Completed */}
      <section className="w-full">
        <div className="mainContainer my-[10rem] lg:my-[12rem] flex flex-col md:flex-row gap-[4rem] lg:gap-[6rem] lg:justify-between ">
          {/* Faq Bg */}
          <div className="bg-primary rounded-[2rem]  overflow-hidden h-[27rem] lg:h-[40.7rem] md:max-w-[35.7rem] w-full relative">
            {/* Top Content */}
            <div className="text-paragraph2 pt-[2rem] lg:pt-[3rem] pl-[2rem]">
              <h4 className="pb-[2rem] text-[2.4rem] lg:text-[3rem] font-medium leading-[3.6rem]">
                Find your <br /> answer here?
              </h4>
              <p className="text-[1.8rem] font-normal leading-[2.6rem]">
                No worries, You can share your quires over here.
              </p>
            </div>
            <button className="bg-radial-gradient bg-primary rounded-[0.6rem] text-white py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-white absolute bottom-[2.3rem] left-[2.3rem] hover:bg-white hover:text-primary duration-300">
              Contact Me
            </button>
          </div>
          {/* Faq Container */}
          <div className="w-full ">
            <h2 className="text-[4rem] font-medium text-heading">FAQ</h2>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="mb-4 border-b border-solid border-border"
              >
                <button
                  className="w-full flex justify-between items-center text-left text-[1.8rem] font-medium leading-[2.8rem] text-heading pt-[2.4rem] pb-[1.2rem] rounded-md focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <img
                    src={
                      activeFaq === index
                        ? "/images/minus.svg"
                        : "/images/plus.svg"
                    }
                    alt={activeFaq === index ? "Collapse" : "Expand"}
                    className="w-[2.4rem] h-[2.4rem] duration-300"
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    activeFaq === index ? "max-h-[200px] pt-4 pb-4" : "max-h-0"
                  }`}
                >
                  <div className="text-[1.6rem] font-normal text-paragraph1 mt-2 duration-300">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default index;
