"use client";

import type { ArtworkProduct } from "@/types/artwork";
import { useDict } from "@/components/DictProvider";

interface ArtworkCardProps {
  artwork: ArtworkProduct;
  inCart: boolean;
  onAdd: (artwork: ArtworkProduct) => void;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function ArtworkCard({ artwork, inCart, onAdd }: ArtworkCardProps) {
  const dict = useDict();
  return (
    <div className="dg-card">
      <div className="dg-card-img">
        <img src={artwork.img} alt={artwork.title} draggable="false" />

        {!artwork.inStock && (
          <span className="dg-sold-tag">{dict.artwork.sold}</span>
        )}

        {artwork.inStock && (
          <button
            className={`dg-add-btn${inCart ? " in-cart" : ""}`}
            onClick={() => onAdd(artwork)}
            aria-label={inCart ? dict.artwork.addedToCart : dict.artwork.addToCart.replace("{title}", artwork.title)}
          >
            {inCart ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            )}
          </button>
        )}
      </div>

      <div className="dg-card-body">
        <p className="dg-card-title">{artwork.title}</p>
        <p className="dg-card-artist">{artwork.artist}</p>
        <div className="dg-card-foot">
          <span className="dg-card-price">
            {artwork.inStock ? fmt(artwork.price) : "—"}
          </span>
          <span className="dg-card-edition">{artwork.edition}</span>
        </div>
      </div>
    </div>
  );
}
