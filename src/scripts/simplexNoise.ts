import { Rgb, RgbData, type Size } from "../types";
import { createRng } from "./noiseUtils";

const uniquePermutations = 256;
const permutationMask = uniquePermutations - 1;
const dimensions = 2;
const f = (Math.sqrt(dimensions + 1) - 1) / dimensions;
const directions: Coordinate[] = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
];
const directionMask = directions.length - 1;

export default function (seed: string, size: Size) {
  const rng = createRng(seed);
  const permutations = createPermutations(seed);
  const rgbData = new RgbData(size);

  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      const skewedCoordinates = skew({ x, y });
      const vertices = subdivide(skewedCoordinates);
      select(vertices, skewedCoordinates, permutations);

      const noise = rng();
      const rgb = Rgb.fromValue(noise * 255);
      rgbData.set(y, x, rgb);
    }
  }

  return rgbData;
}

// https://en.wikipedia.org/wiki/Perlin_noise#Gradient_permutation
function createPermutations(seed: string): Uint8Array {
  const rng = createRng(seed);
  const permutations = new Uint8Array(uniquePermutations * 2);

  for (let i = 0; i < uniquePermutations; i++) {
    permutations[i] = i;
  }

  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#JavaScript_implementation
  for (let i = uniquePermutations - 1; i >= 1; i--) {
    const j = Math.floor(rng() * (i + 1));
    [permutations[i], permutations[j]] = [permutations[j], permutations[i]];
  }

  for (let i = 0; i < uniquePermutations; i++) {
    permutations[i + uniquePermutations] = permutations[i];
  }

  return permutations;
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

// https://en.wikipedia.org/wiki/Simplex_noise#Gradient_selection
function select(
  vertices: Vertices,
  { cell }: SkewedCoordinates,
  permutations: Uint8Array,
): Coordinate[] {
  return vertices.map((vertex) => {
    const [x, y] = [cell.x + vertex.x, cell.y + vertex.y];
    const hash =
      permutations[permutations[x & permutationMask] + (y & permutationMask)];
    const index = hash & directionMask;

    return directions[index];
  });
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
