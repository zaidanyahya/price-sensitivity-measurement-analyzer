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

export type Data = {
  expensive: number;
  cheap: number;
  overprice: number;
  underprice: number;
};

export type Point = {
  x: number;
  y: number;
};

export type Line2P = {
  p1: Point;
  p2: Point;
};

export type Line = Point[];

export type PSMResult = {
  highest: number;
  compromise: number;
  ideal: number;
  lowest: number;
};
