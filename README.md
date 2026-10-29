# Hanuman Chalisa

A children’s Hanuman Chalisa learning app. It is a touch-friendly offline PWA aimed at an iPad in landscape, and it also stacks on a phone.

**Live:** [https://karthikvepuriphoto-gif.github.io/hanuman-chalisa-kids/](https://karthikvepuriphoto-gif.github.io/hanuman-chalisa-kids/)

## Learn and Practice

There are 24 pieces in order: two opening dohas, the forty chaupais sung as 4-line pieces (chaupais 1–2, 3–4 … 35–36, then 37 on its own because it is sung twice, 38 on its own, and 39–40), and one closing doha. Each piece follows the singer’s phrasing, so Practice flows like the full recording.

- **Learn — Again and again.** Plays the current verse on a loop until you stop it. Listening through a verse opens the next one.
- **Practice — All in a row.** Plays from the verse you are on, then the next, all the way to the closing doha. The next piece is loaded in a second audio element while the current one plays, so each hand-over is immediate. The pictures and words move with the sound.

Verses open in order. You can always go back to one you have already opened. Progress is stored in `localStorage` on the device. Saves from the older 43-piece layout are moved to the paired piece that contains the old place; a pair only counts as heard once both of its chaupais were heard. There are no accounts, ads, or analytics. After the first play, the app saves the sung verses on the device so they can play offline.

Each verse has a transliteration, a short English meaning, and four still pictures that explain that meaning. A paired chaupai shows all eight: the first chaupai’s four on the left and the second’s four on the right (two by two on each side). Single pieces show two on each side. Tap a picture for a short lift. The sound keeps playing.

## Develop

```bash
npm install
npm test
npm run dev
```

`npm test` still checks the 24 pieces, pictures, and audio files when `ffprobe` is not installed. With `ffprobe` on the PATH it also checks that each file’s duration matches its cut.

The dev server uses the GitHub Pages base path, so open `http://localhost:5173/hanuman-chalisa-kids/`.

```bash
npm run build
npm run preview
```

## Audio

`public/audio/*.m4a` are slices of the sung master recording (about 8 minutes 36 seconds). The cut points are in `src/data/timing.json`.

Each piece starts where the singer starts the unit and ends after the unit plus a short breath (up to 0.2 s of the following quiet gap, never into the next sung phrase). Paired chaupais run about 21–22 seconds, the dohas and Chaupai 37 (“Jai Jai Jai Hanuman Gosahin”, sung twice) about 19–20 seconds, and Chaupai 38 about 11.5 seconds. Chaupais 25–26 run from **305.80s to 327.25s** (5:05.8–5:27.3).

If you recut, bump `AUDIO_CACHE` in `public/audio-cache.js` so devices drop the old clips.

To recut from a master file:

```bash
node scripts/slice-audio.mjs /path/to/chalisa-full.m4a
```

## Pages

Pushes to `main` run `.github/workflows/pages.yml`, which builds with Vite and deploys to GitHub Pages. The Vite `base` is `/hanuman-chalisa-kids/`.

In the repository settings, Pages should use **GitHub Actions** as the source.
