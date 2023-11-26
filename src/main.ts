import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Args } from "./types/types";
import { parseSamples } from "./samples";

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
    // Log the parsed data
    console.log(samples);
  } catch (error) {
    console.error(error);
  }
};

export default main;
