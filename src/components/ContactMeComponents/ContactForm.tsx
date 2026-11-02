"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ErrorComponent } from "@/components/errorComponent";
import { formikEnums } from "@/enums/formikEnums";
import { openChat } from "@/hooks/openTawkTochat";

export const contactFormInitialValues = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  projectLength: "",
  message: "",
};

export type ContactFormValues = typeof contactFormInitialValues;

// ✅ Yup Updated Validation Schema
const validationSchema = Yup.object({
  fullName: Yup.string(),
  subject: Yup.string(),
  projectLength: Yup.string(),

  message: Yup.string().required(formikEnums.Message),

  email: Yup.string().email(formikEnums.Email.Invalid),

  phone: Yup.string()
    .matches(/^\+?[0-9]{7,15}$/, formikEnums.Phone.Invalid)
    .when("email", {
      is: (email: string) => !email || email.trim() === "",
      then: (schema) =>
        schema.required("Either Email or Phone number is required"),
      otherwise: (schema) => schema.nullable().notRequired(),
    }),
});

interface ContactFormProps {
  onSubmit: (
    values: ContactFormValues,
    helpers: FormikHelpers<ContactFormValues>
  ) => void | Promise<void>;
}

/** The contact Formik form (extracted verbatim from ContactMe). */
const ContactForm = ({ onSubmit }: ContactFormProps) => (
  <Formik
    initialValues={contactFormInitialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ isSubmitting }) => (
      <Form className="bg-surface print:hidden rounded-[0.6rem] p-[2rem] shadow-lg lg:max-w-[44.7rem] w-full">
        <div className="mb-[2rem] flex flex-col gap-[1rem]">
          <h4 className="text-[2.4rem] leading-loose font-medium text-heading">
            Contact Form
          </h4>
          <p className="text-paragraph1 text-[1.6rem] font-normal leading-normal">
            Have questions? Feel free to reach out, and I will respond within 1
            hour.
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

        {/* Full Name */}
        <div className="my-4">
          <Field
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="border border-border rounded-[0.4rem] px-[1.6rem] py-[1.2rem] w-full text-[1.6rem] outline-none focus:border-primary duration-300"
          />
          <ErrorMessage name="fullName" component={ErrorComponent} />
        </div>

        {/* Email & Phone */}
        <div className="">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full mb-4">
            <Field
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="border border-border rounded-[0.4rem] px-[1.6rem] py-[1.2rem] w-full text-[1.6rem] outline-none focus:border-primary duration-300"
            />
            <Field
              type="email"
              name="email"
              placeholder="Email Address"
              className="border border-border rounded-[0.4rem] px-[1.6rem] py-[1.2rem] w-full text-[1.6rem] outline-none focus:border-primary duration-300"
            />
          </div>
          <div className="flex items-center justify-end gap-[1rem]">
            <ErrorMessage name="phone" component={ErrorComponent} />
            <ErrorMessage name="email" component={ErrorComponent} />
          </div>
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

        {/* Submit Button */}
        <button
          className={`btn-primary w-full lg:max-w-max text-onPrimary py-[2rem] px-[5.6rem] text-[1.8rem] font-medium ${isSubmitting && "cursor-not-allowed"
            }`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Please Wait..." : "Contact Me"}
        </button>
      </Form>
    )}
  </Formik>
);

export default ContactForm;
