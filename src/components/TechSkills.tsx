import React from "react";
import Image from "next/image";

const TechSkills = () => {
  interface TechStack {
    src: string;
    title: string;
  }
  const skillsSectionDesktop: TechStack[] = [
    { src: "./images/skills/javascript.svg", title: "Javascript" },
    { src: "./images/skills/typescript.svg", title: "TypeScript" },
    { src: "./images/skills/react.svg", title: "React" },
    { src: "./images/skills/next.svg", title: "Next.js" },
    { src: "./images/skills/node.svg", title: "Node.js" },
    { src: "./images/skills/express.svg", title: "Express.js" },
    { src: "./images/skills/nest.svg", title: "Nest.js" },
    { src: "./images/skills/socket.svg", title: "Socket.io" },
    { src: "./images/skills/postgre.svg", title: "PostgreSQL" },
    { src: "./images/skills/mongodb.svg", title: "MongoDB" },
    { src: "./images/skills/sass.svg", title: "Sass/Scss" },
    { src: "./images/skills/tailwind.svg", title: "Tailwindcss" },
    { src: "./images/skills/figma.svg", title: "Figma" },
    { src: "./images/skills/cypress.svg", title: "Cypress" },
    { src: "./images/skills/storybook.svg", title: "Storybook" },
    { src: "./images/skills/git.svg", title: "Git" },
  ];
  return (
    <>
      {skillsSectionDesktop.map((skill, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center gap-[0.8rem] max-w-[10rem] lg:max-w-[13rem] w-full"
        >
          <Image
            src={skill.src}
            alt={skill.title}
            height={64}
            width={64}
            className="h-[6.4rem] w-[6.4rem] "
          />
          <p className="text-paragraph1 text-[1.8rem] leading-[2.8rem]">
            {skill.title}
          </p>
        </div>
      ))}
    </>
  );
};

export default TechSkills;
