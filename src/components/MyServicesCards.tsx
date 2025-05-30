import React from "react";
import Image from "next/image";
import Link from "next/link";

const MyServicesCards = ({ services }) => {
  return (
    <div className="w-full flex items-center justify-center gap-10 flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:flex xl:grid lg:grid-cols-4 place-items-center items-center justify-center gap-[2.4rem] mt-[6rem] md:flex-wrap ">
        {services.map((service, index) => {
          const truncatedTagline =
            service?.tagline?.split(" ")?.slice(0, 8)?.join(" ") +
            (service?.tagline?.split(" ").length > 8 ? "..." : "");

          return (
            <div
              key={index}
              className="bg-white/20 rounded-[1.8rem] md:max-w-[30.12rem] w-full p-[2rem] flex flex-col justify-between min-h-[30rem]"
            >
              {/* Circle */}
              {service.picture && (
                <div className="w-[8.8rem] h-[8.8rem] flex items-center justify-center rounded-[12rem] mx-auto image-wrapper">
                  <div className="text-center text-white text-[4.3rem] font-medium">
                    {/* top  imageof card */}
                    <Image
                      src={service.picture}
                      height={100}
                      width={100}
                      alt="Icon"
                      className="w-[8.8rem] h-[8.8rem] rounded-[12rem] object-cover"
                      onError={(e) => {
                        (
                          (e.target as HTMLElement).closest(
                            ".image-wrapper"
                          ) as HTMLElement
                        ).style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Title with max height */}
              <h3
                className="text-[2rem] font-bold text-white leading-[2.4rem] mt-[3rem] mb-[1.2rem] max-h-[4.8rem] overflow-hidden text-ellipsis"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {service?.title}
              </h3>

              {/* Truncated Tagline with max height */}
              <p
                dangerouslySetInnerHTML={{ __html: truncatedTagline }}
                className="text-[1.6rem] font-normal leading-[2.4rem] text-paragraph2 mb-[1.6rem] flex-grow max-h-[4.8rem] overflow-hidden text-ellipsis"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {/* Placeholder to keep the height consistent */}
              </p>

              {/* Arrow */}
              <div className="flex gap-[0.8rem] items-center group">
                <Link
                  href={`/offer?service=${service?.title}`}
                  className="text-[1.6rem] text-white font-normal cursor-pointer inline-block"
                >
                  Read More
                  <Image
                    src="/images/ArrowRight.svg"
                    height={24}
                    width={24}
                    className="group-hover:translate-x-[1rem] duration-300 inline-block ms-3"
                    alt="Arrow Right"
                  />{" "}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12 px-4">
        {services.map((service, index) => {
          const truncatedTagline =
            service?.tagline?.split(" ")?.slice(0, 12)?.join(" ") +
            (service?.tagline?.split(" ").length > 12 ? "..." : "");

          return (
        <div
  key={index}
  className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/10"
>
  {/* Image Container with Hover Effect - Fixed */}
  {service.picture && (
    <div className="relative h-[17rem] w-full flex items-center justify-center overflow-hidden group">
      <Image
        src={service.picture}
        alt={service.title || "Service image"}
        height={150}
        width={150}
        className="object-cover transition-transform duration-500 z-10 group-hover:scale-110 w-[9.8rem] h-[9.8rem] rounded-full"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          // Consider adding a fallback image here
        }}
      />
      {/* Hover overlay - fixed positioning and z-index */}
      <div className="absolute inset-0 bg-white hover:bg-gradient-to-t hover:from-[#6f656591] hover:to-transparent opacity-100 transition-opacity duration-500 z-0" />
    </div>
  )}

  {/* Rest of your content remains the same */}
  <div className="p-6">
    {/* Title */}
    <h3 className="font-bold text-[2rem] text-white mb-3 line-clamp-2">
      {service?.title}
    </h3>

    {/* Tagline */}
    <p
      dangerouslySetInnerHTML={{ __html: truncatedTagline }}
      className="text-gray-300 text-[1.3rem] mb-6 line-clamp-3 leading-relaxed"
    />

    {/* CTA Button */}
    <Link
      href={`/offer?service=${service?.title}`}
      className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
    >
      <span className="font-medium text-[1rem]">Discover more</span>
      <span className="group-hover:translate-x-1 transition-transform">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </Link>
  </div>
</div>
          );
        })}
      </div>
    </div>
  );
};

export default MyServicesCards;
