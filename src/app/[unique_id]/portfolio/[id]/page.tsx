import PortfolioDetails from '@/components/pages/portfolio-detail';
import type { PageProps } from "@/types/page";

const portfolioDetails = ({ params }: PageProps) => {
  return <PortfolioDetails params={params} />;
};

export default portfolioDetails;
