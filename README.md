# Blitz Link-in-Bio — Image/LCP Optimization (React Demo)

**Chosen fix (≤ 2h):**  
**Optimize the LCP image + responsive media (perf).** Serve the hero as **WebP/AVIF** with **`srcset`/`sizes`**, add **`width/height`** and `object-fit: cover`.

---

## Why this matters

The Largest Contentful Paint (LCP) is what users perceive as “the page has arrived.” Heavy/non-responsive images delay LCP, and missing dimensions cause layout shifts (CLS). By shipping next-gen formats, responsive variants, and explicit dimensions, we cut bytes, prioritize the right resource, and stabilize layout.

---

## Before vs After (Lighthouse • Mobile • Production build)

**URLs**
- **Before (JPG):** `/?variant=before`  
- **After (WebP):** `/?variant=after`

### Scores
| Variant         | Performance | Accessibility | Best Practices | SEO |
|-----------------|------------:|--------------:|---------------:|----:|
| **Before (JPG)**|          88 |           100 |            100 |  83 |
| **After (WebP)**|       **100** |           100 |            100 |  83 |

### Core Web Vitals / Metrics
| Metric | Before (JPG) | After (WebP) | Δ (Improvement) |
|-------:|--------------:|-------------:|----------------:|
| **FCP** | 0.3 s | **0.3 s** | — |
| **LCP** | 0.8 s | **0.3 s** | **-0.5 s** |
| **TBT** | 0 ms | **0 ms** | — |
| **CLS** | 0.231 | **0.000** | **-0.231** |
| **Speed Index** | 0.3 s | **0.3 s** | — |

> **Takeaway:** The **After** variant dramatically reduces **LCP** (0.8 s → **0.3 s**) and eliminates **layout shifts** (CLS 0.231 → **0.000**), achieving **Performance 100**.

---

## What changed (code & rationale)

- **Serve LCP as next-gen + responsive**  
  Use **WebP** (or AVIF) with `srcset`/`sizes` so mobile downloads an appropriately sized resource instead of an oversized one.

```tsx
// HeroAfter.tsx — key for LCP
<img
  src="/hero-1200.webp"
  srcSet="/hero-600.webp 600w, /hero-900.webp 900w, /hero-1200.webp 1200w"
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 640px, 640px"
  width={1200}
  height={400}
  alt="Hero after (WebP)"
  loading="eager"
  fetchPriority="high"
  decoding="async"
  style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }}
/>
Stabilize layout (CLS ≈ 0)
The hero container does not enforce a conflicting aspect-ratio; the <img>’s width/height reserve space from the first layout. Thumbs also include width/height and their container uses a fixed aspect-ratio: 16/9.

Lazy non-critical media
Non-LCP images (thumbs) use loading="lazy" + decoding="async"; the hero is the only eager/prioritized image.

Fair test
Before serves only JPG (no sizes), After serves only WebP with responsive variants. We never render both variants at once to avoid skewing Lighthouse.

##How to run
npm i
npm run build
npm run preview

# Measure each URL independently:
# BEFORE → http://localhost:4173/?variant=before
# AFTER  → http://localhost:4173/?variant=after
