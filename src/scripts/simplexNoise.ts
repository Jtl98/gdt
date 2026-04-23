import { Rgb, RgbData, type Size } from "../types";
import { createRng } from "./noiseUtils";

const dimensions = 2;
const f = (Math.sqrt(dimensions + 1) - 1) / dimensions;

export default function (seed: string, size: Size) {
  const rng = createRng(seed);
  const rgbData = new RgbData(size);

  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      const skewedCoordinates = skew({ x, y });
      subdivide(skewedCoordinates);

      const noise = rng();
      const rgb = Rgb.fromValue(noise * 255);
      rgbData.set(y, x, rgb);
    }
  }

  return rgbData;
}

// https://en.wikipedia.org/wiki/Simplex_noise#Coordinate_skewing
function skew({ x, y }: Coordinate): SkewedCoordinates {
  const latticeOffset = (x + y) * f;
  const lattice: Coordinate = {
    x: x + latticeOffset,
    y: y + latticeOffset,
  };
  const cell: Coordinate = {
    x: Math.floor(lattice.x),
    y: Math.floor(lattice.y),
  };
  const internal: Coordinate = {
    x: lattice.x - cell.x,
    y: lattice.y - cell.y,
  };

  return { lattice, cell, internal };
}

// https://en.wikipedia.org/wiki/Simplex_noise#Simplicial_subdivision
function subdivide({ internal }: SkewedCoordinates): Vertices {
  const secondVertex: Coordinate =
    internal.x >= internal.y ? { x: 1, y: 0 } : { x: 0, y: 1 };

  return [{ x: 0, y: 0 }, secondVertex, { x: 1, y: 1 }];
}

type Coordinate = {
  x: number;
  y: number;
};

type SkewedCoordinates = {
  lattice: Coordinate;
  cell: Coordinate;
  internal: Coordinate;
};

type Vertices = [Coordinate, Coordinate, Coordinate];
