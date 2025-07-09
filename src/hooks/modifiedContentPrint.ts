import { getColors } from "./colors";

export function modifiedContentPrint(
  content,
  skillsList,
  listOfdata,
  maxItems
) {
  const colors = getColors(listOfdata);

  let modifiedContentInner = content
    ?.replace(/<h1>/g, `<h1 style="color:${colors.primary}">`)
    ?.replace(/<h2>/g, `<h2 style="color:${colors.primary}">`)
    ?.replace(/<h3>/g, `<h3 style="color:${colors.primary}">`)
    ?.replace(/<h4>/g, `<h4 style="color:${colors.primary}">`)
    ?.replace(/<strong >/g, `<strong style="color:${colors.primary}">`)
    ?.replace(/<strong>/g, `<strong style="color:${colors.primary}">`)
    ?.replace(/<u>(.*?)<\/u>/g, (_, match) => {
      const cleanedMatch = match.trim();

      const matchingSkill = skillsList?.find(
        (skill) => skill.title.toLowerCase() === cleanedMatch.toLowerCase()
      );

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

  // ✅ Limit bullet points if maxItems is provided
  if (maxItems && modifiedContentInner.includes("<li>")) {
    const items = modifiedContentInner.split(/<\/li>/).filter(Boolean);

    const slicedItems = items.slice(0, maxItems).map((item) => item + "</li>");

    // If your list uses <ul> or <ol>, keep the wrapper
    const hasUL = modifiedContentInner.includes("<ul>");
    const hasOL = modifiedContentInner.includes("<ol>");

    if (hasUL) {
      modifiedContentInner = `<ul>${slicedItems.join("")}</ul>`;
    } else if (hasOL) {
      modifiedContentInner = `<ol>${slicedItems.join("")}</ol>`;
    } else {
      // If no <ul>, just join them
      modifiedContentInner = slicedItems.join("");
    }
  }

  return modifiedContentInner;
}
