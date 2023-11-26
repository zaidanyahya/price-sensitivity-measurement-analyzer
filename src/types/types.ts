export type Args = {
  csvfile: string;
};

export type Sample = {
  id: number;
  expensive: number;
  cheap: number;
  overprice: number;
  underprice: number;
};

export type CMP = "<=" | ">=";

export type ResultData = {
  expensive: number;
  cheap: number;
  overprice: number;
  underprice: number;
};
