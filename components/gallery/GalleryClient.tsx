"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useReducedMotion, motion, useTransform } from "framer-motion";
import { COLLECTIONS } from "@/data/collections";
import { useScrollGallery } from "@/hooks/useScrollGallery";
import { Welcome } from "./Welcome";
import { NewArtwork } from "./NewArtwork";
import { Collection } from "./Collection";
import { ExhibitSection } from "./ExhibitSection";
import { Ico, ICON_PATHS } from "./Icons";
import { useDict } from "@/components/DictProvider";
import { LangSwitcher } from "@/components/LangSwitcher";

export function GalleryClient() {
  const dict = useDict();
  const { lang } = useParams<{ lang: string }>();
  const reduced = useReducedMotion();
  const { scroller, progress, onScroll, goHome, arrowFor, bind } =
    useScrollGallery(COLLECTIONS.length, reduced);

  const navLinkOpacity = useTransform(progress, [0.78, 1.18], [0, 1]);
  const navLinkY = useTransform(progress, [0.78, 1.18], [-8, 0]);

  return (
    <div className="folio-root">
      <nav className="hnav">
        <button className="brand" onClick={goHome}>
          <span className="brandname">CHLOE</span>
        </button>

        <motion.div
          className="nav-after-hero"
          style={reduced ? { opacity: 1 } : { opacity: navLinkOpacity, y: navLinkY }}
        >
          <Link href={`/${lang}/discover`} className="nav-gallery-link">
            {dict.nav.gallery}
          </Link>
        </motion.div>

        <LangSwitcher />
      </nav>

      <div
        ref={scroller}
        className="scroller"
        tabIndex={0}
        onScroll={onScroll}
        role="region"
        aria-label={dict.welcome.ariaScroller}
      >
        <Welcome progress={progress} reduced={reduced} />
        <NewArtwork />

        {COLLECTIONS.map((c, i) => (
          <Fragment key={c.id}>
            <Collection
              collection={c}
              index={i}
              reduced={reduced}
              bindOuter={bind(i, "outer") as (el: HTMLDivElement | null) => void}
              bindMain={bind(i, "main") as (el: HTMLDivElement | null) => void}
              bindTitle={bind(i, "title") as (el: HTMLHeadingElement | null) => void}
              bindTrack={bind(i, "track") as (el: HTMLDivElement | null) => void}
              bindWrap={bind(i, "wrap") as (el: HTMLDivElement | null) => void}
              onArrow={arrowFor(i)}
            />
            <ExhibitSection collection={c} index={i} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
