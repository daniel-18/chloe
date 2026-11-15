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

/**
 * Match a requested medium to a catalog medium, ignoring case and surrounding
 * whitespace, and return the catalog's own spelling so exact-equality filtering
 * and the active-button highlight both work. Falls back to "All" when the
 * request is missing or matches nothing in the catalog.
 */
function resolveMedium(requested: string | undefined, options: string[]): string {
  if (!requested) return "All";
  const needle = requested.trim().toLowerCase();
  return options.find((m) => m.toLowerCase() === needle) ?? "All";
}

export function useArtworkFilter(
  catalog: ArtworkProduct[],
  initialMedium?: string,
): ArtworkFilterAPI {
  const mediums = useMemo(
    () => ["All", ...Array.from(new Set(catalog.map((a) => a.medium)))],
    [catalog],
  );

  const [medium, setMedium] = useState(() => resolveMedium(initialMedium, mediums));
  const [sort, setSort] = useState<SortKey>("newest");

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
