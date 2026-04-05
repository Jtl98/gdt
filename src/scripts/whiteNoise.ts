import { Rgb, RgbData, type Size } from "../types";
import { createRandomFloat } from "./utils/noise";

export default function (size: Size) {
  const rgbData = new RgbData(size);

  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      const noise = createRandomFloat();
      const rgb = Rgb.fromValue(noise * 255);
      rgbData.set(y, x, rgb);
    }
  }

  return rgbData;
}
