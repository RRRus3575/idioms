// Components/Breadcrumbs/Breadcrumbs.jsx
import Link from "next/link";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({
  backHref = null,                 // например: "/search?q=...&lang=..."
  currentLabel = null,             // например: idiom.text
  labelMap = { "/": "Home", "/search": "Search", "/idioms": "Idioms" },
  preserveQuery = false,
  className = "",
  separatorIcon = "/sprite.svg#down",
}) {
  // РУЧНОЙ РЕЖИМ (страница идиомы и т.п.)
  if (currentLabel != null) {
    return (
      <nav aria-label="Breadcrumb" className={`${styles.nav} ${className}`}>
        <span className={styles.span}>
          <Link href="/" className={styles.link}>{labelMap["/"] || "Home"}</Link>
        </span>

        {backHref && (
          <span className={styles.span}>
            <svg className={styles.image} width="12" height="12" aria-hidden>
              <use xlinkHref={separatorIcon} />
            </svg>
            <Link href={backHref} className={styles.link}>
              {labelMap["/search"] || "Search"}
            </Link>
          </span>
        )}

        <span className={styles.span}>
          <svg className={styles.image} width="12" height="12" aria-hidden>
            <use xlinkHref={separatorIcon} />
          </svg>
          <span aria-current="page">{currentLabel}</span>
        </span>
      </nav>
    );
  }

  // АВТО-РЕЖИМ (обычные страницы, напр. /search)
  const crumbs = useBreadcrumbs({ labelMap, preserveQuery });
  if (!crumbs?.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={`${styles.nav} ${className}`}>
      {crumbs.map((c, i) => {
        const first = i === 0;
        return c.isCurrent ? (
          <span key={c.href || i} className={styles.span}>
            {!first && (
              <svg className={styles.image} width="12" height="12" aria-hidden>
                <use xlinkHref={separatorIcon} />
              </svg>
            )}
            <span aria-current="page">{c.label}</span>
          </span>
        ) : (
          <span key={c.href || i} className={styles.span}>
            {!first && (
              <svg className={styles.image} width="12" height="12" aria-hidden>
                <use xlinkHref={separatorIcon} />
              </svg>
            )}
            <Link href={c.href} className={styles.link}>{c.label}</Link>
          </span>
        );
      })}
    </nav>
  );
}
