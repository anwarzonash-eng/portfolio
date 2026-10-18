// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import UpworkIdentity from "./UpworkIdentity";


// function UpworkActivitySection({ urlInfo, cvTrue, data }) {

//   console.log("Upwork Profile Pic:", data?.profile_photo_1,)

//   const upworkActivityList = [
//     {
//       id: 1,
//       title: "10000+ Hour Tracked for clients",
//       content:
//         "With over 2500 hours logged, I bring extensive experience in delivering exceptional web development projects that drive results.",
//     },
//     {
//       id: 2,
//       title: "70+ Project Completed",
//       content:
//         "Having successfully completed over 35 web development projects, I have a proven track record of building innovative and user-focused websites.",
//     },
//     {
//       id: 3,
//       title: "Rated 5 stars by Clients",
//       content:
//         "Rated 5 stars by my clients, I pride ourselves on exceeding expectations with high-quality web development services. Your satisfaction drives my commitment to excellence.",
//     },
//   ];

//   const upworkFinancialActivityList = [
//     {
//       id: 1,
//       title: "Hourly rate",
//       content: "$10.00 - $30.00",
//     },

//     {
//       id: 2,
//       title: "Total earned",
//       content: "$200K+",
//     },
//     {
//       id: 3,
//       title: "Total hours completed on Upwork",
//       content: "10,000+",
//     },
//     {
//       id: 4,
//       title: "Total jobs on Upwork",
//       content: "70+",
//     },
//     {
//       id: 5,
//       title: "Upwork Member since",
//       content: "Jan 31, 2022",
//     },
//   ];

//   // console.log("URLInfo: ",urlInfo)
//   return (
//     <section
//       className={`${urlInfo?.domain === "findusman.me" ? "w-full " : "hidden"
//         } ${cvTrue ? "py-0" : "py-10"} bg-white `}
//     >
//       <div className={`${cvTrue ? "p-[2rem] lg:p-[3rem]" : "mainContainer"}`}>
//         {/* Top Content */}
//         <div className="flex items-center flex-col lg:flex-row flex-wrap justify-center lg:justify-between w-full gap-5">
//           {/* Upwork Identity */}
//           <UpworkIdentity data={data} />
//           <div className="lg:basis-1/2">
//             <Link
//               href={data?.upwork ?? "#"}
//               target="_blank"
//               className="py-2 inline-block"
//             >
//               <img src="/images/up-logo.png" alt="Upwork Logo" />
//             </Link>
//           </div>

//         </div>

//         {/* Bottom Content */}
//         <div className="px-4 py-8 flex flex-col lg:flex-row-reverse gap-8 w-full">
//           {/* Upwork Activity Column */}
//           <div className="lg:w-1/2">
//             <h2
//               className={`text-[2.5rem] ${cvTrue ? "lg:text-[3rem]" : "lg:text-[4rem]"
//                 } font-bold mb-[1rem] max-lg:text-center`}
//             >
//               My{" "}
//               <Link
//                 href={data?.upwork ?? "#"}
//                 target="_blank"
//                 className="text-primary"
//               >
//                 Upwork
//               </Link>{" "}
//               Activities
//             </h2>
//             <ul className="space-y-4">
//               {upworkActivityList.map((item) => (
//                 <li className="flex" key={item.id}>
//                   <span className="upworkSectionDot"></span>
//                   <div>
//                     <p
//                       className="text-[1.6rem] lg:text-[2.4rem] 
//                     font-semibold"
//                     >
//                       {item.title}
//                     </p>
//                     <p className="text-heading text-[1.4rem] lg:text-[1.5rem]">
//                       {item.content}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/*Financial Activity Column */}
//           <div className="lg:w-1/2">
//             <h2
//               className={`text-[2.5rem] ${cvTrue ? "lg:text-[3rem]" : "lg:text-[4rem]"
//                 } font-bold mb-[1rem] max-lg:text-center`}
//             >
//               My{" "}
//               <Link
//                 href={data?.upwork ?? "#"}
//                 target="_blank"
//                 className="text-primary"
//               >
//                 Upwork
//               </Link>{" "}
//               Finanancial Activities
//             </h2>
//             <div className="space-y-4">
//               {upworkFinancialActivityList.map((item) => (
//                 <div key={item.id}>
//                   <p className="text-heading text-[1.8rem]">{item.title}</p>
//                   <p className="text-[1.8rem] lg:text-[2.4rem] font-semibold">
//                     {item.content}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default UpworkActivitySection;







