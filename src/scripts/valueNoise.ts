import { RgbData, type Rgb, type Size } from "../types";

export default function (size: Size) {
  const rgbData = new RgbData(size);

  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      const rgb: Rgb = { r: 0, g: 0, b: 0 };
      rgbData.set(y, x, rgb);
    }
  }

  return rgbData;
}
