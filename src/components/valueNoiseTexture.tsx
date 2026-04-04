import { useEffect } from "react";
import valueNoise from "../scripts/valueNoise";
import type { CommonTextureAttributes } from "../types";

export default function ValueNoiseTexture({
  size,
  setRgbData,
}: CommonTextureAttributes) {
  useEffect(() => {
    const rgbData = valueNoise(size);
    setRgbData(rgbData);
  }, [size, setRgbData]);

  return null;
}
