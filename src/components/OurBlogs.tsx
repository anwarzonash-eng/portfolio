"use client";

import React from "react";
import BlogCard from "./BlogCard";

interface Blog {
  imageSrc: string;
  category: string;
  date: string;
  title: string;
  description: string;
  link: string;
}

const OurBlogs: React.FC = () => {
  const blogData: Blog[] = [
    {
      imageSrc: "/images/blogPost1.png",
      category: "Design",
      date: "14 Aug 2024",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      link: "/",
    },
    {
      imageSrc: "/images/blogPost2.png",
      category: "Design",
      date: "14 Aug 2024",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      link: "/",
    },
    {
      imageSrc: "/images/blogPost3.png",
      category: "Design",
      date: "14 Aug 2024",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      link: "/",
    },
    // Add more blog entries here
  ];

  return (
    <section className="mainContainer w-full">
      {/* Top Content */}
      <div className="flex justify-between flex-wrap items-end md:items-center gap-[2rem] mb-[4rem]">
        <div>
          <p className="text-sectionBG text-[1.6rem] leading-[2.4rem] font-medium">
            Our blog
          </p>
          <h3 className="text-heading text-[3.6rem] leading-[4.4rem] font-medium mt-[1.2rem]">
            Latest blog posts
          </h3>
        </div>
        <div>
          <button className="btn-primary  text-white py-[1rem] px-[3.4rem] text-[1.8rem] font-medium">
            View all
          </button>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-[3.2rem]">
        {blogData.map((blog, index) => (
          <BlogCard
            key={index}
            imageSrc={blog.imageSrc}
            category={blog.category}
            date={blog.date}
            title={blog.title}
            description={blog.description}
            link={blog.link}
          />
        ))}
      </div>
    </section>
  );
};

export default OurBlogs;
