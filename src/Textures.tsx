import { useMemo, useRef } from "react";
import Canvas from "./Canvas";
import type { Rgb } from "./types";

const imageFilename = "texture.png";

export default function Textures() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function download() {
    const image = canvasRef.current?.toDataURL("image/png");
    if (!image) return;

    const link = document.createElement("a");
    link.href = image;
    link.download = imageFilename;
    link.click();
  }

  return (
    <div>
      <Canvas
        canvasRef={canvasRef}
        newImageData={useMemo(() => createWhiteImageData(), [])}
      />
      <br />
      <button onClick={download}>download</button>
    </div>
  );
}

function createWhiteImageData() {
  const width = 256;
  const height = 256;
  const imageData: Rgb[][] = [];

  for (let y = 0; y < height; y++) {
    const row: Rgb[] = [];

    for (let x = 0; x < width; x++) {
      row.push({ r: 255, g: 255, b: 255 });
    }

    imageData.push(row);
  }

  return imageData;
}
