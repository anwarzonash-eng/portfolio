"use client";

import Image from "next/image";
import Link from "next/link";

const EducationBlogPortfolio = ({
  listOfdata,
  domain,
  formatDate,
  dateFormatsOptions,
  loadingblogs,
  blogsList,
  getImageForIndex,
}) => {
  return (
    <>
      <div className="h-screen w-full p-[2rem] bg-cvSideBg bg-no-repeat bg-cover flex items-center justify-center">
      <div className="w-full">
        {/* Education Section */}
        {listOfdata?.education_ids?.length > 0 && (
          <div className="w-full ">
            <h2 className="text-heading text-[3.67rem] font-medium pl-[0.5rem] py-[3rem]">
              Education
            </h2>
            <div className="grid grid-cols-2 gap-[1.2rem] w-full">
              {listOfdata?.education_ids?.map((edu) => (
                <div
                  key={edu.id}
                  className="p-[2rem] w-full rounded-[0.8rem] border border-solid border-[#E2E6EE] bg-[#F7F9FC]"
                >
                  <div className="flex items-center gap-[1.8rem]">
                    {edu?.thumbnail && (
                      <Image
                        src={edu?.thumbnail}
                        loading="eager"
                        priority={true}
                        height={34}
                        width={34}
                        alt={edu.university_name}
                        className="h-[34px] w-[34px]"
                      />
                    )}
                    <h3 className="text-[1.4rem] text-heading font-medium leading-[1.8rem]">
                      {edu.university_name}
                    </h3>
                  </div>
                  <hr className="w-full h-[0.2rem] bg-[#E2E6EE] my-[2rem]" />
                  <div>
                    <h2 className="text-heading font-medium text-[1.6rem] leading-[2rem]">
                      {edu.degree_name}
                    </h2>
                    <p className="text-[1.2rem] text-[#3E3E3E]">
                      {formatDate(
                        edu.degree_start_date,
                        dateFormatsOptions.shortMonthYear
                      )}{" "}
                      -{" "}
                      {isNaN(new Date(edu.degree_end_date).getFullYear())
                        ? edu.degree_end_date
                        : formatDate(
                            edu.degree_end_date,
                            dateFormatsOptions.shortMonthYear
                          )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blogs Section */}
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-heading text-[3.67rem] font-medium pl-[0.5rem] py-[3rem]">
              Blogs
            </h2>
            <Link href={"/blog-listing"}>
              <button className="btn-primary text-white py-[1rem] px-[3.4rem] text-[1.8rem] font-medium">
                View All Blogs
              </button>
            </Link>
          </div>

          {blogsList
            ?.slice(0, Math.min(3, blogsList.length))
            .map((blog, index) => (
              <Link
                href={`/blog-listing/${blog?.id}`}
                key={index}
                className="w-full flex items-start gap-[2rem] p-[1.2rem] bg-white shadow-lg mb-[1.2rem]"
              >
                {blog?.featuredImage && (
                  <div className="size-[18rem] flex-shrink-0">
                    <Image
                      src={getImageForIndex(domain, index)}
                      loading="eager"
                      priority={true}
                      height={300}
                      width={300}
                      alt={`Blog ${index + 1}`}
                      className="object-cover h-full w-full"
                    />
                  </div>
                )}
                <div>
                  <div className="mb-[1.2rem] flex items-center">
                    <div className="mx-[0.6rem]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="5"
                        height="6"
                        viewBox="0 0 5 6"
                        fill="none"
                      >
                        <circle cx="2.5" cy="3" r="2.5" fill="#C6CBD8" />
                      </svg>
                    </div>
                    <p className="text-[1.4rem] text-paragraph1">
                      {formatDate(blog?.date, dateFormatsOptions.dayMonthYear)}
                    </p>
                  </div>
                  <h2
                    dangerouslySetInnerHTML={{ __html: blog?.title }}
                    className="text-[1.6rem] font-medium leading-[3.2rem] text-heading mb-[1.2rem] line-clamp-1"
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: blog?.excerpt,
                    }}
                    className="text-[1.4rem] leading-[2.4rem] text-paragraph1 mb-[3rem]"
                  />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default EducationBlogPortfolio;
