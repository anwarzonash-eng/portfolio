"use client";

import { useSearchParams } from "next/navigation";


type SkillType = {
  title: string;
  url?: string;
  // add other properties if they exist
};
const CV_Portrait = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();


  return (
    <>
      
        <section className="PageLandscape print-section">
          <div >Page 1 content</div>
        </section>

        <section className="PageLandscape print-section">
          <div >Page 2 content</div>
        </section>

        <section className="PageLandscape print-section">
          <div >Page 3 content</div>
        </section>

        <section className="PageLandscape print-section">
          <div >Page 4 content</div>
        </section>
    </>
  );
};
export default CV_Portrait;



// {
//     "__html": "<ul><li>Proficient in designing and integrating <span class=\"modifiedText\">API</span> layers with <span class=\"modifiedText\">REST</span> and <span class=\"modifiedText\"><a href='https://graphql.org/' target='_blank'>GraphQL</a></span>, implementing authentication, <span class=\"modifiedText\">JWT</span>, rate-limiting, caching, and scalable service-oriented architectures.</li><li><p>I’m an experienced <span class=\"modifiedText\"><a href='https://nextjs.org/' target='_blank'>Next</a></span>.js developer skilled in building fast, SEO-friendly, and scalable web applications. I specialize in leveraging  <span class=\"modifiedText\">Babel</span>, I have ensured compatibility of modern  <span class=\"modifiedText\"><a href='https://www.javascript.com/' target='_blank'>JavaScript</a></span> features across different browsers. My skills include configuring transpilation workflows and integrating  <span class=\"modifiedText\">Babel</span> with build tools like <span class=\"modifiedText\">Webpack</span>.</p></li><li><p>I’m an experienced <span class=\"modifiedText\"><a href='https://www.typescriptlang.org/' target='_blank'>TypeScript</a></span> developer skilled in building scalable, maintainable, and type-safe applications. I specialize in leveraging <span class=\"modifiedText\"><a href='https://www.typescriptlang.org/' target='_blank'>TypeScript</a></span>’s strong typing and modern features to improve code reliability and developer productivity.</p></li><li><p>I’m an experienced  <span class=\"modifiedText\"><a href='https://www.w3schools.com/css/' target='_blank'>CSS3</a></span> developer skilled in crafting modern, responsive, and visually appealing user interfaces. I specialize in transforming designs into pixel-perfect layouts with smooth animations and consistent styling across all devices.</p></li><li><p>Proficient in using <span class=\"modifiedText\"><a href='https://about.gitlab.com/' target='_blank'>GitLab</a></span> for version control and <span class=\"modifiedText\">CI/CD</span> pipelines, I have managed repositories, facilitated code reviews, and automated deployment processes. My skills include configuring  <span class=\"modifiedText\"><a href='https://about.gitlab.com/' target='_blank'>GitLab</a></span> runners and optimizing pipeline performance for continuous integration.</p></li></ul>"
// }