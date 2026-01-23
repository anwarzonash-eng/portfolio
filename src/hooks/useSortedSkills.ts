import { useMemo } from 'react';

interface SkillFromList {
  id: number;
  order: number | string | null | undefined;  // Allow null/undefined explicitly
}

interface Skill {
  id: number;
  // ... other skill properties
}



interface UseSortedSkillsParams {
  skillsIdsWithOrder: SkillFromList[] | undefined;
  allSkills: Skill[];
}

/**
 * Custom hook to filter and sort skills based on an array of { id, order }
 * Only skills with a valid numeric order are included.
 * Returns skills sorted by ascending order (lowest first)
 */
export const useSortedSkills = ({
  skillsIdsWithOrder,
  allSkills,
}: UseSortedSkillsParams): Skill[] => {
  return useMemo(() => {
    if (
      !skillsIdsWithOrder ||
      skillsIdsWithOrder.length === 0 ||
      allSkills.length === 0
    ) {
      return [];
    }

    // Build map only for items that have a valid id and a valid numeric order
    const orderMap = new Map<number, number>();

    skillsIdsWithOrder.forEach(item => {
      if (
        item.id != null &&                     // valid id
        item.order != null &&                  // order is present
        !isNaN(Number(item.order))             // order can be converted to a real number
      ) {
        orderMap.set(item.id, Number(item.order));
      }
      // If order is missing or invalid → item is ignored completely
    });

    // Filter and sort only the skills that have a valid order in the map
    return allSkills
      .filter(skill => orderMap.has(skill.id))
      .sort((a, b) => {
        const orderA = orderMap.get(a.id) ?? Infinity;
        const orderB = orderMap.get(b.id) ?? Infinity;
        return orderA - orderB;
      });
  }, [skillsIdsWithOrder, allSkills]);
};