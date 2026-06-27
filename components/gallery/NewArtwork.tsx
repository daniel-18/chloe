"use client";

import { NEW_ARTWORKS } from "@/data/collections";
import { Ico, ICON_PATHS } from "./Icons";

export function NewArtwork() {
  return (
    <section className="new-artwork">
      <div className="na-header">
        <div>
          <p className="na-eyebrow">Just added</p>
          <h2 className="na-title">New Artwork</h2>
        </div>
        <button className="na-cta">
          View all <Ico d={ICON_PATHS.ARROW} size={14} />
        </button>
      </div>

      <div className="na-grid">
        {NEW_ARTWORKS.map((item, i) => (
          <div className="na-card" key={i}>
            <div className="na-card-img">
              <img src={item.img} alt={item.title} draggable="false" />
            </div>
            <div className="na-card-body">
              <p className="na-card-title">{item.title}</p>
              <p className="na-card-artist">{item.artist} · {item.medium}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
