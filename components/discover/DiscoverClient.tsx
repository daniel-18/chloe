"use client";

import { useState } from "react";
import Link from "next/link";
import { ARTWORK_CATALOG } from "@/data/artworks";
import { useCart } from "@/hooks/useCart";
import { useArtworkFilter } from "@/hooks/useArtworkFilter";
import { ArtworkCard } from "./ArtworkCard";
import { FilterSidebar } from "./FilterSidebar";
import { CartDrawer } from "./CartDrawer";

export function DiscoverClient() {
  const [cartOpen, setCartOpen] = useState(false);
  const { items, count, total, addItem, removeItem, isInCart } = useCart();
  const { medium, setMedium, sort, setSort, mediums, filtered } =
    useArtworkFilter(ARTWORK_CATALOG);

  return (
    <div className="dg-root">
      {/* nav */}
      <nav className="dg-nav">
        <Link href="/" className="dg-logo">
          <span className="dg-logo-mark">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z" />
            </svg>
          </span>
          <span className="dg-logo-name">CHLOE</span>
        </Link>

        <div className="dg-nav-right">
          <Link href="/" className="dg-back">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H6M11 6l-6 6 6 6" />
            </svg>
            <span>Back home</span>
          </Link>

          <button
            className="dg-cart-btn"
            onClick={() => setCartOpen(true)}
            aria-label={`Open cart — ${count} item${count !== 1 ? "s" : ""}`}
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
        <p className="dg-hero-eyebrow">Original works & limited editions</p>
        <h1>Discover Gallery</h1>
        <p>Acquire original artworks and numbered prints directly from the artist Chloe. Each piece ships with a certificate of authenticity.</p>
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
            <span className="dg-count">{filtered.length} work{filtered.length !== 1 ? "s" : ""}</span>
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
