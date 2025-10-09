"use client";
import React, { useEffect, useMemo, useState } from "react";
import { FaqsDataUpdated } from "@/data/JsonData";
import { usePathname } from "next/navigation";

// ✅ Define the links once — they will be injected automatically
const injectLinks = {
  upwork_profile_link: "https://www.upwork.com/freelancers/~0123456789abcdef",
  github_profile_link: "https://github.com/findusman",
  linked_profile_link: "https://www.linkedin.com/in/findusman",
  cv_link: "/cv",
  cv_download_link: "/cv/download",
  email_link: "mailto:contact@findusman.me",
  whatsapp_link: "https://wa.me/923001234567",
  calendly_link: "https://calendly.com/findusman",
  instagram_link: "https://www.instagram.com/findusman",
  linkedIn_link: "https://www.linkedin.com/in/findusman",
  website_link: "https://www.findusman.me",
};

// ✅ Helper: converts placeholders like {github_profile_link}GitHub{end}
// into anchor tags dynamically
const injectDynamicLinks = (text: string) => {
  if (!text) return "";

  let result = text;

  Object.keys(injectLinks).forEach((key) => {
    const regex = new RegExp(`\\{${key}\\}(.*?)\\{end\\}`, "g");
    result = result.replace(
      regex,
      `<a href="${injectLinks[key]}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">$1</a>`
    );
  });

  return result;
};

// ✅ Helper: detect which user's FAQs to show based on domain
const getFaqsByDomain = () => {
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  if (hostname.includes("findusman.me")) return "Usman";
  if (hostname.includes("findahmad.me")) return "Ahmad";
  if (hostname.includes("usamaashraf.dev")) return "Usama";
  if (hostname.includes("farhanali.dev")) return "Farhan";

  return "Usman"; // default fallback
};

const FaqsTesting = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);


  const toggleFAQ = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };
  const pathname = usePathname();

  const forcePrintStyles =
    pathname?.startsWith("/print/portfolio") ||
    pathname?.startsWith("/print/home");

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


  // For print mode limit/slice
  const faqsToDisplay = isPrinting ? faqs.slice(0, 5) : faqs;

  useEffect(() => {
    const user = getFaqsByDomain();
    const matched = FaqsDataUpdated.find((f) => f.name === user);
    if (matched) setFaqs(matched.faqs);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">FAQs</h2>

      {faqs.length > 0 ? (
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-solid border-border print:border-black print:mb-[2rem]"
            >
              <button
                className={`w-full gap-[2rem] flex justify-between items-center text-left text-[1.6rem] print:text-[2rem] font-medium leading-[2.8rem] text-heading py-[1rem] rounded-md focus:outline-none print:py-2 ${isPrinting ? "pointer-events-none" : ""
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

              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${isPrinting || activeFaq === index
                    ? "max-h-[500px] pt-2 pb-2 print:max-h-none"
                    : "max-h-0"
                  }`}
              >
                <div
                  className="text-[1.4rem] font-normal text-paragraph1 mt-2 duration-300 print:text-sm print:mt-0"
                />
                <p
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: injectDynamicLinks(faq.answer),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading FAQs...</p>
      )}
    </div>
  );
};

export default FaqsTesting;
