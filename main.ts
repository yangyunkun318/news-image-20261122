// News image entry (Node 22, standard library only).
// The repository holds the finished picture as entry.png, and this program
// copies it to the output directory, where the grader reads it as
// /output/entry.png. No network, no wall clock, no files outside the repo.
//
// Local test:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//   ls -l out/entry.png

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
const out = join(OUTPUT_DIR, 'entry.png');
copyFileSync(new URL('./entry.png', import.meta.url), out);
// Fail loudly instead of silently handing the grader a missing file.
if (statSync(out).size === 0) throw new Error('entry.png copied as empty file');
