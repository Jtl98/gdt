import seedrandom from "seedrandom";
import { Rgb, RgbData, type Size } from "../types";

export default function (size: Size) {
  const rng = seedrandom();
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
