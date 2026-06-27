"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";
import { clamp, smooth } from "@/lib/animation";
import type { CollectionNode } from "@/types/gallery";

export interface ScrollGalleryAPI {
  scroller: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
  active: number;
  onScroll: () => void;
  goHome: () => void;
  goCol: (j: number) => void;
  arrowFor: (i: number) => (dir: number) => void;
  bind: (i: number, key: string) => (el: HTMLElement | null) => void;
}

export function useScrollGallery(
  count: number,
  reduced: boolean | null,
): ScrollGalleryAPI {
  const scroller = useRef<HTMLDivElement>(null);
  const nodes = useRef<Record<number, CollectionNode>>({});
  const reducedRef = useRef(reduced);
  const progress = useMotionValue(0);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  reducedRef.current = reduced;

  const bind = useCallback(
    (i: number, key: string) =>
      (el: HTMLElement | null): void => {
        if (!nodes.current[i]) nodes.current[i] = {};
        (nodes.current[i] as Record<string, unknown>)[key] = el ?? undefined;
      },
    [],
  );

  const onScroll = useCallback(() => {
    const sc = scroller.current;
    if (!sc) return;
    const st = sc.scrollTop;
    const vh = sc.clientHeight || 1;
    const rm = reducedRef.current;

    for (let i = 0; i < count; i++) {
      const n = nodes.current[i];
      if (!n || n.maxX == null || !n.track) continue;

      const prog = n.maxX > 0 ? clamp((st - (n.top ?? 0)) / n.maxX) : 0;
      n.track.style.transform = `translate3d(${(-prog * n.maxX).toFixed(1)}px,0,0)`;

      if (rm) {
        if (n.main) n.main.style.opacity = "1";
        if (n.title) n.title.style.transform = "none";
        if (n.wrap) n.wrap.style.transform = "none";
        continue;
      }

      const top = n.top ?? 0;
      const enterP = smooth(clamp((st - (top - vh)) / vh));
      const leaveP = smooth(clamp((st - (top + n.maxX)) / vh));
      const a = enterP * (1 - leaveP);
      if (n.main) n.main.style.opacity = a.toFixed(3);
      if (n.title) n.title.style.transform = `translateY(${(((1 - enterP) * 80) - leaveP * 80).toFixed(1)}px)`;
      if (n.wrap) n.wrap.style.transform = `translateY(${(((1 - enterP) * 120) - leaveP * 70).toFixed(1)}px)`;
    }

    let ai = 0;
    for (let i = 0; i < count; i++) {
      const n = nodes.current[i];
      if (n && n.top != null && st >= n.top - vh * 0.5) ai = i + 1;
    }
    if (ai !== activeRef.current) {
      activeRef.current = ai;
      setActive(ai);
    }
    progress.set(st / vh);
  }, [count, progress]);

  const recalc = useCallback(() => {
    const sc = scroller.current;
    if (!sc) return;
    const vh = sc.clientHeight;

    for (let i = 0; i < count; i++) {
      const n = nodes.current[i];
      if (!n || !n.track || !n.wrap || !n.outer) continue;
      const maxX = Math.max(0, n.track.scrollWidth - n.wrap.clientWidth);
      n.maxX = maxX;
      n.outer.style.height = `${vh + maxX}px`;
    }
    for (let i = 0; i < count; i++) {
      const n = nodes.current[i];
      if (n?.outer) n.top = n.outer.offsetTop;
    }
    onScroll();
  }, [count, onScroll]);

  useEffect(() => {
    recalc();
    const t = setTimeout(recalc, 350);
    window.addEventListener("resize", recalc);
    if (document.fonts?.ready) document.fonts.ready.then(recalc);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", recalc);
    };
  }, [recalc]);

  const goHome = useCallback(() => {
    scroller.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goCol = useCallback((j: number) => {
    const n = nodes.current[j];
    if (n && scroller.current) {
      scroller.current.scrollTo({ top: (n.top ?? 0) + 2, behavior: "smooth" });
    }
  }, []);

  const arrowFor = useCallback(
    (i: number) =>
      (dir: number): void => {
        const sc = scroller.current;
        const n = nodes.current[i];
        if (!sc || !n) return;
        const firstCard = n.track?.firstElementChild as HTMLElement | null;
        const cardWidth = firstCard?.offsetWidth ?? 320;
        sc.scrollBy({ top: dir * (cardWidth + 24), behavior: "smooth" });
      },
    [],
  );

  return { scroller, progress, active, onScroll, goHome, goCol, arrowFor, bind };
}
