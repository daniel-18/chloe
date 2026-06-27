"use client";

import type { SortKey } from "@/types/artwork";
import { useDict } from "@/components/DictProvider";

interface FilterSidebarProps {
  mediums: string[];
  activeMedium: string;
  onMedium: (m: string) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
}

export function FilterSidebar({ mediums, activeMedium, onMedium, sort, onSort }: FilterSidebarProps) {
  const dict = useDict();

  const sortOptions: { value: SortKey; label: string }[] = [
    { value: "newest",     label: dict.filter.sortNewest },
    { value: "price-asc",  label: dict.filter.sortPriceAsc },
    { value: "price-desc", label: dict.filter.sortPriceDesc },
    { value: "artist",     label: dict.filter.sortArtist },
  ];

  return (
    <aside className="dg-sidebar">
      <div className="dg-filter-group">
        <span className="dg-filter-heading">{dict.filter.medium}</span>
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
        <span className="dg-filter-heading">{dict.filter.sortBy}</span>
        <select
          className="dg-sort-select"
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}
