import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { formatPhoneNumber } from '@/hooks/formatPhoneNumber';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addLeadsApi } from '@/apiHandlers/leadsApi';
import { ErrorComponent } from './errorComponent';
import { formikEnums } from '@/enums/formikEnums';

const ContactMe = ({ listOfdata }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  interface ConstactLinks {
    href: string;
    src: string;
    alt: string;
  }

  // Contact Links
  const constactLinks: ConstactLinks[] = [
    { href: listOfdata?.upwork, src: '/images/upwork.svg', alt: 'upwork' },
    { href: listOfdata?.github, src: '/images/github.svg', alt: 'github' },
    {
      href: listOfdata?.linkedIn,
      src: '/images/linkedin.svg',
      alt: 'Linkedin',
    },
    {
      href: `https://wa.me/${listOfdata?.phone_no}`,
      src: '/images/whatsapp.svg',
      alt: 'whatsapp',
    },
  ];

  const initialValues = {
    fullName: '',
    email: '',
    subject: '',
    message: '',
    file: '',
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required(formikEnums.Name.FullNameRequired),
    email: Yup.string()
      .email(formikEnums.Email.Invalid)
      .required(formikEnums.Email.Required),
    subject: Yup.string().required(formikEnums.Subject),
    message: Yup.string().required(formikEnums.Message),
  });

  const handleContactFormSubmit = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    const payload = {
      name: values.fullName,
      email: values.email,
      subject: values.subject,
      message: values.message,
      upload: uploadedFile,
      source_category: 'contact',
    };
    const successCallbackFunction = () => {
      resetForm();
      setUploadedFile(null);
    };

    await addLeadsApi(payload, successCallbackFunction);
  };

  return (
    <>
      <div className='mt-[-13.5rem] lg:mt-[-31rem] lg:min-h-[69.6rem] flex items-center justify-center flex-wrap lg:flex-nowrap bg-footerMobile md:bg-footerDesktop bg-no-repeat bg-left-top ultra2x:border-[1.5rem] ultra2x:border-white bg-cover rounded-[1rem] relative top-[13.5rem] lg:top-[31rem] p-[1rem] sm:p-[2rem] gap-[2.4rem] shadow-lg'>
        {/* Contact Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleContactFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className='bg-white rounded-[0.6rem] p-[2rem] shadow-lg lg:max-w-[44.7rem] w-full'>
              <div className='mb-[2rem] flex flex-col gap-[1rem]'>
                <h4 className='text-[2.4rem] leading-loose font-medium text-heading'>
                  Contact Form
                </h4>
                <p className='text-paragraph1 text-[1.6rem] font-normal leading-normal'>
                  Feel free to contact me. I will reply within 48 hours.
                </p>
              </div>

              {/* FullName or Email */}

              <div
                className={`flex flex-col md:flex-row items-center justify-center gap-4 w-full mb-4 `}
              >
                <div className='w-full flex-col'>
                  <Field
                    type='text'
                    name='fullName'
                    placeholder='Full Name'
                    className='border border-border border-solid rounded-[0.4rem] px-[1.6rem] py-[1.2rem] w-full text-paragraph1 placeholder:text-paragraph1 text-[1.6rem] font-normal leading-normal outline-none focus:border-primary duration-300'
                  />

                  <ErrorMessage name='fullName' component={ErrorComponent} />
                </div>
                <div className='w-full flex-col'>
                  <Field
                    type='email'
                    name='email'
                    placeholder='Email Address'
                    className='border border-border border-solid rounded-[0.4rem] px-[1.6rem] py-[1.2rem] w-full text-paragraph1 placeholder:text-paragraph1 text-[1.6rem] font-normal leading-normal outline-none focus:border-primary duration-300'
                  />

                  <ErrorMessage name='email' component={ErrorComponent} />
                </div>
              </div>
              {/* Subject */}
              <div className='my-4'>
                <Field
                  type='text'
                  name='subject'
                  placeholder='Subject'
                  className='border border-border border-solid rounded-[0.4rem] px-[1.6rem] py-[1.2rem] w-full text-paragraph1 placeholder:text-paragraph1 text-[1.6rem] font-normal leading-normal outline-none focus:border-primary duration-300'
                />

                <ErrorMessage name='subject' component={ErrorComponent} />
              </div>

              {/* Message */}
              <div className='my-4'>
                <Field
                  placeholder='Message'
                  as='textarea'
                  name='message'
                  className='min-h-[12.4rem] border border-border border-solid rounded-[0.4rem] px-[1.6rem] py-[1.2rem] w-full text-paragraph1 placeholder:text-paragraph1 text-[1.6rem] font-normal leading-normal outline-none resize-none focus:border-primary duration-300'
                />{' '}
                <ErrorMessage name='message' component={ErrorComponent} />
              </div>

              {/* Custom Upload File */}
              <div className='flex items-center gap-[1.6rem] lg:max-w-[40.7rem] w-full mb-[1.5rem] border border-border border-solid rounded-[0.4rem] cursor-pointer'>
                <label
                  className='block border-r border-border border-solid text-paragraph1 font-normal py-[1.2rem] px-[2rem] bg-[#f4f4f4] text-[1.6rem] text-nowrap'
                  htmlFor='file-upload'
                >
                  Choose File
                </label>
                <div className='flex items-center w-full'>
                  <label className='cursor-pointer bg-white text-[1.4rem] text-paragraph1 font-light flex items-center justify-between w-full focus:outline-none'>
                    <span>
                      {uploadedFile ? uploadedFile.name : 'No file choosen.'}
                    </span>
                    <input
                      type='file'
                      name='file'
                      id='file-upload'
                      className='hidden'
                      onChange={(e) => setUploadedFile(e.target.files?.[0])}
                    />
                  </label>
                </div>
              </div>
              <button
                className={`btn-primary text-white py-[2rem] px-[5.6rem] leading-[1.6rem] text-[1.8rem] font-medium ${
                  isSubmitting && 'cursor-not-allowed'
                }`}
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Please Wait...' : 'Contact Me'}
              </button>
            </Form>
          )}
        </Formik>
        {/* Contact Details */}
        <div className='w-full'>
          {/* Badge */}
          <div className='px-[2rem] py-[0.4rem] rounded-[2.2rem] bg-white border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-[2rem] mb-[2rem]'>
            Stay In Touch
          </div>
          {/* Heading */}
          <div className='text-heading text-[3rem] lg:text-[4rem] p-[0.8rem] font-medium leading-[3.2rem] lg:leading-[4.8rem] mb-[3.2rem]'>
            You want to meet with me, Book appointment !
          </div>
          {/* Info Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2  gap-[1.5rem] mb-[2rem]'>
            <div className=' w-full border border-border border-solid p-[1.5rem] rounded-[0.8rem] flex items-center gap-[1.5rem]'>
              <Image
                src={'./images/envelop.svg'}
                height={40}
                width={40}
                alt='envelop'
              />
              <Link href='mailto:alexm@gmail.com'>
                <div className='w-full font-medium'>
                  <p className='text-paragraph1 text-[1.4rem] uppercase'>
                    Chat with me
                  </p>
                  <Link
                    href={`mailto:${listOfdata?.email}`}
                    className='text-heading text-[1.8rem] hover:text-primary'
                  >
                    {listOfdata?.email}
                  </Link>
                </div>
              </Link>
            </div>
            <div className='w-full border border-border border-solid p-[1.5rem] rounded-[0.8rem] flex items-center gap-[1.5rem]'>
              <Image
                src={'./images/phone.svg'}
                height={40}
                width={40}
                alt='phone'
              />
              <Link href={`tel:${listOfdata?.phone_no}`}>
                <div className='w-full font-medium'>
                  <p className='text-paragraph1 text-[1.2rem] uppercase'>
                    Call Me
                  </p>
                  <h4 className='text-heading text-[1.8rem] hover:text-primary'>
                    {formatPhoneNumber(listOfdata?.phone_no)}
                  </h4>
                </div>
              </Link>
            </div>
            <div className='w-full border border-border border-solid p-[1.5rem] rounded-[0.8rem] flex items-center gap-[1.5rem]'>
              <Image
                src={'./images/location.svg'}
                height={40}
                width={40}
                alt='location'
              />
              <div className='w-full font-medium'>
                <p className='text-paragraph1 text-[1.2rem] uppercase '>
                  Address
                </p>
                <Link
                  target='_blank'
                  className='text-heading text-[1.8rem] hover:text-primary'
                  href={`https://www.google.com/maps/place/${listOfdata?.location}
                  )}`}
                >
                  {listOfdata?.location}
                </Link>
              </div>
            </div>
            <div className='w-full border border-border border-solid p-[1.5rem] rounded-[0.8rem] flex items-center justify-around'>
              {constactLinks.map(({ href, src, alt }) =>
                href ? (
                  <Link href={href} key={alt} target='_blank'>
                    <Image src={src} height={50} width={50} alt={alt} />
                  </Link>
                ) : null
              )}
            </div>
          </div>
          {/* Ruler Line */}
          <hr className='w-full h-[1px] bg-border' />
          {/* Follow Me On Social Media */}
          <div className='w-full px-[0.8rem] mt-[1.2rem]'>
            <p className='text-[1.6rem] font-normal uppercase text-heading text-center sm:text-left'>
              Follow me on social media
            </p>
            {/* SVG Social Icons */}
            <div>
              <div className='flex items-start justify-center sm:justify-normal flex-wrap gap-[1.6rem] mt-[1.4rem]'>
                {/* Dribble */}
                {listOfdata?.dribble && (
                  <Link href={'#'} target='_blank'>
                    <svg
                      width='50'
                      height='51'
                      viewBox='0 0 50 51'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g id='dribbble'>
                        <path
                          id='bg'
                          d='M0 25.5005C0 39.3076 11.1929 50.5005 25 50.5005C38.8071 50.5005 50 39.3076 50 25.5005C50 11.6934 38.8071 0.500488 25 0.500488C11.1929 0.500488 0 11.6934 0 25.5005Z'
                          className='fill-border'
                        />
                        <path
                          id='dribbble_2'
                          d='M25 13.0005C18.1 13.0005 12.5 18.6005 12.5 25.5005C12.5 32.4005 18.1 38.0005 25 38.0005C31.875 38.0005 37.5 32.4005 37.5 25.5005C37.5 18.6005 31.875 13.0005 25 13.0005ZM33.25 18.7505C34.75 20.5755 35.625 22.8755 35.675 25.4005C35.325 25.3255 31.8 24.6255 28.25 25.0505C28.175 24.8755 28.1 24.6755 28.025 24.5005C27.8 23.9755 27.575 23.4505 27.325 22.9505C31.225 21.3755 33.025 19.0505 33.25 18.7505ZM25 14.8505C27.7 14.8505 30.2 15.8755 32.075 17.5255C31.875 17.8005 30.275 19.9505 26.475 21.3755C24.725 18.1505 22.775 15.5255 22.5 15.1255C23.3 14.9505 24.125 14.8505 25 14.8505ZM20.45 15.8505C20.725 16.2255 22.625 18.8755 24.4 22.0255C19.4 23.3505 15 23.3255 14.525 23.3255C15.25 20.0005 17.475 17.2505 20.45 15.8505ZM14.325 25.5255C14.325 25.4255 14.325 25.3005 14.325 25.2005C14.775 25.2255 19.975 25.2755 25.3 23.6755C25.6 24.2755 25.9 24.8755 26.175 25.5005C26.05 25.5505 25.9 25.5755 25.75 25.6255C20.25 27.4005 17.325 32.2505 17.075 32.6505C15.35 30.7505 14.325 28.2505 14.325 25.5255ZM25 36.1755C22.525 36.1755 20.25 35.3255 18.45 33.9255C18.65 33.5255 20.8 29.3505 26.825 27.2505C26.85 27.2255 26.875 27.2255 26.9 27.2255C28.4 31.1255 29.025 34.3755 29.175 35.3255C27.9 35.8755 26.475 36.1755 25 36.1755ZM30.95 34.3505C30.85 33.7005 30.275 30.5755 28.875 26.7505C32.225 26.2255 35.15 27.1005 35.525 27.2005C35.05 30.1755 33.35 32.7505 30.95 34.3505Z'
                          className='fill-primary'
                        />
                      </g>
                    </svg>
                  </Link>
                )}
                {listOfdata?.behance_link && (
                  <Link href={listOfdata?.behance_link} target='_blank'>
                    <svg
                      width='51'
                      height='51'
                      viewBox='0 0 51 51'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g id='behance'>
                        <path
                          id='bg'
                          d='M0.625 25.5005C0.625 11.6934 11.8179 0.500488 25.625 0.500488C39.4321 0.500488 50.625 11.6934 50.625 25.5005C50.625 39.3076 39.4321 50.5005 25.625 50.5005C11.8179 50.5005 0.625 39.3076 0.625 25.5005Z'
                          className='fill-border'
                        />
                        <path
                          id='behance_2'
                          d='M20.3964 17.688C21.118 17.688 21.7841 17.7435 22.3947 17.91C23.0053 18.021 23.5048 18.2431 23.9489 18.5206C24.393 18.7981 24.726 19.1867 24.948 19.6862C25.1701 20.1858 25.2811 20.7964 25.2811 21.4625C25.2811 22.2396 25.1145 22.9057 24.726 23.4052C24.393 23.9048 23.8379 24.3488 23.1718 24.6819C24.1154 24.9594 24.837 25.459 25.2811 26.1251C25.7251 26.7912 26.0027 27.6238 26.0027 28.5674C26.0027 29.3445 25.8361 30.0106 25.5586 30.5657C25.2811 31.1207 24.837 31.6203 24.3374 31.9533C23.8379 32.2864 23.2273 32.5639 22.5612 32.7304C21.8951 32.897 21.229 33.008 20.563 33.008H13.125V17.688H20.3964ZM19.9524 23.9048C20.563 23.9048 21.0625 23.7383 21.4511 23.4607C21.8396 23.1832 22.0061 22.6836 22.0061 22.0731C22.0061 21.74 21.9506 21.407 21.8396 21.1849C21.7286 20.9629 21.5621 20.7964 21.3401 20.6299C21.118 20.5189 20.896 20.4078 20.6185 20.3523C20.3409 20.2968 20.0634 20.2968 19.7304 20.2968H16.5109V23.9048H19.9524ZM20.1189 30.4546C20.4519 30.4546 20.785 30.3991 21.0625 30.3436C21.3401 30.2881 21.6176 30.1771 21.8396 30.0106C22.0617 29.8441 22.2282 29.6775 22.3947 29.4C22.5057 29.1225 22.6167 28.7894 22.6167 28.4009C22.6167 27.6238 22.3947 27.0687 21.9506 26.6801C21.5066 26.3471 20.896 26.1806 20.1744 26.1806H16.5109V30.4546H20.1189ZM30.8318 30.3991C31.2758 30.8432 31.9419 31.0652 32.83 31.0652C33.4406 31.0652 33.9957 30.8987 34.4398 30.6212C34.8838 30.2881 35.1613 29.9551 35.2724 29.622H37.9922C37.5482 30.9542 36.8821 31.8978 35.994 32.5084C35.1058 33.0635 34.0512 33.3965 32.7745 33.3965C31.8864 33.3965 31.1093 33.23 30.3877 32.9525C29.6661 32.6749 29.1111 32.2864 28.6115 31.7313C28.1119 31.2317 27.7234 30.6212 27.5014 29.8996C27.2238 29.178 27.1128 28.4009 27.1128 27.5128C27.1128 26.6801 27.2238 25.903 27.5014 25.1815C27.7789 24.4599 28.1674 23.8493 28.667 23.2942C29.1666 22.7946 29.7771 22.3506 30.4432 22.0731C31.1648 21.7955 31.8864 21.629 32.7745 21.629C33.7182 21.629 34.5508 21.7955 35.2724 22.1841C35.994 22.5726 36.549 23.0167 36.9931 23.6828C37.4371 24.2933 37.7702 25.0149 37.9922 25.792C38.1032 26.5691 38.1587 27.3462 38.1032 28.2343H30.0547C30.0547 29.1225 30.3877 29.9551 30.8318 30.3991ZM34.3287 24.5709C33.9402 24.1823 33.3296 23.9603 32.608 23.9603C32.1084 23.9603 31.7199 24.0713 31.3869 24.2378C31.0538 24.4044 30.8318 24.6264 30.6098 24.8484C30.3877 25.0704 30.2767 25.348 30.2212 25.6255C30.1657 25.903 30.1102 26.1251 30.1102 26.3471H35.1058C34.9948 25.5145 34.7173 24.9594 34.3287 24.5709ZM29.4441 18.7426H35.6609V20.2413H29.4441V18.7426Z'
                          className='fill-primary'
                        />
                      </g>
                    </svg>
                  </Link>
                )}
                {listOfdata?.twitter && (
                  <Link href={listOfdata?.twitter} target='_blank'>
                    <svg
                      width='51'
                      height='51'
                      viewBox='0 0 51 51'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g id='x'>
                        <path
                          id='bg'
                          d='M0.25 25.5005C0.25 39.3076 11.4429 50.5005 25.25 50.5005C39.0571 50.5005 50.25 39.3076 50.25 25.5005C50.25 11.6934 39.0571 0.500488 25.25 0.500488C11.4429 0.500488 0.25 11.6934 0.25 25.5005Z'
                          className='fill-border'
                        />
                        <path
                          id='Vector'
                          d='M27.6284 23.5863L36.9352 13.0005H34.7298L26.6487 22.192L20.1943 13.0005H12.75L22.5103 26.8997L12.75 38.0005H14.9555L23.4894 28.294L30.3057 38.0005H37.75L27.6279 23.5863H27.6284ZM24.6076 27.0221L23.6187 25.6381L15.7502 14.6251H19.1378L25.4878 23.5129L26.4767 24.897L34.7308 36.4498H31.3433L24.6076 27.0226V27.0221Z'
                          className='fill-primary'
                        />
                      </g>
                    </svg>
                  </Link>
                )}
                {listOfdata?.instagram && (
                  <Link href={listOfdata?.instagram} target='_blank'>
                    <svg
                      width='51'
                      height='51'
                      viewBox='0 0 51 51'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g id='instagram'>
                        <path
                          id='bg'
                          d='M0.875 25.5005C0.875 39.3076 12.0679 50.5005 25.875 50.5005C39.6821 50.5005 50.875 39.3076 50.875 25.5005C50.875 11.6934 39.6821 0.500488 25.875 0.500488C12.0679 0.500488 0.875 11.6934 0.875 25.5005Z'
                          className='fill-border'
                        />
                        <g id='instagram_2'>
                          <path
                            d='M25.8755 14.8757C29.313 14.8757 29.7817 14.8757 31.188 14.8757C32.438 14.8757 33.063 15.1882 33.5317 15.3445C34.1567 15.657 34.6255 15.8132 35.0942 16.282C35.563 16.7507 35.8755 17.2195 36.0317 17.8445C36.188 18.3132 36.3442 18.9382 36.5005 20.1882C36.5005 21.5945 36.5005 21.907 36.5005 25.5007C36.5005 29.0945 36.5005 29.407 36.5005 30.8132C36.5005 32.0632 36.188 32.6882 36.0317 33.157C35.7192 33.782 35.563 34.2507 35.0942 34.7195C34.6255 35.1882 34.1567 35.5007 33.5317 35.657C33.063 35.8132 32.438 35.9695 31.188 36.1257C29.7817 36.1257 29.4692 36.1257 25.8755 36.1257C22.2817 36.1257 21.9692 36.1257 20.563 36.1257C19.313 36.1257 18.688 35.8132 18.2192 35.657C17.5942 35.3445 17.1255 35.1882 16.6567 34.7195C16.188 34.2507 15.8755 33.782 15.7192 33.157C15.563 32.6882 15.4067 32.0632 15.2505 30.8132C15.2505 29.407 15.2505 29.0945 15.2505 25.5007C15.2505 21.907 15.2505 21.5945 15.2505 20.1882C15.2505 18.9382 15.563 18.3132 15.7192 17.8445C16.0317 17.2195 16.188 16.7507 16.6567 16.282C17.1255 15.8132 17.5942 15.5007 18.2192 15.3445C18.688 15.1882 19.313 15.032 20.563 14.8757C21.9692 14.8757 22.438 14.8757 25.8755 14.8757ZM25.8755 12.532C22.2817 12.532 21.9692 12.532 20.563 12.532C19.1567 12.532 18.2192 12.8445 17.438 13.157C16.6567 13.4695 15.8755 13.9382 15.0942 14.7195C14.313 15.5007 14.0005 16.1257 13.5317 17.0632C13.2192 17.8445 13.063 18.782 12.9067 20.1882C12.9067 21.5945 12.9067 22.0632 12.9067 25.5007C12.9067 29.0945 12.9067 29.407 12.9067 30.8132C12.9067 32.2195 13.2192 33.157 13.5317 33.9382C13.8442 34.7195 14.313 35.5007 15.0942 36.282C15.8755 37.0632 16.5005 37.3757 17.438 37.8445C18.2192 38.157 19.1567 38.3132 20.563 38.4695C21.9692 38.4695 22.438 38.4695 25.8755 38.4695C29.313 38.4695 29.7817 38.4695 31.188 38.4695C32.5942 38.4695 33.5317 38.157 34.313 37.8445C35.0942 37.532 35.8755 37.0632 36.6567 36.282C37.438 35.5007 37.7505 34.8757 38.2192 33.9382C38.5317 33.157 38.688 32.2195 38.8442 30.8132C38.8442 29.407 38.8442 28.9382 38.8442 25.5007C38.8442 22.0632 38.8442 21.5945 38.8442 20.1882C38.8442 18.782 38.5317 17.8445 38.2192 17.0632C37.9067 16.282 37.438 15.5007 36.6567 14.7195C35.8755 13.9382 35.2505 13.6257 34.313 13.157C33.5317 12.8445 32.5942 12.6882 31.188 12.532C29.7817 12.532 29.4692 12.532 25.8755 12.532Z'
                            className='fill-primary'
                          />
                          <path
                            d='M25.8755 18.782C22.1255 18.782 19.1567 21.7507 19.1567 25.5007C19.1567 29.2507 22.1255 32.2195 25.8755 32.2195C29.6255 32.2195 32.5942 29.2507 32.5942 25.5007C32.5942 21.7507 29.6255 18.782 25.8755 18.782ZM25.8755 29.8757C23.5317 29.8757 21.5005 28.0007 21.5005 25.5007C21.5005 23.157 23.3755 21.1257 25.8755 21.1257C28.2192 21.1257 30.2505 23.0007 30.2505 25.5007C30.2505 27.8445 28.2192 29.8757 25.8755 29.8757Z'
                            className='fill-primary'
                          />
                          <path
                            d='M32.7505 20.1882C33.6134 20.1882 34.313 19.4887 34.313 18.6257C34.313 17.7628 33.6134 17.0632 32.7505 17.0632C31.8875 17.0632 31.188 17.7628 31.188 18.6257C31.188 19.4887 31.8875 20.1882 32.7505 20.1882Z'
                            className='fill-primary'
                          />
                        </g>
                      </g>
                    </svg>
                  </Link>
                )}
                {listOfdata?.facebook && (
                  <Link href={listOfdata?.facebook} target='_blank'>
                    <svg
                      width='51'
                      height='51'
                      viewBox='0 0 51 51'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g id='facebook'>
                        <path
                          id='bg'
                          d='M0.5 25.5005C0.5 39.3076 11.6929 50.5005 25.5 50.5005C39.3071 50.5005 50.5 39.3076 50.5 25.5005C50.5 11.6934 39.3071 0.500488 25.5 0.500488C11.6929 0.500488 0.5 11.6934 0.5 25.5005Z'
                          className='fill-border'
                        />
                        <path
                          id='facebook_2'
                          d='M38 25.5005C38 18.6255 32.375 13.0005 25.5 13.0005C18.625 13.0005 13 18.6255 13 25.5005C13 31.7505 17.5312 36.9067 23.4688 37.8442V29.0942H20.3437V25.5005H23.4688V22.688C23.4688 19.563 25.3438 17.8442 28.1563 17.8442C29.5625 17.8442 30.9688 18.1567 30.9688 18.1567V21.2817H29.4062C27.8438 21.2817 27.375 22.2192 27.375 23.1567V25.5005H30.8125L30.1875 29.0942H27.2188V38.0005C33.4688 37.063 38 31.7505 38 25.5005Z'
                          className='fill-primary'
                        />
                      </g>
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactMe;
