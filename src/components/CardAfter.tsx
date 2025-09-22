import type { Item } from "../data";

export function CardAfter({ item }: { item: Item }) {
  return (
    <a className="card" href={item.href} aria-label={item.title}>
      <div className="card-media">
        <img
          src={item.webp600}
          srcSet={`${item.webp300} 300w, ${item.webp600} 600w`}
          sizes="(max-width: 640px) 50vw, 300px"
          width={600}
          height={338}
          loading="lazy"
          decoding="async"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      <div className="card-body">
        <p className="card-title">{item.title}</p>
        <p className="card-sub">Responsive WebP, lazy</p>
      </div>
    </a>
  );
}
