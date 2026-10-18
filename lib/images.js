// Lighter images (Stage 21): every <img> of a JPEG/PNG under assets/images becomes a <picture> with
// AVIF (quality 64, full colour detail) and a JPEG fallback, each at 400 and 800 px wide (never larger than
// the original). Images on the site show at most ~410 CSS px, so 800 covers sharp (2×) screens.
// Paintings' full-size zoom file (data-full) also gets an AVIF copy (data-full-avif) for the viewer.
// The originals stay in assets/images (sharing previews, sitemap); my-content/ is never touched.
import Image from "@11ty/eleventy-img";
import { base } from "./urls.js";

const SRC = "src/";
const OUT = "_site/img/";
const common = {
  outputDir: OUT,
  urlPath: base + "img/",
  sharpAvifOptions: { quality: 64, chromaSubsampling: "4:4:4" },
  sharpJpegOptions: { quality: 82, mozjpeg: true },
};
const SIZES = "(max-width: 700px) 90vw, 400px";

const local = (url) => {
  if (!url || !url.startsWith(base + "assets/images/") || !/\.(jpe?g|png)$/i.test(url)) return null;
  return SRC + url.slice(base.length);
};
const attrsOf = (tag) => Object.fromEntries([...tag.matchAll(/\s([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const unescapeAttr = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, "&");

async function picture(tag) {
  const a = attrsOf(tag);
  const file = local(a.src);
  if (!file) return tag;
  const meta = await Image(file, { ...common, widths: [400, 800], formats: ["avif", "jpeg"] });
  const full = local(a["data-full"]);
  if (full) {
    const f = await Image(full, { ...common, widths: ["auto"], formats: ["avif"] });
    a["data-full-avif"] = f.avif[0].url;
  }
  delete a.src; delete a.width; delete a.height;
  for (const k in a) a[k] = unescapeAttr(a[k]);
  return Image.generateHTML(meta, { sizes: SIZES, ...a });
}

export async function lighterImages(content) {
  if (!this.page.outputPath || !this.page.outputPath.endsWith(".html")) return content;
  const tags = [...new Set(content.match(/<img\b[^>]*>/g) || [])];
  const done = await Promise.all(tags.map(picture));
  tags.forEach((t, i) => { content = content.split(t).join(done[i]); });
  return content;
}
