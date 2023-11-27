import { arrayToLine, findIntersectionBySegment } from "./math";
import { DataFrame } from "./data";

/**
 * Represents a comparison operator.
 */
export type CMP = "<=" | ">=";

/**
 * Represents a Price Sensitivity Measurement result from PSMAnalyzer.
 */
export type PSMResult = {
  highest: number;
  compromise: number;
  ideal: number;
  lowest: number;
};

/**
 * Generates an array of numbers representing a linear space between a minimum and maximum value with a specified increment.
 * @param {number} min - The minimum value of the linear space.
 * @param {number} max - The maximum value of the linear space.
 * @param {number} increment - The increment between consecutive values in the linear space.
 * @returns {number[]} An array of numbers representing the linear space.
 */
const linearSpace = (min: number, max: number, increment: number): number[] => {
  const spaces: number[] = [];
  for (let val = min; val <= max; val += increment) {
    spaces.push(val);
  }
  return spaces;
};

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
 * Price Sensitivity Measurement Analyzer.
 * Analyzes pricing samples and provides highest, ideal, compromise, and lowest Price results.
 */
class PSMAnalyzer {
  analyze(samples: DataFrame): PSMResult {
    const result = new DataFrame();
    const prices = linearSpace(50, 600, 50);

    prices.forEach((price) => {
      const expensive = calcPercent(samples.expensive, "<=", price);
      const cheap = calcPercent(samples.cheap, ">=", price);
      const overprice = calcPercent(samples.overprice, "<=", price);
      const underprice = calcPercent(samples.underprice, ">=", price);

      result.push({ expensive, cheap, overprice, underprice });
    });

    // Converts prices and percentage array to Line
    const expensive = arrayToLine(prices, result.expensive);
    const cheap = arrayToLine(prices, result.cheap);
    const overprice = arrayToLine(prices, result.overprice);
    const underprice = arrayToLine(prices, result.underprice);

    // Calculate the highest, ideal, compromise, and lowest price
    const highest = findIntersectionBySegment(overprice, cheap).x;
    const compromise = findIntersectionBySegment(expensive, cheap).x;
    const ideal = findIntersectionBySegment(overprice, underprice).x;
    const lowest = findIntersectionBySegment(underprice, expensive).x;

    return { highest, compromise, ideal, lowest };
  }
}

export default PSMAnalyzer;
