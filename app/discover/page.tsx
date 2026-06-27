import { DiscoverClient } from "@/components/discover/DiscoverClient";
import "../gallery.css";
import "./discover.css";

export const metadata = {
  title: "Discover Gallery — CHLOE",
  description: "Acquire original artworks and limited edition prints from the ArtSpace collection.",
};

export default function DiscoverPage() {
  return <DiscoverClient />;
}
