import seedrandom from "seedrandom";

/**
 * creates a seeded random number generator using the provided seed string
 *
 * the seed is appended with a null character to ensure that short string seeds produce different random sequences, see https://www.npmjs.com/package/seedrandom#version-notes
 *
 * @param seed the seed string for the random number generator
 * @returns a function that generates a random number between 0 and 1 each time it is called
 */
export function createRng(seed: string) {
  return seedrandom(`${seed}\0`);
}
