import { useRef, useState } from "react";
import Canvas from "../components/canvas";
import SolidTexture from "../components/solidTexture";
import ValueNoiseTexture from "../components/valueNoiseTexture";
import type { RgbImageData } from "../types";
import "./textures.css";

const imageFilename = "texture.png";

export default function Textures() {
  const [textureType, setTextureType] = useState<TextureType>("solid");
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

  function renderTextureType() {
    switch (textureType) {
      case "solid":
        return <SolidTexture setImageData={setImageData} />;
      case "valueNoise":
        return <ValueNoiseTexture />;
    }
  }

  return (
    <div className="textures-container">
      <div className="textures-left">
        <select
          value={textureType}
          onChange={(e) => {
            setTextureType(e.target.value as TextureType);
          }}
        >
          <option value="solid">solid</option>
          <option value="valueNoise">value noise</option>
        </select>

        {renderTextureType()}

        <button onClick={download}>download</button>
      </div>
      <div className="textures-right">
        <Canvas canvasRef={canvasRef} newImageData={imageData} />
      </div>
    </div>
  );
}

type TextureType = "solid" | "valueNoise";
