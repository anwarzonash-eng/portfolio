"use client";
import Link from "next/link";
import React from "react";

const SliderXLPrint = ({ portfolioPictures }) => {
  const images = JSON.parse(portfolioPictures);
  const visibleImages = images.slice(0, 1);

  return (
    <>
      <div className="relative w-full overflow-visible rounded-[1.6rem] flex items-center justify-center flex-wrap gap-[2rem]">
        {visibleImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full rounded-[1.6rem] flex-shrink-0 object-fill h-[60rem] border border-border border-solid"
          />
        ))}
        <Link href={"/cv"}>
          <button className="px-[4rem] py-[1.4rem] bg-primary rounded-[2.2rem] hover:bg-white hover:text-primary hover:border-primary border border-border text-white text-[1.4rem] font-medium font-Inter leading-tight absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-max shadow-xl">
            View Gallery
          </button>
        </Link>
      </div>
    </>
  );
};

export default SliderXLPrint;
