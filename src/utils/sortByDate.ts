import type { Experience } from "@/types/api";
// utils/dateHelpers.ts
export const sortByDate = (a: Experience, b: Experience) => {
  const yearA = new Date(a.ending_Date).getFullYear();
  const yearB = new Date(b.ending_Date).getFullYear();

  if (yearA !== yearB) {
    return yearB - yearA;
  }

  const monthA = new Date(a.ending_Date).getMonth();
  const monthB = new Date(b.ending_Date).getMonth();

  return monthB - monthA;
};


// Comment