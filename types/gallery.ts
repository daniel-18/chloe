export interface ArtCard {
  img?: string;
  title?: string;
  artist?: string;
}

export interface CollectionData {
  id: string;
  name: string;
  medium: string;
  accent: string;
  blurb: string;
  cta: string;
  video: string | null;
  poster: string | null;
  cards: ArtCard[];
}

export interface CollectionNode {
  outer?: HTMLDivElement;
  main?: HTMLDivElement;
  title?: HTMLHeadingElement;
  track?: HTMLDivElement;
  wrap?: HTMLDivElement;
  maxX?: number;
  top?: number;
}

export type NodeKey = keyof Omit<CollectionNode, "maxX" | "top">;
