export interface ArtworkProduct {
  id: string;
  img: string;
  title: string;
  artist: string;
  medium: string;
  collection: string;
  price: number;
  edition: string;
  year: number;
  inStock: boolean;
}

export interface CartItem {
  artwork: ArtworkProduct;
  quantity: number;
}

export type SortKey = "newest" | "price-asc" | "price-desc" | "artist";
