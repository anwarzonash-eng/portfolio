export const toggleShowMoreSkills = (index, setShowMoreSkills) => {
  setShowMoreSkills((prev) => {
    const newShowMoreSkills = [...prev];
    newShowMoreSkills[index] = !newShowMoreSkills[index];
    return newShowMoreSkills;
  });
};
