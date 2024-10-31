export const skillsGrouping = (module) => {
  const sortedSkills = module
    ?.map((skill) => ({
      ...skill,
      mainOrder: parseInt(skill?.order?.split('.')[0]),
    }))
    .sort((a, b) => {
      if (a.mainOrder !== b.mainOrder) {
        return a.mainOrder - b.mainOrder;
      }
      return a.order.localeCompare(b.order);
    });

  const groupedSkills = sortedSkills?.reduce((acc, skill) => {
    if (!acc[skill?.mainOrder]) {
      acc[skill?.mainOrder] = [];
    }
    acc[skill?.mainOrder]?.push(skill);
    return acc;
  }, {});
  return groupedSkills;
};
