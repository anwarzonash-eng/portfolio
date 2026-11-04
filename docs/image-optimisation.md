# Image optimisation — results

Companion to `image-baseline.md`, which recorded the starting state. Every
figure here was measured on disk or against a running server. Where a number
could not be measured it says so rather than estimating.

## Start to finish

| | Before | After | Change |
|---|---:|---:|---:|
| Asset files in `public/` | 223 | **72** | −151 |
| Asset bytes | 104.29 MB | **1.19 MB** | **−98.9%** |
| `public/` total | 112 MB | **7.7 MB** | (6.4 MB of that is fonts) |
| `public/` excluding fonts | ~105 MB | **1.4 MB** | −98.7% |
| `public/images` | 99 MB | **484 KB** | −99.5% |
| `public/default` | 6.1 MB | **688 KB** | −88.7% |
| `public/bg` | 252 KB | **132 KB** | −47.6% |
| Live SVG, gzipped (what travels) | 123.2 KB | **46.7 KB** | −62.1% |

Format mix:

| Format | Before | After |
|---|---|---|
| PNG | 94 files, 32.97 MB | 2 files, 7.2 KB |
| JPG | 21 files, 43.53 MB | 0 |
| SVG | 99 files, 26.66 MB | 39 files, 228 KB |
| WebP | 7 files, 0.14 MB | 31 files, 988 KB |
| PSD | 2 files, 1.01 MB | 0 |

The git pack is unchanged at 73.31 MiB — deleted files stay in history, which
is intentional. The working tree, every clone's checkout, CI checkouts and any
Docker build context shrink; the `.git` directory does not.

## Page weight

Measured against a running production server through `/_next/image`.

`/default/*` — the ten blog-card images, the worst offenders at the start:

| | Bytes |
|---|---:|
| Before, 10 original PNGs | 6,283,267 (5.99 MB) |
| After, 10 × 384w (phone, DPR 1) | 128,410 (125 KB) |
| After, 10 × 750w (phone, DPR 2) | 345,190 (337 KB) |
| After, 10 × 1200w (desktop) | 584,772 (571 KB) |

Largest single image, `/default/nine` (1050 px source):

| Width | Bytes |
|---:|---:|
| original PNG | 949,011 |
| 384w | 22,127 |
| 640w | 31,970 |
| 750w | 39,492 |
| 828w | 44,384 |
| ≥1080w | 64,472 (capped at source width) |

Footer backgrounds, served as CSS backgrounds and so never resized by Next:

| | Before | After |
|---|---:|---:|
| `footerDektopBG` | 749,291 B PNG | 25,162 B WebP |
| `footerMobileBG` | 462,724 B PNG | 14,624 B WebP |

Hero backdrops, gzipped:

| | Before | After |
|---|---:|---:|
| `hero-desktop.svg` | 60,252 B | 17,030 B |
| `hero-mobile.svg` | 32,785 B | 8,233 B |

Both were previously downloaded together on every device regardless of
viewport; `<picture>` now fetches one.

## Print / PDF

Captured with Puppeteer against a stand-in API, A4, against a 30s per-page
budget:

| Route | Total | Images | Broken | Pending | via `/_next/image` | Pages | PDF |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/print/home` | 5,171 ms | 40 | 0 | 0 | 0 | 12 | 7.5 MB |
| `/print/cvPortrait` | 4,330 ms | 16 | 0 | 0 | 0 | 7 | 4.7 MB |
| `/print/cvLandscape` | 2,562 ms | 18 | 0 | 0 | 0 | 9 | 5.0 MB |
| `/print/portfolio` | 4,217 ms | 22 | 0 | 0 | 0 | 6 | 3.5 MB |

The content was stand-in data, so these timings show the shape of the result,
not a forecast for real tenants.

## Not measured

No runtime figures for real traffic exist. There is no API key or staging
environment, so the following were never captured and any claim about them
would be a guess:

- Lighthouse LCP / Total Byte Weight on real pages
- Per-route image bytes for a real tenant
- Savings on API-supplied images (profile photos, skill icons, thumbnails) —
  these are the largest remaining unknown, because they are unbounded
  tenant-uploaded content
- Cold vs warm `/_next/image` cache behaviour under load
- PDF capture time on production hardware
