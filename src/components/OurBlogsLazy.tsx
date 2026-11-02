"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

/**
 * Viewport-gated wrapper around OurBlogs.
 *
 * OurBlogs fetches the blog list from the API on mount and renders three cards.
 * It sits below the fold on every page that uses it, so deferring it also
 * defers that API call until the user is about to see the section.
 *
 * The placeholder mirrors the real component's own initial state exactly: the
 * same heading row (static copy) and the same h-[20rem] loader box it shows
 * while blogs are loading. So the swap is from one identical frame to the next.
 */
const OurBlogs = dynamic(() => import("./OurBlogs"), { ssr: false });

const OurBlogsLazy = ({ domain }: { domain?: string }) => {
  const { ref, inView } = useInView<HTMLElement>();

  if (inView) return <OurBlogs domain={domain} />;

  return (
    <section
      ref={ref}
      className="mainContainer !w-full flex justify-center flex-col"
    >
      {/* Top Content — identical markup to OurBlogs */}
      <div className="flex justify-between flex-wrap items-end sm:items-center gap-[2rem] lg:mb-[4rem]">
        <div className="flex items-center justify-center lg:hidden w-full">
          <div className="badge">My Latest Blogs</div>
        </div>
        <div>
          <h3 className="text-heading text-[3.6rem] leading-[4.4rem] font-medium mt-[1.2rem] hidden lg:block">
            My Latest Blogs
          </h3>
        </div>
        <div className="w-full sm:w-auto  justify-center hidden lg:flex">
          <Link href={"/blog-listing"}>
            <button
              className="btn-primary text-white py-[1rem] 
                px-[3.4rem] text-[1.8rem] font-medium"
            >
              View All Blogs
            </button>
          </Link>
        </div>
      </div>
      {/* Same height as OurBlogs' own loader state */}
      <div className="w-full h-[20rem]" aria-hidden="true" />
    </section>
  );
};

export default OurBlogsLazy;
