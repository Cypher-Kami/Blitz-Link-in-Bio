import { withBase } from '../lib/asset';
export function HeroBefore() {
  return (
    <img
      src={withBase('hero-1200.jpg')}
      srcSet={`${withBase('hero-600.jpg')} 600w, ${withBase('hero-900.jpg')} 900w, ${withBase('hero-1200.jpg')} 1200w`}
      alt="Hero before (JPG)"
      style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
    />
  );
}