import fs from "node:fs";
import csv from "csv-parser";
import { Sample } from "./types/types";

/**
 * Represents a collection of sample with categorized questionnaire result.
 */
export class Samples {
  id: number[] = [];
  expensive: number[] = [];
  cheap: number[] = [];
  overprice: number[] = [];
  underprice: number[] = [];

  /**
   * Adds a new sample to the collection.
   * @param {Sample} sample - The sample to be added.
   */
  public push(sample: Sample): void {
    this.id.push(sample.id);
    this.expensive.push(sample.expensive);
    this.cheap.push(sample.cheap);
    this.overprice.push(sample.overprice);
    this.underprice.push(sample.underprice);
  }
}

/**
 *
 * Asynchronously reads a CSV file and parses its content into a Samples object.
 *
 * @param {fs.PathLike} path The path to the CSV File.
 * @returns {Promise<Samples>}  A Promise that resolves to a Samples object containing the parsed data.
 */
export const parseSamples = async (path: fs.PathLike): Promise<Samples> => {
  // Create a new Samples object to store the parsed CSV data
  const samples = new Samples();

  // Extract keys from the samples object to map CSV headers
  const fields = Object.keys(samples);

  return new Promise<Samples>((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(
        csv({
          mapHeaders: ({ index }) => fields[index],
          mapValues: ({ value }) => parseInt(value),
        }),
      )
      .on("data", (data) => samples.push(data))
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        resolve(samples);
      });
  });
};
