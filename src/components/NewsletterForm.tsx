"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { formikEnums } from "@/enums/formikEnums";
import { addLeadsApi } from "@/apiHandlers/leadsApi";
import type { AddLeadPayload } from "@/types/api";
import ThankyouPopup from "./ThankyouPopup";

/**
 * The interactive half of the Newsletter box: the Formik form, its Yup schema,
 * the submit handler and the thank-you modal. Split out of Newsletter.tsx so
 * that formik + yup (~24 KB gzipped) load only when the box nears the viewport
 * instead of on every route that renders the newsletter.
 *
 * The rendered <Form> markup is kept identical to the placeholder in
 * Newsletter.tsx so the swap does not change the box height.
 */
const NewsletterForm = ({ listOfdata }) => {
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
    const payload: AddLeadPayload = {
      action_type: "add",
      title: "subscribe at personal website",
      contact: [
        {
          email: values.email.trim() || "",
          source: "personal_website_subscribe",
          website: listOfdata?.domain,
        },
      ],
      lead_source: "personal_website_subscribe",
    };

    const res = await addLeadsApi(payload);

    if (res?.status >= 200 && res?.status < 300) {
      setIsModalOpen(true);
      resetForm();
    }
  };

  return (
    <>
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
              className={`h-full px-[3.4rem] py-[1rem] font-medium text-[1.6rem] bg-surface text-primary top-0 right-0 absolute ${
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
      {isModalOpen && (
        <ThankyouPopup
          setIsModalOpen={setIsModalOpen}
          listOfdata={listOfdata}
        />
      )}
    </>
  );
};

export default NewsletterForm;
