'use client';

import React, { useState } from 'react';
import CharacterAnimation from './CharacterAnimation';
import { addLeadsApi } from '@/apiHandlers/leadsApi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { formikEnums } from '@/enums/formikEnums';
import ThankyouPopup from './ThankyouPopup';

const OfferBanner = ({ listOfdata }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(formikEnums.Email.Invalid)
      .required(formikEnums.Email.Required),
  });
  const handleContactFormSubmit = async (values, { resetForm }) => {
    const payload = {
      email: values.email,
      source_category: 'subscribe',
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
      <div className='max-[1100px]:hidden bg-[#FCDC2A] w-full'>
        <div className='mainContainer px-[2rem] h-[6.4rem] w-full flex items-center justify-between gap-[1.6rem]'>
          {/* I Place it in Div BCZ later i will animate this */}
          <div className='flex items-center gap-1'>
            <div className='text-heading text-[1.8rem] hidden min-[1122px]:block'>
              <CharacterAnimation
                text={`${
                  listOfdata?.companyType == 'leewop'
                    ? 'ubscribe for FREE 2-Week Bookkeeping Service TRIAL!'
                    : 'Subscribe for FREE 2-Week Development TRIAL!'
                } `}
              />
            </div>
            {/* <div className='text-heading text-[1.8rem] min-[1122px]:hidden'>
            <CharacterAnimation text='Get Free Development Trial!' />
          </div> */}
            <div className='mb-2'>
              <img src='/images/offerBannerStars.svg' />
            </div>
          </div>

          <div className='relative'>
            {/* Positioned Text svg */}
            <div className='absolute left-[-26rem] '>
              <img src='./images/limmitedOfferText.svg' alt='' />
            </div>
            {/* Positioned Arrow Svg */}
            <div className='absolute left-[-11rem] top-[-1rem]'>
              <img src='./images/offerBannerArrow.svg' alt='' />
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleContactFormSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className='w-[380px] h-[4.5rem] rounded-[0.6rem] bg-white/50 flex items-center'>
                  {' '}
                  <Field
                    type='email'
                    name='email'
                    placeholder={
                      touched.email && errors.email
                        ? errors.email
                        : 'Enter Email'
                    }
                    className={`bg-transparent h-full w-full rounded-[0.6rem] py-[1.7rem] px-[1.8rem] text-[1.6rem] outline-none text-heading placeholder:text-heading ${
                      touched.email &&
                      errors.email &&
                      'text-red-500 placeholder:text-red-500'
                    }`}
                  />{' '}
                  <button
                    className={`h-full px-[3.4rem] font-medium text-[1.6rem] primaryGradient rounded-[0.6rem] text-white ${
                      isSubmitting && 'cursor-not-allowed'
                    }`}
                    type='submit'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>{' '}
    </>
  );
};

export default OfferBanner;
