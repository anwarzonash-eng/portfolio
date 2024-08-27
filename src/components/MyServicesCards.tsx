import React from "react";
import Image from "next/image";

const MyServicesCards = () => {
  const servicesCards = [
    {
      img: "🛠️",
      title: "Back-end Development",
      description:
        "Vivamus in quam ut felis consectetur imperdiet et sed metus. Nullam tristique scelerisque metus id dignissim.",
      href: "/",
    },
    {
      img: "📢",
      title: "Front-end Development",
      description:
        "Vivamus in quam ut felis consectetur imperdiet et sed metus. Nullam tristique scelerisque metus id dignissim.",
      href: "/",
    },
    {
      img: "🚀",
      title: "SEO Optimization",
      description:
        "Vivamus in quam ut felis consectetur imperdiet et sed metus. Nullam tristique scelerisque metus id dignissim.",
      href: "/",
    },
    {
      img: "✍",
      title: "Content Writing",
      description:
        "Vivamus in quam ut felis consectetur imperdiet et sed metus. Nullam tristique scelerisque metus id dignissim.",
      href: "/",
    },
  ];

  return (
    <>
      {servicesCards.map((card, index) => (
        <div
          key={index}
          className="bg-white/20 rounded-[1.8rem] md:max-w-[30.12rem] w-full p-[2rem]"
        >
          {/* Circle */}
          <div className="w-[8.8rem] h-[8.8rem] flex items-center justify-center bg-white/20 rounded-[12rem] shadow">
            <div className="text-center text-white text-[4rem] font-medium">
              {card.img}
            </div>
          </div>
          {/* Title */}
          <h3 className="text-[2rem] font-bold text-white leading-[2.4rem] mt-[3rem] mb-[1.2rem]">
            {card.title}
          </h3>
          {/* Para */}
          <p className="text-[1.6rem] font-normal leading-[2.4rem] text-paragraph2 mb-[1.6rem]">
            {card.description}
          </p>
          {/* Arrow */}
          <div className="flex gap-[0.8rem] items-center group">
            <a
              href={card.href}
              className="text-[1.6rem] text-white font-normal cursor-pointer"
            >
              Let’s Work Together
            </a>
            <Image
              src="/images/ArrowRight.svg"
              height={24}
              width={24}
              className="group-hover:translate-x-[1rem] duration-300"
              alt="Arrow Right"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default MyServicesCards;
