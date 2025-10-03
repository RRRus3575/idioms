import Link from "next/link";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import styles from "./Breadcrumbs.module.css"

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
    <nav aria-label="Breadcrumb" className={styles.nav}>
      {crumbs.map((c, i) =>
        c.isCurrent ? (
          <span key={c.href} className={styles.span} >
            {i ? 
            (<svg className={styles.image} width="12" height="12" aria-hidden>
                    <use xlinkHref="/sprite.svg#down" className={styles.plate}/>
            </svg>)
            : ""}
            <span aria-current="page">{c.label}</span>
          </span>
        ) : (
          <span key={c.href} className={styles.span}>
            {i ? 
            (<svg className={styles.image} width="12" height="12" aria-hidden >
                    <use xlinkHref="/sprite.svg#down" className={styles.plate}/>
            </svg>)
            : ""}
            <Link href={c.href} className={styles.link}>{c.label}</Link>
          </span>
        )
      )}
    </nav>
  );
}
