#!/usr/bin/env python3
"""Convert picture-book art into small web images in public/book/.

Usage: python3 scripts/build-book-art.py [/workspace/chalisa-picture-book/art]

Reads only top-level <page>.png files (never the print/ folder), keeps
native size up to 1600 px wide, writes public/book/<page>.webp. Rerun
whenever the art is redone or upscaled.
"""
import sys
from pathlib import Path
from PIL import Image

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else '/workspace/chalisa-picture-book/art')
OUT = Path(__file__).resolve().parent.parent / 'public' / 'book'
PAGES = ['cover', 'doha-1', 'doha-2'] + [f'chaupai-{n}' for n in range(1, 41)] + ['doha-close']
MAX_W = 1600

OUT.mkdir(parents=True, exist_ok=True)
missing = [p for p in PAGES if not (SRC / f'{p}.png').exists()]
if missing:
    sys.exit(f'missing art: {", ".join(missing)}')
total = 0
for page in PAGES:
    im = Image.open(SRC / f'{page}.png').convert('RGB')
    if im.width > MAX_W:
        im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
    dest = OUT / f'{page}.webp'
    im.save(dest, 'WEBP', quality=72, method=6)
    total += dest.stat().st_size
    print(f'{page}: {im.width}x{im.height} {dest.stat().st_size // 1024} KB')
print(f'{len(PAGES)} pages, {total // 1024} KB total -> {OUT}')
