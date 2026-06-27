"use client";

import type { SortKey } from "@/types/artwork";

interface FilterSidebarProps {
  mediums: string[];
  activeMedium: string;
  onMedium: (m: string) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
}

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest",     label: "Newest" },
  { value: "price-asc",  label: "Price: low → high" },
  { value: "price-desc", label: "Price: high → low" },
  { value: "artist",     label: "Artist A–Z" },
];

export function FilterSidebar({ mediums, activeMedium, onMedium, sort, onSort }: FilterSidebarProps) {
  return (
    <aside className="dg-sidebar">
      <div className="dg-filter-group">
        <span className="dg-filter-heading">Medium</span>
        {mediums.map((m) => (
          <button
            key={m}
            className={`dg-filter-opt${activeMedium === m ? " active" : ""}`}
            onClick={() => onMedium(m)}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="dg-filter-group">
        <span className="dg-filter-heading">Sort by</span>
        <select
          className="dg-sort-select"
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}
