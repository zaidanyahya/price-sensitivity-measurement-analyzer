import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { parseData } from "./data";
import PSMAnalyzer, { PSMResult } from "./psm-analyzer";

/**
 * Represents an accepted options from command-line arguments.
 */
type Options = {
  csvfile: string;
};

/**
 * Print Price Sensitivity Measurement result from PSM Analyzer to console.
 * @param {PSMResult} result - PSMResult to be printed to console.
 */
const printResult = (result: PSMResult) => {
  const round = (n: number) => Math.round(n);
  const ceil = (n: number) => Math.ceil(n);
  console.log(`最高価格：${ceil(result.highest)}円`);
  console.log(`妥協価格：${round(result.compromise)}円`);
  console.log(`理想価格：${round(result.ideal)}円`);
  console.log(`最低品質保証価格：${round(result.lowest)}円`);
};

/**
 * Main function that reads a CSV file and logs the parsed data.
 * @returns A Promise that resolves once the operation is completed.
 */
const main = async (): Promise<void> => {
  // Parse command-line arguments
  const options = yargs(hideBin(process.argv))
    .usage("Usage: npx ts-node ./psm.ts --csvfile filename")
    .alias("v", "version")
    .alias("h", "help")
    .option("csvfile", {
      alias: "c",
      describe: "CSV Filename",
      demandOption: true,
    }).argv as Options;

  // Construct the path to the CSV file
  const csvFilePath = `${options.csvfile}.csv`;

  try {
    // Read and parse the CSV file
    const samples = await parseData(csvFilePath);

    // Analyze the parsed data
    const psm = new PSMAnalyzer();
    const result = psm.analyze(samples);

    // Print PSM Result
    printResult(result);
  } catch (error) {
    console.error(error);
  }
};

export default main;
