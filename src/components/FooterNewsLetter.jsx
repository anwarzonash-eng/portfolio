"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { formikEnums } from "@/enums/formikEnums";
import { addLeadsApi } from "@/apiHandlers/leadsApi";
import Link from "next/link";
import { openChat } from "@/hooks/openTawkTochat";
import ThankyouPopup from "./ThankyouPopup";

const FooterNewsLetter = ({ listOfdata }) => {
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
    <section className="">
      {/* Text */}
      <div className="flex flex-col md:items-start gap-[2rem]">
        <h2 className="text-[1.8rem] lg:text-[4rem] font-light leading-[3rem] lg:leading-[5rem]  text-white">
          Don’t miss a beat. Subscribe for top tech trends.
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleContactFormSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="max-w-[40rem] w-full bg-white/20 relative rounded-[0.6rem] overflow-hidden">
              <Field
                type="email"
                name="email"
                placeholder={
                  touched.email && errors.email ? errors.email : "Enter Email"
                }
                className={`bg-transparent text-white h-full w-full py-[1.6rem] md:py-[1.8rem] px-[1.8rem] text-[1.6rem] outline-none  ${
                  touched.email && errors.email
                    ? " placeholder:text-red-500"
                    : " placeholder:text-white"
                }`}
              />

              <button
                className={`h-full px-[3rem] py-[1rem] font-medium text-[1.6rem] bg-white text-primary top-0 right-0 absolute ${
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
    </section>
  );
};

export default FooterNewsLetter;
