"use client";

import { useRef, useEffect } from "react";
import type { CollectionData } from "@/types/gallery";
import { Ico, ICON_PATHS } from "./Icons";

interface ExhibitSectionProps {
  collection: CollectionData;
  index: number;
}

export function ExhibitSection({ collection, index }: ExhibitSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const filmRef = useRef<HTMLDivElement>(null);

  const num = String(index + 1).padStart(2, "0");
  const worksCount = collection.cards.filter((c) => c.img).length;

  useEffect(() => {
    const video = videoRef.current;
    const film = filmRef.current;
    if (!video || !film) return;

    video.muted = true;
    video.defaultMuted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(film);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="exhibit-section">
      <div className="es-inner">
        <div className="es-grid">

          <div className="es-film" ref={filmRef}>
            <div className="es-film-lines" aria-hidden="true" />
            {collection.video ? (
              <video
                ref={videoRef}
                className="es-video"
                src={collection.video}
                poster={collection.poster ?? undefined}
                muted
                loop
                playsInline
                preload="none"
              />
            ) : (
              <div className="es-film-placeholder">
                <span className="es-film-label">[ exhibition film ]</span>
              </div>
            )}
            <div className="es-film-badge">
              <span className="es-play-btn" aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#F3F0E9">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Now showing
            </div>
          </div>

          <div className="es-content">
            <div className="es-number">No. {num} — Current Exhibit</div>
            <h2 className="es-title">{collection.name}</h2>
            <p className="es-desc">{collection.blurb}</p>
            <div className="es-stats">
              <div className="es-stat">
                <div className="es-stat-label">Artist</div>
                <div className="es-stat-value">Chloe</div>
              </div>
              <div className="es-stat">
                <div className="es-stat-label">Works</div>
                <div className="es-stat-value">{worksCount || "—"}</div>
              </div>
              {/* <div className="es-stat">
                <div className="es-stat-label">Closes</div>
                <div className="es-stat-value">—</div>
              </div> */}
            </div>
            <a href="#" className="es-link">
              View in gallery
              <Ico d={ICON_PATHS.ARROW} size={16} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
