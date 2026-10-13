// Real paintings (cropped from my-content/paintings/). thumb = grid image, full = zoom viewer image, w/h = thumb size.
// No visible titles; alt text lives in i18n (palt). home = shown in the home page's paintings section, in this order.
// cut = carved frame with the backdrop made transparent (AVIF with alpha); the frame casts its own shaped shadow.
const p = (id, w, h, home, cut) => { const ext = cut ? "avif" : "jpg";
  return { id, thumb: `/assets/images/paintings/${id}-thumb.${ext}`, full: `/assets/images/paintings/${id}.${ext}`, w, h, ...(home && { home }), ...(cut && { cut }) }; };
export default [
 p("horse", 700, 484, 1),
 p("music-lesson", 700, 753, 2),
 p("sailing-ship", 700, 738, 3),
 p("harbour-boats", 700, 589, 4),
 p("hawk", 668, 900),
 p("autumn-bridge", 700, 522),
 p("birch-alley", 540, 900),
 p("canal", 700, 521),
 p("flowers", 700, 764, 0, true),
 p("cottage-stream", 700, 561, 0, true),
 p("holly", 700, 693),
 p("moon-tree", 700, 850),
 p("alpine-lake", 700, 466, 0, true),
 p("blue-blossom", 700, 570),
 p("stone-house", 344, 900),
 p("coastal-village", 700, 535),
 p("deer-relief", 700, 761),
 p("seaside-pine", 700, 850),
 p("blue-moon", 700, 552),
 p("birch-pond", 700, 511),
 p("village-lane", 700, 553),
];
