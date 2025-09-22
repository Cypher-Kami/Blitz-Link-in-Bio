import type { Item } from "../data";

export function CardBefore({ item }: { item: Item }) {
  return (
    <div className="card">
      <div className="card-media">
        <img
          src={item.jpg600}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      <div className="card-body">
        <p className="card-title">{item.title}</p>
        <p className="card-sub">Unoptimized JPG</p>
      </div>
    </div>
  );
}
