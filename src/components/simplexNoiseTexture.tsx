import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import simplexNoise from "../scripts/simplexNoise";
import type { CommonTextureAttributes } from "../types";

export default function SimplexNoiseTexture({
  size,
  setRgbData,
}: CommonTextureAttributes) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    const rgbData = simplexNoise(seed, size);
    setRgbData(rgbData);
  }, [seed, size, setRgbData]);

  return (
    <TextField
      label="seed"
      onChange={(e) => {
        setSeed(e.target.value);
      }}
      value={seed}
      variant="outlined"
    />
  );
}
