import type { ArtCard, CollectionData } from "@/types/gallery";
import { IMG, HERO_VIDEO, HERO_POSTER } from "./images";

export interface NewArtworkItem {
  img: string;
  title: string;
  artist: string;
  medium: string;
}

export const NEW_ARTWORKS: NewArtworkItem[] = [
  { img: IMG.garden,  title: "Tree of Vigils",   artist: "Ada Vance",      medium: "Pen & Ink" },
  { img: IMG.eyemoon, title: "Eclipse",           artist: "Mia Davis",      medium: "Digital" },
  { img: IMG.rabbit,  title: "The Hare-Crowned",  artist: "Eli Marsh",      medium: "Pen & Ink" },
  { img: IMG.bar,     title: "Last Call",         artist: "Nora West",      medium: "Gouache" },
];

export const COLLECTIONS: CollectionData[] = [
  {
    id: "nocturnes",
    name: "Nocturnes",
    medium: "Pen & ink",
    accent: "#ff6a00",
    blurb: "Eight surreal plates in fine black line — eyes, eclipses, halos and quiet apparitions.",
    cta: "View Series",
    video: HERO_VIDEO,
    poster: HERO_POSTER,
    cards: [
      { img: IMG.garden,  title: "Tree of Vigils",   artist: "Plate I" },
      { img: IMG.eyemoon, title: "Eclipse",           artist: "Plate II" },
      { img: IMG.rabbit,  title: "The Hare-Crowned",  artist: "Plate III" },
      { img: IMG.bar,     title: "Last Call",          artist: "Plate IV" },
      { img: IMG.orbfig,  title: "Among the Saints",  artist: "Plate V" },
      { img: IMG.octopus, title: "The Deep",           artist: "Plate VI" },
      { img: IMG.youth,   title: "Run",                artist: "Plate VII" },
      { img: IMG.backfig, title: "The Turning",        artist: "Plate VIII" },
    ],
  },
  {
    id: "series-2", name: "Series II", medium: "Add medium", accent: "#ff8a1f",
    blurb: "Your second style. Replace this text, add a background video, and fill the cards.",
    cta: "View Series", video: null, poster: null,
    cards: [{}, {}, {}, {}, {}],
  },
  {
    id: "series-3", name: "Series III", medium: "Add medium", accent: "#ef6c1a",
    blurb: "Your third style. Each empty card is a slot waiting for an image.",
    cta: "View Series", video: null, poster: null,
    cards: [{}, {}, {}, {}, {}],
  },
  {
    id: "series-4", name: "Series IV", medium: "Add medium", accent: "#ff9d3c",
    blurb: "Your fourth style. Give it a name, a mood, and a looping reel.",
    cta: "View Series", video: null, poster: null,
    cards: [{}, {}, {}, {}, {}],
  },
  {
    id: "series-5", name: "Series V", medium: "Add medium", accent: "#e85d04",
    blurb: "Your fifth style. Add as many works as you like.",
    cta: "View Series", video: null, poster: null,
    cards: [{}, {}, {}, {}, {}],
  },
  {
    id: "series-6", name: "Series VI", medium: "Add medium", accent: "#fb8500",
    blurb: "Your sixth style — the last room in the gallery, for now.",
    cta: "View Series", video: null, poster: null,
    cards: [{}, {}, {}, {}, {}],
  },
];

export const WELCOME_CARDS: ArtCard[] = [
  { img: IMG.garden,  title: "Tree of Vigils", artist: "Ada Vance" },
  { img: IMG.eyemoon, title: "Eclipse",         artist: "Mia Davis" },
  { img: IMG.youth,   title: "Sun Chase",       artist: "Noah Wilson" },
  { img: IMG.orbfig,  title: "Among Saints",    artist: "Liam Miller" },
  { img: IMG.backfig, title: "The Turning",     artist: "Isabella Brown" },
];



