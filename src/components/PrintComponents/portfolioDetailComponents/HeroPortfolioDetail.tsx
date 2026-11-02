import Image from "next/image";
import type { Portfolio } from "@/types/api";

interface HeroPortfolioDetailProps {
  portfolioDetails: Portfolio | null;
  formatDate: (date?: string, format?: Intl.DateTimeFormatOptions) => string;
  dateFormatsOptions: Record<string, Intl.DateTimeFormatOptions>;
  Portfoliodetailbg: React.ComponentType;
}

const HeroPortfolioDetail: React.FC<HeroPortfolioDetailProps> = ({
  portfolioDetails,
  formatDate,
  dateFormatsOptions,
  Portfoliodetailbg,
}) => {
  return (
      <div className="w-full min-h-screen overflow-hidden ">
        {/* Background SVG */}
        <Portfoliodetailbg />
        {/* Hero Top Content */}
        <div className="absolute z-20 top-[5rem] left-1/2 -translate-x-1/2  text-white font-medium">
          {/* info */}
          <div className="text-center text-[1.4rem] leading-[2rem]">
            <p className="">
              {formatDate(
                portfolioDetails?.updated_date,
                dateFormatsOptions.dayMonthYear
              )}
            </p>
          </div>
          {/* Heading */}
          <h1 className="text-[5rem] leading-[5rem] mt-[1.6rem] text-center">
            {portfolioDetails?.title}
          </h1>
        </div>
        <div className="relative z-50 top-[18rem] max-w-[1000px] mx-auto w-full min-h-[700px]">
          {/* Blog Detail Pic*/}
          <Image
            src={portfolioDetails?.thumbnail}
            height={2000}
            width={2000}
            loading="eager"
            priority={true}
            alt="Banner"
            className="rounded-[1rem] h-full w-full object-fill border border-solid border-border"
          />
        </div>
      </div>
  );
};

export default HeroPortfolioDetail;
