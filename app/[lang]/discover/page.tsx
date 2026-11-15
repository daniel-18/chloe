import { DiscoverClient } from "@/components/discover/DiscoverClient";
import "../../gallery.css";
import "../../discover/discover.css";

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<{ medium?: string | string[] }>;
}) {
  const { medium } = await searchParams;

  return (
    <DiscoverClient
      initialMedium={Array.isArray(medium) ? medium[0] : medium}
    />
  );
}
