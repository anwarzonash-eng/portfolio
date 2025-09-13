import React from "react";

interface FacebookProps {
  className?: string;
}

const Facebook: React.FC<FacebookProps> = ({ className }) => {
  return (
    <svg
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="facebook">
        <path
          id="bg"
          d="M0.5 25.5005C0.5 39.3076 11.6929 50.5005 25.5 50.5005C39.3071 50.5005 50.5 39.3076 50.5 25.5005C50.5 11.6934 39.3071 0.500488 25.5 0.500488C11.6929 0.500488 0.5 11.6934 0.5 25.5005Z"
          className="fill-border"
        />
        <path
          id="facebook_2"
          d="M38 25.5005C38 18.6255 32.375 13.0005 25.5 13.0005C18.625 13.0005 13 18.6255 13 25.5005C13 31.7505 17.5312 36.9067 23.4688 37.8442V29.0942H20.3437V25.5005H23.4688V22.688C23.4688 19.563 25.3438 17.8442 28.1563 17.8442C29.5625 17.8442 30.9688 18.1567 30.9688 18.1567V21.2817H29.4062C27.8438 21.2817 27.375 22.2192 27.375 23.1567V25.5005H30.8125L30.1875 29.0942H27.2188V38.0005C33.4688 37.063 38 31.7505 38 25.5005Z"
          className="fill-primary"
        />
      </g>
    </svg>
  );
};

export default Facebook;
