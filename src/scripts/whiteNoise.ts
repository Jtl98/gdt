import { Rgb, RgbData, type Size } from "../types";
import { createRng } from "./noiseUtils";

export default function (seed: string, size: Size) {
  const rng = createRng(seed);
  const rgbData = new RgbData(size);

  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      const noise = rng();
      const rgb = Rgb.fromValue(noise * 255);
      rgbData.set(y, x, rgb);
    }
  }

  return rgbData;
}
