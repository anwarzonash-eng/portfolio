"use client";

import OurBlogs from "@/components/OurBlogs";
import Image from "next/image";
import Link from "next/link";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";

export default function Home() {
  useBodyBackgroundColor("#EFF5FD");
  return (
    <div className="mainContainer bg-white flex flex-col lg:flex-row gap-[4rem] relative pb-[5rem] lg:pb-[7rem] mb-[10rem] lg:mb-[9.6rem]">
      {/* Side Panel */}
      <aside className="lg:max-w-[40rem] w-full flex-shrink-0 bg-cvSideBg bg-no-repeat bg-cover py-[5rem] px-[3rem]">
        <div className="flex flex-col items-center">
          {/* Profile Bg */}
          <Image
            src={"/images/CVProfile.png"}
            height={1200}
            width={1200}
            alt="Profile Picture"
            className="h-[20.12rem] w-[20.12rem] rounded-[50%] bg-cover bg-no-repeat bg-center"
          />
          {/* Name */}
          <h1 className="text-heading text-[3.55rem] font-medium leading-[4.4rem] mt-[1.78rem]">
            Angelo Libero
          </h1>
          {/* Designation */}
          <h3 className="text-primary text-[2rem] font-medium leading-normal mt-[0.9rem]">
            Full-Stack Developer
          </h3>
          {/* Info */}
          <p className="my-[4rem] text-[2rem] leading-[2.6rem] text-heading font-normal text-center">
            Reach out today and I'll provide you with my comprehensive
            onboarding package designed for full-time employment or Contract
            Based Jobs. This package covers various aspects that potential
            employers often inquire about, such as my salary expectations and
            the seamless integration process into your company.
          </p>
          {/* Divider */}
          <hr className="w-full h-[0.2rem] bg-[#E2E6EE] mb-[4rem] inline-block" />
          {/* Availability */}
          <div className="mb-[4rem] w-full text-center border border-solid border-[#E2E6EE] rounded-tl-[0.6rem] rounded-tr-[0.6rem] rounded-bl-[0.6rem] rounded-br-[0.6rem] overflow-hidden">
            <div className="bg-[#F7F9FC]  p-[1.5rem]">
              <p className="text-[1.6rem] leading-normal font-normal text-heading">
                Next available
              </p>
              <h4 className="text-[2rem] font-medium text-primary leading-normal">
                September 2024.
              </h4>
            </div>
            <button className="text-[2rem] text-white w-full py-[1.6rem] px-[3.4rem] bg-gradient-to-b from-white/30 to-transparent bg-primary shadow-[0px_0px_0px_1px_#FFF] hover:bg-white hover:text-primary hover:border-primary hover:border-t border-solid duration-300">
              Hire Me
            </button>
          </div>

          {/* Email, Website, Phone, Location */}
          <div className="mb-[4rem] w-full flex sm:hidden lg:flex flex-col gap-[2.6rem]">
            {/* Email */}
            <div className="flex items-center gap-[1.78rem]">
              <div className="h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center">
                <Image
                  src={"/images/mail-icon.svg"}
                  height={24}
                  width={24}
                  alt="Mail"
                />
              </div>
              <div className="flex flex-col gap-[0.45rem]">
                <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                  Email
                </p>
                <Link
                  href={"/"}
                  className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                >
                  john@example.com
                </Link>
              </div>
            </div>

            {/* Website */}
            <div className="flex items-center gap-[1.78rem]">
              <div className="h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center">
                <Image
                  src={"/images/link-icon.svg"}
                  height={24}
                  width={24}
                  alt="Link"
                />
              </div>
              <div className="flex flex-col gap-[0.45rem]">
                <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                  Website
                </p>
                <Link
                  href={"/"}
                  className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                >
                  https://www.findusman.me/a/cv
                </Link>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-[1.78rem]">
              <div className="h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center">
                <Image
                  src={"/images/phone-icon.svg"}
                  height={24}
                  width={24}
                  alt="Phone"
                />
              </div>
              <div className="flex flex-col gap-[0.45rem]">
                <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                  Phone
                </p>
                <Link
                  href={"/"}
                  className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                >
                  (+44) 736 2204608
                </Link>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-[1.78rem]">
              <div className="h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center">
                <Image
                  src={"/images/location-icon.svg"}
                  height={24}
                  width={24}
                  alt="Location"
                />
              </div>
              <div className="flex flex-col gap-[0.45rem]">
                <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                  Location
                </p>
                <h4 className="text-[1.55rem] font-medium leading-[2rem] text-heading">
                  Lahor, Pakistan
                </h4>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="w-full h-[0.2rem] bg-[#E2E6EE] mb-[4rem] sm:hidden lg:inline-block" />

          {/* Work Proof */}
          <div className="mb-[4rem] w-full flex sm:hidden lg:flex flex-col gap-[2.6rem]">
            {/* Title */}
            <h3 className="text-heading text-[1.33rem] font-medium leading-[1.77rem]">
              Work Proof
            </h3>
            {/* Upwork */}
            <div className="flex items-center gap-[1.78rem]">
              <Image
                src={"/images/upwork.svg"}
                height={35}
                width={35}
                alt="Upwork"
              />
              <div className="flex flex-col gap-[0.45rem]">
                <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                  Upwork
                </p>
                <Link
                  href={"/"}
                  className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                >
                  @username
                </Link>
              </div>
            </div>

            {/* Github */}
            <div className="flex items-center gap-[1.78rem]">
              <Image
                src={"/images/github.svg"}
                height={35}
                width={35}
                alt="Github"
              />
              <div className="flex flex-col gap-[0.45rem]">
                <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                  Github
                </p>
                <Link
                  href={"/"}
                  className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                >
                  @username
                </Link>
              </div>
            </div>

            {/* Linkedin */}
            <div className="flex items-center gap-[1.78rem]">
              <Image
                src={"/images/linkedin.svg"}
                height={35}
                width={35}
                alt="Linkedin"
              />
              <div className="flex flex-col gap-[0.45rem]">
                <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                  Linkedin
                </p>
                <Link
                  href={"/"}
                  className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                >
                  @username
                </Link>
              </div>
            </div>

            {/* Dribble */}
            <div className="flex items-center gap-[1.78rem]">
              <Image
                src={"/images/dribbble.svg"}
                height={35}
                width={35}
                alt="Dribble"
              />
              <div className="flex flex-col gap-[0.45rem]">
                <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                  Dribble
                </p>
                <Link
                  href={"/"}
                  className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                >
                  @username
                </Link>
              </div>
            </div>

            {/* Behance */}
            <div className="flex items-center gap-[1.78rem]">
              <Image
                src={"/images/behance.svg"}
                height={35}
                width={35}
                alt="Behance"
              />
              <div className="flex flex-col gap-[0.45rem]">
                <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                  Behance
                </p>
                <Link
                  href={"/"}
                  className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                >
                  @username
                </Link>
              </div>
            </div>
          </div>

          {/* Only Display on The Devices Between Small To Large */}
          <div className="hidden sm:flex lg:hidden w-full gap-[2rem] items-start">
            {/* Email, Website, Phone, Location */}
            <div className="mb-[4rem] w-full flex flex-col gap-[2.6rem]">
              {/* Email */}
              <div className="flex items-center gap-[1.78rem]">
                <div className="h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center">
                  <Image
                    src={"/images/mail-icon.svg"}
                    height={24}
                    width={24}
                    alt="Mail"
                  />
                </div>
                <div className="flex flex-col gap-[0.45rem]">
                  <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                    Email
                  </p>
                  <Link
                    href={"/"}
                    className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                  >
                    john@example.com
                  </Link>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-center gap-[1.78rem]">
                <div className="h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center">
                  <Image
                    src={"/images/link-icon.svg"}
                    height={24}
                    width={24}
                    alt="Link"
                  />
                </div>
                <div className="flex flex-col gap-[0.45rem]">
                  <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                    Website
                  </p>
                  <Link
                    href={"/"}
                    className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                  >
                    https://www.findusman.me/a/cv
                  </Link>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-[1.78rem]">
                <div className="h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center">
                  <Image
                    src={"/images/phone-icon.svg"}
                    height={24}
                    width={24}
                    alt="Phone"
                  />
                </div>
                <div className="flex flex-col gap-[0.45rem]">
                  <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                    Phone
                  </p>
                  <Link
                    href={"/"}
                    className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                  >
                    (+44) 736 2204608
                  </Link>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-[1.78rem]">
                <div className="h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center">
                  <Image
                    src={"/images/location-icon.svg"}
                    height={24}
                    width={24}
                    alt="Location"
                  />
                </div>
                <div className="flex flex-col gap-[0.45rem]">
                  <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                    Location
                  </p>
                  <h4 className="text-[1.55rem] font-medium leading-[2rem] text-heading">
                    Lahor, Pakistan
                  </h4>
                </div>
              </div>
            </div>

            {/* Work Proof */}
            <div className="mb-[4rem] w-full flex flex-col gap-[2.6rem]">
              {/* Title */}
              <h3 className="text-heading text-[1.33rem] font-medium leading-[1.77rem]">
                Work Proof
              </h3>
              {/* Upwork */}
              <div className="flex items-center gap-[1.78rem]">
                <Image
                  src={"/images/upwork.svg"}
                  height={35}
                  width={35}
                  alt="Upwork"
                />
                <div className="flex flex-col gap-[0.45rem]">
                  <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                    Upwork
                  </p>
                  <Link
                    href={"/"}
                    className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                  >
                    @username
                  </Link>
                </div>
              </div>

              {/* Github */}
              <div className="flex items-center gap-[1.78rem]">
                <Image
                  src={"/images/github.svg"}
                  height={35}
                  width={35}
                  alt="Github"
                />
                <div className="flex flex-col gap-[0.45rem]">
                  <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                    Github
                  </p>
                  <Link
                    href={"/"}
                    className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                  >
                    @username
                  </Link>
                </div>
              </div>

              {/* Linkedin */}
              <div className="flex items-center gap-[1.78rem]">
                <Image
                  src={"/images/linkedin.svg"}
                  height={35}
                  width={35}
                  alt="Linkedin"
                />
                <div className="flex flex-col gap-[0.45rem]">
                  <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                    Linkedin
                  </p>
                  <Link
                    href={"/"}
                    className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                  >
                    @username
                  </Link>
                </div>
              </div>

              {/* Dribble */}
              <div className="flex items-center gap-[1.78rem]">
                <Image
                  src={"/images/dribbble.svg"}
                  height={35}
                  width={35}
                  alt="Dribble"
                />
                <div className="flex flex-col gap-[0.45rem]">
                  <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                    Dribble
                  </p>
                  <Link
                    href={"/"}
                    className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                  >
                    @username
                  </Link>
                </div>
              </div>

              {/* Behance */}
              <div className="flex items-center gap-[1.78rem]">
                <Image
                  src={"/images/behance.svg"}
                  height={35}
                  width={35}
                  alt="Behance"
                />
                <div className="flex flex-col gap-[0.45rem]">
                  <p className="text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]">
                    Behance
                  </p>
                  <Link
                    href={"/"}
                    className="text-[1.55rem] font-medium leading-[2rem] text-heading"
                  >
                    @username
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      {/* Right Content Section */}
      <section className="w-full pt-[7rem]">
        {/* 10 Years Experience */}
        <div className="py-[5rem] px-[3.4rem] primaryGradient text-white text-[2.2rem] leading-[3.1rem] font-bold rounded-[1rem] text-center">
          10+ years of experience in front-end and back-end web development.
          Ambitious and communicative. Good mentor and tech lead.
        </div>

        {/* Timeline Section */}
        <div className=" w-full ">
          {/* Timeline */}
          <div className="flex items-center justify-center mt-[4rem] lg:mt-[6rem]">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 w-[1.5px] h-[100%] bg-border" />
              {/* Timeline items Container */}
              <div className="space-y-[1rem] lg:space-y-[2rem]">
                {/* Overview & Skills Timeline item */}
                <div className="relative flex items-start">
                  {/* Dot */}
                  <div className="absolute top-0 left-[-1.3rem]">
                    <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                      <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                    </div>
                  </div>
                  <div className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem]">
                    {/* Title */}
                    <h2 className="text-heading leading-[3.56rem] text-[2.67rem] font-medium pl-[0.5rem] mb-[3rem]">
                      Overview & Skills
                    </h2>
                    <ul className="text-heading text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem] mb-[5rem]">
                      <li className="flex items-start gap-[1rem] lg:gap-[1.7rem]">
                        <Image
                          src={"/images/blueDisc.svg"}
                          height={20}
                          width={20}
                          alt="Blue Disc"
                          className="flex-shrink-0 mt-[0.5rem]"
                        />
                        <p>
                          Full Stack Developer with deep expertise in{" "}
                          <span className="text-primary font-medium">
                            designing, building, and deploying
                          </span>{" "}
                          end-to-end web solutions.
                        </p>
                      </li>
                      <li className="flex items-start gap-[1rem] lg:gap-[1.7rem] ">
                        <Image
                          src={"/images/blueDisc.svg"}
                          height={20}
                          width={20}
                          alt="Blue Disc"
                          className="flex-shrink-0 mt-[0.5rem]"
                        />
                        <p>
                          Dynamic and results-driven eCommerce specialist with{" "}
                          <span className="text-primary font-medium">
                            extensive experience
                          </span>{" "}
                          in managing online retail operations, including
                          payment gateway integration, inventory management, and
                          customer relationship management.
                        </p>
                      </li>
                      <li className="flex items-start gap-[1rem] lg:gap-[1.7rem] ">
                        <Image
                          src={"/images/blueDisc.svg"}
                          height={20}
                          width={20}
                          alt="Blue Disc"
                          className="flex-shrink-0 mt-[0.5rem]"
                        />
                        <p>
                          Proficient in front-end technologies such as{" "}
                          <span className="text-primary font-medium">
                            React, Next.js, Redux, HTML, CSS, Bootstrap,
                            TailwindCSS, and MaterialUI.
                          </span>{" "}
                        </p>
                      </li>
                      <li className="flex items-start gap-[1rem] lg:gap-[1.7rem] ">
                        <Image
                          src={"/images/blueDisc.svg"}
                          height={20}
                          width={20}
                          alt="Blue Disc"
                          className="flex-shrink-0 mt-[0.5rem]"
                        />
                        <p>
                          Mastery in JavaScript and TypeScript, reinforced with
                          tools like GraphQL for efficient data fetching. Solid
                          background in back-end development with Node.js,
                          coupled with hands-on experience in{" "}
                          <span className="text-primary font-medium">
                            MongoDB, MySQL, and PostgreSQL.
                          </span>{" "}
                        </p>
                      </li>
                      <li className="flex items-start gap-[1rem] lg:gap-[1.7rem] ">
                        <Image
                          src={"/images/blueDisc.svg"}
                          height={20}
                          width={20}
                          alt="Blue Disc"
                          className="flex-shrink-0 mt-[0.5rem]"
                        />
                        <p>
                          Adept at creating and integrating REST APIs ensuring
                          seamless front-to-back functionality and API
                          Integrations.
                        </p>
                      </li>
                      <li className="flex items-start gap-[1rem] lg:gap-[1.7rem]">
                        <Image
                          src={"/images/blueDisc.svg"}
                          height={20}
                          width={20}
                          alt="Blue Disc"
                          className="flex-shrink-0 mt-[0.5rem]"
                        />
                        <p>
                          Renowned for effective team collaboration and
                          communication, ensuring aligned progress and shared
                          vision.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Skills Timeline item */}
                <div className="relative flex items-start">
                  {/* Dot */}
                  <div className="absolute top-0 left-[-1.3rem] ">
                    <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                      <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                    </div>
                  </div>
                  <div className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem]">
                    {/* Title */}
                    <h2 className="text-heading leading-[3.56rem] text-[2.67rem] font-medium pl-[0.5rem] mb-[3rem]">
                      Skills
                    </h2>
                    <div className="w-full flex flex-wrap gap-[0.4rem] mb-[4rem]">
                      {/* Figma */}
                      <div className="w-[9rem] lg:w-[19.8rem] h-[7.7rem] flex items-center justify-center rounded-tl-[0.4rem] bg-[#F7F9FC]">
                        <div className="flex flex-col items-center gap-[0.6rem]">
                          <Image
                            src={"/images/figma.png"}
                            alt="Figma"
                            height={24}
                            width={24}
                          />
                          <h4 className="text-[1.3rem] font-medium text-[#2E2E48)]">
                            Figma
                          </h4>
                        </div>
                      </div>
                      {/* Maze */}
                      <div className="w-[9rem] lg:w-[19.8rem] h-[7.7rem] flex items-center justify-center rounded-tl-[0.4rem] bg-[#F7F9FC]">
                        <div className="flex flex-col items-center gap-[0.6rem]">
                          <Image
                            src={"/images/maze.png"}
                            alt="Maze"
                            height={24}
                            width={24}
                          />
                          <h4 className="text-[1.3rem] font-medium text-[#2E2E48)]">
                            Maze
                          </h4>
                        </div>
                      </div>
                      {/* Spline */}
                      <div className="w-[9rem] lg:w-[19.8rem] h-[7.7rem] flex items-center justify-center rounded-tl-[0.4rem] bg-[#F7F9FC]">
                        <div className="flex flex-col items-center gap-[0.6rem]">
                          <Image
                            src={"/images/spline.png"}
                            alt="Spline"
                            height={24}
                            width={24}
                          />
                          <h4 className="text-[1.3rem] font-medium text-[#2E2E48)]">
                            Spline
                          </h4>
                        </div>
                      </div>
                      {/* Zeplin */}
                      <div className="w-[9rem] lg:w-[19.8rem] h-[7.7rem] flex items-center justify-center rounded-tl-[0.4rem] bg-[#F7F9FC]">
                        <div className="flex flex-col items-center gap-[0.6rem]">
                          <Image
                            src={"/images/zeplin.png"}
                            alt="Zeplin"
                            height={24}
                            width={24}
                          />
                          <h4 className="text-[1.3rem] font-medium text-[#2E2E48)]">
                            Zeplin
                          </h4>
                        </div>
                      </div>
                      {/* Vectornator */}
                      <div className="w-[9rem] lg:w-[15.8rem] h-[7.7rem] flex items-center justify-center rounded-tl-[0.4rem] bg-[#F7F9FC]">
                        <div className="flex flex-col items-center gap-[0.6rem]">
                          <Image
                            src={"/images/vectornator.png"}
                            alt="Vectornator"
                            height={24}
                            width={24}
                          />
                          <h4 className="text-[1.3rem] font-medium text-[#2E2E48)]">
                            Vectornator
                          </h4>
                        </div>
                      </div>
                      {/* Rotato */}
                      <div className="w-[9rem] lg:w-[15.8rem] h-[7.7rem] flex items-center justify-center rounded-tl-[0.4rem] bg-[#F7F9FC]">
                        <div className="flex flex-col items-center gap-[0.6rem]">
                          <Image
                            src={"/images/rotato.png"}
                            alt="Rotato"
                            height={24}
                            width={24}
                          />
                          <h4 className="text-[1.3rem] font-medium text-[#2E2E48)]">
                            Rotato
                          </h4>
                        </div>
                      </div>
                      {/* Vectornator */}
                      <div className="w-[9rem] lg:w-[15.8rem] h-[7.7rem] flex items-center justify-center rounded-tl-[0.4rem] bg-[#F7F9FC]">
                        <div className="flex flex-col items-center gap-[0.6rem]">
                          <Image
                            src={"/images/vscode.png"}
                            alt="VS Code"
                            height={24}
                            width={24}
                          />
                          <h4 className="text-[1.3rem] font-medium text-[#2E2E48)]">
                            VS Code
                          </h4>
                        </div>
                      </div>
                      {/* Xcode */}
                      <div className="w-[9rem] lg:w-[15.8rem] h-[7.7rem] flex items-center justify-center rounded-tl-[0.4rem] bg-[#F7F9FC]">
                        <div className="flex flex-col items-center gap-[0.6rem]">
                          <Image
                            src={"/images/xcode.png"}
                            alt="Xcode"
                            height={24}
                            width={24}
                          />
                          <h4 className="text-[1.3rem] font-medium text-[#2E2E48)]">
                            Xcode
                          </h4>
                        </div>
                      </div>
                      {/* Notion */}
                      <div className="w-[9rem] lg:w-[15.8rem] h-[7.7rem] flex items-center justify-center rounded-tl-[0.4rem] bg-[#F7F9FC]">
                        <div className="flex flex-col items-center gap-[0.6rem]">
                          <Image
                            src={"/images/notion.png"}
                            alt="Notion"
                            height={24}
                            width={24}
                          />
                          <h4 className="text-[1.3rem] font-medium text-[#2E2E48)]">
                            Notion
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience Timeline item */}
                <div className="relative flex items-start">
                  {/* Dot */}
                  <div className="absolute top-0 left-[-1.3rem] ">
                    <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                      <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                    </div>
                  </div>
                  <div className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem]">
                    {/* Title */}
                    <div className="flex items-center justify-between w-full mb-[3.5rem]">
                      <h2 className="text-heading leading-[3.56rem] text-[2.67rem] font-medium pl-[0.5rem] ">
                        Experience
                      </h2>
                      <div className="flex items-center gap-[0.6rem] group cursor-pointer">
                        <p className="text-[1.4rem] text-heading font-medium">
                          View all
                        </p>
                        <div className="group-hover:translate-x-[1rem] duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M4.1665 10.0003H15.8332M15.8332 10.0003L9.99984 4.16699M15.8332 10.0003L9.99984 15.8337"
                              stroke="#262626"
                              strokeWidth="1.67"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      Oct 2015 - Mar 2020
                    </h2>
                    {/* Card */}
                    <div className="bg-[#F7F9FC] p-[1.5rem] lg:p-[2.4rem] rounded-[1rem] shadow mb-[2rem]">
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
                        <div className="flex flex-col gap-[0.7rem] items-end">
                          <div className="py-[0.8rem] px-[1rem] bg-white border border-[#E2E6EE] border-solid text-[#47516B] rounded-[2rem] text-[1rem] font-medium leading-[0.8rem]">
                            Oct 2015 - Mar 2020
                          </div>
                          <div className="flex items-center gap-[0.52rem]">
                            <Image
                              src={"./images/link.svg"}
                              height={18}
                              width={18}
                              alt="Link"
                            />
                            <Link
                              href={"https://www.cypexsoft.com"}
                              className="text-[#1F4FE1] text-[1.2rem] font-normal leading-normal"
                            >
                              www.cypexsoft.com
                            </Link>
                          </div>
                        </div>
                      </div>
                      <p className="mt-[2rem] text-[1.6rem] font-medium text-paragraph1">
                        Lorem ipsum dolor sit amet,{" "}
                        <span className="text-sectionBG">
                          consectetur adipiscing elit.
                        </span>
                        Ullamcorper ullamcorper quis. Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit. Ullamcorper
                        ullamcorper quis.
                      </p>
                      <ul className="mt-[2rem] text-heading text-[1.4rem] font-normal leading-[150%] list-disc pl-[2rem] flex flex-col gap-[0.8rem]">
                        <li>
                          Lorem ipsum dolor sit amet,{" "}
                          <span className="text-sectionBG">
                            consectetur adipiscing elit.
                          </span>
                        </li>
                        <li>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </li>
                        <li>
                          Lorem ipsum{" "}
                          <span className="text-sectionBG">adipiscing</span> sit
                          amet.
                        </li>
                        <li>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.{" "}
                          <span className="text-sectionBG">
                            Ullamcorper ullamcorper quis.
                          </span>{" "}
                        </li>
                      </ul>
                      {/* Skills Badges */}
                      <div className="mt-[2.2rem]">
                        <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                          AREAS OF EXPERTISE I'VE WORKED IN
                        </h4>
                        <div className="flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]">
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            AWS
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            React
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            jQuery
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            Bootstrap 5
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            HTML
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      Oct 2015 - Mar 2020
                    </h2>
                    {/* Card */}
                    <div className="bg-[#F7F9FC] p-[1.5rem] lg:p-[2.4rem] rounded-[1rem] shadow mb-[2rem]">
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
                        <div className="flex flex-col gap-[0.7rem] items-end">
                          <div className="py-[0.8rem] px-[1rem] bg-white border border-[#E2E6EE] border-solid text-[#47516B] rounded-[2rem] text-[1rem] font-medium leading-[0.8rem]">
                            Oct 2015 - Mar 2020
                          </div>
                          <div className="flex items-center gap-[0.52rem]">
                            <Image
                              src={"./images/link.svg"}
                              height={18}
                              width={18}
                              alt="Link"
                            />
                            <Link
                              href={"https://www.cypexsoft.com"}
                              className="text-[#1F4FE1] text-[1.2rem] font-normal leading-normal"
                            >
                              www.cypexsoft.com
                            </Link>
                          </div>
                        </div>
                      </div>
                      <p className="mt-[2rem] text-[1.6rem] font-medium text-paragraph1">
                        Lorem ipsum dolor sit amet,{" "}
                        <span className="text-sectionBG">
                          consectetur adipiscing elit.
                        </span>
                        Ullamcorper ullamcorper quis. Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit. Ullamcorper
                        ullamcorper quis.
                      </p>
                      <ul className="mt-[2rem] text-heading text-[1.4rem] font-normal leading-[150%] list-disc pl-[2rem] flex flex-col gap-[0.8rem]">
                        <li>
                          Lorem ipsum dolor sit amet,{" "}
                          <span className="text-sectionBG">
                            consectetur adipiscing elit.
                          </span>
                        </li>
                        <li>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </li>
                        <li>
                          Lorem ipsum{" "}
                          <span className="text-sectionBG">adipiscing</span> sit
                          amet.
                        </li>
                        <li>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.{" "}
                          <span className="text-sectionBG">
                            Ullamcorper ullamcorper quis.
                          </span>{" "}
                        </li>
                      </ul>
                      {/* Skills Badges */}
                      <div className="mt-[2.2rem]">
                        <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                          AREAS OF EXPERTISE I'VE WORKED IN
                        </h4>
                        <div className="flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]">
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            AWS
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            React
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            jQuery
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            Bootstrap 5
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            HTML
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      Oct 2015 - Mar 2020
                    </h2>
                    {/* Card */}
                    <div className="bg-[#F7F9FC] p-[1.5rem] lg:p-[2.4rem] rounded-[1rem] shadow mb-[2rem]">
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
                        <div className="flex flex-col gap-[0.7rem] items-end">
                          <div className="py-[0.8rem] px-[1rem] bg-white border border-[#E2E6EE] border-solid text-[#47516B] rounded-[2rem] text-[1rem] font-medium leading-[0.8rem]">
                            Oct 2015 - Mar 2020
                          </div>
                          <div className="flex items-center gap-[0.52rem]">
                            <Image
                              src={"./images/link.svg"}
                              height={18}
                              width={18}
                              alt="Link"
                            />
                            <Link
                              href={"https://www.cypexsoft.com"}
                              className="text-[#1F4FE1] text-[1.2rem] font-normal leading-normal"
                            >
                              www.cypexsoft.com
                            </Link>
                          </div>
                        </div>
                      </div>
                      <p className="mt-[2rem] text-[1.6rem] font-medium text-paragraph1">
                        Lorem ipsum dolor sit amet,{" "}
                        <span className="text-sectionBG">
                          consectetur adipiscing elit.
                        </span>
                        Ullamcorper ullamcorper quis. Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit. Ullamcorper
                        ullamcorper quis.
                      </p>
                      <ul className="mt-[2rem] text-heading text-[1.4rem] font-normal leading-[150%] list-disc pl-[2rem] flex flex-col gap-[0.8rem]">
                        <li>
                          Lorem ipsum dolor sit amet,{" "}
                          <span className="text-sectionBG">
                            consectetur adipiscing elit.
                          </span>
                        </li>
                        <li>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </li>
                        <li>
                          Lorem ipsum{" "}
                          <span className="text-sectionBG">adipiscing</span> sit
                          amet.
                        </li>
                        <li>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.{" "}
                          <span className="text-sectionBG">
                            Ullamcorper ullamcorper quis.
                          </span>{" "}
                        </li>
                      </ul>
                      {/* Skills Badges */}
                      <div className="mt-[2.2rem]">
                        <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                          AREAS OF EXPERTISE I'VE WORKED IN
                        </h4>
                        <div className="flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]">
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            AWS
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            React
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            jQuery
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            Bootstrap 5
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            HTML
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      Oct 2015 - Mar 2020
                    </h2>
                    {/* Card */}
                    <div className="bg-[#F7F9FC] p-[1.5rem] lg:p-[2.4rem] rounded-[1rem] shadow mb-[2rem]">
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
                        <div className="flex flex-col gap-[0.7rem] items-end">
                          <div className="py-[0.8rem] px-[1rem] bg-white border border-[#E2E6EE] border-solid text-[#47516B] rounded-[2rem] text-[1rem] font-medium leading-[0.8rem]">
                            Oct 2015 - Mar 2020
                          </div>
                          <div className="flex items-center gap-[0.52rem]">
                            <Image
                              src={"./images/link.svg"}
                              height={18}
                              width={18}
                              alt="Link"
                            />
                            <Link
                              href={"https://www.cypexsoft.com"}
                              className="text-[#1F4FE1] text-[1.2rem] font-normal leading-normal"
                            >
                              www.cypexsoft.com
                            </Link>
                          </div>
                        </div>
                      </div>
                      <p className="mt-[2rem] text-[1.6rem] font-medium text-paragraph1">
                        Lorem ipsum dolor sit amet,{" "}
                        <span className="text-sectionBG">
                          consectetur adipiscing elit.
                        </span>
                        Ullamcorper ullamcorper quis. Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit. Ullamcorper
                        ullamcorper quis.
                      </p>
                      <ul className="mt-[2rem] text-heading text-[1.4rem] font-normal leading-[150%] list-disc pl-[2rem] flex flex-col gap-[0.8rem]">
                        <li>
                          Lorem ipsum dolor sit amet,{" "}
                          <span className="text-sectionBG">
                            consectetur adipiscing elit.
                          </span>
                        </li>
                        <li>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </li>
                        <li>
                          Lorem ipsum{" "}
                          <span className="text-sectionBG">adipiscing</span> sit
                          amet.
                        </li>
                        <li>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.{" "}
                          <span className="text-sectionBG">
                            Ullamcorper ullamcorper quis.
                          </span>{" "}
                        </li>
                      </ul>
                      {/* Skills Badges */}
                      <div className="mt-[2.2rem]">
                        <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                          AREAS OF EXPERTISE I'VE WORKED IN
                        </h4>
                        <div className="flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]">
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            AWS
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            React
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            jQuery
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            Bootstrap 5
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            HTML
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      Oct 2015 - Mar 2020
                    </h2>
                    {/* Card */}
                    <div className="bg-[#F7F9FC] p-[1.5rem] lg:p-[2.4rem] rounded-[1rem] shadow mb-[2rem]">
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
                        <div className="flex flex-col gap-[0.7rem] items-end">
                          <div className="py-[0.8rem] px-[1rem] bg-white border border-[#E2E6EE] border-solid text-[#47516B] rounded-[2rem] text-[1rem] font-medium leading-[0.8rem]">
                            Oct 2015 - Mar 2020
                          </div>
                          <div className="flex items-center gap-[0.52rem]">
                            <Image
                              src={"./images/link.svg"}
                              height={18}
                              width={18}
                              alt="Link"
                            />
                            <Link
                              href={"https://www.cypexsoft.com"}
                              className="text-[#1F4FE1] text-[1.2rem] font-normal leading-normal"
                            >
                              www.cypexsoft.com
                            </Link>
                          </div>
                        </div>
                      </div>
                      <p className="mt-[2rem] text-[1.6rem] font-medium text-paragraph1">
                        Lorem ipsum dolor sit amet,{" "}
                        <span className="text-sectionBG">
                          consectetur adipiscing elit.
                        </span>
                        Ullamcorper ullamcorper quis. Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit. Ullamcorper
                        ullamcorper quis.
                      </p>
                      <ul className="mt-[2rem] text-heading text-[1.4rem] font-normal leading-[150%] list-disc pl-[2rem] flex flex-col gap-[0.8rem]">
                        <li>
                          Lorem ipsum dolor sit amet,{" "}
                          <span className="text-sectionBG">
                            consectetur adipiscing elit.
                          </span>
                        </li>
                        <li>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </li>
                        <li>
                          Lorem ipsum{" "}
                          <span className="text-sectionBG">adipiscing</span> sit
                          amet.
                        </li>
                        <li>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.{" "}
                          <span className="text-sectionBG">
                            Ullamcorper ullamcorper quis.
                          </span>{" "}
                        </li>
                      </ul>
                      {/* Skills Badges */}
                      <div className="mt-[2.2rem]">
                        <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                          AREAS OF EXPERTISE I'VE WORKED IN
                        </h4>
                        <div className="flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]">
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            AWS
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            React
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            jQuery
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            Bootstrap 5
                          </div>
                          <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal">
                            HTML
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Portfolio Timeline item */}
                <div className="relative flex items-start">
                  {/* Dot */}
                  <div className="absolute top-0 left-[-1.3rem] ">
                    <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                      <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                    </div>
                  </div>
                  <div className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem]">
                    {/* Title */}
                    <div className="flex items-center justify-between w-full mb-[3rem]">
                      <h2 className="text-heading leading-[3.56rem] text-[2.67rem] font-medium pl-[0.5rem] ">
                        Portfolio
                      </h2>
                      <div className="flex items-center gap-[0.6rem] group cursor-pointer">
                        <p className="text-[1.4rem] text-heading font-medium">
                          View all
                        </p>
                        <div className="group-hover:translate-x-[1rem] duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M4.1665 10.0003H15.8332M15.8332 10.0003L9.99984 4.16699M15.8332 10.0003L9.99984 15.8337"
                              stroke="#262626"
                              strokeWidth="1.67"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      2022 - 2023
                    </h2>
                    {/* Card */}
                    <div className="max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden p-[2.4rem] gap-[2.4rem] mb-[2rem]">
                      {/* Content */}
                      <div className="w-full ">
                        <div className="flex gap-[2.2rem] flex-wrap-reverse lg:flex-nowrap ">
                          <div>
                            <div className="bg-[#1B6393] p-[1.46rem] rounded-[1rem] inline-block mb-[1rem]">
                              <Image
                                src={"/images/case-white.svg"}
                                alt="Case"
                                height={34}
                                width={34}
                                className="h-[2rem] w-[2rem]"
                              />
                            </div>
                            {/* Heading and Para */}
                            <div className="text-heading">
                              {/* Heading */}
                              <h1 className="text-[1.8rem] lg:text-[2rem] font-bold leading-[2.69rem]">
                                EaseMyKid - Education Learning Management System
                              </h1>
                              {/* Para */}
                              <p className="text-[1.4rem] leading-[1.8rem] font-normal mt-[1rem]">
                                EaseMyKid is an{" "}
                                <span className="text-primary font-medium">
                                  education, courses, and online (LMS) &nbsp;
                                </span>
                                learning management system Figma template
                                designed for people who want to start teaching
                                online, create an LMS etc.
                              </p>
                            </div>
                            {/* Links */}
                            <div className="flex items-center flex-wrap text-nowrap mt-[1rem]">
                              <Link
                                href={"/"}
                                className="text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold"
                              >
                                Check Online
                              </Link>
                              <span className="inline-block text-border text-[1.5rem] px-[0.5rem] max-md:hidden">
                                /
                              </span>
                              <Link
                                href={"/"}
                                className="text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold"
                              >
                                View Details
                              </Link>
                              <span className="inline-block text-border text-[1.5rem] px-[0.5rem] max-md:hidden">
                                /
                              </span>
                              <Link
                                href={"/"}
                                className="text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold"
                              >
                                Check Client Testimonial
                              </Link>
                            </div>
                          </div>
                          {/* Image */}
                          <div className="lg:max-w-[27.6rem] h-[20.4rem] w-full xl:flex-shrink-0 rounded-[0.45rem] relative border border-solid border-border">
                            <Image
                              src={"/images/workSample.png"}
                              alt="Project Image"
                              height={800}
                              width={800}
                              className="object-cover h-full w-full"
                            />
                            {/* Centered Positioned Button */}
                            <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-[0.8rem] px-[2rem] rounded-[4.2rem] border border-solid border-[#fff] text-[1.2rem] font-medium text-heading min-w-[11.9rem] bg-[rgba(0,0,0,0.20)] backdrop-blur-[0.8rem] duration-300 hover:bg-primary hover:bg-opacity-80 hover:text-white">
                              See All
                            </button>
                          </div>
                        </div>
                        {/* Line */}
                        <hr className="w-full my-[2.1rem] h-px bg-border" />
                        {/* List */}
                        <ul className="mt-[2rem] text-heading text-[1.4rem] font-normal leading-[150%] list-disc pl-[2rem] flex flex-col gap-[0.8rem] mb-[2rem]">
                          <li>
                            Lorem ipsum dolor sit amet,{" "}
                            <span className="text-sectionBG">
                              consectetur adipiscing elit.&nbsp;
                            </span>
                            Ullamcorper ullamcorper quis.
                          </li>
                          <li>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit.
                          </li>
                          <li>
                            Lorem ipsum{" "}
                            <span className="text-sectionBG">adipiscing</span>{" "}
                            sit amet.
                          </li>
                          <li>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.{" "}
                            <span className="text-sectionBG">
                              Ullamcorper ullamcorper quis.
                            </span>{" "}
                          </li>
                        </ul>
                        {/* Skills Badges */}
                        <div>
                          <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                            AREAS OF EXPERTISE I'VE WORKED IN
                          </h4>
                          <div className="flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]">
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              AWS
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              React
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              jQuery
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              Bootstrap 5
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              HTML
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      2022 - 2023
                    </h2>
                    {/* Card */}
                    <div className="max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden p-[2.4rem] gap-[2.4rem] mb-[2rem]">
                      {/* Content */}
                      <div className="w-full ">
                        <div className="flex gap-[2.2rem] flex-wrap-reverse lg:flex-nowrap ">
                          <div>
                            <div className="bg-[#1B6393] p-[1.46rem] rounded-[1rem] inline-block mb-[1rem]">
                              <Image
                                src={"/images/case-white.svg"}
                                alt="Case"
                                height={34}
                                width={34}
                                className="h-[2rem] w-[2rem]"
                              />
                            </div>
                            {/* Heading and Para */}
                            <div className="text-heading">
                              {/* Heading */}
                              <h1 className="text-[1.8rem] lg:text-[2rem] font-bold leading-[2.69rem]">
                                EaseMyKid - Education Learning Management System
                              </h1>
                              {/* Para */}
                              <p className="text-[1.4rem] leading-[1.8rem] font-normal mt-[1rem]">
                                EaseMyKid is an{" "}
                                <span className="text-primary font-medium">
                                  education, courses, and online (LMS) &nbsp;
                                </span>
                                learning management system Figma template
                                designed for people who want to start teaching
                                online, create an LMS etc.
                              </p>
                            </div>
                            {/* Links */}
                            <div className="flex items-center flex-wrap text-nowrap mt-[1rem]">
                              <Link
                                href={"/"}
                                className="text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold"
                              >
                                Check Online
                              </Link>
                              <span className="inline-block text-border text-[1.5rem] px-[0.5rem] max-md:hidden">
                                /
                              </span>
                              <Link
                                href={"/"}
                                className="text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold"
                              >
                                View Details
                              </Link>
                              <span className="inline-block text-border text-[1.5rem] px-[0.5rem] max-md:hidden">
                                /
                              </span>
                              <Link
                                href={"/"}
                                className="text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold"
                              >
                                Check Client Testimonial
                              </Link>
                            </div>
                          </div>
                          {/* Image */}
                          <div className="lg:max-w-[27.6rem] h-[20.4rem] w-full xl:flex-shrink-0 rounded-[0.45rem] relative border border-solid border-border">
                            <Image
                              src={"/images/workSample.png"}
                              alt="Project Image"
                              height={800}
                              width={800}
                              className="object-cover h-full w-full"
                            />
                            {/* Centered Positioned Button */}
                            <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-[0.8rem] px-[2rem] rounded-[4.2rem] border border-solid border-[#fff] text-[1.2rem] font-medium text-heading min-w-[11.9rem] bg-[rgba(0,0,0,0.20)] backdrop-blur-[0.8rem] duration-300 hover:bg-primary hover:bg-opacity-80 hover:text-white">
                              See All
                            </button>
                          </div>
                        </div>
                        {/* Line */}
                        <hr className="w-full my-[2.1rem] h-px bg-border" />
                        {/* List */}
                        <ul className="mt-[2rem] text-heading text-[1.4rem] font-normal leading-[150%] list-disc pl-[2rem] flex flex-col gap-[0.8rem] mb-[2rem]">
                          <li>
                            Lorem ipsum dolor sit amet,{" "}
                            <span className="text-sectionBG">
                              consectetur adipiscing elit.&nbsp;
                            </span>
                            Ullamcorper ullamcorper quis.
                          </li>
                          <li>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit.
                          </li>
                          <li>
                            Lorem ipsum{" "}
                            <span className="text-sectionBG">adipiscing</span>{" "}
                            sit amet.
                          </li>
                          <li>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.{" "}
                            <span className="text-sectionBG">
                              Ullamcorper ullamcorper quis.
                            </span>{" "}
                          </li>
                        </ul>
                        {/* Skills Badges */}
                        <div>
                          <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                            AREAS OF EXPERTISE I'VE WORKED IN
                          </h4>
                          <div className="flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]">
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              AWS
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              React
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              jQuery
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              Bootstrap 5
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              HTML
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      2022 - 2023
                    </h2>
                    {/* Card */}
                    <div className="max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden p-[2.4rem] gap-[2.4rem] mb-[2rem]">
                      {/* Content */}
                      <div className="w-full ">
                        <div className="flex gap-[2.2rem] flex-wrap-reverse lg:flex-nowrap ">
                          <div>
                            <div className="bg-[#1B6393] p-[1.46rem] rounded-[1rem] inline-block mb-[1rem]">
                              <Image
                                src={"/images/case-white.svg"}
                                alt="Case"
                                height={34}
                                width={34}
                                className="h-[2rem] w-[2rem]"
                              />
                            </div>
                            {/* Heading and Para */}
                            <div className="text-heading">
                              {/* Heading */}
                              <h1 className="text-[1.8rem] lg:text-[2rem] font-bold leading-[2.69rem]">
                                EaseMyKid - Education Learning Management System
                              </h1>
                              {/* Para */}
                              <p className="text-[1.4rem] leading-[1.8rem] font-normal mt-[1rem]">
                                EaseMyKid is an{" "}
                                <span className="text-primary font-medium">
                                  education, courses, and online (LMS) &nbsp;
                                </span>
                                learning management system Figma template
                                designed for people who want to start teaching
                                online, create an LMS etc.
                              </p>
                            </div>
                            {/* Links */}
                            <div className="flex items-center flex-wrap text-nowrap mt-[1rem]">
                              <Link
                                href={"/"}
                                className="text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold"
                              >
                                Check Online
                              </Link>
                              <span className="inline-block text-border text-[1.5rem] px-[0.5rem] max-md:hidden">
                                /
                              </span>
                              <Link
                                href={"/"}
                                className="text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold"
                              >
                                View Details
                              </Link>
                              <span className="inline-block text-border text-[1.5rem] px-[0.5rem] max-md:hidden">
                                /
                              </span>
                              <Link
                                href={"/"}
                                className="text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold"
                              >
                                Check Client Testimonial
                              </Link>
                            </div>
                          </div>
                          {/* Image */}
                          <div className="lg:max-w-[27.6rem] h-[20.4rem] w-full xl:flex-shrink-0 rounded-[0.45rem] relative border border-solid border-border">
                            <Image
                              src={"/images/workSample.png"}
                              alt="Project Image"
                              height={800}
                              width={800}
                              className="object-cover h-full w-full"
                            />
                            {/* Centered Positioned Button */}
                            <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-[0.8rem] px-[2rem] rounded-[4.2rem] border border-solid border-[#fff] text-[1.2rem] font-medium text-heading min-w-[11.9rem] bg-[rgba(0,0,0,0.20)] backdrop-blur-[0.8rem] duration-300 hover:bg-primary hover:bg-opacity-80 hover:text-white">
                              See All
                            </button>
                          </div>
                        </div>
                        {/* Line */}
                        <hr className="w-full my-[2.1rem] h-px bg-border" />
                        {/* List */}
                        <ul className="mt-[2rem] text-heading text-[1.4rem] font-normal leading-[150%] list-disc pl-[2rem] flex flex-col gap-[0.8rem] mb-[2rem]">
                          <li>
                            Lorem ipsum dolor sit amet,{" "}
                            <span className="text-sectionBG">
                              consectetur adipiscing elit.&nbsp;
                            </span>
                            Ullamcorper ullamcorper quis.
                          </li>
                          <li>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit.
                          </li>
                          <li>
                            Lorem ipsum{" "}
                            <span className="text-sectionBG">adipiscing</span>{" "}
                            sit amet.
                          </li>
                          <li>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.{" "}
                            <span className="text-sectionBG">
                              Ullamcorper ullamcorper quis.
                            </span>{" "}
                          </li>
                        </ul>
                        {/* Skills Badges */}
                        <div>
                          <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                            AREAS OF EXPERTISE I'VE WORKED IN
                          </h4>
                          <div className="flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]">
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              AWS
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              React
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              jQuery
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              Bootstrap 5
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              HTML
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      2022 - 2023
                    </h2>
                    {/* Card */}
                    <div className="max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden p-[2.4rem] gap-[2.4rem] mb-[2rem]">
                      {/* Content */}
                      <div className="w-full ">
                        <div className="flex gap-[2.2rem] flex-wrap-reverse lg:flex-nowrap ">
                          <div>
                            <div className="bg-[#1B6393] p-[1.46rem] rounded-[1rem] inline-block mb-[1rem]">
                              <Image
                                src={"/images/case-white.svg"}
                                alt="Case"
                                height={34}
                                width={34}
                                className="h-[2rem] w-[2rem]"
                              />
                            </div>
                            {/* Heading and Para */}
                            <div className="text-heading">
                              {/* Heading */}
                              <h1 className="text-[1.8rem] lg:text-[2rem] font-bold leading-[2.69rem]">
                                EaseMyKid - Education Learning Management System
                              </h1>
                              {/* Para */}
                              <p className="text-[1.4rem] leading-[1.8rem] font-normal mt-[1rem]">
                                EaseMyKid is an{" "}
                                <span className="text-primary font-medium">
                                  education, courses, and online (LMS) &nbsp;
                                </span>
                                learning management system Figma template
                                designed for people who want to start teaching
                                online, create an LMS etc.
                              </p>
                            </div>
                            {/* Links */}
                            <div className="flex items-center flex-wrap text-nowrap mt-[1rem]">
                              <Link
                                href={"/"}
                                className="text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold"
                              >
                                Check Online
                              </Link>
                              <span className="inline-block text-border text-[1.5rem] px-[0.5rem] max-md:hidden">
                                /
                              </span>
                              <Link
                                href={"/"}
                                className="text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold"
                              >
                                View Details
                              </Link>
                              <span className="inline-block text-border text-[1.5rem] px-[0.5rem] max-md:hidden">
                                /
                              </span>
                              <Link
                                href={"/"}
                                className="text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold"
                              >
                                Check Client Testimonial
                              </Link>
                            </div>
                          </div>
                          {/* Image */}
                          <div className="lg:max-w-[27.6rem] h-[20.4rem] w-full xl:flex-shrink-0 rounded-[0.45rem] relative border border-solid border-border">
                            <Image
                              src={"/images/workSample.png"}
                              alt="Project Image"
                              height={800}
                              width={800}
                              className="object-cover h-full w-full"
                            />
                            {/* Centered Positioned Button */}
                            <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-[0.8rem] px-[2rem] rounded-[4.2rem] border border-solid border-[#fff] text-[1.2rem] font-medium text-heading min-w-[11.9rem] bg-[rgba(0,0,0,0.20)] backdrop-blur-[0.8rem] duration-300 hover:bg-primary hover:bg-opacity-80 hover:text-white">
                              See All
                            </button>
                          </div>
                        </div>
                        {/* Line */}
                        <hr className="w-full my-[2.1rem] h-px bg-border" />
                        {/* List */}
                        <ul className="mt-[2rem] text-heading text-[1.4rem] font-normal leading-[150%] list-disc pl-[2rem] flex flex-col gap-[0.8rem] mb-[2rem]">
                          <li>
                            Lorem ipsum dolor sit amet,{" "}
                            <span className="text-sectionBG">
                              consectetur adipiscing elit.&nbsp;
                            </span>
                            Ullamcorper ullamcorper quis.
                          </li>
                          <li>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit.
                          </li>
                          <li>
                            Lorem ipsum{" "}
                            <span className="text-sectionBG">adipiscing</span>{" "}
                            sit amet.
                          </li>
                          <li>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.{" "}
                            <span className="text-sectionBG">
                              Ullamcorper ullamcorper quis.
                            </span>{" "}
                          </li>
                        </ul>
                        {/* Skills Badges */}
                        <div>
                          <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                            AREAS OF EXPERTISE I'VE WORKED IN
                          </h4>
                          <div className="flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]">
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              AWS
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              React
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              jQuery
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              Bootstrap 5
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              HTML
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Date */}
                    <h2 className="text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[1rem] ">
                      2022 - 2023
                    </h2>
                    {/* Card */}
                    <div className="max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden p-[2.4rem] gap-[2.4rem] mb-[2rem]">
                      {/* Content */}
                      <div className="w-full ">
                        <div className="flex gap-[2.2rem] flex-wrap-reverse lg:flex-nowrap ">
                          <div>
                            <div className="bg-[#1B6393] p-[1.46rem] rounded-[1rem] inline-block mb-[1rem]">
                              <Image
                                src={"/images/case-white.svg"}
                                alt="Case"
                                height={34}
                                width={34}
                                className="h-[2rem] w-[2rem]"
                              />
                            </div>
                            {/* Heading and Para */}
                            <div className="text-heading">
                              {/* Heading */}
                              <h1 className="text-[1.8rem] lg:text-[2rem] font-bold leading-[2.69rem]">
                                EaseMyKid - Education Learning Management System
                              </h1>
                              {/* Para */}
                              <p className="text-[1.4rem] leading-[1.8rem] font-normal mt-[1rem]">
                                EaseMyKid is an{" "}
                                <span className="text-primary font-medium">
                                  education, courses, and online (LMS) &nbsp;
                                </span>
                                learning management system Figma template
                                designed for people who want to start teaching
                                online, create an LMS etc.
                              </p>
                            </div>
                            {/* Links */}
                            <div className="flex items-center flex-wrap text-nowrap mt-[1rem]">
                              <Link
                                href={"/"}
                                className="text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold"
                              >
                                Check Online
                              </Link>
                              <span className="inline-block text-border text-[1.5rem] px-[0.5rem] max-md:hidden">
                                /
                              </span>
                              <Link
                                href={"/"}
                                className="text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold"
                              >
                                View Details
                              </Link>
                              <span className="inline-block text-border text-[1.5rem] px-[0.5rem] max-md:hidden">
                                /
                              </span>
                              <Link
                                href={"/"}
                                className="text-primary underline text-[1.2rem] leading-[1.4rem] font-semibold"
                              >
                                Check Client Testimonial
                              </Link>
                            </div>
                          </div>
                          {/* Image */}
                          <div className="lg:max-w-[27.6rem] h-[20.4rem] w-full xl:flex-shrink-0 rounded-[0.45rem] relative border border-solid border-border">
                            <Image
                              src={"/images/workSample.png"}
                              alt="Project Image"
                              height={800}
                              width={800}
                              className="object-cover h-full w-full"
                            />
                            {/* Centered Positioned Button */}
                            <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-[0.8rem] px-[2rem] rounded-[4.2rem] border border-solid border-[#fff] text-[1.2rem] font-medium text-heading min-w-[11.9rem] bg-[rgba(0,0,0,0.20)] backdrop-blur-[0.8rem] duration-300 hover:bg-primary hover:bg-opacity-80 hover:text-white">
                              See All
                            </button>
                          </div>
                        </div>
                        {/* Line */}
                        <hr className="w-full my-[2.1rem] h-px bg-border" />
                        {/* List */}
                        <ul className="mt-[2rem] text-heading text-[1.4rem] font-normal leading-[150%] list-disc pl-[2rem] flex flex-col gap-[0.8rem] mb-[2rem]">
                          <li>
                            Lorem ipsum dolor sit amet,{" "}
                            <span className="text-sectionBG">
                              consectetur adipiscing elit.&nbsp;
                            </span>
                            Ullamcorper ullamcorper quis.
                          </li>
                          <li>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit.
                          </li>
                          <li>
                            Lorem ipsum{" "}
                            <span className="text-sectionBG">adipiscing</span>{" "}
                            sit amet.
                          </li>
                          <li>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.{" "}
                            <span className="text-sectionBG">
                              Ullamcorper ullamcorper quis.
                            </span>{" "}
                          </li>
                        </ul>
                        {/* Skills Badges */}
                        <div>
                          <h4 className="text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]">
                            AREAS OF EXPERTISE I'VE WORKED IN
                          </h4>
                          <div className="flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]">
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              AWS
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              React
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              jQuery
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              Bootstrap 5
                            </div>
                            <div className="py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal">
                              HTML
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education Timeline item */}
                <div className="relative flex items-start">
                  {/* Dot */}
                  <div className="absolute top-0 left-[-1.3rem] ">
                    <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                      <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                    </div>
                  </div>
                  <div className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem]">
                    {/* Title */}
                    <h2 className="text-heading leading-[3.56rem] text-[2.67rem] font-medium pl-[0.5rem] mb-[3rem]">
                      Education
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1.2rem]  w-full">
                      {/* Card 1 */}
                      <div className="p-[2rem] rounded-[0.8rem] border border-solid border-[#E2E6EE] bg-[#F7F9FC]">
                        <div className="flex items-center gap-[1.8rem]">
                          <Image
                            src={"/images/edu1.png"}
                            height={34}
                            width={34}
                            alt="Edu 1"
                          />
                          <h3 className="text-[1.4rem] text-heading font-medium leading-[1.8rem]">
                            University of South Asia
                          </h3>
                        </div>
                        {/* Divider */}
                        <hr className="w-full h-[0.2rem] bg-[#E2E6EE] my-[2rem] inline-block" />
                        <div>
                          <h2 className="text-heading font-medium text-[1.6rem] leading-[2rem]">
                            Bachelor’s In Computer Science (BSCS)
                          </h2>
                          <p className="text-[1.2rem] font-normal text-[#3E3E3E]">
                            Jan 2010 - Feb 2014
                          </p>
                        </div>
                      </div>
                      {/* Card 2 */}
                      <div className="p-[2rem] rounded-[0.8rem] border border-solid border-[#E2E6EE] bg-[#F7F9FC]">
                        <div className="flex items-center gap-[1.8rem]">
                          <Image
                            src={"/images/edu2.png"}
                            height={34}
                            width={34}
                            alt="Edu 1"
                          />
                          <h3 className="text-[1.4rem] text-heading font-medium leading-[1.8rem]">
                            University of South Asia
                          </h3>
                        </div>
                        {/* Divider */}
                        <hr className="w-full h-[0.2rem] bg-[#E2E6EE] my-[2rem] inline-block" />
                        <div>
                          <h2 className="text-heading font-medium text-[1.6rem] leading-[2rem]">
                            Master's degree In Computer Science
                          </h2>
                          <p className="text-[1.2rem] font-normal text-[#3E3E3E]">
                            Jan 2014 - Feb 2016
                          </p>
                        </div>
                      </div>
                      {/* Card 3 */}
                      <div className="p-[2rem] rounded-[0.8rem] border border-solid border-[#E2E6EE] bg-[#F7F9FC]">
                        <div className="flex items-center gap-[1.8rem]">
                          <Image
                            src={"/images/edu1.png"}
                            height={34}
                            width={34}
                            alt="Edu 1"
                          />
                          <h3 className="text-[1.4rem] text-heading font-medium leading-[1.8rem]">
                            University of South Asia
                          </h3>
                        </div>
                        {/* Divider */}
                        <hr className="w-full h-[0.2rem] bg-[#E2E6EE] my-[2rem] inline-block" />
                        <div>
                          <h2 className="text-heading font-medium text-[1.6rem] leading-[2rem]">
                            Bachelor’s In Computer Science (BSCS)
                          </h2>
                          <p className="text-[1.2rem] font-normal text-[#3E3E3E]">
                            Jan 2010 - Feb 2014
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blogs Timeline item */}
                <div className="relative flex items-start">
                  {/* Dot */}
                  <div className="absolute top-0 left-[-1.3rem] ">
                    <div className="w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center">
                      <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
                    </div>
                  </div>
                  <div className="ml-[2rem] md:ml-[3rem] lg:ml-[5rem]">
                    {/* Title */}
                    <div className="flex items-center justify-between">
                      <h2 className="text-heading leading-[3.56rem] text-[2.67rem] font-medium pl-[0.5rem]">
                        Blogs
                      </h2>
                      <button className="btn-secondary text-white py-[1rem] px-[2.4rem] text-[1.6rem] font-medium">
                        View all
                      </button>
                    </div>
                    {/* Card1 */}
                    <article className="w-full flex items-start gap-[2rem] p-[1.2rem] bg-white shadow-lg mb-[1.2rem] flex-col sm:flex-row">
                      {/* Card Image */}
                      <div className="sm:w-[20rem] h-[19rem] w-full flex-shrink-0">
                        <Image
                          src={"/images/blogPost1.png"}
                          height={300}
                          width={300}
                          alt="Blog 1"
                          className="object-cover h-full w-full"
                        />
                      </div>
                      {/* Card Content */}
                      <div className="">
                        {/* Date */}
                        <div className="mb-[1.2rem] flex items-center">
                          <h4 className="text-heading text-[1.4rem] leading-[2rem] font-medium">
                            Design
                          </h4>
                          <div className="flex items-center">
                            {/* SVG Dot */}
                            <div className="mx-[0.6rem]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="5"
                                height="6"
                                viewBox="0 0 5 6"
                                fill="none"
                              >
                                <circle
                                  cx="2.5"
                                  cy="3"
                                  r="2.5"
                                  fill="#C6CBD8"
                                />
                              </svg>
                            </div>
                            <p className="text-paragraph1 text-[1.4rem] leading-[2rem] font-normal">
                              17 Jan 2022
                            </p>
                          </div>
                        </div>
                        {/* Title */}
                        <h2 className="text-[2.4rem] font-medium leading-[3.2rem] text-heading mb-[1.2rem]">
                          UX review presentations
                        </h2>
                        {/* Description */}
                        <p className="text-[1.6rem] leading-[2.4rem] text-paragraph1 mb-[3rem]">
                          How do you create compelling presentations that wow
                          your colleagues and impress your managers?
                        </p>
                        <Link
                          href={"/"}
                          className="duration-300 inline-flex items-center gap-[0.8rem] group"
                        >
                          <p className="text-primary text-[1.4rem] font-medium leading-[2.4rem]">
                            Read Now
                          </p>
                          {/* Arrow */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            className="group-hover:translate-x-[1rem] duration-300"
                          >
                            <path
                              d="M4.02783 12.8789H20.5278"
                              stroke="#00473C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.7778 6.12891L20.5278 12.8789L13.7778 19.6289"
                              stroke="#00473C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </article>
                    {/* Card2 */}
                    <article className="w-full flex items-start gap-[2rem] p-[1.2rem] bg-white shadow-lg mb-[1.2rem] flex-col sm:flex-row">
                      {/* Card Image */}
                      <div className="sm:w-[20rem] h-[19rem] w-full flex-shrink-0">
                        <Image
                          src={"/images/blogPost2.png"}
                          height={300}
                          width={300}
                          alt="Blog 1"
                          className="object-cover h-full w-full"
                        />
                      </div>
                      {/* Card Content */}
                      <div className="">
                        {/* Date */}
                        <div className="mb-[1.2rem] flex items-center">
                          <h4 className="text-heading text-[1.4rem] leading-[2rem] font-medium">
                            Design
                          </h4>
                          <div className="flex items-center">
                            {/* SVG Dot */}
                            <div className="mx-[0.6rem]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="5"
                                height="6"
                                viewBox="0 0 5 6"
                                fill="none"
                              >
                                <circle
                                  cx="2.5"
                                  cy="3"
                                  r="2.5"
                                  fill="#C6CBD8"
                                />
                              </svg>
                            </div>
                            <p className="text-paragraph1 text-[1.4rem] leading-[2rem] font-normal">
                              17 Jan 2022
                            </p>
                          </div>
                        </div>
                        {/* Title */}
                        <h2 className="text-[2.4rem] font-medium leading-[3.2rem] text-heading mb-[1.2rem]">
                          UX review presentations
                        </h2>
                        {/* Description */}
                        <p className="text-[1.6rem] leading-[2.4rem] text-paragraph1 mb-[3rem]">
                          How do you create compelling presentations that wow
                          your colleagues and impress your managers?
                        </p>
                        <Link
                          href={"/"}
                          className="duration-300 inline-flex items-center gap-[0.8rem] group"
                        >
                          <p className="text-primary text-[1.4rem] font-medium leading-[2.4rem]">
                            Read Now
                          </p>
                          {/* Arrow */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            className="group-hover:translate-x-[1rem] duration-300"
                          >
                            <path
                              d="M4.02783 12.8789H20.5278"
                              stroke="#00473C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.7778 6.12891L20.5278 12.8789L13.7778 19.6289"
                              stroke="#00473C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </article>
                    {/* Card3 */}
                    <article className="w-full flex items-start gap-[2rem] p-[1.2rem] bg-white shadow-lg mb-[1.2rem] flex-col sm:flex-row">
                      {/* Card Image */}
                      <div className="sm:w-[20rem] h-[19rem] w-full flex-shrink-0">
                        <Image
                          src={"/images/blogPost3.png"}
                          height={300}
                          width={300}
                          alt="Blog 1"
                          className="object-cover h-full w-full"
                        />
                      </div>
                      {/* Card Content */}
                      <div className="">
                        {/* Date */}
                        <div className="mb-[1.2rem] flex items-center">
                          <h4 className="text-heading text-[1.4rem] leading-[2rem] font-medium">
                            Design
                          </h4>
                          <div className="flex items-center">
                            {/* SVG Dot */}
                            <div className="mx-[0.6rem]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="5"
                                height="6"
                                viewBox="0 0 5 6"
                                fill="none"
                              >
                                <circle
                                  cx="2.5"
                                  cy="3"
                                  r="2.5"
                                  fill="#C6CBD8"
                                />
                              </svg>
                            </div>
                            <p className="text-paragraph1 text-[1.4rem] leading-[2rem] font-normal">
                              17 Jan 2022
                            </p>
                          </div>
                        </div>
                        {/* Title */}
                        <h2 className="text-[2.4rem] font-medium leading-[3.2rem] text-heading mb-[1.2rem]">
                          UX review presentations
                        </h2>
                        {/* Description */}
                        <p className="text-[1.6rem] leading-[2.4rem] text-paragraph1 mb-[3rem]">
                          How do you create compelling presentations that wow
                          your colleagues and impress your managers?
                        </p>
                        <Link
                          href={"/"}
                          className="duration-300 inline-flex items-center gap-[0.8rem] group"
                        >
                          <p className="text-primary text-[1.4rem] font-medium leading-[2.4rem]">
                            Read Now
                          </p>
                          {/* Arrow */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            className="group-hover:translate-x-[1rem] duration-300"
                          >
                            <path
                              d="M4.02783 12.8789H20.5278"
                              stroke="#00473C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.7778 6.12891L20.5278 12.8789L13.7778 19.6289"
                              stroke="#00473C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
