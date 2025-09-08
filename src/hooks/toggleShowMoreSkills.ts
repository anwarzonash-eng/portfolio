export const toggleShowMoreSkills = (
  index: number,
  setShowMoreSkills: React.Dispatch<
    React.SetStateAction<{ [key: number]: boolean }>
  >
) => {
  setShowMoreSkills((prev) => ({
    ...prev,
    [index]: !prev[index], // toggle only this experience
  }));
};
