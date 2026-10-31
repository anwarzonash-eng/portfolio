"use client";

import React, { useState } from "react";
import CharacterAnimation from "./CharacterAnimation";
import { addLeadsApi } from "@/apiHandlers/leadsApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { formikEnums } from "@/enums/formikEnums";
import ThankyouPopup from "./ThankyouPopup";

const OfferBanner = ({ listOfdata }) => {
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
    <>
      {isModalOpen && (
        <ThankyouPopup
          setIsModalOpen={setIsModalOpen}
          listOfdata={listOfdata}
        />
      )}
      <div className="max-[1100px]:hidden bg-[#FCDC2A] w-full items-center print:hidden block ">
        <div className="mainContainer px-[2rem] py-[0.5rem] w-full items-center gap-[1.6rem]">
          {/* I Place it in Div BCZ later i will animate this */}
          <div className=" items-center gap-1 ">
            <div className="flex flex-col text-heading text-[1.8rem] hidden min-[1122px]:block">
              <div className="flex justify-center ">
                <CharacterAnimation
                  text={`${
                    listOfdata?.companytype == "leewop"
                      ? " FREE 2-Week Bookkeeping Service TRIAL!"
                      : " FREE 2-Week Development TRIAL!"
                  } `}
                />
                <img src="/images/offerBannerStars.svg" />
              </div>
              <div></div>
            </div>
            {/* <div className='text-heading text-[1.8rem] min-[1122px]:hidden'>
            <CharacterAnimation text='Get Free Development Trial!' />
          </div> */}
          </div>

          {/* <div className="relative">
            <div className="absolute left-[-26rem] top-[.8rem] "></div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleContactFormSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="w-[380px] h-[4.5rem] rounded-[0.6rem] bg-white/50 flex items-center overflow-hidden">
                  {" "}
                  <Field
                    type="email"
                    name="email"
                    placeholder={
                      touched.email && errors.email
                        ? errors.email
                        : "Enter Email"
                    }
                    className={`bg-transparent w-full rounded-[0.6rem]  px-[1.8rem] text-[1.3rem] outline-none text-heading placeholder:text-heading ${
                      touched.email &&
                      errors.email &&
                      "text-red-500 placeholder:text-red-500"
                    }`}
                  />{" "}
                  <button
                    className={`w-full max-w-[148px] h-full font-medium text-[1.3rem] primaryGradient text-onPrimary ${
                      isSubmitting && "cursor-not-allowed"
                    }`}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Start..." : "Start Your Trial"}
                  </button>
                </Form>
              )}
            </Formik>
          </div> */}
        </div>
      </div>{" "}
    </>
  );
};

export default OfferBanner;