import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Clock, CheckCircle, Star, TrendingUp, MapPin, Crown } from "lucide-react";
import BlueTick from "./SVGI-Icons/BlueTick";
import UpworkIdentity from "./UpworkIdentity";


function UpworkActivitySection({ urlInfo, cvTrue, data }) {

  console.log("Upwork Profile Pic:", data?.profile_photo_1,)

  const upworkActivityList = [
    {
      id: 1,
      icon: Clock,
      title: "7000+ Hours Tracked ",
      content:
        "Over 7000+ hours logged, extensive experience in delivering exceptional web development projects drive results.",
      highlight: "extensive experience",
    },
    {
      id: 2,
      icon: CheckCircle,
      title: "70+ Projects Completed",
      content:
        "Successfully completed over 70+ web development projects, proven track record of building innovative websites.",
      highlight: "completed over 35 web",
    },
    {
      id: 3,
      icon: Star,
      title: "Rated 5 Stars by Clients",
      content:
        "Rated 5 stars for exceeding expectations with high quality web development services.",
      highlight: "exceeding expectations",
    },
  ];

  const upworkFinancialActivityList = [
    {
      id: 1,
      title: "Hourly rate",
      content: "$10.00 - $30.00",
    },

    {
      id: 2,
      title: "Total earned",
      content: "$200K+",
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "Total hours completed on Upwork",
      content: "10,000+",
    },
    {
      id: 4,
      title: "Total jobs on Upwork",
      content: "70+",
    },
    {
      id: 5,
      title: "Upwork Member since",
      content: "Jan 31, 2022",
    },
  ];

  const skills = [
    { name: "React", icon: "⚛️", color: "bg-teal-600" },
    { name: "Next.js", icon: "▲", color: "bg-emerald-600" },
    { name: "Node.js", icon: "🟢", color: "bg-green-600" },
    { name: "PostgreSQL", icon: "🐘", color: "bg-lime-600" },
    { name: "AWS", icon: "☁️", color: "bg-cyan-600" },
    { name: "Express.js", icon: "🚂", color: "bg-teal-700" },
    { name: "TypeScript", icon: "TS", color: "bg-blue-600" },
    { name: "Git", icon: "🌿", color: "bg-green-700" },
    { name: "Docker", icon: "🐳", color: "bg-sky-700" },
  ];

  // console.log("URLInfo: ",urlInfo)
  return (
    <section
      className={`${urlInfo?.domain === "findusman.me" ? "w-full " : "hidden"
        } ${cvTrue ? "py-0 border rounded-2xl" : "py-10"} bg-white `}
    >
      <div className={`${cvTrue ? "p-[2rem] lg:p-[3rem] pt-20 " : "mainContainer lg:mt-20 "}`}>
        {/* Main Grid Layout */}
        <div className="">

          {/* LEFT COLUMN - Profile Card */}
          <div className=" py-8 lg:pr-8 ">
            {/* Profile Header */}

            <UpworkIdentity data={data} cvTrue={cvTrue} />
            <div className="flex justify-center flex-col items-center ">
              <h2
                className={`lg:text-[4rem] text-[3rem]  mt-14 font-medium mb-[1rem] text-center`}
              >
                My{" "}
                <Link
                  href={data?.upwork ?? "#"}
                  target="_blank"
                  className="text-primary"
                >
                  Upwork
                </Link>{" "}
                Activities
              </h2>
              <p className="text-[1.8rem] lg:text-[2.5rem] w-full lg:w-2/3 text-center text-gray-600">Proven performance, consistent delivery, and client satisfaction across long-term projects.</p>
            </div>

            <div className="flex flex-wrap gap-8">
              {upworkActivityList.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className="md:flex-1 flex gap-4 p-10 bg-white rounded-3xl  min-w-[220px] mt-14 shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                  >
                    <div className="">

                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="flex gap-4 ">
                        <div className={`${cvTrue ? "w-16 h-16" : "w-16 h-14  md:w-12 md:h-12  lg:w-20 lg:h-20"} rounded-full bg-primary flex items-center justify-center`}>
                          <IconComponent className=" w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" />
                        </div>
                        <p
                          className={`${cvTrue ? "text-[2.4rem]" : "text-[2.4rem] lg:text-[2.8rem]"} font-semibold w-full lg:w-[200px]`}
                        >
                          {item.title}
                        </p>
                      </div>
                      <p className={`text-heading ${cvTrue ? "text-[1.8rem]" : "text-[1.8rem] lg:text-[2.2rem]"}`}>
                        {item.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* <div className="relative">
                <Image
                  src={data?.profile_photo_1 || "https://via.placeholder.com/80"}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
              </div> */}
            {/* <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[2rem] font-bold text-gray-900">
                    {data?.name || "JOHN DEVELOPER"}
                  </h2>
                  <BlueTick className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-[1.4rem]">{data?.location || "London, UK"}</span>
                </div>
                <div className="flex items-center gap-[0.5rem] my-[1rem]">
                  <div className="rounded-full border-2 border-solid border-blue-500 size-[3rem] flex items-center justify-center">
                    <Crown className="size-[2rem] text-blue-500" />
                  </div>
                  <span className="font-medium text-[1.4rem]">100% Job Success</span>
                </div>

              </div> */}


            {/* CTA Button */}
            {/* <Link
              href={data?.upwork ?? "#"}
              target="_blank"
              className="flex items-center justify-center gap-2 bg-[#0F3C3C] hover:bg-[#0a2929] text-white font-medium py-3 px-6 rounded-full transition-all duration-300 text-[1.6rem]"
            >
              Check My Upwork
              <Image src="/images/up-logo.png" alt="Upwork" width={80} height={24} className="h-6 w-auto" />
              Profile
            </Link> */}

            {/* Financial Activities */}
            {/* <div className="space-y-4">
              <h2
                className={`text-[2.5rem] !my-16 sm:!my-0 ${cvTrue ? "lg:text-[3rem]" : "lg:text-[4rem]"
                  } font-bold mb-[1rem] max-lg:text-center`}
              >
                My{" "}
                <Link
                  href={data?.upwork ?? "#"}
                  target="_blank"
                  className="text-primary"
                >
                  Upwork
                </Link>{" "}
                Finanancial Activities
              </h2>

              <div className="space-y-4">
                {upworkFinancialActivityList.map((item) => (
                  <div key={item.id}>
                    <p className="text-heading text-[1.8rem]">{item.title}</p>
                    <p className="text-[1.8rem] lg:text-[2.4rem] font-semibold">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* RIGHT COLUMN - Activities */}
          <div
          // className="space-y-6"
          >
            {/* Upwork Logo */}
            {/* <div className="flex justify-center  mt-10">
              <Link href={data?.upwork ?? "#"} target="_blank">
                <img src="/images/up-logo.png" alt="Upwork Logo" className="mix-blend-darken " />
              </Link>
            </div> */}

            {/* Activities Heading */}
            {/* <h2
              className={`text-[2.5rem] lg:!mt-[6rem] !my-16  ${cvTrue ? "lg:text-[3rem]" : "lg:text-[4rem]"
                } font-bold mb-[1rem] max-lg:text-center`}
            >
              My{" "}
              <Link
                href={data?.upwork ?? "#"}
                target="_blank"
                className="text-primary"
              >
                Upwork
              </Link>{" "}
              Activities
            </h2> */}

            {/* Activity Items */}
            <div className="space-y-6">
              {/* {upworkActivityList.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[2rem] font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[1.5rem] text-gray-700 leading-relaxed">
                        {item.content.split(item.highlight).map((part, index, array) => (
                          <React.Fragment key={index}>
                            {part}
                            {index < array.length - 1 && (
                              <strong className="font-bold text-gray-900">
                                {item.highlight}
                              </strong>
                            )}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>
                );
              })} */}


              {/* {upworkActivityList.map((item) => {
                const IconComponent = item.icon
                return (
                  <li className="flex" key={item.id}>
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-full bg-[#00473c] flex items-center justify-center mt-2">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <p
                        className="text-[1.6rem] lg:text-[2.4rem] 
                     font-semibold"
                      >
                        {item.title}
                      </p>
                      <p className="text-heading text-[1.4rem] lg:text-[1.5rem]">
                        {item.content}
                      </p>
                    </div>
                  </li>
                )
              })} */}
            </div>


          </div>

        </div>
      </div>
    </section>
  );
}

export default UpworkActivitySection;
