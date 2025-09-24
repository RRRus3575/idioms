import { useRouter } from "next/router";
import { useMemo } from "react";

const titleize = (s) =>
  decodeURIComponent(String(s || ""))
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * labelMap — словарь для красивых названий:
 *   ключ — либо сегмент ('search'), либо полный путь ('/idioms')
 *   значение — подпись ('Search', 'Idioms')
 * preserveQuery — если true, будет сохранять query у последних крошек
 */
export function useBreadcrumbs({ labelMap = {}, preserveQuery = false } = {}) {
  const router = useRouter();

  return useMemo(() => {
    if (!router.isReady) return [];

    const full = router.asPath;
    const pathOnly = full.split("#")[0].split("?")[0]; // '/search/advanced'
    const segments = pathOnly.split("/").filter(Boolean);

    const crumbs = [];
    let acc = "";

    // Home всегда первой
    crumbs.push({
      href: "/",
      label: labelMap["/"] || labelMap["home"] || "Home",
      isCurrent: segments.length === 0,
    });

    segments.forEach((seg, i) => {
      acc += `/${seg}`;
      const keyFull = acc;          // '/search' или '/idioms/123'
      const keySeg  = seg;          // 'search' или '123'
      const label =
        labelMap[keyFull] ??
        labelMap[keySeg] ??
        titleize(seg);

      const isLast = i === segments.length - 1;
      const href = preserveQuery && isLast ? full : acc; // при желании сохранить ?q=...

      crumbs.push({ href, label, isCurrent: isLast });
    });

    return crumbs;
  }, [router.isReady, router.asPath, JSON.stringify(labelMap), preserveQuery]);
}
