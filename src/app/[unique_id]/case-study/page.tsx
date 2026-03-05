"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Newsletter from "@/components/Newsletter";
import useBodyBackgroundColor from "@/hooks/useBodyBackgroundColor";
import PortfolioPopUp from "@/components/PortfolioPopUp";
import WebsiteLoader from "@/components/WebsiteLoader";
import { useSearchParams } from "next/navigation";
import { getRoutesDetails } from "@/hooks/url";
import { reportsApiHandler } from "@/hooks/apihandlers/reportsApiHandlers";
import { store } from "@/store";
import { setProfileLoading, setProfileUrlInfo } from "@/store/profileSlice";
import OurBlogs from "@/components/OurBlogs";
import { handleSkillsApiCall } from "@/hooks/apihandlers/skillsApiHandlers";
import { skillsGrouping } from "@/hooks/skillsGrouping";
import { SmoothScroll } from "@/hooks/SmoothScroll";
import Background from "@/components/background";
import { useAppSelector } from "@/store";
import EmptyState from "@/components/EmptyState";
import CaseStudyCard from "@/components/CaseStudyCard";
import UpworkActivitySection from "@/components/UpworkActivitySection";
import SkillsContainer from "@/components/SkillsContainer";
import { useSortedSkills } from "@/hooks/useSortedSkills";

