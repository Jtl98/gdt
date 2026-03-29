import { useEffect } from "react";
import type { Rgb } from "../types";

export default function Canvas({ canvasRef, newImageData }: CanvasAttributes) {
  useEffect(() => {
    const { current } = canvasRef;
    const context = current?.getContext("2d");
    if (!context || newImageData.length === 0) return;

    const width = newImageData[0].length;
    const height = newImageData.length;
    const imageData = context.createImageData(width, height);
    const { data } = imageData;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const { r, g, b } = newImageData[y][x];

        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = 255;
      }
    }

    context.putImageData(imageData, 0, 0);
  }, [canvasRef, newImageData]);

  return (
    <canvas
      ref={canvasRef}
      width={newImageData[0]?.length ?? 0}
      height={newImageData.length}
    ></canvas>
  );
}

type CanvasAttributes = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  newImageData: Rgb[][];
};
