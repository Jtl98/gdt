import { useEffect, useState, type ChangeEvent } from "react";
import {
  RgbData,
  type CommonTextureAttributes,
  type Rgb,
  type RgbChannel,
} from "../types";
import "./solidTexture.css";

export default function SolidTexture({
  size,
  setRgbData,
}: CommonTextureAttributes) {
  const [rgb, setRgb] = useState<Rgb>({ r: 255, g: 255, b: 255 });

  useEffect(() => {
    const rgbData = new RgbData(size);

    for (let y = 0; y < size.height; y++) {
      for (let x = 0; x < size.width; x++) {
        rgbData.set(y, x, rgb);
      }
    }

    setRgbData(rgbData);
  }, [rgb, size, setRgbData]);

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
