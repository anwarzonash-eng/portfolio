import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatPhoneNumber } from "@/hooks/formatPhoneNumber";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { addLeadsApi } from "@/apiHandlers/leadsApi";
import { ErrorComponent } from "./errorComponent";
import { formikEnums } from "@/enums/formikEnums";
import { openChat } from "@/hooks/openTawkTochat";
import ThankyouPopup from "./ThankyouPopup";
import Tooltip from "./Tooltip";
import { Behance, Facebook, Instagram, Twitter, LinkedIn } from "./SVGI-Icons";
import { ChevronDown, ChevronUp } from "lucide-react";

declare global {
  interface Window {
    Tawk_API?: any;
  }
}

const ContactMeMultipleFileUpload = ({ listOfdata }) => {
  interface ConstactLinks {
    href: string;
    src: string;
    alt: string;
  }

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Yup Validation
  const validationSchema = Yup.object({
    fullName: Yup.string().required(formikEnums.Name.FullNameRequired),
    email: Yup.string()
      .email(formikEnums.Email.Invalid)
      .required(formikEnums.Email.Required),
    phone: Yup.string()
      .matches(/^\+?[0-9]{7,15}$/, formikEnums.Phone.Invalid)
      .required(formikEnums.Phone.Required),
    subject: Yup.string().required(formikEnums.Subject),
    projectLength: Yup.string().required(formikEnums.ProjectLength),
    message: Yup.string().required(formikEnums.Message),
  });

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    projectLength: "",
    message: "",
  };

  // ✅ File Upload Handlers
  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    setUploadedFiles((prev) => [...prev, ...Array.from(files)]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const handleDrag = (
    e: React.DragEvent<HTMLDivElement>,
    isActive: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(isActive);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Submit Handler
  const handleContactFormSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    const payload = {
      name: values.fullName,
      email: values.email,
      phone: values.phone,
      subject: values.subject,
      projectLength: values.projectLength,
      message: values.message,
      upload: uploadedFiles,
      source_category: "contact",
    };

    // console.log("Payload: ", payload);

    const res = await addLeadsApi(payload);
    if (/^2\d{2}$/.test(res?.status)) {
      setIsModalOpen(true);
      resetForm();
      setUploadedFiles([]); // ✅ clear files after submit
    }
  };

  // Contact Links
  const constactLinks: ConstactLinks[] = [
    { href: listOfdata?.upwork, src: "/images/upwork.svg", alt: "upwork" },
    { href: listOfdata?.github, src: "/images/github.svg", alt: "github" },
    // {
    //   href: listOfdata?.linkedIn,
    //   src: "/images/linkedin.svg",
    //   alt: "Linkedin",
    // },
    {
      href: `https://wa.me/${listOfdata?.phone_no}`,
      src: "/images/whatsapp.svg",
      alt: "whatsapp",
    },
  ];

  // Social Media Links
  const socialMediaLinksForContactComponent = [
    {
      link: listOfdata?.behance_link,
      SVG: Behance,
    },
    {
      link: listOfdata?.twitter,
      SVG: Twitter,
    },
    {
      link: listOfdata?.instagram,
      SVG: Instagram,
    },
    {
      link: listOfdata?.facebook,
      SVG: Facebook,
    },
    {
      link: listOfdata?.linkedIn,
      SVG: LinkedIn,
    },
  ];

  return (
    <>
      <h3 className="text-heading text-[3.6rem] leading-[4.4rem] font-medium mt-[1.2rem] print:m-0 mb-4 text-center hidden lg:block print:hidden">
        Contact Me
      </h3>
      {/* Badge */}
      <div className="flex items-center justify-center lg:hidden print:block my-[2rem]">
        <div className="badge">Contact Me</div>
      </div>
      <div
        id="contact"
        className="flex print:break-before-page items-center justify-center flex-wrap lg:flex-nowrap bg-footerMobile md:bg-footerDesktop bg-no-repeat print:bg-none print:w-full bg-left-top ultra2x:border-[1.5rem] ultra2x:border-white print:border-none bg-cover rounded-[1rem] relative  p-[1rem] sm:p-[2rem] gap-[2.4rem] shadow-lg print:shadow-none"
      >
        {/* Contact Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleContactFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white print:hidden rounded-[0.6rem] p-[2rem] shadow-lg lg:max-w-[44.7rem] w-full">
              {/* Heading */}
              <div className="mb-[2rem] flex flex-col gap-[1rem]">
                <h4 className="text-[2.4rem] leading-loose font-medium text-heading">
                  Contact Form
                </h4>
                <p className="text-paragraph1 text-[1.6rem] font-normal leading-normal">
                  Have questions? Feel free to reach out, and I will respond
                  within 1 hour.
                  <br />
                  Need immediate assistance?{" "}
                  <button
                    type="button"
                    onClick={(e) => openChat(e)}
                    className="text-primary font-bold text-lg"
                  >
                    Chat Now
                  </button>
                </p>
              </div>

              {/* FullName & Email */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full mb-4">
                <div className="w-full flex-col">
                  <Field
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="border border-border rounded-[0.4rem] px-[1.6rem] py-[1.2rem] w-full text-[1.6rem] outline-none focus:border-primary duration-300"
                  />
                  <ErrorMessage name="fullName" component={ErrorComponent} />
                </div>
                <div className="w-full flex-col">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="border border-border rounded-[0.4rem] px-[1.6rem] py-[1.2rem] w-full text-[1.6rem] outline-none focus:border-primary duration-300"
                  />
                  <ErrorMessage name="email" component={ErrorComponent} />
                </div>
              </div>

              {/* Phone Number */}
              <div className="my-4">
                <Field
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="border border-border rounded-[0.4rem] px-[1.6rem] py-[1.2rem] w-full text-[1.6rem] outline-none focus:border-primary duration-300"
                />
                <ErrorMessage name="phone" component={ErrorComponent} />
              </div>

              {/* Subject */}
              <div className="my-4">
                <Field
                  type="text"
                  name="subject"
                  placeholder="Project Subject"
                  className="border border-border rounded-[0.4rem] px-[1.6rem] py-[1.2rem] w-full text-[1.6rem] outline-none focus:border-primary duration-300"
                />
                <ErrorMessage name="subject" component={ErrorComponent} />
              </div>

              {/* Project Length Dropdown */}
              <div className="my-4 relative">
                <div className="relative">
                  <Field
                    as="select"
                    name="projectLength"
                    onClick={() => setIsOpen(!isOpen)}
                    className="appearance-none border border-border rounded-[0.4rem] px-[1.6rem] py-[1.2rem] w-full text-[1.6rem] outline-none focus:border-primary duration-300 pr-10 cursor-pointer bg-white"
                  >
                    <option value="">Select Project Length</option>
                    <option value="2-weeks">2 Weeks</option>
                    <option value="4-weeks">4 Weeks</option>
                    <option value="2-months">2 Months</option>
                    <option value="4-months">4 Months</option>
                    <option value="6plus-months">More Than 6 Months</option>
                  </Field>

                  {/* Arrow Icon */}
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300">
                    {isOpen ? (
                      <ChevronUp className="w-8 h-8 text-primary" />
                    ) : (
                      <ChevronDown className="w-8 h-8 text-primary" />
                    )}
                  </span>
                </div>

                <ErrorMessage name="projectLength" component={ErrorComponent} />
              </div>

              {/* Message */}
              <div className="my-4">
                <Field
                  placeholder="Tell me more about your project"
                  as="textarea"
                  name="message"
                  className="min-h-[12.4rem] border border-border rounded-[0.4rem] px-[1.6rem] py-[1.2rem] w-full text-[1.6rem] outline-none resize-none focus:border-primary duration-300"
                />
                <ErrorMessage name="message" component={ErrorComponent} />
              </div>

              {/* Drag & Drop Multiple Upload */}
              <div
                className={`flex flex-col items-center justify-center gap-[1rem] lg:max-w-[40.7rem] w-full mb-[1.5rem] border-2 border-dashed rounded-[0.6rem] p-6 cursor-pointer ${
                  dragActive ? "border-primary bg-blue-50" : "border-border"
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => handleDrag(e, true)}
                onDragLeave={(e) => handleDrag(e, false)}
              >
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files)}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-paragraph1 text-[1.6rem] font-normal"
                >
                  Drag & Drop files here or{" "}
                  <span className="text-primary font-semibold">Browse</span>
                </label>

                {/* File List */}
                {uploadedFiles.length > 0 && (
                  <ul className="mt-3 w-full text-[1.4rem] text-paragraph1">
                    {uploadedFiles.map((file, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center border-b border-border py-1"
                      >
                        <span>{file.name}</span>
                        <button
                          type="button"
                          className="text-red-500 text-sm ml-2"
                          onClick={() => removeFile(idx)}
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Submit */}
              <button
                className={`btn-primary w-full lg:max-w-max text-white py-[2rem] px-[5.6rem] text-[1.8rem] font-medium ${
                  isSubmitting && "cursor-not-allowed"
                }`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please Wait..." : "Contact Me"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Contact Details */}
        <div className="w-full">
          {/* Badge */}
          <div className="flex items-center max-lg:justify-center">
            <div className="badge">Stay In Touch</div>
          </div>
          {/* Heading */}
          <div className="text-heading text-[3rem] lg:text-[4rem] p-[0.8rem] font-medium leading-[3.2rem] lg:leading-[4.8rem]">
            You want to hire me?
          </div>
          <div className="text-primary text-[2rem] lg:text-[3rem] p-[0.8rem] font-medium leading-[3.2rem] lg:leading-[4.8rem] mb-[3.2rem]">
            Book either an appointment or explore following option for quick
            chat:
          </div>
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2  gap-[1.5rem] mb-[2rem]">
            <div className="w-full border border-border border-solid p-[1.5rem] rounded-[0.8rem] flex items-center gap-[1.5rem]">
              <Image
                src={"/images/envelop.svg"}
                height={40}
                width={40}
                alt="envelop"
                className="print:h-[4rem] print:w-[4rem]"
              />
              <div className="overflow-hidden text-wrap break-words">
                <div className="w-full font-medium">
                  <p className="text-paragraph1 text-[1.4rem] uppercase">
                    Chat with me
                  </p>
                  <Link
                    href={`mailto:${listOfdata?.email}`}
                    className="text-heading text-[1.5rem] hover:text-primary duration-300 "
                  >
                    {listOfdata?.email}
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full border border-border border-solid p-[1.5rem] rounded-[0.8rem] flex items-center gap-[1.5rem]">
              <Image
                src={"/images/phone.svg"}
                height={40}
                width={40}
                alt="phone"
                className="print:h-[4rem] print:w-[4rem]"
              />
              <Link href={`tel:${listOfdata?.phone_no}`}>
                <div className="w-full font-medium">
                  <p className="text-paragraph1 text-[1.2rem] uppercase">
                    Call Me
                  </p>
                  <h4 className="text-heading text-[1.5rem] hover:text-primary duration-300 ">
                    {formatPhoneNumber(listOfdata?.phone_no)}
                  </h4>
                </div>
              </Link>
            </div>
            <div className="w-full border border-border border-solid p-[1.5rem] rounded-[0.8rem] flex items-center gap-[1.5rem]">
              <Image
                src={"/images/location.svg"}
                height={40}
                width={40}
                alt="location"
                className="print:h-[4rem] print:w-[4rem]"
              />
              <div className="w-full flex justify-between print:justify-start print:gap-8">
                <div>
                  <div className=" font-medium">
                    <p className="text-paragraph1 text-[1.2rem] uppercase ">
                      Address
                    </p>
                    <Link
                      target="_blank"
                      className="text-heading text-[1.5rem] hover:text-primary duration-300 "
                      href={`https://www.google.com/maps/place/${listOfdata?.location}
                  )}`}
                    >
                      {listOfdata?.location}
                    </Link>
                  </div>{" "}
                </div>

                {listOfdata?.location?.includes("Manchester, UK") && (
                  <Image
                    src={"/images/ukFlag.svg"}
                    height={35}
                    width={35}
                    className="h-[3rem] w-[3rem] rounded-full object-cover print:h-[4rem] print:w-[4rem]"
                    alt="Uk Flag"
                  />
                )}
              </div>
            </div>
            <div className="w-full border border-border border-solid p-[1.5rem] rounded-[0.8rem] flex items-center justify-around print:justify-start print:gap-8">
              {constactLinks.map(({ href, src, alt }) =>
                href ? (
                  <Tooltip
                    text={`My ${alt.charAt(0).toUpperCase() + alt.slice(1)}`}
                    key={alt}
                  >
                    <Link href={href} target="_blank">
                      <Image src={src} height={50} width={50} alt={alt} />
                    </Link>
                  </Tooltip>
                ) : null
              )}
            </div>
          </div>
          {/* Ruler Line */}

          {/* Follow Me On Social Media */}
          {listOfdata?.behance_link ||
          listOfdata?.twitter ||
          listOfdata?.instagram ||
          listOfdata?.facebook ||
          listOfdata?.linkedin ||
          listOfdata?.phone_no ||
          listOfdata?.upwork ? (
            <>
              <hr className="w-full h-[1px] bg-border" />
              <div className="block sm:flex md:block xl:flex justify-between">
                {listOfdata?.behance_link ||
                listOfdata?.twitter ||
                listOfdata?.instagram ||
                listOfdata?.facebook ? (
                  <div className="w-full px-[0.8rem] mt-[1.2rem]">
                    <p className="text-[1.6rem] font-normal uppercase text-heading text-center sm:text-left">
                      Follow me on social media
                    </p>
                    {/* SVG Social Icons */}
                    <div>
                      <div className="flex items-start justify-center sm:justify-normal flex-wrap gap-[1.6rem] mt-[1.4rem]">
                        {socialMediaLinksForContactComponent?.map((C) => (
                          <>
                            {C.link && (
                              <Link href={C.link} target="_blank">
                                <C.SVG />
                              </Link>
                            )}
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="w-full px-[0.8rem] mt-[1.2rem]">
                  <p className="mt-[3rem] sm:mt-0 md:mt-[3rem] xl:mt-0 text-[1.6rem] font-normal uppercase text-heading text-center sm:text-left">
                    Contact Me
                  </p>
                  {/* SVG Social Icons */}
                  <div>
                    <div className="flex items-start justify-center sm:justify-normal flex-wrap gap-[1.6rem] mt-[1.4rem]">
                      {listOfdata?.phone_no && (
                        <Tooltip text="My WhatsApp">
                          <Link
                            href={`https://wa.me/${listOfdata?.phone_no}`}
                            target="_blank"
                          >
                            <Image
                              alt="WhatsApp"
                              src="/images/whatsappforContactComponent.svg"
                              width={100}
                              height={100}
                              className="h-[4rem] w-[4rem]"
                            />
                          </Link>
                        </Tooltip>
                      )}

                      {listOfdata?.upwork && (
                        <Tooltip text="My Upwork">
                          <Link href={listOfdata?.upwork} target="_blank">
                            <Image
                              alt="Upwork"
                              src="/images/upworkforContactComponent.svg"
                              width={100}
                              height={100}
                              className="h-[4rem] w-[4rem]"
                            />
                          </Link>
                        </Tooltip>
                      )}

                      <Tooltip text="Chat Now">
                        <button
                          onClick={(e) => openChat(e)}
                          className="text-primary font-bold text-lg"
                        >
                          <div className="h-[4rem] w-[4rem] bg-[#22357b] rounded-lg relative">
                            <Image
                              alt="Chat Now"
                              src="/images/chatNowIcon.svg"
                              width={100}
                              height={100}
                              className="h-[3rem] w-[3rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            />
                          </div>
                        </button>
                      </Tooltip>

                      {listOfdata?.calendly_link && (
                        <Tooltip text="Schedule Meeting">
                          <Link
                            href={listOfdata?.calendly_link}
                            target="_blank"
                          >
                            <div className="h-[4rem] w-[4rem] bg-[#006bff] rounded-lg flex items-center justify-center">
                              <Image
                                alt=""
                                src="/images/calendlyicon.svg"
                                width={100}
                                height={100}
                                className="h-[3rem] w-[3rem]"
                              />
                            </div>
                          </Link>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      {isModalOpen && (
        <ThankyouPopup
          setIsModalOpen={setIsModalOpen}
          listOfdata={listOfdata}
          text="contacting"
        />
      )}
    </>
  );
};

export default ContactMeMultipleFileUpload;
