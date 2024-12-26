import React from 'react'

const test = () => {
  return (
    <div
    key={index}
    ref={(el) => {
      serviceRefs.current[service?.title] = el;
    }}
    className="w-full bg-white block print:hidden rounded-[1rem] border border-border border-solid mb-[3rem] overflow-hidden relative"  // Add relative positioning to the parent
  >
    {/* Top Section */}
    <div
      className={p-[1rem] lg:p-[3rem] mb-[5rem] bg-primary bg-cvBoxDesktop bg-center bg-no-repeat bg-cover lg:bg-contain cursor-pointer ${
        activeDropdown === index ? "bg-expanded" : ""
      }}
      onClick={() => toggleDropdown(index)}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-[2rem] mb-[2rem]">
        <div className="w-full flex items-center justify-between">
          <div className="w-full flex items-center">
            {service?.picture && (
              <div className="w-[9.3rem] h-[9.3rem] flex items-center justify-center rounded-[12rem] shadow relative">
                <div className="flex items-center justify-center w-[9.3rem] h-[9.3rem]">
                  <Image
                    src={service?.picture}
                    alt="Icon"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-[12rem] w-[9.3rem] h-[9.3rem] object-contain"
                  />
                </div>
              </div>
            )}
            <h3 className="text-[2.4rem] lg:text-[4.5rem] text-white leading-tight font-medium">
              {service.title}
            </h3>
          </div>
          <img
            src="/images/expand_icon.png"
            alt=""
            className={`w-[52px] ${activeDropdown === index ? "hidden" : "block"}`}
          />
          <img
            src="/images/collaps_icon.png"
            alt=""
            className={`w-[52px] ${activeDropdown === index ? "block" : "hidden"}`}
          />
        </div>
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html: service.intro_main,
        }}
        className="text-white list-div text-[1.6rem] leading-[2.4rem] sm:text-[1.8rem] sm:leading-[2.8rem] lg:text-[1.8rem] lg:leading-[2.9rem] font-normal lg:font-medium mb-[2rem]"
      ></p>
    </div>
  
    {/* Expandable content with smooth transitions */}
    <div
      className={`transition-all duration-500 ease-in-out overflow-hidden absolute left-0 right-0 ${
        activeDropdown === index ? "md:max-h-[950px] opacity-100" : "max-h-0 opacity-0"
      }`}
      style={{ top: "100%" }}  // Position the expanded content right below the top section
    >
      <div className="flex w-full flex-col items-start">
        <div
          dangerouslySetInnerHTML={{
            __html: modifiedContent(
              service.intro_detail,
              listOfskills,
              listOfdata
            ),
          }}
          className="p-[1rem] list-div text-[1.6rem] lg:p-[3rem] rounded-[1rem] bg-white"
        ></div>
        {service?.skills && service?.skills.length > 0 && (
          <SkillsComponent
            service={service}
            skillsList={listOfskills}
            index={index}
          />
        )}
      </div>
    </div>
  </div>
  
  )
}

export default test
