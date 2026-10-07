// Compares every file in prototype-original/ with the same file in _site/.
// Stage 1 passes only if all are byte-identical.
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
const h = f => createHash("sha256").update(readFileSync(f)).digest("hex");
let bad = 0;
for (const f of readdirSync("prototype-original")) {
  const out = `_site/${f}`;
  if (!existsSync(out)) { console.log("MISSING  ", f); bad++; }
  else if (h(`prototype-original/${f}`) !== h(out)) { console.log("DIFFERENT", f); bad++; }
  else console.log("identical", f);
}
console.log(bad ? `\nFAILED: ${bad} file(s)` : "\nPASS: output is byte-identical to the prototype");
process.exit(bad ? 1 : 0);
