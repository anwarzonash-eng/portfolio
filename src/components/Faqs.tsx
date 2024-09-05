import React from 'react';
import { useState, useEffect } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const Faqs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Function to toggle FAQ
  const toggleFAQ = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Fetch FAQ data from the JSON file
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch('/data/faq.json'); // Path to your JSON file
        if (!response.ok) {
          throw new Error('Failed to fetch FAQ data');
        }
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      }
    };

    fetchFaqs();
  }, []);
  return (
    <>
      {/* FAQ Section Completed */}
      <section className='w-full'>
        <div className='mainContainer my-[10rem] lg:my-[12rem] flex flex-col md:flex-row gap-[4rem] lg:gap-[6rem] lg:justify-between '>
          {/* Faq Bg */}
          <div className='bg-primary rounded-[2rem]  overflow-hidden h-[27rem] lg:h-[40.7rem] md:max-w-[35.7rem] w-full relative'>
            {/* Top Content */}
            <div className='text-paragraph2 pt-[2rem] lg:pt-[3rem] pl-[2rem]'>
              <h4 className='pb-[2rem] text-[2.4rem] lg:text-[3rem] font-medium leading-[3.6rem]'>
                Find your <br /> answer here?
              </h4>
              <p className='text-[1.8rem] font-normal leading-[2.6rem]'>
                No worries, You can share your quires over here.
              </p>
            </div>
            <button className='bg-radial-gradient bg-primary rounded-[0.6rem] text-white py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-white absolute bottom-[2.3rem] left-[2.3rem] hover:bg-white hover:text-primary duration-300'>
              Contact Me
            </button>
          </div>
          {/* Faq Container */}
          <div className='w-full'>
            <h2 className='text-[4rem] font-medium text-heading'>FAQ</h2>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className='mb-4 border-b border-solid border-border'
              >
                <button
                  className='w-full flex justify-between items-center text-left text-[1.8rem] font-medium leading-[2.8rem] text-heading pt-[2.4rem] pb-[1.2rem] rounded-md focus:outline-none'
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <img
                    src={
                      activeFaq === index
                        ? '/images/minus.svg'
                        : '/images/plus.svg'
                    }
                    alt={activeFaq === index ? 'Collapse' : 'Expand'}
                    className='w-[2.4rem] h-[2.4rem] duration-300'
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    activeFaq === index ? 'max-h-[200px] pt-4 pb-4' : 'max-h-0'
                  }`}
                >
                  <div className='text-[1.6rem] font-normal text-paragraph1 mt-2 duration-300'>
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Faqs;
