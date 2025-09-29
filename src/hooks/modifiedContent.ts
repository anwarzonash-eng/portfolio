// Miss Maryam Code For Backup
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

//Arslan Written Code For Merging Adjacent Matches and Preventing Overlaps
import { getColors } from "./colors";

// Regex to detect if a match is inside an HTML tag.
// It looks for a '<' before the start and no '>' between '<' and the start.
const INSIDE_TAG_REGEX = /<[^>]*$/;

export function modifiedContent(content, skillsList, listOfdata) {
  const colors = getColors(listOfdata);

  // 1. Initial HTML header/strong replacements with primary color
  let modifiedContentInner = content
    ?.replace(/<h1>/g, `<h1 style="color:${colors.primary}">`)
    ?.replace(/<h2>/g, `<h2 style="color:${colors.primary}">`)
    ?.replace(/<h3>/g, `<h3 style="color:${colors.primary}">`)
    ?.replace(/<h4>/g, `<h4 style="color:${colors.primary}">`)
    ?.replace(/<strong\s*>/g, `<strong style="color:${colors.primary}">`) // Handles <strong > and <strong>
    ?.replace(/<strong>/g, `<strong style="color:${colors.primary}">`);

  // 2. Collect phrases and sort by length descending (Longest match wins tie-breaker)
  const phraseToSkill = new Map();
  skillsList.forEach((skill) => {
    phraseToSkill.set(skill.title.toLowerCase(), skill);
    (skill.variations || []).forEach((variation) => {
      phraseToSkill.set(variation.toLowerCase(), skill);
    });
  });

  const phrases = Array.from(phraseToSkill.keys()).sort(
    (a, b) => b.length - a.length
  );

  // 3. Find all potential matches with positions
  const allMatches = [];
  phrases.forEach((phrase) => {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "gi");

    let match;
    while ((match = regex.exec(modifiedContentInner)) !== null) {
      allMatches.push({
        start: match.index,
        end: regex.lastIndex,
        phrase: phrase,
        original: match[0],
      });
    }
  });

  // 4. Sort all matches: by start position, then by length descending (longest match at the same position first)
  allMatches.sort((a, b) => {
    if (a.start !== b.start) {
      return a.start - b.start;
    }
    return b.end - a.end;
  });

  // 5. Filter for Non-Overlapping Matches AND Prevent Matching inside HTML tags
  const filteredMatches = [];
  let lastEnd = -1;

  for (const match of allMatches) {
    // Crucial check: Prevent matching inside HTML tags (e.g., inside class="modifiedText")
    // By checking a small slice before the match. If it starts with '<' and hasn't closed with '>',
    // the match is inside a tag, so we skip it. We look back 50 characters for safety.
    const lookBackSlice = modifiedContentInner.slice(
      Math.max(0, match.start - 50),
      match.start
    );
    if (INSIDE_TAG_REGEX.test(lookBackSlice)) {
      continue; // Skip this match, it's inside an HTML tag attribute or content.
    }

    // Standard non-overlapping check: starts after the end of the last accepted match
    if (match.start >= lastEnd) {
      filteredMatches.push(match);
      lastEnd = match.end;
    }
  }

  // 6. Merge adjacent matches of the same skill
  const mergedNonOverlapping = [];
  for (let i = 0; i < filteredMatches.length; i++) {
    let current = filteredMatches[i];

    // Check for adjacent match of the same skill
    if (mergedNonOverlapping.length > 0) {
      const prev = mergedNonOverlapping[mergedNonOverlapping.length - 1];

      // Check for zero or one space between current and previous match
      const between = modifiedContentInner.slice(prev.end, current.start);
      const currentSkill = phraseToSkill.get(current.phrase);
      const prevSkill = phraseToSkill.get(prev.phrase);

      if (currentSkill === prevSkill && (between === "" || between === " ")) {
        // Merge into the previous match
        prev.end = current.end;
        prev.original = modifiedContentInner.slice(prev.start, prev.end);
        continue; // Skip pushing 'current', it's been merged
      }
    }

    // If not merging, push the current match
    mergedNonOverlapping.push(current);
  }

  // 7. Replace from end to start
  mergedNonOverlapping.reverse().forEach(({ start, end, phrase, original }) => {
    const skill = phraseToSkill.get(phrase);
    const url = skill?.url || "";
    let replacement;

    // Apply this flag to prominent the keyword that is being linked
    if (url) {
      // Note: Removed the extra space after 'Integration' which was causing issues
      replacement = `<span class="modifiedText"><a href="${url}" target="_blank">${original}</a></span>`;
    } else {
      replacement = `<span class="modifiedText">${original}</span>`;
    }

    modifiedContentInner =
      modifiedContentInner.slice(0, start) +
      replacement +
      modifiedContentInner.slice(end);
  });

  return modifiedContentInner;
}
