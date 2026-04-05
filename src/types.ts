import type { Dispatch, SetStateAction } from "react";

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

export class Rgb {
  r: number;
  g: number;
  b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static fromValue(value: number) {
    return new Rgb(value, value, value);
  }

  withChannel(channel: RgbChannel, value: number) {
    return new Rgb(
      channel === "r" ? value : this.r,
      channel === "g" ? value : this.g,
      channel === "b" ? value : this.b,
    );
  }
}

export class RgbData extends Array<Rgb> {
  size: Size;

  constructor(size: Size) {
    super(size.width * size.height);
    this.size = size;
  }

  getWithIndex(y: number, x: number) {
    const index = this.calculateIndex(y, x);
    return Object.assign({ index }, this[index]);
  }

  set(y: number, x: number, rgb: Rgb) {
    this[this.calculateIndex(y, x)] = rgb;
  }

  calculateIndex(y: number, x: number) {
    return y * this.size.width + x;
  }
}
