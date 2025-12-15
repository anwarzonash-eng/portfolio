export const sortSkillsByOrder = (skills = []) => {
  if (!Array.isArray(skills)) return [];

  return [...skills].sort((a, b) => {
    const aParts = a.order?.split(".").map(Number) || [];
    const bParts = b.order?.split(".").map(Number) || [];

    const maxLength = Math.max(aParts.length, bParts.length);

    for (let i = 0; i < maxLength; i++) {
      const aVal = aParts[i] ?? 0;
      const bVal = bParts[i] ?? 0;

      if (aVal !== bVal) {
        return aVal - bVal;
      }
    }

    return 0;
  });
};
