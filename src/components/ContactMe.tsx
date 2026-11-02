"use client";
import React from "react";
import { useState } from "react";
import type { FormikHelpers } from "formik";
import { addLeadsApi } from "@/apiHandlers/leadsApi";
import type { AddLeadPayload, ProfileReport } from "@/types/api";
import ThankyouPopup from "./ThankyouPopup";
import ContactForm, {
  type ContactFormValues,
} from "@/components/ContactMeComponents/ContactForm";
import ContactInfoCards from "@/components/ContactMeComponents/ContactInfoCards";
import ContactSocialLinks from "@/components/ContactMeComponents/ContactSocialLinks";

declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
  }
}

const ContactMe = ({ listOfdata }: { listOfdata: ProfileReport | null }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Updated Submit Handler with Correct Payload
  const handleContactFormSubmit = async (
    values: ContactFormValues,
    { resetForm }: FormikHelpers<ContactFormValues>,
  ) => {
    const payload: AddLeadPayload = {
      action_type: "add",
      title: values.subject.trim() || "Inquiry from personal website",
      description: values.message.trim(),
      contact: [
        {
          email: values.email.trim() || "",
          name: values.fullName.trim() || "Anonymous",
          contact: values.phone.trim() || "",
          source: "personal_website",
          website: listOfdata?.domain,
        },
      ],
      lead_source: "personal_website",
    };

    try {
      const res = await addLeadsApi(payload);
      console.log("Leads API Response:", res);

      if (res?.status === 201 || res?.data?.statusCode === 201) {
        setIsModalOpen(true);
        resetForm();
      } else {
        console.error("Lead submission failed:", res.data);
        // You can add a user-facing error here if needed
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
    }
  };

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
        className="flex print:break-before-page items-center justify-center flex-wrap lg:flex-nowrap bg-footerMobile md:bg-footerDesktop bg-no-repeat print:bg-none print:w-full bg-left-top ultra2x:border-[1.5rem] ultra2x:border-surface print:border-none bg-cover rounded-[1rem] relative  p-[1rem] sm:p-[2rem] gap-[2.4rem] shadow-lg print:shadow-none"
      >
        {/* Contact Form */}
        <ContactForm onSubmit={handleContactFormSubmit} />

        {/* Contact Details */}
        <div className="w-full">
          {/* Badge */}
          <div className="flex items-center max-lg:justify-center">
            <div className="badge">Stay In Touch</div>
          </div>
          {/* Heading */}
          <div className="text-heading text-[3rem] lg:text-[4rem] p-[0.8rem] font-medium leading-[3.2rem] lg:leading-[4.8rem]">
            You want to hire me ?
          </div>
          <div className="text-primary text-[2rem] lg:text-[3rem] p-[0.8rem] font-medium leading-[3.2rem] lg:leading-[4.8rem] mb-[3.2rem]">
            Book either an appointment or explore following option for quick
            chat:
          </div>
          {/* Info Cards */}
          <ContactInfoCards listOfdata={listOfdata} />
          {/* Follow Me On Social Media */}
          <ContactSocialLinks listOfdata={listOfdata} />
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

export default ContactMe;
