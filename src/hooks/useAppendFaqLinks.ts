import { useMemo } from "react";

export const useAppendFaqLinks = (faqs, listOfdata) => {
  return useMemo(() => {
    return faqs.map((faq) => {
      let enhancedAnswer = faq.answer;

      if (faq.altName === "LinkedIn" && listOfdata?.linkedin) {
        enhancedAnswer += ` 👉 <a href="${listOfdata.linkedin}" target="_blank" class="text-primary underline">Visit my LinkedIn</a>`;
      }
      if (faq.altName === "GitHub" && listOfdata?.github) {
        enhancedAnswer += ` 👉 <a href="${listOfdata.github}" target="_blank" class="text-primary underline">Check my GitHub</a>`;
      }
      if (faq.altName === "Starting" && listOfdata?.calendly) {
        enhancedAnswer += ` 👉 <a href="${listOfdata.calendly}" target="_blank" class="text-primary underline">Schedule a Call</a>`;
      }
      if (faq.altName === "Payment") {
        enhancedAnswer += ` (Available via PayPal, Stripe, and more 🚀)`;
      }

      return { ...faq, answer: enhancedAnswer };
    });
  }, [faqs, listOfdata]);
};
