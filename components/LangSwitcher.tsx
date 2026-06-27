"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDict } from "./DictProvider";

export function LangSwitcher() {
  const dict = useDict();
  const pathname = usePathname();
  const targetLocale = dict.lang.otherLocale;
  const targetPath = pathname.replace(/^\/(en|fr)/, `/${targetLocale}`);

  return (
    <Link href={targetPath} className="lang-switcher">
      {dict.lang.other}
    </Link>
  );
}
