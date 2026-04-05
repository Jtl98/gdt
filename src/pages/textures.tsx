import { useRef, useState, type ChangeEvent } from "react";
import Canvas from "../components/canvas";
import SolidTexture from "../components/solidTexture";
import WhiteNoiseTexture from "../components/whiteNoiseTexture";
import { RgbData, type Dimension, type Size } from "../types";
import "./textures.css";

const imageFilename = "texture.png";

export default function Textures() {
  const [textureType, setTextureType] = useState<TextureType>("solid");
  const [size, setSize] = useState<Size>({ width: 256, height: 256 });
  const [rgbData, setRgbData] = useState<RgbData>(new RgbData(size));
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
        return <SolidTexture size={size} setRgbData={setRgbData} />;
      case "whiteNoise":
        return <WhiteNoiseTexture size={size} setRgbData={setRgbData} />;
    }
  }

  function onChangeDimension(dimension: Dimension) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      if (Number.isInteger(value) && value >= 1)
        setSize({ ...size, [dimension]: value });
    };
  }

  return (
    <div className="textures-container">
      <div className="textures-config">
        <div className="textures-size">
          <div>
            <label htmlFor="width">width</label>
            <br />
            <input
              id="width"
              onChange={onChangeDimension("width")}
              min={1}
              type="number"
              value={size.width}
            />
          </div>
          <div>
            <label htmlFor="height">height</label>
            <br />
            <input
              id="height"
              onChange={onChangeDimension("height")}
              min={1}
              type="number"
              value={size.height}
            />
          </div>
        </div>

        <div>
          <label htmlFor="type">type</label>
          <br />
          <select
            id="type"
            value={textureType}
            onChange={(e) => {
              setTextureType(e.target.value as TextureType);
            }}
          >
            <option value="solid">solid</option>
            <option value="whiteNoise">white noise</option>
          </select>
        </div>

        {renderTextureType()}

        <button onClick={download}>download</button>
      </div>

      <div className="textures-canvas">
        <Canvas canvasRef={canvasRef} rgbData={rgbData} />
      </div>
    </div>
  );
}

type TextureType = "solid" | "whiteNoise";
