import type { ArtCard, CollectionData } from "@/types/gallery";
import { IMG, HERO_VIDEO, HERO_POSTER } from "./images";

export interface NewArtworkItem {
  img: string;
  title: string;
  artist: string;
  medium: string;
}

export const NEW_ARTWORKS: NewArtworkItem[] = [
  { img: IMG.garden,  title: "Tree of Vigils",   artist: "Ada Vance",      medium: "Illustrations" },
  { img: IMG.eyemoon, title: "Eclipse",           artist: "Mia Davis",      medium: "Autocollants" },
  { img: IMG.rabbit,  title: "The Hare-Crowned",  artist: "Eli Marsh",      medium: "Pixel Art" },
  { img: IMG.bar,     title: "Last Call",         artist: "Nora West",      medium: "Bande dessinée" },
  { img: IMG.bar,     title: "Last Call",         artist: "Nora West",      medium: "Zines" },
  { img: IMG.bar,     title: "Last Call",         artist: "Nora West",      medium: "Vetements" },
];

export const COLLECTIONS: CollectionData[] = [
  {
    id: "Illustrations",
    name: "Illustrations",
    medium: "Illustrations",
    accent: "#ff6a00",
    blurb: "Eight surreal plates in fine black line — eyes, eclipses, halos and quiet apparitions.",
    cta: "View Series",
    video: HERO_VIDEO,
    poster: HERO_POSTER,
    cards: [
      { img: IMG.garden,  title: "Tree of Vigils",   artist: "Chloe-la machine creative" },
      { img: IMG.eyemoon, title: "Eclipse",           artist: "Chloe-la machine creative" },
      { img: IMG.rabbit,  title: "The Hare-Crowned",  artist: "Chloe-la machine creative" },
      { img: IMG.bar,     title: "Last Call",          artist: "Chloe-la machine creative" },
      { img: IMG.orbfig,  title: "Among the Saints",  artist: "Chloe-la machine creative" },
      { img: IMG.octopus, title: "The Deep",           artist: "Chloe-la machine creative" },
      { img: IMG.youth,   title: "Run",                artist: "Chloe-la machine creative" },
      { img: IMG.backfig, title: "The Turning",        artist: "Chloe-la machine creative" },
    ],
  },
  {
    id: "Autocollants", name: "Autocollants", medium: "Autocollants", accent: "#ff8a1f",
    blurb: "Your second style. Replace this text, add a background video, and fill the cards.",
    cta: "View Series", video: null, poster: null,
    cards: [{}, {}, {}, {}, {}],
  },
  {
    id: "Pixel Art", name: "Pixel Art", medium: "Pixel Art", accent: "#ef6c1a",
    blurb: "Your third style. Each empty card is a slot waiting for an image.",
    cta: "View Series", video: null, poster: null,
    cards: [{}, {}, {}, {}, {}],
  },
  {
    id: "Bande dessinée", name: "Bande dessinée", medium: "Bande dessinée", accent: "#ff9d3c",
    blurb: "Your fourth style. Give it a name, a mood, and a looping reel.",
    cta: "View Series", video: null, poster: null,
    cards: [{}, {}, {}, {}, {}],
  },
  {
    id: "Zines", name: "Zines", medium: "Zines", accent: "#e85d04",
    blurb: "Your fifth style. Add as many works as you like.",
    cta: "View Series", video: null, poster: null,
    cards: [{}, {}, {}, {}, {}],
  },
  {
    id: "Vetements", name: "Vetements", medium: "Vetements", accent: "#fb8500",
    blurb: "Your sixth style — the last room in the gallery, for now.",
    cta: "View Series", video: null, poster: null,
    cards: [{}, {}, {}, {}, {}],
  },
];

export const WELCOME_CARDS: ArtCard[] = [
  { img: IMG.garden,  title: "Tree of Vigils", artist: "Chloe-la machine creative" },
  { img: IMG.eyemoon, title: "Eclipse",         artist: "Chloe-la machine creative" },
  { img: IMG.youth,   title: "Sun Chase",       artist: "Chloe-la machine creative" },
  { img: IMG.orbfig,  title: "Among Saints",    artist: "Chloe-la machine creative" },
  { img: IMG.backfig, title: "The Turning",     artist: "Chloe-la machine creative" },
];



