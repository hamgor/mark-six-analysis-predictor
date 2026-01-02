export interface Draw {
  id: string;
  numbers: number[];
  special?: number;
  date: string;
}
export const STORAGE_KEY = 'retrosix_user_draws';
export const RAW_DATA = `
2024-05-10: 1, 12, 23, 34, 45, 49
2024-05-08: 5, 15, 25, 35, 40, 42
2024-05-05: 2, 8, 16, 24, 33, 48
2024-05-01: 7, 14, 21, 28, 35, 42
2024-04-28: 10, 20, 30, 40, 41, 44
2024-04-25: 3, 9, 18, 27, 36, 45
2024-04-22: 6, 12, 18, 24, 30, 36
2024-04-18: 11, 22, 33, 44, 45, 46
2024-04-15: 4, 13, 22, 31, 40, 49
2024-04-12: 1, 2, 3, 4, 5, 6
2024-04-09: 44, 45, 46, 47, 48, 49
2024-04-05: 15, 16, 17, 18, 19, 20
2024-04-01: 21, 22, 23, 24, 25, 26
2024-03-28: 31, 32, 33, 34, 35, 36
2024-03-25: 7, 17, 27, 37, 47, 48
2024-03-21: 2, 12, 22, 32, 42, 49
2024-03-18: 5, 10, 15, 20, 25, 30
2024-03-14: 8, 16, 24, 32, 40, 48
2024-03-11: 3, 13, 23, 33, 43, 44
2024-03-07: 6, 12, 18, 24, 30, 36
2024-03-04: 1, 11, 21, 31, 41, 47
2024-02-29: 9, 19, 29, 39, 41, 45
2024-02-26: 4, 14, 24, 34, 44, 48
2024-02-22: 7, 17, 27, 37, 47, 49
2024-02-19: 10, 20, 30, 40, 45, 46
2024-02-15: 12, 22, 32, 42, 44, 46
2024-02-12: 15, 25, 35, 45, 47, 48
2024-02-08: 2, 4, 6, 8, 10, 12
2024-02-05: 31, 33, 35, 37, 39, 41
2024-02-01: 18, 19, 20, 21, 22, 23
2024-01-29: 5, 15, 25, 35, 45, 49
2024-01-26: 1, 3, 5, 7, 9, 11
2024-01-22: 40, 42, 44, 46, 48, 49
2024-01-18: 14, 24, 34, 44, 45, 46
2024-01-15: 11, 12, 13, 21, 22, 23
`;
export function parseData(raw: string): Draw[] {
  return raw
    .trim()
    .split('\n')
    .filter(line => line.includes(':'))
    .map((line, index) => {
      const [datePart, numsPart] = line.split(':');
      const numbers = numsPart
        .split(/[,\s]+/)
        .map(n => parseInt(n.trim(), 10))
        .filter(n => !isNaN(n));
      return {
        id: `draw-${index}`,
        date: datePart.trim(),
        numbers: numbers.slice(0, 6).sort((a, b) => a - b),
        special: numbers[6] || undefined,
      };
    });
}
// Memoized archival data to prevent expensive re-parsing
const ARCHIVAL_DRAW_CACHE: Draw[] = parseData(RAW_DATA);
export function getCustomDraws(): Draw[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse custom draws', e);
    return [];
  }
}
export function saveCustomDraw(draw: Draw) {
  const current = getCustomDraws();
  const updated = [draw, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
export function clearCustomDraws() {
  localStorage.removeItem(STORAGE_KEY);
}
export function getCombinedDraws(): Draw[] {
  const custom = getCustomDraws();
  // Using cached archival data
  return [...custom, ...ARCHIVAL_DRAW_CACHE];
}