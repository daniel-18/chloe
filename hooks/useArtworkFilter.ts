"use client";

import { useState, useMemo } from "react";
import type { ArtworkProduct, SortKey } from "@/types/artwork";

export interface ArtworkFilterAPI {
  medium: string;
  setMedium: (m: string) => void;
  sort: SortKey;
  setSort: (s: SortKey) => void;
  mediums: string[];
  filtered: ArtworkProduct[];
}

export function useArtworkFilter(catalog: ArtworkProduct[]): ArtworkFilterAPI {
  const [medium, setMedium] = useState("All");
  const [sort, setSort] = useState<SortKey>("newest");

  const mediums = useMemo(
    () => ["All", ...Array.from(new Set(catalog.map((a) => a.medium)))],
    [catalog],
  );

  const filtered = useMemo(() => {
    const base =
      medium === "All" ? catalog : catalog.filter((a) => a.medium === medium);

    switch (sort) {
      case "price-asc":  return [...base].sort((a, b) => a.price - b.price);
      case "price-desc": return [...base].sort((a, b) => b.price - a.price);
      case "artist":     return [...base].sort((a, b) => a.artist.localeCompare(b.artist));
      default:           return base;
    }
  }, [catalog, medium, sort]);

  return { medium, setMedium, sort, setSort, mediums, filtered };
}
