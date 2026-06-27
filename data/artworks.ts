import type { ArtworkProduct } from "@/types/artwork";
import { IMG } from "./images";

export const ARTWORK_CATALOG: ArtworkProduct[] = [
  { id: "aw-01", img: IMG.garden,  title: "Tree of Vigils",           artist: "Ada Vance",      medium: "Pen & Ink",    collection: "Nocturnes", price: 1200, edition: "Original",  year: 2024, inStock: true  },
  { id: "aw-02", img: IMG.eyemoon, title: "Eclipse",                   artist: "Mia Davis",      medium: "Digital Print", collection: "Nocturnes", price: 285,  edition: "2 / 10",   year: 2024, inStock: true  },
  { id: "aw-03", img: IMG.rabbit,  title: "The Hare-Crowned",          artist: "Eli Marsh",      medium: "Pen & Ink",    collection: "Nocturnes", price: 950,  edition: "Original",  year: 2024, inStock: true  },
  { id: "aw-04", img: IMG.bar,     title: "Last Call",                 artist: "Nora West",      medium: "Gouache",      collection: "Nocturnes", price: 780,  edition: "Original",  year: 2023, inStock: true  },
  { id: "aw-05", img: IMG.orbfig,  title: "Among the Saints",          artist: "Liam Miller",    medium: "Pen & Ink",    collection: "Nocturnes", price: 1450, edition: "Original",  year: 2024, inStock: false },
  { id: "aw-06", img: IMG.octopus, title: "The Deep",                  artist: "Sera Kim",       medium: "Digital Print", collection: "Nocturnes", price: 185,  edition: "5 / 10",   year: 2024, inStock: true  },
  { id: "aw-07", img: IMG.youth,   title: "Run",                       artist: "Noah Wilson",    medium: "Charcoal",     collection: "Nocturnes", price: 620,  edition: "Original",  year: 2024, inStock: true  },
  { id: "aw-08", img: IMG.backfig, title: "The Turning",               artist: "Isabella Brown", medium: "Pen & Ink",    collection: "Nocturnes", price: 890,  edition: "Original",  year: 2023, inStock: true  },
  { id: "aw-09", img: IMG.garden,  title: "Tree of Vigils — Print",    artist: "Ada Vance",      medium: "Giclée Print", collection: "Nocturnes", price: 195,  edition: "3 / 25",   year: 2024, inStock: true  },
  { id: "aw-10", img: IMG.youth,   title: "Run — Print",               artist: "Noah Wilson",    medium: "Giclée Print", collection: "Nocturnes", price: 145,  edition: "7 / 25",   year: 2024, inStock: true  },
  { id: "aw-11", img: IMG.bar,     title: "Last Call — Print",         artist: "Nora West",      medium: "Giclée Print", collection: "Nocturnes", price: 165,  edition: "4 / 25",   year: 2023, inStock: true  },
  { id: "aw-12", img: IMG.rabbit,  title: "The Hare-Crowned — Print",  artist: "Eli Marsh",      medium: "Giclée Print", collection: "Nocturnes", price: 175,  edition: "1 / 25",   year: 2024, inStock: true  },
];
