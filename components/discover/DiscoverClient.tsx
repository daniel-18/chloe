"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ARTWORK_CATALOG } from "@/data/artworks";
import { useCart } from "@/hooks/useCart";
import { useArtworkFilter } from "@/hooks/useArtworkFilter";
import { ArtworkCard } from "./ArtworkCard";
import { FilterSidebar } from "./FilterSidebar";
import { CartDrawer } from "./CartDrawer";
import { useDict } from "@/components/DictProvider";
import { LangSwitcher } from "@/components/LangSwitcher";

export function DiscoverClient() {
  const dict = useDict();
  const { lang } = useParams<{ lang: string }>();
  const [cartOpen, setCartOpen] = useState(false);
  const { items, count, total, addItem, removeItem, isInCart } = useCart();
  const { medium, setMedium, sort, setSort, mediums, filtered } =
    useArtworkFilter(ARTWORK_CATALOG);

  const cartAriaLabel = count === 1
    ? dict.nav.openCart.replace("{count}", String(count))
    : dict.nav.openCartPlural.replace("{count}", String(count));

  return (
    <div className="dg-root">
      {/* nav */}
      <nav className="dg-nav">
        <Link href={`/${lang}`} className="dg-logo">
          <span className="dg-logo-mark">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z" />
            </svg>
          </span>
          <span className="dg-logo-name">CHLOE</span>
        </Link>

        <div className="dg-nav-right">
          <Link href={`/${lang}`} className="dg-back">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H6M11 6l-6 6 6 6" />
            </svg>
            <span>{dict.nav.backHome}</span>
          </Link>

          <LangSwitcher />

          <button
            className="dg-cart-btn"
            onClick={() => setCartOpen(true)}
            aria-label={cartAriaLabel}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            {count > 0 && <span className="dg-cart-count">{count}</span>}
          </button>
        </div>
      </nav>

      {/* hero */}
      <header className="dg-hero">
        <p className="dg-hero-eyebrow">{dict.discover.eyebrow}</p>
        <h1>{dict.discover.title}</h1>
        <p>{dict.discover.subtitle}</p>
      </header>

      {/* body */}
      <div className="dg-body">
        <FilterSidebar
          mediums={mediums}
          activeMedium={medium}
          onMedium={setMedium}
          sort={sort}
          onSort={setSort}
        />

        <main className="dg-main">
          <div className="dg-toolbar">
            <span className="dg-count">
              {filtered.length} {filtered.length !== 1 ? dict.discover.works : dict.discover.work}
            </span>
          </div>

          <div className="dg-grid">
            {filtered.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                inCart={isInCart(artwork.id)}
                onAdd={addItem}
              />
            ))}
          </div>
        </main>
      </div>

      {/* cart */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        total={total}
        onRemove={removeItem}
      />
    </div>
  );
}
