import { Draw } from './data';
export interface HotColdStats {
  hot: { number: number; weight: number }[];
  cold: { number: number; weight: number }[];
}
export interface PairStats {
  pair: [number, number];
  count: number;
}
export class MarkSixAnalyzer {
  private draws: Draw[];
  constructor(draws: Draw[]) {
    this.draws = draws;
  }
  getWeightedFrequencies(): Map<number, number> {
    const frequencyMap = new Map<number, number>();
    // Ensure all 49 numbers exist in the map even with weight 0
    for (let i = 1; i <= 49; i++) {
      frequencyMap.set(i, 0);
    }
    this.draws.forEach((draw, index) => {
      const batchIndex = Math.floor(index / 5);
      const weight = Math.pow(1.1, -batchIndex);
      // Weight primary numbers
      draw.numbers.forEach(num => {
        if (num >= 1 && num <= 49) {
          const current = frequencyMap.get(num) ?? 0;
          frequencyMap.set(num, current + weight);
        }
      });
      // Weight special number at 50% impact if present
      if (draw.special !== undefined && draw.special >= 1 && draw.special <= 49) {
        const current = frequencyMap.get(draw.special) ?? 0;
        frequencyMap.set(draw.special, current + (weight * 0.5));
      }
    });
    return frequencyMap;
  }
  getHotColdStats(): HotColdStats {
    const weightedMap = this.getWeightedFrequencies();
    const sorted = Array.from(weightedMap.entries())
      .map(([number, weight]) => ({ number, weight }))
      .sort((a, b) => b.weight - a.weight);
    return {
      hot: sorted.slice(0, 10),
      cold: sorted.slice(-10).reverse(),
    };
  }
  getFrequentPairs(): PairStats[] {
    const pairCounts = new Map<string, number>();
    // Analyze up to last 40 draws for better significance
    const sampleSize = Math.min(this.draws.length, 40);
    this.draws.slice(0, sampleSize).forEach(draw => {
      const nums = draw.numbers;
      for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
          const pair = [nums[i], nums[j]].sort((a, b) => a - b);
          const key = pair.join(',');
          pairCounts.set(key, (pairCounts.get(key) ?? 0) + 1);
        }
      }
    });
    return Array.from(pairCounts.entries())
      .map(([key, count]) => ({
        pair: key.split(',').map(Number) as [number, number],
        count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }
  getCoverageSet(): number[] {
    const weightedMap = this.getWeightedFrequencies();
    const sorted = Array.from(weightedMap.entries()).sort((a, b) => b[1] - a[1]);
    const totalWeight = sorted.reduce((sum, curr) => sum + curr[1], 0);
    if (totalWeight === 0) return Array.from({ length: 12 }, (_, i) => i + 1);
    let currentWeight = 0;
    const coverage: number[] = [];
    for (const [num, weight] of sorted) {
      coverage.push(num);
      currentWeight += weight;
      if (currentWeight / totalWeight >= 0.75) break;
    }
    return coverage;
  }
  generatePredictions(count: number = 3): number[][] {
    const weightedMap = this.getWeightedFrequencies();
    const entries = Array.from(weightedMap.entries()).sort((a, b) => b[1] - a[1]);
    // Use top 18 weighted numbers as the primary pool for "hotspot" predictions
    let hotspotPool = entries.slice(0, 18).map(e => e[0]);
    // Fallback if pool is empty or invalid
    if (hotspotPool.length < 6) {
      hotspotPool = Array.from({ length: 49 }, (_, i) => i + 1);
    }
    const predictions: number[][] = [];
    for (let i = 0; i < count; i++) {
      const set = new Set<number>();
      let attempts = 0;
      while (set.size < 6 && attempts < 100) {
        const randomIndex = Math.floor(Math.random() * hotspotPool.length);
        set.add(hotspotPool[randomIndex]);
        attempts++;
      }
      // Ultimate fallback for randomness edge cases
      while (set.size < 6) {
        set.add(Math.floor(Math.random() * 49) + 1);
      }
      predictions.push(Array.from(set).sort((a, b) => a - b));
    }
    return predictions;
  }
}