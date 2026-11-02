import React from "react";

interface CVTimelineDotProps {
  /** Extra classes on the dot circle wrapper (e.g. vertical margins). */
  circleClassName?: string;
  /** Extra classes on the absolute positioner; defaults to the standard offset. */
  positionClassName?: string;
}

/**
 * The white timeline dot repeated down the CV's left rail
 * (extracted verbatim from pages/cv — it appeared six times).
 */
const CVTimelineDot = ({
  circleClassName = "",
  positionClassName = "absolute top-0 left-[-1.3rem] z-[60] block print:hidden",
}: CVTimelineDotProps) => (
  <div className={positionClassName}>
    <div
      className={`w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center ${circleClassName}`}
    >
      <div className="w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full"></div>
    </div>
  </div>
);

export default CVTimelineDot;
