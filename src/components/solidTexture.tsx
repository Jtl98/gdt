import { useEffect, useState, type ChangeEvent } from "react";
import type {
  CommonTextureAttributes,
  Rgb,
  RgbChannel,
  RgbImageData,
} from "../types";
import "./solidTexture.css";

export default function SolidTexture({
  setImageData,
}: CommonTextureAttributes) {
  const [rgb, setRgb] = useState<Rgb>({ r: 255, g: 255, b: 255 });

  useEffect(() => {
    const width = 256;
    const height = 256;
    const imageData: RgbImageData = [];

    for (let y = 0; y < height; y++) {
      const row: Rgb[] = [];

      for (let x = 0; x < width; x++) {
        row.push(rgb);
      }

      imageData.push(row);
    }

    setImageData(imageData);
  }, [rgb, setImageData]);

  function onChangeRgb(channel: RgbChannel) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      if (Number.isInteger(value) && value >= 0 && value <= 255)
        setRgb({ ...rgb, [channel]: value });
    };
  }

  return (
    <div className="rgb">
      <input
        onChange={onChangeRgb("r")}
        max={255}
        min={0}
        type="number"
        value={rgb.r}
      />
      <input
        onChange={onChangeRgb("g")}
        max={255}
        min={0}
        type="number"
        value={rgb.g}
      />
      <input
        onChange={onChangeRgb("b")}
        max={255}
        min={0}
        type="number"
        value={rgb.b}
      />
    </div>
  );
}
