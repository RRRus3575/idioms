import Link from "next/link";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

export default function Breadcrumbs() {
  const crumbs = useBreadcrumbs({
    labelMap: {
      "/search": "Search",
      "/idioms": "Idioms",
      // при необходимости добавляй кастомные подписи
    },
    preserveQuery: false, // сделай true, если надо сохранить ?q= в последней крошке
  });

  return (
    <nav aria-label="Breadcrumb">
      {crumbs.map((c, i) =>
        c.isCurrent ? (
          <span key={c.href}>
            {i ? " › " : ""}
            <span aria-current="page">{c.label}</span>
          </span>
        ) : (
          <span key={c.href}>
            {i ? " › " : ""}
            <Link href={c.href}>{c.label}</Link>
          </span>
        )
      )}
    </nav>
  );
}
