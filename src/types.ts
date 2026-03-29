export type Rgb = {
  r: number;
  g: number;
  b: number;
};

export type RgbChannel = keyof Rgb;

export type RgbImageData = Rgb[][];
