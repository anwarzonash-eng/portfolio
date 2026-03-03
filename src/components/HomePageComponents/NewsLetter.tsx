"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { formikEnums } from "@/enums/formikEnums";
import { addLeadsApi } from "@/apiHandlers/leadsApi";
import ThankyouPopup from "@/components/ThankyouPopup";

const NewsLetter = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = { email: "" };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(formikEnums.Email.Invalid)
            .required(formikEnums.Email.Required),
    });

    const handleSubmit = async (values: { email: string }, { resetForm }: any) => {
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
                <ThankyouPopup setIsModalOpen={setIsModalOpen} listOfdata={null} />
            )}

            <section className="bg-bannerBG py-24 lg:py-36 border-t border-white/5">
                <div className="mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-[3rem] lg:text-[4rem] font-black text-black mb-4">
                        Ready to Scale Your Digital Presence?
                    </h2>
                    <p className="text-gray-800 text-[1.5rem] mb-10 leading-relaxed">
                        Let's collaborate to build something extraordinary. Our team is ready to turn your vision <br />
                        into reality.
                    </p>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder={
                                        touched.email && errors.email ? errors.email : "Enter your email"
                                    }
                                    className={`w-full sm:flex-1 bg-white/5 border px-7 py-5 text-black text-[2rem] focus:outline-none transition-colors rounded-lg ${touched.email && errors.email
                                        ? "border-red-500 placeholder:text-red-500"
                                        : "border-primary placeholder-gray-500 focus:border-primary/80"
                                        }`}
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full sm:w-auto bg-primary hover:bg-white hover:text-black text-white font-semibold px-7 py-5 transition-colors text-[1.8rem] whitespace-nowrap rounded-lg border border-primary ${isSubmitting ? "cursor-not-allowed opacity-70" : ""
                                        }`}
                                >
                                    {isSubmitting ? "Subscribing..." : "Get Started"}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <p className="text-gray-800 text-[1.3rem] mt-4">No spam. Unsubscribe anytime.</p>
                </div>
            </section>
        </>
    );
};

export default NewsLetter;