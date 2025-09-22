# Blitz Link-in-Bio — Image/LCP Optimization (React Demo)

**Chosen fix (≤ 2h):**  
**Optimize the LCP image + responsive media (perf).** Serve the hero as **WebP/AVIF** with **`srcset`/`sizes`**, add **`width/height`** and `object-fit: cover`.

---

## Why this matters

Largest Contentful Paint (LCP) drives perceived load. Heavy/non-responsive images delay LCP; missing dimensions cause layout shifts (CLS). Using next-gen formats, responsive variants, and explicit dimensions cuts bytes, prioritizes the right resource, and stabilizes layout.

---

## Before vs After (Lighthouse — **Mobile**, Production build)

**Local URLs (con base de Pages):**
- **Before (JPG):** `http://localhost:4173/Blitz-Link-in-Bio/?variant=before`  
- **After (WebP):** `http://localhost:4173/Blitz-Link-in-Bio/?variant=after`

### Scores
| Variant         | Performance | Accessibility | Best Practices | SEO |
|-----------------|------------:|--------------:|---------------:|----:|
| **Before (JPG)**|          **69** |           100 |            100 |  **91** |
| **After (WebP)**|       **100** |           100 |            100 |  **91** |

### Core Web Vitals / Metrics
| Metric | Before (JPG) | After (WebP) | Δ (Improvement) |
|-------:|--------------:|-------------:|----------------:|
| **FCP** | 1.2 s | **1.2 s** | — |
| **LCP** | 5.3 s | **1.5 s** | **−3.8 s** |
| **TBT** | 0 ms | **0 ms** | — |
| **CLS** | 0.228 | **0.000** | **−0.228** |
| **Speed Index** | 1.2 s | **1.2 s** | — |

> **Takeaway:** The **After** variant slashes **LCP** (5.3 → **1.5 s**) and eliminates layout shifts (**CLS 0.228 → 0.000**), achieving **Performance 100** on mobile.

---

## What changed (code & rationale)

- **Serve LCP as next-gen + responsive**  
  Use **WebP** (or AVIF) with `srcset`/`sizes` so mobile downloads an appropriately sized resource.
```tsx
  // HeroAfter.tsx — key for LCP
  <img
    src={withBase('hero-1200.webp')}
    srcSet={[
      `${withBase('hero-600.webp')} 600w`,
      `${withBase('hero-900.webp')} 900w`,
      `${withBase('hero-1200.webp')} 1200w`,
    ].join(', ')}
    sizes="(max-width: 480px) 100vw, (max-width: 768px) 640px, 640px"
    width={1200} height={400}
    alt="Hero after (WebP)"
    loading="eager" fetchPriority="high" decoding="async"
    style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
  />
```
---

### Stabilize layout (CLS ≈ 0)
- The hero **does not** impose a conflicting `aspect-ratio`; the `<img>`’s **intrinsic** `width/height` reserve space on first paint → no jumps.
- Cards (thumbs) include explicit `width/height`, and their media wrapper uses `aspect-ratio: 16/9` to keep the grid stable.

### Lazy non-critical media
- Only the **hero** is `loading="eager"` with `fetchpriority="high"`.
- All other images (thumbs) are `loading="lazy"` + `decoding="async"` to reduce main-thread work and bandwidth.

### Fair A/B test
- **Before:** JPG only (no `sizes`), intentionally less optimized.
- **After:** WebP (or AVIF) with `srcset`/`sizes`.
- Each variant renders **exclusively** (we don’t ship both at once) to avoid skewing Lighthouse.

---

## How to run
```bash
npm i
npm run build
npm run preview
```
