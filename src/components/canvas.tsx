import { useEffect, type RefObject } from "react";
import type { RgbData } from "../types";

export default function Canvas({ canvasRef, rgbData }: CanvasAttributes) {
  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context || rgbData.length === 0) return;

    const { width, height } = rgbData.size;
    const imageData = context.createImageData(width, height);
    const { data } = imageData;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const { r, g, b, index } = rgbData.getWithIndex(y, x);

        const flatIndex = index * 4;
        data[flatIndex] = r;
        data[flatIndex + 1] = g;
        data[flatIndex + 2] = b;
        data[flatIndex + 3] = 255;
      }
    }

    context.putImageData(imageData, 0, 0);
  }, [canvasRef, rgbData]);

  return (
    <canvas
      ref={canvasRef}
      width={rgbData.size.width}
      height={rgbData.size.height}
    ></canvas>
  );
}

type CanvasAttributes = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  rgbData: RgbData;
};
