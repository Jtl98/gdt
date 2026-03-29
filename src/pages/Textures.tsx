import { useRef, useState } from "react";
import Canvas from "../components/Canvas";
import SolidTexture from "../components/SolidTexture";
import type { RgbImageData } from "../types";

const imageFilename = "texture.png";

export default function Textures() {
  const [imageData, setImageData] = useState<RgbImageData>([]);
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
      <SolidTexture setImageData={setImageData} />
      <br />
      <Canvas canvasRef={canvasRef} newImageData={imageData} />
      <br />
      <button onClick={download}>download</button>
    </div>
  );
}
