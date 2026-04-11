import { Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import whiteNoise from "../scripts/whiteNoise";
import type { CommonTextureAttributes } from "../types";

export default function WhiteNoiseTexture({
  size,
  setRgbData,
}: CommonTextureAttributes) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    const rgbData = whiteNoise(seed, size);
    setRgbData(rgbData);
  }, [seed, size, setRgbData]);

  return (
    <Stack>
      <TextField
        label="seed"
        onChange={(e) => {
          setSeed(e.target.value);
        }}
        value={seed}
        variant="outlined"
      />
    </Stack>
  );
}
