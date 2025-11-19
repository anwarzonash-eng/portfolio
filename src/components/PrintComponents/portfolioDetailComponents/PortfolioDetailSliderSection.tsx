"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface SliderXLPrintProps {
  portfolioPictures: string | null;
  portfolioId?: string | number | null;
}

const SliderXLPrint: React.FC<SliderXLPrintProps> = ({
  portfolioPictures,
  portfolioId = null,
}) => {
  let images: string[] = [];

  // Safe JSON parsing
  try {
    const parsed = JSON.parse(portfolioPictures || "[]");
    images = Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Invalid JSON in portfolioPictures:", e);
  }

  const visibleImages = images.slice(0, 1);

  return (
    <div className="overflow-visible rounded-[1.6rem] w-full">
      {visibleImages.length > 0 ? (
        visibleImages.map((img, index) => (
          <Image
            key={index}
            src={img}
            height={600}
            width={2000}
            loading="eager"
            priority={true}
            alt={`Slide ${index + 1}`}
            className="w-full rounded-[1.6rem] object-fill h-[60rem] border border-border border-solid"
          />
        ))
      ) : (
        <div className="w-full h-[40rem] border border-border border-solid rounded-[1.6rem] flex items-center justify-center text-[1.6rem] text-gray-400">
          No Images Available
        </div>
      )}

      <div className="flex items-center justify-center py-[2rem]">
        <Link
          href={
            portfolioId
              ? `/portfolio?sectionId=${portfolioId}&openGallery=true`
              : "/portfolio"
          }
        >
          <button className="px-[4rem] py-[1.4rem] bg-primary rounded-[2.2rem] hover:bg-white hover:text-primary hover:border-primary border border-border text-white text-[1.4rem] font-medium font-Inter leading-tight max-w-max shadow-xl">
            View Gallery
          </button>
        </Link>
      </div>
    </div>
  );
};

/* -----------------------------------------
   Portfolio Main Section
--------------------------------------------*/

interface PortfolioDetailSliderSectionProps {
  portfolioDetails: {
    id?: string | number | null;
    pictures?: string | null;
  } | null;
  params?: {
    id?: string | number | null;
  } | null;
}

const PortfolioDetailSliderSection: React.FC<
  PortfolioDetailSliderSectionProps
> = ({ portfolioDetails, params }) => {
  const resolvedId = portfolioDetails?.id || params?.id || null;

  return (
    <div className="w-full h-screen flex items-center justify-center p-[2rem]">
      {portfolioDetails ? (
        <SliderXLPrint
          portfolioPictures={portfolioDetails.pictures || "[]"}
          portfolioId={resolvedId}
        />
      ) : (
        <p className="text-center text-gray-500 text-[1.6rem]">
          Portfolio details not available.
        </p>
      )}
    </div>
  );
};

export default PortfolioDetailSliderSection;
