"use client";
import React, { ReactNode, useState } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                        whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 
                        rounded-md shadow-lg z-50"
        >
          {text}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 
                          bg-gray-900 rotate-45"
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
