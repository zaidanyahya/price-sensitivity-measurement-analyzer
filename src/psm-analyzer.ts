import { arrayToLine, findIntersectionBySegment } from "./math";
import { Samples } from "./samples";
import { CMP, PSMResult, Data } from "./types/types";

/**
 * Counts the number of elements in the data array that satisfy the given comparison condition.
 * @param data - An array of numbers to be evaluated.
 * @param cmp - The comparison operator ("<=" or ">=").
 * @param threshold - The threshold value for the comparison.
 * @returns The count of elements satisfying the condition.
 */
const countIF = (data: number[], cmp: CMP, threshold: number): number => {
  let count = 0;

  data.forEach((value) => {
    if (cmp === "<=") {
      count = value <= threshold ? count + 1 : count;
    } else {
      count = value >= threshold ? count + 1 : count;
    }
  });

  return count;
};

/**
 * Calculates the percentage of elements in the data array that satisfy the given comparison condition.
 * @param data - An array of numbers to be evaluated.
 * @param cmp - The comparison operator ("<=" or ">=").
 * @param threshold - The threshold value for the comparison.
 * @returns The percentage of elements satisfying the condition.
 */
const calcPercent = (data: number[], cmp: CMP, threshold: number): number => {
  const count = countIF(data, cmp, threshold);
  return (count / data.length) * 100;
};

/**
 * Represents aggregated results for analyzing pricing samples.
 */
class AggregateResults {
  prices: number[];
  expensive: number[] = [];
  cheap: number[] = [];
  overprice: number[] = [];
  underprice: number[] = [];

  /**
   * Initializes an instance of AggregateResults with a range of prices.
   * @param minPrice - The minimum price in the range.
   * @param maxPrice - The maximum price in the range.
   * @param increment - The price increment.
   */
  constructor(minPrice: number, maxPrice: number, increment: number) {
    this.prices = [];
    for (let price = minPrice; price <= maxPrice; price += increment) {
      this.prices.push(price);
    }
  }

  /**
   * Adds a set of result data to the aggregation.
   * @param resultData - The result data to be added.
   */
  push({ expensive, cheap, overprice, underprice }: Data) {
    this.expensive.push(expensive);
    this.cheap.push(cheap);
    this.overprice.push(overprice);
    this.underprice.push(underprice);
  }
}

/**
 * Price Sensitivity Measurement Analyzer.
 * Analyzes pricing samples and provides aggregated results.
 */
class PSMAnalyzer {
  analyze(samples: Samples): PSMResult {
    const result = new AggregateResults(50, 600, 50);

    result.prices.forEach((price) => {
      const expensive = calcPercent(samples.expensive, "<=", price);
      const cheap = calcPercent(samples.cheap, ">=", price);
      const overprice = calcPercent(samples.overprice, "<=", price);
      const underprice = calcPercent(samples.underprice, ">=", price);

      result.push({ expensive, cheap, overprice, underprice });
    });

    const expensive = arrayToLine(result.prices, result.expensive);
    const cheap = arrayToLine(result.prices, result.cheap);
    const overprice = arrayToLine(result.prices, result.overprice);
    const underprice = arrayToLine(result.prices, result.underprice);

    //Find the Highest, Ideal, Compromise, and Lowest Price based from the cumulative data

    const highest = findIntersectionBySegment(overprice, cheap).x;
    const compromise = findIntersectionBySegment(expensive, cheap).x;
    const ideal = findIntersectionBySegment(overprice, underprice).x;
    const lowest = findIntersectionBySegment(underprice, expensive).x;

    return { highest, compromise, ideal, lowest };
  }
}

export default PSMAnalyzer;
