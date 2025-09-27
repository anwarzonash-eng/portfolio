// import { getColors } from "./colors";

// export function modifiedContent(content, skillsList, listOfdata) {
//   const colors = getColors(listOfdata);

//   console.log("Content:", content);
//   console.log(
//     "Skills List:",
//     skillsList.map(
//       (skill) => skill.id === "db27f296-8748-4305-8797-fcb5df9810e7"
//     )
//   );
//   console.log("List of Data:", listOfdata);

//   const modifiedContentInner = content
//     ?.replace(/<h1>/g, `<h1 style="color:${colors.primary}">`)
//     ?.replace(/<h2>/g, `<h2 style="color:${colors.primary}">`)
//     ?.replace(/<h3>/g, `<h3 style="color:${colors.primary}">`)
//     ?.replace(/<h4>/g, `<h4 style="color:${colors.primary}">`)
//     ?.replace(/<strong >/g, `<strong style="color:${colors.primary}">`)
//     ?.replace(/<strong>/g, `<strong style="color:${colors.primary}">`)
//     ?.replace(/<u>(.*?)<\/u>/g, (_, match) => {
//       const cleanedMatch = match.trim();

//       const matchingSkill = skillsList?.find(
//         (skill) => skill.title.toLowerCase() === cleanedMatch.toLowerCase()
//       );

//       let modifiedText;

//       if (matchingSkill && matchingSkill.url) {
//         modifiedText = `<span class="modifiedText"><a href='${matchingSkill.url}' target='_blank' >${cleanedMatch}</a></span>`;
//       } else {
//         modifiedText = `<span class="modifiedText">${cleanedMatch}</span>`;
//       }
//       if (match.startsWith(" ") || match.endsWith(" ")) {
//         modifiedText = ` ${modifiedText} `;
//       }

//       return modifiedText;
//     });

//   return modifiedContentInner;
// }

// import { getColors } from "./colors";

// export function modifiedContent(content, skillsList, listOfdata) {
//   const colors = getColors(listOfdata);

//   console.log("Skills List:", skillsList);

//   let modifiedContentInner = content
//     ?.replace(/<h1>/g, `<h1 style="color:${colors.primary}">`)
//     ?.replace(/<h2>/g, `<h2 style="color:${colors.primary}">`)
//     ?.replace(/<h3>/g, `<h3 style="color:${colors.primary}">`)
//     ?.replace(/<h4>/g, `<h4 style="color:${colors.primary}">`)
//     ?.replace(/<strong >/g, `<strong style="color:${colors.primary}">`)
//     ?.replace(/<strong>/g, `<strong style="color:${colors.primary}">`);

//   // Collect all phrases with their skills
//   const phraseToSkill = new Map();
//   skillsList.forEach((skill) => {
//     phraseToSkill.set(skill.title.toLowerCase(), skill);
//     (skill.variations || []).forEach((var_) => {
//       phraseToSkill.set(var_.toLowerCase(), skill);
//     });
//   });

//   // Get all unique phrases, sort by length descending
//   const phrases = Array.from(phraseToSkill.keys()).sort(
//     (a, b) => b.length - a.length
//   );

//   // Find all matches with positions
//   const matches = [];
//   phrases.forEach((phrase) => {
//     const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//     const regex = new RegExp(`\\b${escaped}\\b`, "gi");
//     let match;
//     while ((match = regex.exec(modifiedContentInner)) !== null) {
//       matches.push({
//         start: match.index,
//         end: regex.lastIndex,
//         phrase: phrase,
//         original: match[0],
//       });
//     }
//   });

//   // Sort matches by start position
//   matches.sort((a, b) => a.start - b.start);

//   // Resolve overlapping: greedy longest match
//   const nonOverlapping = [];
//   let lastEnd = -1;
//   matches.forEach((match) => {
//     if (match.start >= lastEnd) {
//       nonOverlapping.push(match);
//       lastEnd = match.end;
//     }
//   });

//   // Replace from end to start
//   nonOverlapping.reverse().forEach(({ start, end, phrase, original }) => {
//     const skill = phraseToSkill.get(phrase);
//     const url = skill?.url || "";
//     let replacement;
//     if (url) {
//       replacement = `<span class="modifiedText"><a href="${url}" target="_blank">${original}</a></span>`;
//     } else {
//       replacement = `<span class="modifiedText">${original}</span>`;
//     }
//     modifiedContentInner =
//       modifiedContentInner.slice(0, start) +
//       replacement +
//       modifiedContentInner.slice(end);
//   });

//   return modifiedContentInner;
// }

import { getColors } from "./colors";

export function modifiedContent(content, skillsList, listOfdata) {
  const colors = getColors(listOfdata);

  console.log("Skills List:", skillsList);

  let modifiedContentInner = content
    ?.replace(/<h1>/g, `<h1 style="color:${colors.primary}">`)
    ?.replace(/<h2>/g, `<h2 style="color:${colors.primary}">`)
    ?.replace(/<h3>/g, `<h3 style="color:${colors.primary}">`)
    ?.replace(/<h4>/g, `<h4 style="color:${colors.primary}">`)
    ?.replace(/<strong >/g, `<strong style="color:${colors.primary}">`)
    ?.replace(/<strong>/g, `<strong style="color:${colors.primary}">`);

  // Collect all phrases with their skills
  const phraseToSkill = new Map();
  skillsList.forEach((skill) => {
    phraseToSkill.set(skill.title.toLowerCase(), skill);
    (skill.variations || []).forEach((var_) => {
      phraseToSkill.set(var_.toLowerCase(), skill);
    });
  });

  // Get all unique phrases, sort by length descending
  const phrases = Array.from(phraseToSkill.keys()).sort(
    (a, b) => b.length - a.length
  );

  // Find all matches with positions
  const matches = [];
  phrases.forEach((phrase) => {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "gi");
    let match;
    while ((match = regex.exec(modifiedContentInner)) !== null) {
      matches.push({
        start: match.index,
        end: regex.lastIndex,
        phrase: phrase,
        original: match[0],
      });
    }
  });

  // Sort matches by start position
  matches.sort((a, b) => a.start - b.start);

  // Resolve overlapping: greedy longest match with merging adjacent same-skill matches
  const nonOverlapping = [];
  let i = 0;
  while (i < matches.length) {
    let current = matches[i];
    i++;
    while (i < matches.length) {
      const next = matches[i];
      const between = modifiedContentInner.slice(current.end, next.start);
      if (between !== "" && between !== " ") break;
      const currentSkill = phraseToSkill.get(current.phrase);
      const nextSkill = phraseToSkill.get(next.phrase);
      if (currentSkill !== nextSkill) break;
      current.end = next.end;
      current.original = modifiedContentInner.slice(current.start, current.end);
      i++;
    }
    nonOverlapping.push(current);
  }

  // Replace from end to start
  nonOverlapping.reverse().forEach(({ start, end, phrase, original }) => {
    const skill = phraseToSkill.get(phrase);
    const url = skill?.url || "";
    let replacement;

    // Apply this flag when we want to prominent the keyword that is being linked
    // if (url) {
    //   replacement = `<span class="modifiedText"><a href="${url}" target="_blank">${original}</a></span>`;
    // } else {
    //   replacement = `<span class="modifiedText">${original}</span>`;
    // }
    replacement = `<span class="modifiedText"><a href="${url}" target="_blank">${original}</a></span>`;
    modifiedContentInner =
      modifiedContentInner.slice(0, start) +
      replacement +
      modifiedContentInner.slice(end);
  });

  return modifiedContentInner;
}
