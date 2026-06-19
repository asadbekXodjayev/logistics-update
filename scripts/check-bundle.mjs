// Bundle-size budget gate. Run `npm run build` first, then `npm run size`.
// Fails (exit 1) if any single JS chunk exceeds the per-chunk budget — a
// guard against accidentally pulling a heavy dep (e.g. MUI) into a shared
// chunk and regressing the initial load.
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'dist/assets';
const BUDGET_KB = 250;

let files;
try {
    files = readdirSync(DIR).filter((f) => f.endsWith('.js'));
} catch {
    console.error('No build found. Run `npm run build` first.');
    process.exit(1);
}

const rows = files
    .map((f) => ({ f, kb: statSync(join(DIR, f)).size / 1024 }))
    .sort((a, b) => b.kb - a.kb);

let over = false;
console.log(`\nJS chunk sizes (budget: ${BUDGET_KB} KB/chunk)\n`);
for (const r of rows) {
    const flag = r.kb > BUDGET_KB ? '  ❌ OVER BUDGET' : '';
    if (r.kb > BUDGET_KB) over = true;
    console.log(`  ${r.kb.toFixed(1).padStart(8)} KB  ${r.f}${flag}`);
}
const total = rows.reduce((s, r) => s + r.kb, 0);
console.log(`  ${'-'.repeat(34)}`);
console.log(`  ${total.toFixed(1).padStart(8)} KB  total\n`);

if (over) {
    console.error('Bundle budget exceeded.');
    process.exit(1);
}
console.log('✓ All chunks within budget.\n');
