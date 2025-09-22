import { items } from "./data";
import "./styles.css";

import { HeroBefore } from "./components/HeroBefore";
import { HeroAfter } from "./components/HeroAfter";
import { CardBefore } from "./components/CardBefore";
import { CardAfter } from "./components/CardAfter";

function useVariant() {
  const p = new URLSearchParams(window.location.search);
  return p.get("variant") === "after" ? "after" : "before";
}

export default function App() {
  const variant = useVariant();
  const isAfter = variant === "after";

  return (
    <main className="container">
      <header className="header">
        <h1>Blitz Link-in-Bio — {isAfter ? "AFTER" : "BEFORE"}</h1>
        <nav className="nav">
          <a href="?variant=before" aria-current={!isAfter ? "page" : undefined}>Before</a>
          <a href="?variant=after" aria-current={isAfter ? "page" : undefined}>After</a>
        </nav>
      </header>

      <section className="panel" aria-label="Hero">
        <div className="hero">{isAfter ? <HeroAfter /> : <HeroBefore />}</div>
      </section>

      <section className="panel" aria-labelledby="links-title">
        <h2 id="links-title">Links</h2>
        <ul className="grid" role="list">
          {items.map((it) => (
            <li key={it.id}>
              {isAfter ? <CardAfter item={it} /> : <CardBefore item={it} />}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}