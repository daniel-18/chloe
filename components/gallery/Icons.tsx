import React from "react";

interface IcoProps extends React.SVGProps<SVGSVGElement> {
  d: string;
  size?: number;
}

export function Ico({ d, size = 18, ...props }: IcoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={d} />
    </svg>
  );
}

export function Coin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="12" r="6" stroke="#f4b740" strokeWidth="2" />
      <circle cx="15" cy="12" r="6" stroke="#f4b740" strokeWidth="2" opacity=".7" />
    </svg>
  );
}

type SocialKind = "fb" | "ig" | "tw";

export function Social({ kind }: { kind: SocialKind }) {
  if (kind === "fb") {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    );
  }
  if (kind === "ig") {
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

export const ICON_PATHS = {
  ARROW:  "M5 12h13M13 6l6 6-6 6",
  ARROWL: "M19 12H6M11 6l-6 6 6 6",
  BELL:   "M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 004 0",
  PLUS:   "M12 5v14M5 12h14",
  HEART:  "M12 20s-7-4.4-9.2-8.6A4.7 4.7 0 0112 5a4.7 4.7 0 019.2 6.4C19 15.6 12 20 12 20z",
  STAR:   "M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z",
} as const;
