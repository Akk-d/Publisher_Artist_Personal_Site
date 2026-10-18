// Every Herbal Medicine article that has its own page (/herbal-medicine/<id>/), in page order.
// kind: essay | qa | lecture. A Q&A attached to an essay keeps that essay as `parent`.
import { readFileSync } from "node:fs";
const h = JSON.parse(readFileSync(new URL("./herbal.json", import.meta.url)));

export default [
  ...h.essays.flatMap((id) => [{ id, kind: "essay" },
    ...(h.attach[id] ? [{ id: h.attach[id], kind: "qa", parent: id }] : [])]),
  ...h.qa.flatMap((g) => g.items.map((id) => ({ id, kind: "qa", group: g.key }))),
  ...h.lectures.map((id) => ({ id, kind: "lecture" })),
];
