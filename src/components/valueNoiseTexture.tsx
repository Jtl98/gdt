import { useEffect } from "react";
import valueNoise from "../scripts/valueNoise";
import type { CommonTextureAttributes } from "../types";

export default function ValueNoiseTexture({
  setImageData,
}: CommonTextureAttributes) {
  useEffect(() => {
    const imageData = valueNoise(256, 256);
    setImageData(imageData);
  }, [setImageData]);

  return null;
}
