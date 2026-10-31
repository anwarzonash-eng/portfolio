import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Service {
  title: string;
  tagline?: string;
  picture?: string;
}

interface ServicesSectionProps {
  services: Service[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    <section className="w-full bg-sectionBG  print:m-0 print:break-before-page print:h-screen">
      <div className="mainContainer py-[4rem] xl:py-[8rem]">
        {/* Badge */}
        <div className="flex items-center justify-center lg:hidden">
          <div className="badge">My Services</div>
        </div>
        {/* Heading */}
        <div className="text-center text-paragraph2 text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] my-[2rem] hidden lg:block">
          I am not limited with this only services. Together we can do more
        </div>
        {/* Services Cards */}
        <div className="w-full flex items-center justify-center gap-10 flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12  print:grid-cols-4">
            {/* {services.map((service, index) => {
              const truncatedTagline =
                service?.tagline?.split(" ")?.slice(0, 12)?.join(" ") +
                (service?.tagline?.split(" ").length > 12 ? "..." : "");

              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/10"
                >
                
                  {service.picture && (
                    <div className="relative h-[17rem] print:h-[14rem] w-full flex items-center justify-center overflow-hidden group">
                      <Image
                        src={service.picture.trim()}
                        alt={service.title || "Service image"}
                        height={150}
                        width={150}
                        className="object-cover filter transition-transform duration-500 z-10 group-hover:scale-110 w-[9.8rem] h-[9.8rem] print:object-center"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                      
                      <div className="absolute inset-0 bg-surface z-0">
                        <div className="h-full w-full bg-gradient-to-t from-[#6f656591] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                  )}
                
                  <div className="p-6 print:p-3">
                    
                    <h3 className="font-bold text-[2rem] print:font-semibold print:text-[1.3rem] text-white mb-3 line-clamp-2 print:text-nowrap">
                      {service?.title}
                    </h3>
                    
                    <p
                      dangerouslySetInnerHTML={{ __html: truncatedTagline }}
                      className="text-gray-300 text-[1.3rem] mb-6 print:mb-3 print:line-clamp-2 leading-relaxed print:text-[1.2rem] line-clamp-4"
                    />
                  </div>
                </div>
              );
            })} */}


            {services.map((service, index) => {
              // keep tagline full; card will handle truncation via CSS if needed
              const taglineText = service?.tagline || "";

              return (
                <div
                  key={index}
                  className="bg-surface  rounded-3xl overflow-hidden shadow-lg  border border-white/10 flex flex-col h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="p-6 flex flex-col flex-grow">
                    {/* header with icon and title */}
                    <div className="flex  mb-4 flex-col justify-start items-start gap-10">
                      <div className="w-full flex justify-between">
                        {service.picture && (
                          <Image
                            src={service.picture.trim()}
                            alt={service.title || "Service icon"}
                            width={50}
                            height={50}
                            className="object-contain mr-4 border border-gray-300 dark:border-border rounded-lg p-1 filter grayscale"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                            }}
                          />
                        )}
                        <span className="text-gray-600 dark:text-paragraph1 text-[1.8rem]">0{index + 1}</span>
                      </div>
                      <h3 className="text-black dark:text-heading text-[2rem] font-bold line-clamp-2">
                        {service?.title}
                      </h3>
                    </div>

                    {/* tagline */}
                    {taglineText && (
                      <p className="text-gray-600 dark:text-paragraph1 text-[1.3rem] flex-grow line-clamp-4">
                        {taglineText}
                      </p>
                    )}


                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;






