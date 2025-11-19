"use client";

import React, { useRef } from "react";
import Link from "next/link";

interface BlogTechStackPointProps {
  printTruncatedHtml?: string | null;
  featuresItemCount: number;
  portfolioId?: string | number | null;
}

const BlogTechStackPoint: React.FC<BlogTechStackPointProps> = ({
  printTruncatedHtml,
  featuresItemCount,
  portfolioId,
}) => {
  const featuresRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-full px-[2rem]">
      <h2 className="text-primary text-center text-[4rem] font-semibold my-[2rem]">
        Tech Stacks I Have Worked On
      </h2>

      <div className="w-full relative mt-[3rem]">
        {/* Main list container */}
        <div
          ref={featuresRef}
          className="w-full list-div my-[6.4rem] print:my-[2rem] leading-[3.2rem] font-normal"
        >

          {/* Print Version */}
          <div
              dangerouslySetInnerHTML={{
                __html: printTruncatedHtml || "",
              }}
            />
          
        </div>

        
        {/* PRINT: Read More link (only if too many items) */}
        {featuresItemCount > 12 && (
          <div className="hidden print:flex items-center justify-center text-center mt-4">
            <Link
              href={`/portfolio/${portfolioId}#tech-stacks`}
              target="_blank"
              className="text-white py-[1rem] px-[3.4rem] text-[1.6rem] font-medium btn-primary inline-block max-w-max"
            >
              Read More
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTechStackPoint;
