export function HeroAfter() {
  return (
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
  );
}