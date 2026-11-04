"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useInView } from "@/hooks/useInView";

/**
 * Newsletter box. The static shell (background, heading, icon) renders
 * immediately; the Formik form lives in NewsletterForm.tsx and is loaded only
 * when the box nears the viewport, keeping formik + yup out of the initial
 * bundle of the nine routes that render this.
 *
 * Until the form chunk arrives, a disabled copy of the exact same <form>
 * markup holds its place, so the user sees the real box and real heading at
 * the real height — they just cannot type for the first ~100 ms.
 */
const NewsletterFormPlaceholder = () => (
  <form
    className="max-w-[44.6rem] w-full bg-white/20 relative rounded-[0.6rem] overflow-hidden"
    aria-hidden="true"
    onSubmit={(e) => e.preventDefault()}
  >
    <input
      type="email"
      placeholder="Enter Email"
      disabled
      className="bg-transparent text-white h-full w-full py-[1.6rem] md:py-[2.3rem] px-[1.8rem] text-[1.6rem] outline-none placeholder:text-white"
    />
    <button
      type="button"
      disabled
      className="h-full px-[3.4rem] py-[1rem] font-medium text-[1.6rem] bg-surface text-primary top-0 right-0 absolute"
    >
      Subscribe
    </button>
  </form>
);

const NewsletterForm = dynamic(() => import("./NewsletterForm"), {
  ssr: false,
  loading: () => <NewsletterFormPlaceholder />,
});

const Newsletter = ({ listOfdata }) => {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="mainContainer">
      <div className="w-full bg-sectionBG bg-Newslatter bg-no-repeat bg-contain bg-right flex print:hidden items-center flex-wrap-reverse gap-[2rem] md:gap-[4rem] justify-start sm:justify-center md:justify-between p-[2rem] rounded-[1rem] lg:px-[3rem] xl:px-[4rem] lg:py-[6rem]">
        {/* Text */}
        <div className="flex flex-col items-center md:items-start gap-[2rem] lg:gap-[3rem]">
          <h2 className="text-[2.4rem] lg:text-[3.4rem] font-medium leading-[3rem] lg:leading-[4.5rem] text-white">
            Subscribe to never miss important tech{" "}
            <br className="hidden md:block" /> world updates.
          </h2>
          {inView ? (
            <NewsletterForm listOfdata={listOfdata} />
          ) : (
            <NewsletterFormPlaceholder />
          )}
        </div>

        {/* Image */}
        <div className="">
          <Image
unoptimized
            src="/images/MailIcon.svg"
            width={179}
            height={144}
            className="max-w-[10rem] sm:max-w-[18rem]"
            alt="Newsletter Icon"
          />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
