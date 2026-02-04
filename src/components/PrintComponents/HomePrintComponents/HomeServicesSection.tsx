import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeServicesSection = ({ listOfdata, listOfdatas, services, hideLinks }) => {
  return (
    <>
      {listOfdata &&
        listOfdata?.services &&
        listOfdata?.services?.length > 0 && (
          <div
            className="w-full bg-sectionBG
            m-0  flex items-center justify-center
            h-screen relative"
          >
            {/* <div className="absolute block px-4 py-2 top-0 right-0 z-[2000]">
              <Link
                className="text-white font-medium text-[1.5rem] underline ml-2"
                href={`https://www.${listOfdatas.domain}`}
              >
                {listOfdatas.domain}
              </Link>
            </div> */}
            <div
              className="max-w-[1550px] w-full mx-auto 
                            px-[4rem] py-[5rem] print:py-0"
            >
              {/* Badge */}
              <div className="flex items-center justify-center mb-[2rem]">
                <div className="badge">My Services</div>
              </div>

              {/* Services Cards */}
              <div className="w-full flex items-center justify-center gap-10 flex-col">
                <div className="grid grid-cols-4 gap-8 mt-12 px-4">
                  {services.slice(0, 8).map((service, index) => {
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
                          <div className="relative h-[17rem] print:h-[14rem] w-full flex items-center justify-center overflow-hidden group">
                            <Image
                              src={service.picture.trim()}
                              alt={service.title || "Service image"}
                              height={150}
                              width={150}
                              loading="eager"
                              priority={true}
                              className="object-cover transition-transform duration-500 z-10 group-hover:scale-110 w-[9.8rem] h-[9.8rem] print:object-center"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                              }}
                            />

                            {/* Gradient overlay - only fades in on hover */}
                            <div className="absolute inset-0 bg-white z-0">
                              <div className="h-full w-full bg-gradient-to-t from-[#6f656591] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                          </div>
                        )}

                        {/* Rest of your content remains the same */}
                        <div className="p-6 print:p-3">
                          {/* Title */}
                          <h3 className="font-bold text-[1.6rem] text-white mb-3 line-clamp-2">
                            {service?.title}
                          </h3>

                          {/* Tagline */}
                          <p
                            dangerouslySetInnerHTML={{
                              __html: truncatedTagline,
                            }}
                            className="text-gray-300 
                             mb-3 line-clamp-3 leading-relaxed text-[1.3rem]"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default HomeServicesSection;
