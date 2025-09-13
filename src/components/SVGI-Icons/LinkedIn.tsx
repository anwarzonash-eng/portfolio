import React from "react";

interface LinkedInProps {
  className?: string;
}

const LinkedIn: React.FC<LinkedInProps> = ({ className }) => {
  return (
    <svg
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="linkedin">
        {/* Background Circle */}
        <path
          id="bg"
          d="M0.5 25.5C0.5 39.3071 11.6929 50.5 25.5 50.5C39.3071 50.5 50.5 39.3071 50.5 25.5C50.5 11.6929 39.3071 0.5 25.5 0.5C11.6929 0.5 0.5 11.6929 0.5 25.5Z"
          className="fill-border"
        />
        {/* LinkedIn Icon */}
        <path
          id="linkedin-icon"
          d="M18.75 20.5H15.5V35.5H18.75V20.5ZM17.125 18.25C18.1875 18.25 19.0625 17.375 19.0625 16.3125C19.0625 15.25 18.1875 14.375 17.125 14.375C16.0625 14.375 15.1875 15.25 15.1875 16.3125C15.1875 17.375 16.0625 18.25 17.125 18.25ZM35.5 35.5H32.25V27.75C32.25 25.5 31.75 23.75 29.25 23.75C26.75 23.75 25.875 25.5 25.875 27.75V35.5H22.625V20.5H25.75V22.5C26.1875 21.5 27.6875 20.25 29.9375 20.25C33.375 20.25 35.5 22.375 35.5 26.5V35.5Z"
          className="fill-primary"
        />
      </g>
    </svg>
  );
};

export default LinkedIn;
