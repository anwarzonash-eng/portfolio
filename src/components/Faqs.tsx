import { FaqsData } from "@/data/JsonData";
import { scrollToSection } from "@/hooks/scrollToSection";
import { usePathname } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import NoteDomainForPint from "./NoteDomainForPint";

const Faqs = ({ urlInfo, companyType }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const pathname = usePathname();

  const forcePrintStyles =
    pathname?.startsWith("/print/portfolio") ||
    pathname?.startsWith("/print/cvF") ||
    pathname?.startsWith("/print/homeF");

  // Detect print mode
  useEffect(() => {
    const handleBeforePrint = () => setIsPrinting(true);
    const handleAfterPrint = () => setIsPrinting(false);

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  // Function to toggle FAQ
  const toggleFAQ = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const filteredFaqs = FaqsData?.filter(({ altName }) => {
    const urlFilter =
      !urlInfo?.u || (altName !== "Starting" && altName !== "Payment");
    const companyFilter =
      companyType === "leewop"
        ? altName !== "Development_process"
        : altName !== "bookkeeping_process";
    return urlFilter && companyFilter;
  });

  // For print mode, only take first 3 FAQs
  const faqsToDisplay = isPrinting ? filteredFaqs.slice(0, 4) : filteredFaqs;

  return (
    <>
      {forcePrintStyles ? (
        <>
          <section className="print:h-screen print:section !w-full print:FlexWrapContainer flex items-center justify-center p-[4rem] relative">
            {/* Note and Domain For Each Page */}
            <NoteDomainForPint direction={"hidden print:right-0 print:block"} />
            {/* Faq Container */}
            <div className="max-w-[1550px] w-full mx-auto">
              <div className="flex items-center justify-center lg:hidden w-full">
                <div className="badge">FAQ's</div>
              </div>
              <h2 className="text-[4rem] font-medium text-heading print:mb-4 hidden lg:block">
                FAQ
              </h2>

              {faqsToDisplay.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-solid border-border print:border-black print:mb-[2rem]"
                >
                  {/* Always show question in print mode */}
                  <button
                    className={`w-full gap-[2rem] flex justify-between items-center text-left text-[1.8rem] print:text-[3rem] font-medium leading-[2.8rem] text-heading py-[2.4rem] rounded-md focus:outline-none print:py-2  ${
                      isPrinting ? "pointer-events-none" : ""
                    }`}
                    onClick={() => !isPrinting && toggleFAQ(index)}
                  >
                    {faq.question}
                    {!isPrinting && (
                      <img
                        src={
                          activeFaq === index
                            ? "/images/minus.svg"
                            : "/images/plus.svg"
                        }
                        alt={activeFaq === index ? "Collapse" : "Expand"}
                        className="w-[2.4rem] h-[2.4rem] duration-300"
                      />
                    )}
                  </button>
                  {/* Always expanded in print mode */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isPrinting || activeFaq === index
                        ? "max-h-[500px] pt-4 pb-4 print:max-h-none"
                        : "max-h-0"
                    }`}
                  >
                    <div className="text-[1.6rem] font-normal text-paragraph1 mt-2 duration-300 print:text-sm print:mt-0">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="w-full">
            <div className="mainContainer mt-[10rem]  mb-[5rem] flex flex-col md:flex-row gap-[4rem] lg:gap-[6rem] lg:justify-between">
              {/* Faq Bg - Hidden in print */}
              {!urlInfo?.u && (
                <div className="bg-primary rounded-[2rem] flex items-center justify-between flex-col overflow-hidden h-[27rem] lg:h-[40.7rem] md:max-w-[35.7rem] w-full relative">
                  {/* Top Content */}
                  <div className="text-paragraph2 pt-[2rem] lg:pt-[3rem] pl-[2rem]">
                    <h4 className="pb-[2rem] text-[2.4rem] lg:text-[3rem] font-medium leading-[3.6rem]">
                      Find your <br /> answer here{urlInfo?.u ? "." : "?"}
                    </h4>
                    {!urlInfo?.u && (
                      <p className="text-[1.8rem] font-normal leading-[2.6rem]">
                        No worries, You can share your quires over here.
                      </p>
                    )}
                  </div>
                  {!urlInfo?.u && (
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="bg-radial-gradient bg-primary md:mb-[34px] mb-[13px] max-w-[334px] rounded-[0.6rem] text-white py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-white hover:bg-white hover:text-primary duration-300 w-full"
                    >
                      Contact Me
                    </button>
                  )}
                </div>
              )}

              {/* Faq Container */}
              <div className="w-full print:w-full">
                <div className="flex items-center justify-center lg:hidden w-full">
                  <div className="badge">FAQ's</div>
                </div>
                <h2 className="text-[4rem] font-medium text-heading hidden lg:block">
                  FAQ
                </h2>

                {faqsToDisplay.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-solid border-border"
                  >
                    {/* Always show question in print mode */}
                    <button
                      className={`w-full gap-[2rem] flex justify-between items-center text-left text-[1.8rem] font-medium leading-[2.8rem] text-heading py-[2.4rem] rounded-md focus:outline-none print:py-2  ${
                        isPrinting ? "pointer-events-none" : ""
                      }`}
                      onClick={() => !isPrinting && toggleFAQ(index)}
                    >
                      {faq.question}
                      {!isPrinting && (
                        <img
                          src={
                            activeFaq === index
                              ? "/images/minus.svg"
                              : "/images/plus.svg"
                          }
                          alt={activeFaq === index ? "Collapse" : "Expand"}
                          className="w-[2.4rem] h-[2.4rem] duration-300"
                        />
                      )}
                    </button>
                    {/* Always expanded in print mode */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isPrinting || activeFaq === index
                          ? "max-h-[500px] pt-4 pb-4"
                          : "max-h-0"
                      }`}
                    >
                      <div className="text-[1.6rem] font-normal text-paragraph1 mt-2 duration-300">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Faqs;
