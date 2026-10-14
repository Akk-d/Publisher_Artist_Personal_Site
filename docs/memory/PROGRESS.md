# Progress
_Last updated: 2026-10-15_
## Current state
- Stages 1–9 pushed. Stages 10–17 committed locally, NOT pushed (user views the live site akk-d.github.io on iPad, so none of 10–17 is visible yet). Deploy after push never verified (no `gh` CLI); Pages source may still need "GitHub Actions".
- Stage 17 (2026-10-14/15, user edits from iPad screenshots), in `stage17-additions.css` + i18n:
  - Bio: per-heading spacing `#part-1-h`, `#part-7-h` (+ `.join`); «حَاصِلٌ عَلَى الدُّكْتُورَاهِ» glance items; part 8 heading in 3rd person; EN now mirrors AR there.
  - Home: hero kicker + `hero_name`; about section = one paragraph `about_text` «طَبِيبٌ أَدِيبٌ شَاعِرٌ رَسَّامٌ…» (heading, quote, a1/a2 removed from template; `.about.one`); paintings fixed hang `.gal-home`.
  - Menu: `n_about` «إِطْلَالَةٌ»/Overview, `n_books` «الْمُؤَلَّفَاتُ»/Works. Tab titles and home books h2 still «الكتب».
  - Books page: h1 via new `h_books_page` «ثَمَرَاتُ الْفِكْرِ»; reading-photo caption «فِي صُحْبَةِ كِتَابٍ».
  - Alternative Medicine page: subtitle «الطِّبُّ النَّبَاتِيُّ الْمُسَمَّى بِالطِّبِّ الْبَدِيلِ» + user's 6 principles (gold ticks, no numbers); section 1 = `asil` article «الطِّبُّ الْأَصِيلُ: جُذُورٌ رَاسِخَةٌ…», first essay = `why` Q&A «لِمَاذَا الطِّبُّ الْأَصِيلُ؟» (by «إعْدَاد مَرْكَز RC»); both texts checked against the PDF and made exact; essays heading «الطِّبُّ النَّبَاتِيُّ:» + sub «أَصَالَةُ الْمَعْرِفَةِ وَأَمَانَةُ الْمُمَارَسَةِ»; Q&A groups «عَالَمُ النَّبَاتِ: خَصَائِصُهُ وَآفَاقُ الِانْتِفَاعِ بِه», «فَهْمُ الْأَمْرَاضِ وَدَلَالَاتُ الْفُحُوصِ»; image captions removed (alt kept); IBS image `object-fit:contain` in its square; «الْقَطُونَا». Image shrink tried and reverted. Q&A section h2 «سُؤَالُ الْمَرِيضِ وَبَيَانُ الطَّبِيبِ» + new key `qa.tag` «الْمَرِيضُ يَسْأَلُ وَالطَّبِيبُ يُجِيبُ» under it (tashkeel added by Claude, user approved), TOC item follows h2.
  - Back-to-top label `top` (bio + herbal) «إِلَى رَأْسِ الصَّفْحَةِ» / "To the top of the page".
  - Book cards (books page + home): all covers one size, `aspect-ratio:5/7; object-fit:cover`.
## To confirm with user
- Herbal Q&A: `qa.tag` and the RC by-line look identical (same `.hm-sub`); offered to style the tag differently. Page meta desc still says «المريض يسأل والطبيب يجيب» (not changed).
- Home hero lede under the name still old («طبيبٌ، أديبٌ، شاعرٌ ورسّام — كتبٌ عن العشق…»), now repeats the about paragraph: keep, change or remove? (asked, no answer)
- Drop cap in home about shows «طَ» detached from «بِيبٌ»: keep or remove the drop cap?
- «بِه» (plants group heading) without kasra as user typed; colon kept in «الطِّبُّ النَّبَاتِيُّ:»; PDF asterisks around «الطِّبِّ الْأَصِيلِ» not shown.
- Herbal: remove Claude-added sub-headings/group headings that remain? Anything from the PDFs missing from the page?
- After push: user to check heading spacing fixes in Safari.
- Older: Nav «السيرة» vs bio heading; proofread Claude's EN and alt texts; keep tan accent; book shuffle / home shelf of 4. Stage 15 source typos kept as written (دستوري, نهر العشق; نهر العشق AR OCR'd, author read-through advised).
## Next up
1. Push Stages 10–17 (ask user first), then Pages source = GitHub Actions, confirm live site.
2. Before launch: `preview: false`, real domain in `lib/urls.js`, README placeholders, real contact links (footer still hello@example.com / [Instagram]); wire "Read the book" when allowed.
## Known issues
- Image tooling: no PIL/ImageMagick; pip blocked. Use `sips` + Swift (CoreGraphics/ImageIO/PDFKit). Swift tools must be rebuilt per session.
- PDF Arabic via PDFKit: lines can come out of order and ligatures misplace marks (المْ = الْمَ, بَينَْ = بَيْنَ, اللهَُّ = اللَّهُ); compare letters first, then marks, and render the page to an image for punctuation.
- Painting sizes: full ≤1100px q60 JPEG, thumbs ≤700w/900h q45. `.gal-home` ratio 1:1.47 tuned to the current 4 home paintings.
- Browser pane hidden ⇒ screenshots lag scrolling; take a second screenshot.
- `npm run check` right after `npm run build` can fail while the dev server rewrites `_site/`; rerun after a second. Preview on 8091.
- New full-book PDF: add exact path to `.gitignore` before committing. Unused i18n keys: `bio.sep`, `h_about`, `about_q(c)`, `a1`, `a2`. README still placeholder. `.c1` cover old blue.
