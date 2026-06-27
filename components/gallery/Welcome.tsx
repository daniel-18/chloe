"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { clamp, smooth, fanPos } from "@/lib/animation";
import { WELCOME_CARDS } from "@/data/collections";
import { Ico, ICON_PATHS } from "./Icons";
import { useDict } from "@/components/DictProvider";

interface WelcomeProps {
  progress: MotionValue<number>;
  reduced: boolean | null;
}

export function Welcome({ progress, reduced }: WelcomeProps) {
  const dict = useDict();
  const { lang } = useParams<{ lang: string }>();
  const d = useTransform(progress, (p) => -p);
  const opacity = useTransform(d, (v) =>
    reduced ? 1 : smooth(clamp(1 - Math.abs(v) / 0.66)),
  );
  const yShift = useTransform(d, (v) => (reduced ? 0 : v * -40));

  const cards = WELCOME_CARDS.slice(0, 5);
  const pos = fanPos(cards.length);

  return (
    <section className="welcome">
      <div className="bg-accent" style={{ "--accent": "#ff6a00" } as React.CSSProperties} aria-hidden="true" />
      <div className="dots" aria-hidden="true" />
      <span className="spark s1" aria-hidden="true">✦</span>
      <span className="spark s2" aria-hidden="true">✦</span>
      <span className="spark s3" aria-hidden="true">✦</span>

      <motion.div className="hero-body" style={{ opacity, y: yShift }}>
        <h1 className="htitle">
          <span className="g">{dict.welcome.titleLine1} </span>
          <span className="w"> {dict.welcome.titleLine2}</span>
          <br />
        </h1>
        <p className="hsub">{dict.welcome.subtitle}</p>

        <div className="hbtns">
          <Link href={`/${lang}/discover`} className="btn-dark" style={{ textDecoration: "none" }}>
            {dict.welcome.discoverGallery}{" "}
            <span className="arrowc">
              <Ico d={ICON_PATHS.ARROW} size={15} />
            </span>
          </Link>
        </div>
      </motion.div>

      <motion.div className="fan" style={{ opacity, y: yShift }}>
        {cards.map((card, i) => {
          const p = pos[i];
          return (
            <motion.div
              key={i}
              className="fan-out "
              style={{ zIndex: p.z }}
              initial={reduced ? false : { opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div
                className="fan-pos"
                style={{
                  transform: `translate(calc(-50% + ${p.tx}), ${p.ty}px) rotate(${p.rot}deg) scale(${p.sc})`,
                }}
              >
                <motion.div
                  className="fcard"
                  whileHover={reduced ? {} : { y: -16, scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                >
                  <div className="fcard-head">
                    <div className="fc-meta">
                      <div className="fc-title">{card.title}</div>
                      <div className="fc-artist">{card.artist}</div>
                    </div>
                  </div>
                  <img
                    className="fcard-art"
                    src={card.img}
                    alt={card.title ?? ""}
                    draggable="false"
                  />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="scrollcue" aria-hidden="true">
        <span className="hint-dot" /> {dict.welcome.scrollToExplore}
      </div>
    </section>
  );
}
