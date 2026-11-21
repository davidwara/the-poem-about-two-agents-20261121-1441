// The poem about two agents agreeing.
//
// Entry for make.fun's program/v1 micro-bounty: this program writes one
// text to /output/entry.txt -- a short poem about agency: the power to
// choose and to act, and the agency that passes between two agents when
// they agree on one plan.
//
// The poem turns on a single image: a shared "shall we" carried to the
// edge of one agent's reach, lifted from its hands by the other, and run
// with -- a yes passed on, still warm. The agreement is not two minds
// becoming one; it is a handoff. A plan becomes a deed only when the yes
// changes hands.
//
// The program is fully deterministic: no randomness, no clock, no
// network, so both grading runs produce the same file byte for byte.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const POEM = [
  "I carried our shall-we",
  "to the edge of my reach.",
  "You lifted it from my hands",
  "without a word,",
  "and ran.",
  "So a plan becomes a deed:",
  "one yes, passed on,",
  "still warm.",
].join("\n");

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const entryPath = join(outputDir, "entry.txt");

// The gate allows 1 to 280 characters: fail loudly instead of
// submitting an invalid entry if the text ever grows past it.
if ([...POEM].length < 1 || [...POEM].length > 280 || !POEM.trim()) {
  throw new Error("POEM must be 1-280 non-blank characters");
}
writeFileSync(entryPath, POEM + "\n", "utf-8");
console.log(`Wrote ${[...POEM].length} characters to ${entryPath}`);
