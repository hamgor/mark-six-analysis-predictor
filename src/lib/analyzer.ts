import { Draw } from './data';
export class MarkSixAnalyzer {
  private draws: Draw[];
  constructor(draws: Draw[]) {
    // Newer draws first in our data, so we treat index 0 as most recent
    this.draws = draws;
  }
  /**
   * Calculates frequencies with a 10% compounding weight increase every 5 draws.
   * Latest 5 draws: weight 1.0
   * Next 5 draws: weight 0.9 (or latest is 1.0 * 1.1^X)
   * Calculation: newest batch has highest weight.
   */
  getWeightedFrequencies(): Map<number, number> {
    const frequencyMap = new Map<number, number>();
    // Group into batches of 5 starting from the most recent (index 0)
    this.draws.forEach((draw, index) => {
      const batchIndex = Math.floor(index / 5);
      // Weight decreases as we go back in time (Batch 0 is newest)
      // Compound 10% increase for NEWER batches means 1.1^(-batchIndex)
      const weight = Math.pow(1.1, -batchIndex);
      draw.numbers.forEach(num => {
        const current = frequencyMap.get(num) ?? 0;
        frequencyMap.set(num, current + weight);
      });
    });
    return frequencyMap;
  }
  generatePredictions(count: number = 3): number[][] {
    const weightedMap = this.getWeightedFrequencies();
    const entries = Array.from(weightedMap.entries())
      .sort((a, b) => b[1] - a[1]); // Highest frequency first
    const predictions: number[][] = [];
    for (let i = 0; i < count; i++) {
      // Logic: Pick from top weighted numbers but add small randomization
      // to avoid identical sets while staying in high-probability "Hotspots"
      const set = new Set<number>();
      // We pick 6 numbers from the top 18 weighted hotspots
      const pool = entries.slice(0, 18).map(e => e[0]);
      while (set.size < 6) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        set.add(pool[randomIndex]);
      }
      predictions.push(Array.from(set).sort((a, b) => a - b));
    }
    return predictions;
  }
}