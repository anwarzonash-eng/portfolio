import { getColors } from "./colors";

export function modifiedContent(content, skillsList, listOfdata) {
  const colors = getColors(listOfdata);

  // console.log("Content:", content);
  // console.log("Skills List:", skillsList);
  // console.log("List of Data:", listOfdata);

  const modifiedContentInner = content
    ?.replace(/<h1>/g, `<h1 style="color:${colors.primary}">`)
    ?.replace(/<h2>/g, `<h2 style="color:${colors.primary}">`)
    ?.replace(/<h3>/g, `<h3 style="color:${colors.primary}">`)
    ?.replace(/<h4>/g, `<h4 style="color:${colors.primary}">`)
    ?.replace(/<strong>/g, `<strong style="color:${colors.primary}">`)
    ?.replace(/<u>(.*?)<\/u>/g, (_, match) => {
      const cleanedMatch = match.trim();

      // 🔥 NEW: Check TITLE + ALL VARIATIONS
      const matchingSkill = skillsList?.find((skill) => {
        const lowerMatch = cleanedMatch.toLowerCase();
        // Check TITLE
        if (skill.title.toLowerCase() === lowerMatch) return true;
        // Check ALL VARIATIONS
        if (skill.variation && skill.variation.some(v => v.toLowerCase() === lowerMatch)) {
          return true;
        }
        return false;
      });

      let modifiedText;

      if (matchingSkill && matchingSkill.url) {
        modifiedText = `<span class="modifiedText"><a href='${matchingSkill.url}' target='_blank'>${cleanedMatch}</a></span>`;
      } else {
        modifiedText = `<span class="modifiedText"><a href='${"#"}' target='_blank'>${cleanedMatch}</a></span>`;
      }
      if (match.startsWith(" ") || match.endsWith(" ")) {
        modifiedText = ` ${modifiedText} `;
      }

      return modifiedText;
    });

  return modifiedContentInner;
}