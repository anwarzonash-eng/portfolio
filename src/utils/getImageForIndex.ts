// utils/getImageForIndex.ts
import DomainImageMap from "@/data/DomainImageMap.json";

export const getImageForIndex = (domain: string, index: number): string => {
  const images = DomainImageMap[domain] || DomainImageMap["default"];
  return images[index % images.length]; // fallback to default if domain not found
};
