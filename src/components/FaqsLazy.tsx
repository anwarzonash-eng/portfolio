"use client";
import dynamic from "next/dynamic";
import { useInView } from "@/hooks/useInView";
import FaqAccordionItem from "@/components/FaqsComponents/FaqAccordionItem";
import FaqContactBox from "@/components/FaqsComponents/FaqContactBox";
import { useFaqItems } from "@/components/FaqsComponents/useFaqItems";
import type { RoutesInfo } from "@/hooks/url";
import type { ProfileReport } from "@/types/api";

/**
 * Viewport-gated wrapper around the FAQ section.
 *
 * What is deferred is Faqs.tsx itself: the accordion state, the print-mode
 * detection and the dynamic link injection applied to answer bodies.
 *
 * The placeholder is not a guessed-height box. It renders the real collapsed
 * rows, built from the same useFaqItems hook and the same FaqAccordionItem the
 * real component uses, so the reserved height is correct for the actual
 * question count and for questions that wrap onto two lines. An earlier version
 * reserved a fixed six rows while the page renders eleven, which shifted the
 * page by roughly 380px on swap.
 *
 * Answers are collapsed here, so the placeholder does not need link injection.
 * The print route has its own HomeFAQSection, and useInView reveals on
 * `beforeprint`, so a printed page never contains the placeholder.
 */
const Faqs = dynamic(() => import("./Faqs"), { ssr: false });

interface FaqsLazyProps {
  urlInfo?: RoutesInfo | null;
  companyType?: "leewop" | string;
  apiData?: ProfileReport | null;
}

const FaqsLazy = (props: FaqsLazyProps) => {
  const { ref, inView } = useInView<HTMLElement>();
  const isUrlU = !!props.urlInfo?.u;
  const faqs = useFaqItems(isUrlU);

  if (inView) return <Faqs {...props} />;

  return (
    <section ref={ref} className="w-full print:break-before-page">
      <div className="mainContainer mt-[10rem] mb-[5rem] flex flex-col md:flex-row gap-[4rem] lg:gap-[6rem] lg:justify-between print:mt-0">
        {!isUrlU && <FaqContactBox urlInfo={props.urlInfo} />}

        <div className="w-full print:w-full print:space-y-12 print:mt-[93px]">
          <h2 className="text-[4rem] font-medium text-heading print:text-3xl print:mb-4">
            FAQ
          </h2>

          {faqs.map((faq, index) => (
            <FaqAccordionItem
              key={index}
              question={faq.question}
              answerHtml=""
              isActive={false}
              isPrinting={false}
              onToggle={() => {}}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqsLazy;
