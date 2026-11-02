"use client";
import { useEffect, useState } from "react";
import { FaqsDataUpdated } from "@/data/JsonData";
import { getFaqsByDomain } from "./faqLinkInjection";

export interface FaqItem {
  index?: number;
  question: string;
  answer: string;
  type: "all" | "not_u" | "u";
  altName?: string;
}

interface UserFaqGroup {
  id?: string;
  name: string;
  faqs: FaqItem[];
  altName?: string;
}

/**
 * Resolves the FAQ list for the current domain, filtered by the `type` rules.
 *
 * Extracted from Faqs.tsx so that FaqsLazy can render the exact same collapsed
 * rows as a placeholder. Both components therefore agree on the row count and
 * the question text, which is what keeps the lazy swap from shifting the page —
 * previously the placeholder guessed a fixed height and under-reserved.
 *
 * Domain resolution reads window.location, so the list resolves in an effect
 * and is empty on the first render — matching the behaviour this logic already
 * had inside Faqs.tsx.
 */
export const useFaqItems = (isUrlU: boolean): FaqItem[] => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    const user = getFaqsByDomain();
    const matchedGroup = (FaqsDataUpdated as UserFaqGroup[]).find(
      (f) => f.name === user,
    );

    if (matchedGroup) {
      // altName group filtering is intentionally not applied here.
      const filteredFaqItems = matchedGroup.faqs.filter((faq) => {
        // 'not_u' entries are hidden only in Upwork mode; everything else shows.
        if (faq.type === "not_u") return !isUrlU;
        return true;
      });

      setFaqs(filteredFaqItems);
    } else {
      setFaqs([]);
    }
  }, [isUrlU]);

  return faqs;
};

export default useFaqItems;
