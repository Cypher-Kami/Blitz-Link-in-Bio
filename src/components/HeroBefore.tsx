export function HeroBefore() {
  return (
    <img
      src="/hero-1200.jpg"
      srcSet="/hero-600.jpg 600w, /hero-900.jpg 900w, /hero-1200.jpg 1200w"
      alt="Hero before (JPG)"
      style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }}
    />
  );
}
