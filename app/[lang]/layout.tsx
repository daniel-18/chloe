import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { DictProvider } from "@/components/DictProvider";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return <DictProvider dict={dict}>{children}</DictProvider>;
}
