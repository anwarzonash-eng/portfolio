"use client";

import React, { useState } from "react";
import PortfolioPopUp from "@/components/PortfolioPopUp";

const Page: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="my-10 p-4 w-full">
      {/* The PortfolioPopUp component, controlled by the parent */}
      <PortfolioPopUp isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default Page;
