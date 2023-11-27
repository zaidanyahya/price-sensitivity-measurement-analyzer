import fs from "node:fs";
import csv from "csv-parser";

/**
 * Repesets a data from questionnaire result.
 */
export type Data = {
  expensive: number;
  cheap: number;
  overprice: number;
  underprice: number;
};

/**
 * Represents a collection of sample with categorized questionnaire result.
 */
export class DataFrame {
  expensive: number[] = [];
  cheap: number[] = [];
  overprice: number[] = [];
  underprice: number[] = [];

  /**
   * Adds a new sample to the collection.
   * @param {Data} sample - The sample to be added.
   */
  public push(sample: Data): void {
    this.expensive.push(sample.expensive);
    this.cheap.push(sample.cheap);
    this.overprice.push(sample.overprice);
    this.underprice.push(sample.underprice);
  }
}

/**
 *
 * Asynchronously reads a CSV file and parses its content into a DataFrame object.
 *
 * @param {fs.PathLike} path The path to the CSV File.
 * @returns {Promise<DataFrame>}  A Promise that resolves to a DataFrame object containing the parsed data.
 */
export const parseData = async (path: fs.PathLike): Promise<DataFrame> => {
  // Create a new DataFrame object to store the parsed CSV data
  const df = new DataFrame();

  // Extract keys from the samples object to map CSV headers
  const fields = ["id"].concat(Object.keys(df));

  return new Promise<DataFrame>((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(
        csv({
          mapHeaders: ({ index }) => fields[index],
          mapValues: ({ value }) => parseInt(value),
        }),
      )
      .on("data", (data) => {
        const { expensive, cheap, overprice, underprice } = data;
        df.push({ expensive, cheap, overprice, underprice });
      })
      .on("error", (err) => {
        reject(err);
      })
      .on("end", () => {
        resolve(df);
      });
  });
};
