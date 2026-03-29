import { useRef, useState } from "react";
import Canvas from "../components/Canvas";
import SolidTexture from "../components/SolidTexture";
import type { RgbImageData } from "../types";
import "./textures.css";

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
    <div className="textures-container">
      <div className="textures-left">
        <SolidTexture setImageData={setImageData} />
        <button onClick={download}>download</button>
      </div>
      <div className="textures-right">
        <Canvas canvasRef={canvasRef} newImageData={imageData} />
      </div>
    </div>
  );
}
