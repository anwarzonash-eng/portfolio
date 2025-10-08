
import React from 'react'

function UpworkActivitySectionPrint({urlInfo}) {

    const activityList = [
        {
            id:1,
            title: "Hourly rate",
            content: "$10.00 - $30.00"
        },
        {
            id:2,
            title: "Minimum project size",
            content: "None"
        },
        {
            id:3,
            title: "Total earned",
            content: "$100K+"
        },
        {
            id:4,
            title: "Total hours completed",
            content: "5,000+"
        },
        {
            id:5,
            title: "Total jobs",
            content: "70+"
        },
        {
            id:6,
            title: "Member since",
            content: "Jan 31, 2022"
        },
    ]

    const proudList = [
        {
            id:1,
            title: "5000+ Hour Tracked for clients",
            content: "With over 2500 hours logged, we bring extensive experience in delivering exceptional web development projects that drive results."
        },
        {
            id:2,
            title: "70+ Project Completed",
            content: "Having successfully completed over 35 web development projects, we have a proven track record of building innovative and user-focused websites."
        },
        {
            id:3,
            title: "Rated 5 stars by Clients",
            content: "Rated 5 stars by our clients, we pride ourselves on exceeding expectations with high-quality web development services. Your satisfaction drives our commitment to excellence."
        },

    ]

    console.log("URLInfo: ",urlInfo)
  return (

    <div className={`${urlInfo?.domain === "findusman.me" ? "w-full  py-10 px-[4rem]":"hidden"}`}>
          {/* Top Content */}
          <div className="py-2">
            <img src="/images/up-logo.png" className='max-w-[250px] w-full object-fill' alt="Upwork Logo"/>
          </div>
          {/* Bottom Content */}
          <div className="px-4 py-8 grid grid-cols-2 gap-8 w-full">
            {/* Left Column */}
            <div>
              <h2 className="text-[3rem] font-bold mb-[1rem]">Upwork activity</h2>
              <div className="space-y-4">
                 {activityList.map((item) => (
                    <div key={item.id}>
                        <p className="text-heading text-[1.8rem]">{item.title}</p>
                        <p className="text-[2.4rem] font-semibold">{item.content}</p>
                    </div>    
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h2 className="text-[3.5rem] font-bold leading-[110%]">
                Online web development Services on Upwork
              </h2>
              <p className="text-heading text-[1.7rem] my-[2rem]">
                Looking for expert remote web development services? We offer
                reliable, efficient, and tailored solutions on Upwork to meet
                your business needs—no matter your industry.
              </p>
              <ul className="space-y-4">
                {proudList.map((item) => (
                <li className="flex" key={item.id}>
                  <span className="upworkSectionDot"></span>
                  <div>
                    <p className="text-[2.4rem] font-semibold">{item.title}</p>
                    <p className="text-heading text-[1.5rem]">{item.content}</p>
                  </div>
                </li>
                ))}
                
              </ul>
            </div>
          </div>
      </div>
  )
}

export default UpworkActivitySectionPrint