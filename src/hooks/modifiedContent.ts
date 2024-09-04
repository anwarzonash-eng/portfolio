export function modifiedContent(content, skillsList) {
  const modifiedContentInner = content
    .replace(/<h1>/g, '<h1 style="color:var(--rootColorFore4);">')
    .replace(/<h2>/g, '<h2 style="color:var(--rootColorFore4);">')
    .replace(/<h3>/g, '<h3 style="color:var(--rootColorFore4);">')
    .replace(/<h4>/g, '<h4 style="color:var(--rootColorFore4);">')
    .replace(/<strong >/g, '<strong style="color:var(--rootColorFore4);">')
    .replace(/<strong>/g, '<strong style="color:var(--rootColorFore4);">')
    .replace(/<u>(.*?)<\/u>/g, (_, match) => {
      const cleanedMatch = match.trim();

      const matchingSkill = skillsList?.find(
        (skill) => skill.title.toLowerCase() === cleanedMatch.toLowerCase()
      );

      let modifiedText;

      if (matchingSkill && matchingSkill.url) {
        modifiedText = `<span class="modifiedText"><a href='${matchingSkill.url}' target='_blank' >${cleanedMatch}</a></span>`;
      } else {
        modifiedText = `<span class="modifiedText">${cleanedMatch}</span>`;
      }
      if (match.startsWith(' ') || match.endsWith(' ')) {
        modifiedText = ` ${modifiedText} `;
      }

      return modifiedText;
    });

  return modifiedContentInner;
}
