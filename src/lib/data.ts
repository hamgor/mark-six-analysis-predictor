export interface Draw {
  id: string;
  numbers: number[];
  date: string;
}
// Provided historical data (Truncated for brevity, but robustly parsed)
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
        numbers: numbers.sort((a, b) => a - b),
      };
    });
}