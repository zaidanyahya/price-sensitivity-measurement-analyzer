import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Args, PSMResult } from "./types/types";
import { parseSamples } from "./samples";
import PSMAnalyzer from "./psm-analyzer";

const printResult = ({ highest, compromise, ideal, lowest }: PSMResult) => {
  const round = (n: number) => Math.round(n);
  const ceil = (n: number) => Math.ceil(n);
  console.log(`最高価格：${ceil(highest)}円`);
  console.log(`妥協価格：${round(compromise)}円`);
  console.log(`理想価格：${round(ideal)}円`);
  console.log(`最低品質保証価格：${round(lowest)}円`);
};

/**
 * Main function that reads a CSV file and logs the parsed data.
 * @returns A Promise that resolves once the operation is completed.
 */
const main = async (): Promise<void> => {
  // Parse command-line arguments using yargs
  const argv = yargs(hideBin(process.argv))
    .usage("Usage: npx ts-node ./psm.ts --csvfile filename")
    .alias("v", "version")
    .alias("h", "help")
    .option("csvfile", {
      alias: "c",
      describe: "CSV Filename",
      demandOption: true,
    }).argv as Args;

  // Construct the path to the CSV file
  const csvFilePath = `${argv.csvfile}.csv`;

  try {
    // Read and parse the CSV file
    const samples = await parseSamples(csvFilePath);
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
