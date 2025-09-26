// useUniquePortfolios.ts

import { useMemo } from "react";

// Define the expected structure of a portfolio object
// Adjust this interface to match your actual object structure if needed
interface Portfolio {
  id: string | number;
  [key: string]: any; // Allows for any other properties on the object
}

/**
 * Custom hook to filter an array of portfolio objects, returning only those
 * with unique 'id' values (keeps the first occurrence).
 *
 * @param portfoliosIds The array of portfolio objects, potentially with duplicates.
 * @returns An array containing only portfolios with unique IDs.
 */
export const useUniquePortfolios = (
  portfoliosIds: Portfolio[] | undefined | null
): Portfolio[] => {
  // Use useMemo to re-calculate uniquePortfolios only when portfoliosIds changes
  const uniquePortfolios = useMemo(() => {
    // Safety check for null/undefined input
    if (!portfoliosIds) {
      return [];
    }

    // A Set is required for efficient tracking of IDs that have been "seen"
    const seenIds = new Set<string | number>();

    // Perform the filtering logic
    const uniqueArray = portfoliosIds.filter((portfolio) => {
      if (!portfolio || !portfolio.id) {
        // Skip null/undefined objects or objects without an ID
        return false;
      }

      // Check if the ID is already in the Set
      const isDuplicate = seenIds.has(portfolio.id);

      // Add the current ID to the Set for future checks
      // This ensures we mark the current (first) one as 'seen'
      seenIds.add(portfolio.id);

      // Return true only if it's NOT a duplicate (i.e., the first occurrence)
      return !isDuplicate;
    });

    return uniqueArray;
  }, [portfoliosIds]); // Dependency array: Recalculate only if the input list changes

  return uniquePortfolios;
};
