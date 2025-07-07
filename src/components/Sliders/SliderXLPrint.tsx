"use client";
import React from "react";

const SliderXLPrint = ({ portfolioPictures }) => {
  const images = JSON.parse(portfolioPictures);
  const visibleImages = images.slice(0, 2);

  return (
    <>
      <div className="relative w-full overflow-visible rounded-[1.6rem] flex items-center justify-center flex-wrap gap-[2rem]">
        {visibleImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full rounded-[1.6rem] flex-shrink-0 object-cover h-[30rem]"
          />
        ))}
      </div>
    </>
  );
};

export default SliderXLPrint;
