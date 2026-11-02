"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import type { ProfileReport } from "@/types/api";

interface CV2ClickableLinkedinGihubLinksProps {
  listOfdata: ProfileReport | null;
  socialLinks: (data: ProfileReport | null) => Array<{
    href?: string;
    alt: string;
    platform: string;
    username: string;
  }>;
}

const CV2ClickableLinkedinGihubLinks: React.FC<CV2ClickableLinkedinGihubLinksProps> = ({
  listOfdata,
  socialLinks,
}) => {
  // 2. Helper function to map platform names to Lucide components
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github size={15}  />;
      case "linkedin":
        return <Linkedin size={15}/>;
      default:
        return null;
    }
  };

  return (
      <div className="w-full flex gap-[2rem]">
        {socialLinks(listOfdata)
          // 3. Filter specifically for Github and LinkedIn
          .filter(({ platform }) => 
            platform.toLowerCase() === "github" || 
            platform.toLowerCase() === "linkedin"
          )
          .map((social, index) =>
            social.href ? (
              <Link
                target="_blank"
                href={social.href}
                key={index}
                className="flex items-center gap-[1rem] cursor-pointer text-[1.4rem] font-medium text-primary"
              >
                <div className="flex items-center gap-[0.5rem]">
                  {getIcon(social.platform)}
                    {social.username}
                </div>
              </Link>
            ) : null
          )}
      </div>
  );
};

export default CV2ClickableLinkedinGihubLinks;