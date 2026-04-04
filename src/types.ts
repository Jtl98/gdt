import type { Dispatch, SetStateAction } from "react";

export type Rgb = {
  r: number;
  g: number;
  b: number;
};

export type RgbChannel = keyof Rgb;

export type Size = {
  width: number;
  height: number;
};

export type Dimension = keyof Size;

export type CommonTextureAttributes = {
  size: Size;
  setRgbData: Dispatch<SetStateAction<RgbData>>;
};

export class RgbData extends Array<Rgb> {
  size: Size;

  constructor(size: Size) {
    super(size.width * size.height);
    this.size = size;
  }

  getWithIndex(y: number, x: number) {
    const index = this.calculateIndex(y, x);
    return { index, ...this[index] };
  }

  set(y: number, x: number, rgb: Rgb) {
    this[this.calculateIndex(y, x)] = rgb;
  }

  calculateIndex(y: number, x: number) {
    return y * this.size.width + x;
  }
}
