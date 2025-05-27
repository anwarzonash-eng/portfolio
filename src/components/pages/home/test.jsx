<div className="relative">
  {/* Vertical line */}
  <div className="absolute left-[10rem] top-[3rem] w-[0.4rem] h-[100%] bg-border mx-[2.1rem] hidden xl:block" />
  
  {listOfdata?.experiences_ids && (
    <>
      {[...listOfdata.experiences_ids]
        ?.sort((a, b) => {
          const yearA = new Date(a.ending_Date).getFullYear();
          const yearB = new Date(b.ending_Date).getFullYear();
          if (yearA !== yearB) return yearB - yearA;
          const monthA = new Date(a.ending_Date).getMonth();
          const monthB = new Date(b.ending_Date).getMonth();
          return monthB - monthA;
        })
        ?.slice(0, showAllExperiences ? listOfdata.experiences_ids.length : 3)
        ?.map((experience, index) => {
          const skillsforExpereince = skillsGrouping(
            showMoreSkills[index]
              ? experience?.skills
              : experience?.skills?.slice(0, 15)
          );
          
          return (
            <div key={index} className="space-y-[1rem] xl:space-y-[3rem] xl:space-x-[9rem] mt-10">
              {/* Date and divider */}
              <div className="ml-[0.5rem] xl:mb-auto xl:ml-auto xl:absolute left-[-7.6rem] z-10 text-[1.8rem] text-paragraph1 capitalize">
                {formatDate(
                  experience.starting_date,
                  dateFormatsOptions.shortMonthYear
                )}{" "}
                -{" "}
                {isNaN(new Date(experience.ending_Date).getFullYear())
                  ? experience.ending_Date
                  : formatDate(
                      experience.ending_Date,
                      dateFormatsOptions.shortMonthYear
                    )}
              </div>
              
              {/* Timeline item */}
              <div className="relative flex items-start">
                {/* Dot */}
                <div className="absolute top-0 left-[2rem] hidden xl:block">
                  <div className="w-[2.6rem] h-[2.6rem] bg-white rounded-full flex items-center shadow-md justify-center">
                    <div className="w-[0.7rem] h-[0.7rem] bg-heading rounded-full"></div>
                  </div>
                </div>
                
                {/* Card */}
                <div className="bg-white p-[1.5rem] lg:p-[2.4rem] rounded-[1rem] shadow xl:ml-[6rem] w-full">
                  <div className="flex items-center flex-wrap text-nowrap gap-[1.5rem] md:justify-between">
                    {/* About Content */}
                    <div className="flex gap-[1rem]">
                      {experience?.thumbnail && (
                        <div className="h-[4.2rem] w-[4.2rem] lg:h-[4.9rem] lg:w-[4.9rem] bg-[#D1E9FF] rounded-[0.4rem] flex items-center justify-center">
                          <Image
                            src={experience?.thumbnail}
                            height={32}
                            width={32}
                            alt="Logo Mark"
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-[1.4rem] lg:text-[1.6rem] font-normal text-paragraph1">
                          {experience?.company_name}
                        </p>
                        <h3 className="text-[1.6rem] lg:text-[1.8rem] font-medium text-heading">
                          {experience?.title}
                        </h3>
                      </div>
                    </div>

                    {/* Link */}
                    <div className="flex justify-center md:justify-end w-full md:w-auto">
                      <div className="flex flex-col-reverse gap-[1rem] max-w-max">
                        <div className="py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-[#47516B] rounded-[2rem] text-[1.5rem] font-medium leading-[0.8rem] hover:bg-primary hover:text-white">
                          <Link
                            href={experience?.company_website || "#"}
                            className="flex gap-2 justify-center align-middle items-center hover:text-white hover:text-semibold"
                          >
                            <Image
                              src="/images/link.svg"
                              height={18}
                              width={18}
                              alt="Link"
                            />{" "}
                            {experience.company_website
                              .replace(/^(https?:\/\/)?(www\.)?/, "")
                              .split("/")[0]}
                          </Link>
                        </div>
                        {experience.company_website.includes("upwork") && (
                          <Link
                            href={experience.company_website}
                            className="hover:bg-primary hover:text-white py-[0.4rem] px-[1rem] text-heading bg-[#A3DDD3] rounded-[1.8rem] text-[1.4rem] font-medium leading-normal"
                          >
                            View my Freelance Profile
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  <p
                    className="mt-[2rem] list-div text-[1.6rem] font-medium text-paragraph1"
                    dangerouslySetInnerHTML={{
                      __html: modifiedContent(
                        experience?.short_description,
                        listOfskills,
                        listOfdata
                      ),
                    }}
                  ></p>

                  {experience?.skills && experience?.skills.length > 0 && (
                    <div className="w-full">
                      <h4 className="text-[1.5rem] text-primary font-medium my-[1.6rem]">
                        AREAS OF EXPERTISE I'VE WORKED IN
                      </h4>
                      <div className="flex items-center gap-[1rem] lg:gap-[0.7rem] text-nowrap flex-wrap text-[1.2rem]">
                        {Object?.values(skillsforExpereince)?.map((group, groupIndex) => (
                          <React.Fragment key={groupIndex}>
                            {group.map((skill, i) => (
                              <Link
                                key={i}
                                href={skill?.url || "#"}
                                className="py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal hover:text-white hover:bg-primary"
                              >
                                {skill?.title}
                              </Link>
                            ))}
                            {showMoreSkills[index] && (
                              <div className="w-full mb-[1px]" />
                            )}
                          </React.Fragment>
                        ))}
                        <ShowmoreSkills
                          props={{
                            list: experience?.skills,
                            index,
                            setShowMoreSkills,
                            showMoreSkills,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      
      {/* Show More Button */}
      {listOfdata.experiences_ids.length > 3 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAllExperiences(!showAllExperiences)}
            className="px-6 py-3 bg-primary text-white rounded-full font-medium text-lg hover:bg-primary-dark transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            {showAllExperiences ? 'Show Less Professionals' : 'Show More Professionals'}
          </button>
        </div>
      )}
    </>
  )}
</div>