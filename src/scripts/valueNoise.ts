import type { Rgb, RgbImageData } from "../types";

export default function(width: number, height: number) {
  const imageData: RgbImageData = [];

  for (let y = 0; y < height; y++) {
    const row: Rgb[] = [];

    for (let x = 0; x < width; x++) {
      const rgb: Rgb = { r: 0, g: 0, b: 0 };

      row.push(rgb);
    }

    imageData.push(row);
  }

  return imageData;
}
