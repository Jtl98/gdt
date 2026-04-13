import { Stack, TextField } from "@mui/material";
import { useEffect, useState, type ChangeEvent } from "react";
import {
  Rgb,
  RgbData,
  type CommonTextureAttributes,
  type RgbChannel,
} from "../types";

export default function SolidTexture({
  size,
  setRgbData,
}: CommonTextureAttributes) {
  const [rgb, setRgb] = useState<Rgb>(Rgb.fromValue(255));

  useEffect(() => {
    const rgbData = new RgbData(size);

    rgbData.fill(rgb);
    setRgbData(rgbData);
  }, [rgb, size, setRgbData]);

  function onChangeRgb(channel: RgbChannel) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      if (Number.isInteger(value) && value >= 0 && value <= 255)
        setRgb(rgb.withChannel(channel, value));
    };
  }

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        label="red"
        onChange={onChangeRgb("r")}
        value={rgb.r}
        variant="outlined"
      />

      <TextField
        label="green"
        onChange={onChangeRgb("g")}
        value={rgb.g}
        variant="outlined"
      />

      <TextField
        label="blue"
        onChange={onChangeRgb("b")}
        value={rgb.b}
        variant="outlined"
      />
    </Stack>
  );
}
