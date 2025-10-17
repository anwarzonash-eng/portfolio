"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { formikEnums } from "@/enums/formikEnums";
import { addLeadsApi } from "@/apiHandlers/leadsApi";
import ThankyouPopup from "./ThankyouPopup";

const Newsletter = ({ listOfdata }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(formikEnums.Email.Invalid)
      .required(formikEnums.Email.Required),
  });
  const handleContactFormSubmit = async (values, { resetForm }) => {
    const payload = {
      email: values.email,
      source_category: "subscribe",
    };

    const res = await addLeadsApi(payload);
    if (/^2\d{2}$/.test(res?.status)) {
      setIsModalOpen(true);
      resetForm();
    }
  };

  return (
    <section className="mainContainer">
      <div className="w-full bg-sectionBG bg-Newslatter bg-no-repeat bg-contain bg-right flex print:hidden items-center flex-wrap-reverse gap-[2rem] md:gap-[4rem] justify-start sm:justify-center md:justify-between p-[2rem] rounded-[1rem] lg:px-[3rem] xl:px-[4rem] lg:py-[6rem]">
        {/* Text */}
        <div className="flex flex-col items-center md:items-start gap-[2rem] lg:gap-[3rem]">
          <h2 className="text-[2.4rem] lg:text-[3.4rem] font-medium leading-[3rem] lg:leading-[4.5rem] text-white">
            Subscribe to never miss important tech{" "}
            <br className="hidden md:block" /> world updates.
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleContactFormSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="max-w-[44.6rem] w-full bg-white/20 relative rounded-[0.6rem] overflow-hidden">
                <Field
                  type="email"
                  name="email"
                  placeholder={
                    touched.email && errors.email ? errors.email : "Enter Email"
                  }
                  className={`bg-transparent text-white h-full w-full py-[1.6rem] md:py-[2.3rem] px-[1.8rem] text-[1.6rem] outline-none  ${
                    touched.email && errors.email
                      ? " placeholder:text-red-500"
                      : " placeholder:text-white"
                  }`}
                />

                <button
                  className={`h-full px-[3.4rem] py-[1rem] font-medium text-[1.6rem] bg-white text-primary top-0 right-0 absolute ${
                    isSubmitting && "cursor-not-allowed"
                  }`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Image */}
        <div className="">
          <Image
            src="/images/MailIcon.svg"
            width={179}
            height={144}
            className="max-w-[10rem] sm:max-w-[18rem]"
            alt="Newsletter Icon"
          />
        </div>
      </div>
      {isModalOpen && (
        <ThankyouPopup
          setIsModalOpen={setIsModalOpen}
          listOfdata={listOfdata}
        />
      )}
    </section>
  );
};

export default Newsletter;
