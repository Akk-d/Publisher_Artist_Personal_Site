// Sanity checks on the built site (_site/). Run after `npm run build`.
// Checks: your style.css is present, every internal link/asset exists,
// every page has lang/dir/title/description/canonical/one h1/hreflang.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { base, languages } from "../lib/urls.js";

const OUT = "_site";
let errors = 0, pages = 0, links = 0;
const err = (m) => { console.log("ERROR  " + m); errors++; };

if (!existsSync("src/css/style.css")) err("src/css/style.css is missing. Copy your prototype style.css there.");
if (!existsSync(OUT)) { console.log("No _site folder. Run: npm run build"); process.exit(1); }

const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p];
});
const files = walk(OUT);
const htmlFiles = files.filter((f) => f.endsWith(".html"));

function target(from, url) {
  let u = url.split("#")[0].split("?")[0];
  if (!u) return null;
  let path;
  if (u.startsWith("/")) {
    if (!u.startsWith(base)) return "OUTSIDE-BASE";
    path = join(OUT, u.slice(base.length));
  } else path = resolve(dirname(from), u);
  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, "index.html");
  return path;
}

for (const f of htmlFiles) {
  const html = readFileSync(f, "utf8");
  const isStub = html.includes('http-equiv="refresh"');
  pages++;
  for (const m of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
    const u = m[1];
    if (!u || u === "#" || /^(https?:|mailto:|tel:|data:)/.test(u) || u.startsWith("#")) continue;
    links++;
    const t = target(f, u);
    if (t === null) continue;
    if (t === "OUTSIDE-BASE") err(`${f}: link outside base path: ${u}`);
    else if (!existsSync(t)) err(`${f}: broken link ${u}`);
  }
  if (isStub) continue;
  const is404 = f === join(OUT, "404.html"); // not a real page: noindex, no canonical/hreflang
  const need = (ok, what) => { if (!ok) err(`${f}: ${what}`); };
  need(/<html lang="[a-z-]+" dir="(rtl|ltr)">/.test(html), "missing lang/dir on <html>");
  need(/<title>[^<]+<\/title>/.test(html), "missing <title>");
  need(/<meta name="description" content="[^"]+">/.test(html), "missing meta description");
  if (is404) { need(html.includes('content="noindex"'), "404 page must be noindex"); continue; }
  need(/<link rel="canonical" href="https:\/\/[^"]+">/.test(html), "missing canonical");
  need((html.match(/<h1[\s>]/g) || []).length === 1, "page must have exactly one <h1>");
  for (const l of languages) need(html.includes(`hreflang="${l.code}"`), `missing hreflang ${l.code}`);
  need(html.includes('hreflang="x-default"'), "missing hreflang x-default");
  const dir = /<html lang="(\w+)" dir="(\w+)"/.exec(html);
  const L = languages.find((l) => l.code === dir?.[1]);
  need(L && L.dir === dir[2], "lang/dir mismatch");
}
for (const f of ["sitemap.xml", "robots.txt"]) if (!existsSync(join(OUT, f))) err(`missing ${f}`);

console.log(`\nChecked ${pages} HTML files, ${links} internal links.`);
console.log(errors ? `FAILED: ${errors} problem(s)` : "PASS: no problems found");
process.exit(errors ? 1 : 0);
