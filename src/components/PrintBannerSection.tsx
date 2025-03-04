import React from "react";
import { useAppSelector } from "@/store";

const PrintBannerSection = () => {
  const listOfdatas = useAppSelector(
    (state) => state.profile.listOfProfileData
  );
  return (
    <div className=" items-start justify-strat gap-[4rem] print:flex hidden  w-full  ">
      <img
        src={listOfdatas?.profile_photo_1}
        alt=""
        className="w-[145px] h-[143px] rounded-full"
      />
      <div className="flex items-start justify-start flex-col">
        <h2 className="text-[5rem] font-bold"> {listOfdatas?.name}</h2>
        <div className="text-[3rem] font-medium flex items-center justify-center flex-wrap gap-[3px]">
          {" "}
          {listOfdatas?.designation?.split("|").map((item, index) => (
            <div key={index} className="text-center">
              {item.trim()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrintBannerSection;
