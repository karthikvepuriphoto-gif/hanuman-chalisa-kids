# Little Chalisa

A children’s Hanuman Chalisa learning app. It is a touch-friendly offline PWA aimed at an iPad in landscape, and it also stacks on a phone.

**Live:** [https://karthikvepuriphoto-gif.github.io/hanuman-chalisa-kids/](https://karthikvepuriphoto-gif.github.io/hanuman-chalisa-kids/)

## Learn and Practice

There are 43 pieces in order: two opening dohas, forty chaupais, and one closing doha.

- **Learn — Again and again.** Plays the current verse on a loop until you stop it. Listening through a verse opens the next one.
- **Practice — All in a row.** Plays from the verse you are on, then the next, all the way to the closing doha. The pictures and words move with the sound.

Verses open in order. You can always go back to one you have already opened. Progress is stored in `localStorage` on the device. There are no accounts, ads, or analytics. After the first play, the app saves the sung verses on the device so they can play offline.

Each verse has a transliteration, a short English meaning, and two pictures. Tap a picture for a short animation (under two seconds). The sound keeps playing.

## Develop

```bash
npm install
npm test
npm run dev
```

`npm test` still checks the 43 pieces, pictures, and audio files when `ffprobe` is not installed. With `ffprobe` on the PATH it also checks that each file’s duration matches its cut.

The dev server uses the GitHub Pages base path, so open `http://localhost:5173/hanuman-chalisa-kids/`.

```bash
npm run build
npm run preview
```

## Audio

`public/audio/*.m4a` are slices of the sung master recording (about 8 minutes 36 seconds). The cut points are in `src/data/timing.json`.

They were placed on quiet gaps, not on a fixed clock. Most chaupais land between about 10 and 12 seconds. The opening dohas and the closing doha are about 19–20 seconds. Chaupai 37 (“Jai Jai Jai Hanuman Gosahin”) is sung twice in the recording, so that piece is about 20 seconds. Chaupais 25 and 26 together run from **305.80s to 327.05s** (5:05.8–5:27.1).

To recut from a master file:

```bash
node scripts/slice-audio.mjs /path/to/chalisa-full.m4a
```

## Pages

Pushes to `main` run `.github/workflows/pages.yml`, which builds with Vite and deploys to GitHub Pages. The Vite `base` is `/hanuman-chalisa-kids/`.

In the repository settings, Pages should use **GitHub Actions** as the source.
