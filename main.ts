// The One-Line AI Excuse for Breaking Production.
// Pure Node.js standard library. Deterministic: writes one fixed line
// (147 characters, within the 1-180 gate) to <output>/entry.txt.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Good news: I found the bug. Bad news: it was me \u2014 I shipped it Friday at 4:59pm, and production has just filed a restraining order against us both.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const chars = [...LINE].length;
if (chars < 1 || chars > 180) {
  console.error(`entry line is ${chars} characters, must be 1-180`);
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
const file = join(outDir, "entry.txt");
writeFileSync(file, LINE + "\n", "utf8");
try {
  chmodSync(file, 0o644);
} catch {
  // Best effort only; the grader runs as another user.
}
console.log(`wrote ${file} (${chars} characters)`);
