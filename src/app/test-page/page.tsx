import FreeTrialPopup from "@/components/FreeTrialPopup";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen w-full flex items-center jusify-center px-[1rem] py-[6rem] bg-[#333]">
      <div className="w-full flex items-center justify-center">
        <FreeTrialPopup />
      </div>
      {/* <button className="py-[1rem] px-[3rem] text-white text-[3rem] btn-primary">
        Show Popup
      </button> */}
    </div>
  );
};

export default page;