const CaseStudyListing = ({ params }: { params: any }) => {
    const [
        selectedPorfolioPicturesforPopup,
        setSelectedPorfolioPicturesforPopup,
    ] = useState(null);
    const [showMoreSkills, setShowMoreSkills] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [urlInfo, setURLInfo] = useState(null);
    const [listOfdata, setListOfData] = useState(null);
    const [listOfskills, setListOfSkills] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const listOfdatas = useAppSelector(
        (state) => state.profile.listOfProfileData
    );
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const hasOpenedFromQueryRef = React.useRef(false);
    // Highlight specific portfolio
    const [highlightedPortfolioId, setHighlightedPortfolioId] = useState<
        string | null
    >(null);

    // Filter skills based on listOfdata.skills_ids
    const [allSkills, setAllSkills] = useState([]);
    const [filteredSkills, setFilteredSkills] = useState([]);

    useEffect(() => {
        if (listOfdata?.skills_ids && allSkills.length > 0) {
            const matchedSkills = allSkills.filter((skill) =>
                listOfdata.skills_ids.some((dataSkill) => dataSkill.id === skill.id)
            );
            setFilteredSkills(matchedSkills);
        }
    }, [listOfdata, allSkills]);

    useEffect(() => {
        handleSkillsApiCall({ setListOfSkills: setAllSkills });
    }, []);

    // useEffect(() => {
    //   setURLInfo(getRoutesDetails(params, searchParams));
    // }, [params, searchParams]);

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
                setError,
                setListOfData,
            });
        }
    }, [urlInfo]);

    // If the URL includes openGallery=true and a sectionId, open the modal
    // for that portfolio once data has loaded.
    useEffect(() => {
        try {
            const openGallery = searchParams.get("openGallery");
            const sectionId = searchParams.get("sectionId");

            if (
                openGallery === "true" &&
                sectionId &&
                listOfdata?.portfolios_ids &&
                !hasOpenedFromQueryRef.current
            ) {
                const found = listOfdata.portfolios_ids.find(
                    (p) => String(p.id) === String(sectionId)
                );
                if (found) {
                    // openModal expects (pictures, thumbnail, child_hero_banner)
                    openModal(found.pictures, found.thumbnail, found.child_hero_banner);
                    hasOpenedFromQueryRef.current = true;
                }
            }
        } catch (e) {
            // ignore parse/open errors
        }
    }, [searchParams, listOfdata]);

    // Handle navigation to specific portfolios or sections
    useEffect(() => {
        const sectionId = searchParams.get("sectionId");
        const portfolioId = searchParams.get("portfolioId");
        const expandParam = searchParams.get("expand");
        const scrollTo = searchParams.get("scrollTo");

        if (portfolioId) {
            setHighlightedPortfolioId(portfolioId); // Highlight the specific portfolio
            setTimeout(() => {
                const portfolioElement = document.getElementById(
                    `portfolio-${portfolioId}`
                );
                if (portfolioElement) {
                    portfolioElement.scrollIntoView({ behavior: "smooth" });
                } else if (sectionId) {
                    SmoothScroll(sectionId);
                }
            }, 100); // Small delay to ensure DOM is rendered
        } else if (sectionId) {
            SmoothScroll(sectionId);
        } else {
            // If expand=true and scrollTo=portfolios is provided, scroll to portfolio section
            if (expandParam === "true" && scrollTo === "portfolios") {
                // Small timeout to allow DOM to render before scrolling
                setTimeout(() => {
                    SmoothScroll("portfolioSection");
                }, 120);
            }
        }
    }, [searchParams, listOfdata]);

    useBodyBackgroundColor("#EFF5FD");

    useEffect(() => {
        handleSkillsApiCall({ setListOfSkills });
    }, []);

    // Function to open the modal
    const openModal = (pictures, thumbnail, child_hero_banner) => {
        const portfolioImages = JSON.parse(pictures);
        const allImages = [thumbnail, child_hero_banner, ...portfolioImages];
        setSelectedPorfolioPicturesforPopup(allImages);

        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedPorfolioPicturesforPopup(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        store.dispatch(setProfileUrlInfo(urlInfo));
    }, [urlInfo]);

    useEffect(() => {
        store.dispatch(setProfileLoading(loading));
    }, [loading]);

    // Features Points Logic Code:

    if (error) {
        return <EmptyState message={error || "Something went wrong."} />;
    }

    console.log("Portfolio Ids: ", listOfdata?.portfolios_ids)
    listOfdata?.portfolios_ids?.forEach((portfolio) => {
        console.log("Portfolio ID:", portfolio.id);
    });


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


    const stats = [
        {
            value: "100+",
            label: "COMPLETED",
            title: "Projects Delivered",
            desc: "Across various industries including FinTech, HealthTech, and E-commerce.",
            color: "#3b82f6",
            ring: "from-blue-500 to-blue-600",
            ringPercent: 75,
        },
        {
            value: "5.0",
            label: "★★★★★",
            title: "Client Rating",
            desc: "Consistent 5-star feedback for code quality, communication, and reliability.",
            color: "#3b82f6",
            ring: "from-blue-400 to-blue-600",
            ringPercent: 100,
        },
        {
            value: "2k+",
            label: "HOURS",
            title: "Hours Worked",
            desc: "Dedicated development time solving complex problems and building features.",
            color: "#3b82f6",
            ring: "from-blue-500 to-cyan-500",
            ringPercent: 75,
        },
    ];
    return (
        <div className=" min-h-screen">
            {/* ===== Hero Banner ===== */}
            <section className="w-full  pt-[10rem] pb-[6rem] relative" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)", backgroundSize: "50px 50px" }}>
                {!loading && <div className="mainContainer">
                    <div className="max-w-[70rem]">

                        <h1 className="text-black text-[5rem] lg:text-[7rem] font-black leading-[1.05] mb-6">
                            Building{" "}
                            <span className="text-primary">Digital</span>{" "}Experiences
                            That Scale.
                        </h1>
                        <p className="text-gray-800 text-[1.8rem] leading-relaxed max-w-[55rem]">
                            {listOfdata?.designation ||
                                "Senior Full-Stack Developer specializing in modern web technologies, scalable architecture, and intuitive user interfaces."}
                        </p>

                    </div>
                </div>}
                {loading && <WebsiteLoader height="h-[10rem]" />}
            </section>

            {isModalOpen && selectedPorfolioPicturesforPopup !== null && (
                <PortfolioPopUp
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    portfolioImages={selectedPorfolioPicturesforPopup}
                />
            )}

            {listOfdata && listOfdata?.portfolios_ids?.length > 0 && (
                <>
                    {/* Portfolio Grid Section */}
                    <div
                        id="portfolioSection"
                        className="mainContainer py-[4rem] w-full"
                    >
                        <p className="text-primary text-[1.4rem] uppercase tracking-widest font-medium  text-center mb-20">
                            My Work
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array.from(
                                new Map(
                                    (listOfdata?.portfolios_ids || []).map((p) => [
                                        String(p?.id),
                                        p,
                                    ]),
                                ).values(),
                            ).map((portfolio: any, index: number) => {
                                const skills: {
                                    [key: string]: {
                                        title: string;
                                        url?: string;
                                        order?: string;
                                    }[];
                                } = skillsGrouping(
                                    showMoreSkills[index]
                                        ? portfolio?.skills
                                        : portfolio?.skills?.slice(0, 15),
                                );
                                return (
                                    <div
                                        id={`portfolio-${portfolio.id}`}
                                        className={`relative ${highlightedPortfolioId === portfolio.id
                                            ? "ring-2 ring-primary rounded-[1rem]"
                                            : ""
                                            }`}
                                        key={String(portfolio?.id) || index}
                                    >
                                        <CaseStudyCard
                                            portfolio={portfolio}
                                            thumbnailSize={"large"}
                                            listOfskills={filteredSkills}
                                            listOfdata={listOfdata}
                                            index={index}
                                            showMoreSkills={showMoreSkills}
                                            setShowMoreSkills={setShowMoreSkills}
                                            openModal={openModal}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>





                    {/* skillSection */}
                    {listOfdata && listOfdata?.skills_ids?.length > 0 && (
                        <div
                            id="skillSection"
                            className="pt-20 mb-0 print:!pt-[4rem] print:my-[0rem] my-[5rem]  print:h-screen print:break-before-page break-before-avoid print:bg-[#a3ddd3] bg-white"
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


                    {/* Marketplace Impact */}
                    <section className="w-full bg-sectionBG  py-10 ">
                        <div className="mainContainer py-10 ">
                            {/* Heading */}
                            <div className="text-center !mb-[6rem] ">
                                <h2 className="text-white text-[3.6rem] lg:text-[4.8rem] font-black leading-tight mb-4">
                                    Marketplace{" "}
                                    Impact
                                </h2>
                                <p className="text-gray-400 text-[1.6rem] max-w-[44rem] mx-auto leading-relaxed">
                                    Proven track record of delivering high-quality solutions for clients worldwide.
                                </p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[4rem] lg:gap-[6rem] mt-20 mb-20">
                                {stats.map((stat, i) => (
                                    <div key={i} className="flex flex-col items-center text-center gap-[2rem]">
                                        {/* Circular ring */}
                                        <div
                                            className="relative flex items-center justify-center rounded-full"
                                            style={{
                                                width: "14rem",
                                                height: "14rem",
                                                background: `conic-gradient(#3b82f6 0% ${stat.ringPercent}%, #1e2a3a ${stat.ringPercent}% 100%)`,
                                                padding: "6px",
                                            }}
                                        >
                                            {/* Inner dark circle */}
                                            <div
                                                className="flex flex-col items-center justify-center rounded-full bg-sectionBG w-full h-full"
                                                style={{ gap: "0.2rem" }}
                                            >
                                                <span className="text-white font-black text-[2.8rem] leading-none">
                                                    {stat.value}
                                                </span>
                                                <span className="text-white text-[1.2rem] font-semibold tracking-wider uppercase">
                                                    {stat.label}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Text below ring */}
                                        <div>
                                            <h3 className="text-white font-bold text-[1.8rem] mb-[0.8rem]">
                                                {stat.title}
                                            </h3>
                                            <p className="text-gray-400 text-[1.4rem] leading-relaxed max-w-[22rem]">
                                                {stat.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Upwork Activity Section - only if data exists */}
                    {listOfdata && listOfdata?.upwork_show_status === "show" && (
                        <UpworkActivitySection
                            urlInfo={urlInfo}
                            cvTrue={false}
                            data={listOfdata}
                        />
                    )}

                    {/* Our Blogs Section - only if domain exists */}
                    {listOfdata?.domain && (
                        <div className="w-full my-[10rem] lg:my-[12rem] print:my-1">
                            <OurBlogs domain={listOfdata?.domain} />
                        </div>
                    )}

                    {/* Newsletter - only if not user profile and data exists */}
                    {!urlInfo?.u && listOfdata && (
                        <div className="w-full mb-[5rem]">
                            <Newsletter listOfdata={listOfdata} />
                        </div>
                    )}
                </>
            )}






        </div>
    );
};

export default CaseStudyListing;
