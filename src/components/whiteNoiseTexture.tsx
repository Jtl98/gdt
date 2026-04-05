import { useEffect } from "react";
import whiteNoise from "../scripts/whiteNoise";
import type { CommonTextureAttributes } from "../types";

export default function WhiteNoiseTexture({
  size,
  setRgbData,
}: CommonTextureAttributes) {
  useEffect(() => {
    const rgbData = whiteNoise(size);
    setRgbData(rgbData);
  }, [size, setRgbData]);

  return null;
}
