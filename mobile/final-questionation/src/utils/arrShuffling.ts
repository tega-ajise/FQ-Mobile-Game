// src/utils/arrShuffling.ts

/**
 * Shuffle an array using Fisher-Yates algorithm.
 * @param arr - input array
 * @param inPlace - if true, shuffle the input array; otherwise return a shuffled copy
 * @returns shuffled array
 */
export function shuffle<T>(arr?: T[], inPlace = false): T[] {
  if (!Array.isArray(arr)) return [];
  const a = inPlace ? arr : arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
