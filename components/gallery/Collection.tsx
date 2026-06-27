"use client";

import { two } from "@/lib/animation";
import type { CollectionData } from "@/types/gallery";
import { BgVideo } from "./BgVideo";
import { Ico, Social, ICON_PATHS } from "./Icons";

interface CollectionProps {
  collection: CollectionData;
  index: number;
  reduced: boolean | null;
  bindOuter: (el: HTMLDivElement | null) => void;
  bindMain: (el: HTMLDivElement | null) => void;
  bindTitle: (el: HTMLHeadingElement | null) => void;
  bindTrack: (el: HTMLDivElement | null) => void;
  bindWrap: (el: HTMLDivElement | null) => void;
  onArrow: (dir: number) => void;
}

export function Collection({
  collection: c,
  index,
  reduced,
  bindOuter,
  bindMain,
  bindTitle,
  bindTrack,
  bindWrap,
  onArrow,
}: CollectionProps) {
  const arts = (c.cards ?? []).map((x) => ({ ...x }));
  const items: (typeof arts[0] & { accent?: boolean })[] = [...arts];
  items.splice(Math.min(2, items.length), 0, { accent: true });

  return (
    <div
      className="hsection"
      ref={bindOuter}
      style={{ "--accent": c.accent } as React.CSSProperties}
    >
      <div className="hsticky">
        {/* {c.video ? (
          <BgVideo src={c.video} poster={c.poster} reduced={reduced} className="hbg-video" />
        ) : (
          <div className="hbg-accent" aria-hidden="true" />
        )} */}
        <div className="hbg-accent" aria-hidden="true" />
        <div className="hbg-scrim" aria-hidden="true" />

        <div className="hmain" ref={bindMain}>
          <p className="hlabel">{c.medium} · collection {two(index)}</p>

          <h2 className="hbigtitle" ref={bindTitle}>{c.name}</h2>

          <div className="htrack-wrap mx-12" ref={bindWrap}>
            <div className="htrack" ref={bindTrack}>
              {items.map((item, i) => {
                if (item.accent) {
                  return (
                    <div className="hcard hcard-accent" key={"a" + i}>
                      <span className="ac-label">{c.medium}</span>
                      <p className="ac-desc">{c.blurb}</p>
                      <span className="ac-spacer" />
                      <button className="ac-btn">{c.cta}</button>
                    </div>
                  );
                }
                if (!item.img) {
                  return (
                    <div className="hcard hcard-empty" key={i}>
                      <span className="hc-plus">+</span>
                      <span className="hc-ph">Awaiting artwork</span>
                    </div>
                  );
                }
                return (
                  <div className="hcard" key={i}>
                    <img src={item.img} alt={item.title ?? ""} draggable="false" />
                    <div className="hc-cap">
                      <span className="hc-t">{item.title}</span>
                      <span className="hc-a">{item.artist}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hbottom">
            <div className="hbleft">
              {/* <div className="hsocial">
                <span><Social kind="fb" /></span>
                <span><Social kind="ig" /></span>
                <span><Social kind="tw" /></span>
              </div>
              <button className="visit">
                Visit An Exhibition <Ico d={ICON_PATHS.ARROW} size={16} />
              </button> */}
            </div>
            <div className="harrows">
              <button className="harrow" onClick={() => onArrow(-1)} aria-label="Previous">
                <Ico d={ICON_PATHS.ARROWL} size={18} />
              </button>
              <button className="harrow solid" onClick={() => onArrow(1)} aria-label="Next">
                <Ico d={ICON_PATHS.ARROW} size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
