import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useRef, useState, type ChangeEvent } from "react";
import Canvas from "../components/canvas";
import SolidTexture from "../components/solidTexture";
import WhiteNoiseTexture from "../components/whiteNoiseTexture";
import { RgbData, type Dimension, type Size } from "../types";

const imageFilename = "texture.png";

export default function Textures() {
  const [textureType, setTextureType] = useState<TextureType>("solid");
  const [size, setSize] = useState<Size>({ width: 256, height: 256 });
  const [rgbData, setRgbData] = useState(new RgbData(size));
  const [constrain, setConstrain] = useState(true);
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
    <Container maxWidth="md">
      <Grid container marginTop={2} spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="width"
              onChange={onChangeDimension("width")}
              value={size.width}
              variant="outlined"
            />

            <TextField
              label="height"
              onChange={onChangeDimension("height")}
              value={size.height}
              variant="outlined"
            />
          </Stack>

          <FormControl sx={{ marginTop: 2 }}>
            <InputLabel id="type-label">type</InputLabel>
            <Select
              label="type"
              labelId="type-label"
              onChange={(e) => {
                setTextureType(e.target.value as TextureType);
              }}
              value={textureType}
            >
              <MenuItem value="solid">solid</MenuItem>
              <MenuItem value="whiteNoise">white noise</MenuItem>
            </Select>
          </FormControl>

          <Box marginTop={2}>{renderTextureType()}</Box>

          <Stack direction="row" marginTop={2} spacing={1}>
            <Button onClick={download} variant="outlined">
              download
            </Button>

            <FormControlLabel
              control={
                <Checkbox
                  checked={constrain}
                  onChange={(e) => {
                    setConstrain(e.target.checked);
                  }}
                />
              }
              label="constrain"
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{ aspectRatio: 1 / 1 }}
            {...(constrain && {
              overflow: "auto",
            })}
          >
            <Canvas canvasRef={canvasRef} rgbData={rgbData} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

type TextureType = "solid" | "whiteNoise";
