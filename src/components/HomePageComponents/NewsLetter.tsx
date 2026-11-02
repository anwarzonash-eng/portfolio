"use client";

import dynamic from "next/dynamic";
import { useInView } from "@/hooks/useInView";

/**
 * Services-page newsletter banner. The static shell renders immediately; the
 * Formik form lives in NewsLetterForm.tsx and loads when the banner nears the
 * viewport, keeping formik + yup out of the initial bundle.
 *
 * The placeholder is a disabled copy of the exact same form markup, so the
 * banner is already at its final height before the chunk arrives.
 */
const NewsLetterFormPlaceholder = () => (
    <form
        className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto"
        aria-hidden="true"
        onSubmit={(e) => e.preventDefault()}
    >
        <input
            type="email"
            placeholder="Enter your email"
            disabled
            className="w-full sm:flex-1 bg-white/5 border px-7 py-5 text-black dark:text-heading text-[2rem] focus:outline-none transition-colors rounded-lg border-primary placeholder-gray-500"
        />
        <button
            type="button"
            disabled
            className="w-full sm:w-auto bg-primary text-onPrimary font-semibold px-7 py-5 transition-colors text-[1.8rem] whitespace-nowrap rounded-lg border border-primary"
        >
            Get Started
        </button>
    </form>
);

const NewsLetterForm = dynamic(() => import("./NewsLetterForm"), {
    ssr: false,
    loading: () => <NewsLetterFormPlaceholder />,
});

const NewsLetter = () => {
    const { ref, inView } = useInView<HTMLElement>();

    return (
        <section ref={ref} className="bg-bannerBG py-24 lg:py-36 border-t border-white/5">
            <div className="mx-auto px-4 sm:px-6 text-center">
                <h2 className="text-[3rem] lg:text-[4rem] font-black text-black dark:text-heading mb-4">
                    Ready to Scale Your Digital Presence?
                </h2>
                <p className="text-gray-800 dark:text-heading text-[1.5rem] mb-10 leading-relaxed">
                    Let&apos;s collaborate to build something extraordinary. Our team is ready to turn your vision <br />
                    into reality.
                </p>

                {inView ? <NewsLetterForm /> : <NewsLetterFormPlaceholder />}

                <p className="text-gray-800 dark:text-heading text-[1.3rem] mt-4">No spam. Unsubscribe anytime.</p>
            </div>
        </section>
    );
};

export default NewsLetter;
