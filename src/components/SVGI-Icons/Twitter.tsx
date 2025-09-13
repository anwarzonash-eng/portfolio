import React from "react";

interface TwitterProps {
  className?: string;
}

const Twitter: React.FC<TwitterProps> = ({ className }) => {
  return (
    <svg
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="x">
        <path
          id="bg"
          d="M0.25 25.5005C0.25 39.3076 11.4429 50.5005 25.25 50.5005C39.0571 50.5005 50.25 39.3076 50.25 25.5005C50.25 11.6934 39.0571 0.500488 25.25 0.500488C11.4429 0.500488 0.25 11.6934 0.25 25.5005Z"
          className="fill-border"
        />
        <path
          id="Vector"
          d="M27.6284 23.5863L36.9352 13.0005H34.7298L26.6487 22.192L20.1943 13.0005H12.75L22.5103 26.8997L12.75 38.0005H14.9555L23.4894 28.294L30.3057 38.0005H37.75L27.6279 23.5863H27.6284ZM24.6076 27.0221L23.6187 25.6381L15.7502 14.6251H19.1378L25.4878 23.5129L26.4767 24.897L34.7308 36.4498H31.3433L24.6076 27.0226V27.0221Z"
          className="fill-primary"
        />
      </g>
    </svg>
  );
};

export default Twitter;
