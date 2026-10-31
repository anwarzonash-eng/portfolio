'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ServicesSection from '@/components/HomePageComponents/ServicesSection';
import { reportsApiHandler } from '@/hooks/apihandlers/reportsApiHandlers';
import { useSearchParams } from 'next/navigation';
import { getRoutesDetails } from '@/hooks/url';
import PageRendering from '@/components/PageRendering';
import SkillsContainer from '@/components/SkillsContainer';
import { useSortedSkills } from '@/hooks/useSortedSkills';
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import NewsLetter from '@/components/HomePageComponents/NewsLetter';


const Services = ({ params }: { params: any }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [urlInfo, setURLInfo] = useState<any | null>(null);
    const [listOfdata, setListOfData] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [allSkills, setAllSkills] = useState<any[]>([]);

    const searchParams = useSearchParams();

    // Use getRoutesDetails
    useEffect(() => {
        // 🛑 Must wrap in an async function and call it 🛑
        const fetchRoutes = async () => {
            setURLInfo(await getRoutesDetails(params, searchParams));
        };
        fetchRoutes();
    }, [params, searchParams]);


    useEffect(() => {
        if (urlInfo) {
            reportsApiHandler({
                urlInfo,
                setLoading,
                setListOfData,
                setError,
            });
        }
    }, [urlInfo]);

    // FIX: derive filtered skills from allSkills — do not overwrite allSkills
    useEffect(() => {
        if (listOfdata && handleSkillsApiCall) {
            // handleSkillsApiCall expects an object with setListOfSkills
            handleSkillsApiCall({ setListOfSkills: setAllSkills });
        }
    }, [listOfdata]);
    console.log("listOfdata in services page", listOfdata);

    // Here im Using Custom Hook in useSortedSkills
    const sortedSkills = useSortedSkills({
        skillsIdsWithOrder: listOfdata?.skills_ids,
        allSkills,
    });


    const servicesSectionHeading =
        listOfdata?.website_purpose === "upwork"
            ? "Expert Development Services"
            : listOfdata?.website_purpose === "startup"
                ? "Full-Cycle Product Solutions"
                : listOfdata?.website_purpose === "contract"
                    ? "Technical Specializations"
                    : "Tech Stack";

    const steps = [
        {
            num: "01",
            title: "Discovery & Strategy",
            desc: "I dive deep into your business goals to architect a solution that drives real value.",
        },
        {
            num: "02",
            title: "Design & Prototyping",
            desc: "Visualizing the end product with high-fidelity designs before writing a single line of code.",
        },
        {
            num: "03",
            title: "Development & Testing",
            desc: "Agile development cycles with rigorous testing to ensure bug-free deployment.",
        },
    ];

    const codeSnippet = `const innovate = async () => {
  try {
    const solution = await buildFuture({
      quality: 'un-compromised',
      stack: 'cutting-edge'
    });

    return solution.deploy();
  } catch (limit) {
    // Limits do not exist
    breakThrough(limit);
  }
};`;
    return (
        <>
            <PageRendering
                props={{
                    list: listOfdata,
                    loading: loading,
                    error,
                    actualPage: (
                        <>

                            < main >

                                {/* hero Section  */}
                                < section className='bg-bannerBG ' >
                                    < div className="flex flex-col items-start justify-center w-full md:min-h-screen mainContainer  bg-bannerBG !lg:p-[12rem] p-[6rem]" >
                                        {/* Badge */}
                                        < div className="inline-flex items-center gap-2 mb-8" >
                                            <span className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[1.3rem] uppercase tracking-widest text-gray-800 dark:text-heading font-medium">
                                                Available for new projects
                                            </span>
                                        </div >

                                        {/* Headline */}
                                        < h1 className="text-[4rem] md:text-[8rem] font-black leading-[1.05] text-black dark:text-heading md:max-w-[80%]" >
                                            Building the{" "}
                                            <span className="text-primary italic">future</span> of
                                            digital interaction.
                                        </h1 >

                                        <p className="mt-6 text-gray-800 dark:text-heading  text-[1.5rem] sm:text-[2rem] md:max-w-[50%] leading-relaxed">
                                            i craft high-performance digital experiences that merge technical
                                            precision with aesthetic excellence.
                                        </p>

                                        <div className="mt-16  space-x-5 ">

                                            <Link

                                                prefetch={true}
                                                className="text-center  rounded-[0.6rem] py-[1.2rem] px-[2.5rem] text-[2.2rem] font-medium  mt-12  text-onPrimary  transition-colors bg-primary hover:bg-surface hover:text-black dark:hover:text-heading hover:border-primary border-1 "
                                                href={"/portfolio"}
                                            >
                                                View my work
                                            </Link>

                                            {!urlInfo?.u && listOfdata?.calendly_link && (
                                                <Link
                                                    prefetch={true}
                                                    className=" text-center  rounded-[0.6rem]  py-[1.2rem] px-[2.5rem] text-[2.2rem] font-medium   bg-surface text-black dark:text-heading hover:bg-primary hover:text-onPrimary hover:border-primary border-1"
                                                    href={"/contact-me"}
                                                >
                                                    Contact Me
                                                </Link>
                                            )}

                                        </div>
                                    </div >
                                </section >


                                {/* Services Section */}
                                {listOfdata &&
                                    listOfdata?.services &&
                                    listOfdata?.services?.length > 0 && (
                                        <ServicesSection
                                            services={listOfdata.services.filter(
                                                (service: any) => service?.type !== "main",
                                            )}
                                        />
                                    )}



                                {/* My Development Process */}
                                <section className=" py-24 lg:py-32 border-t border-white/5 mainContainer">
                                    <div className="container-fluid">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                                            {/* Left */}
                                            <div>
                                                <h2 className="text-3xl text-[2.5rem] text-center md:text-start lg:text-[5rem] font-black text-black dark:text-heading mb-10">
                                                    My Development Process
                                                </h2>
                                                <div className="flex flex-col gap-8">
                                                    {steps.map((step) => (
                                                        <div key={step.num} className="flex gap-5">
                                                            <div className="shrink-0 w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                                                <span className="text-blue-400 text-[1.5rem] font-mono font-bold">{step.num}</span>
                                                            </div>
                                                            <div>
                                                                <h3 className="text-black dark:text-heading text-[2rem] font-bold mb-1">{step.title}</h3>
                                                                <p className="text-gray-500 dark:text-textMuted text-[1.7rem] leading-relaxed">{step.desc}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Right - Code block */}
                                            <div className="rounded-xl overflow-hidden border border-white/10 bg-surface shadow-2xl">
                                                {/* Window chrome */}
                                                <div className="flex items-center gap-2 px-4 py-5 border-b border-white/5 bg-[#f1f0e6] dark:bg-surfaceMuted">
                                                    <span className="w-4 h-4 rounded-full bg-red-500/80" />
                                                    <span className="w-4 h-4 rounded-full bg-yellow-500/80" />
                                                    <span className="w-4 h-4 rounded-full bg-green-500/80" />
                                                </div>
                                                <pre className="p-6 text-[1.5rem] font-mono overflow-x-auto leading-relaxed">
                                                    <code>
                                                        {codeSnippet.split("\n").map((line, i) => (
                                                            <div key={i} className="flex">
                                                                <span className="select-none text-gray-800 dark:text-heading w-8 shrink-0 text-right pr-4 text-[1.5rem] pt-px">
                                                                    {i + 1}
                                                                </span>
                                                                <span
                                                                    className="text-gray-800 dark:text-heading"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: line
                                                                            .replace(/const|await|return|try|catch/g, '<span class="text-blue-400">$&</span>')
                                                                            .replace(/'[^']*'/g, '<span class="text-green-400">$&</span>')
                                                                            .replace(/\/\/.*/g, '<span class="text-gray-800 dark:text-heading">$&</span>')
                                                                            .replace(/async|=>/g, '<span class="text-purple-400">$&</span>'),
                                                                    }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </code>
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                </section>


                                {/* skillSection */}
                                {listOfdata && listOfdata?.skills_ids?.length > 0 && (
                                    <div
                                        id="skillSection"
                                        className="pt-20 mb-0 print:!pt-[4rem] print:my-[0rem] my-[5rem]  print:h-screen print:break-before-page break-before-avoid print:bg-[#a3ddd3] bg-surface"
                                    >
                                        <div className="flex items-center justify-center mt-[2rem] lg:hidden mb-20">
                                            <div id="skills_ids" className="badge capitalize">
                                                {servicesSectionHeading}
                                            </div>
                                        </div>

                                        <div
                                            className="text-center text-heading text-[2.4rem] xl:text-[3rem]
                      font-medium leading-[2.8rem] mt-[2rem] hidden lg:block capitalize mb-[2rem] lg:mb-[6rem] "
                                        >
                                            {servicesSectionHeading}
                                        </div>

                                        <SkillsContainer
                                            list={sortedSkills}
                                            variant="default"
                                            autoExpandOnParam={true}
                                        />
                                    </div>
                                )}


                                {/* NewsLetter section */}
                                {!urlInfo?.u && <NewsLetter />}

                            </main>
                        </>
                    )
                }}
            />
        </>
    )
};

export default Services