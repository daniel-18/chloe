"use client";

import { useRef, useEffect } from "react";

interface BgVideoProps {
  src: string;
  poster?: string | null;
  reduced: boolean | null;
  className?: string;
}

export function BgVideo({ src, poster, reduced, className }: BgVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;

    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;

    const tryPlay = () => {
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };

    tryPlay();

    const events = ["pointerdown", "keydown", "touchstart", "wheel"] as const;
    const kick = () => { tryPlay(); cleanup(); };
    const cleanup = () => events.forEach((e) => window.removeEventListener(e, kick));
    events.forEach((e) => window.addEventListener(e, kick, { once: true }));

    return cleanup;
  }, [reduced, src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster ?? undefined}
      autoPlay={!reduced}
      loop
      muted
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}
