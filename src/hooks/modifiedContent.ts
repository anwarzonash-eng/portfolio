export function modifiedContent(content, skillsList, _listOfdata) {

  const modifiedContentInner = content
    ?.replace(/<h1>/g, `<h1 style="color:var(--primary-color)">`)
    ?.replace(/<h2>/g, `<h2 style="color:var(--primary-color)">`)
    ?.replace(/<h3>/g, `<h3 style="color:var(--primary-color)">`)
    ?.replace(/<h4>/g, `<h4 style="color:var(--primary-color)">`)
    ?.replace(/<strong>/g, `<strong style="color:var(--primary-color)">`)
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
        modifiedText = `<span class="modifiedText">${cleanedMatch}</span>`;
      }
      if (match.startsWith(" ") || match.endsWith(" ")) {
        modifiedText = ` ${modifiedText} `;
      }

      return modifiedText;
    });

  return modifiedContentInner;
}
