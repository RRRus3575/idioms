import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./ListIdioms.module.css";

const slugify = (s = "") =>
  s.normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .toLowerCase();

export default function ListIdioms({ idioms = [], lang }) {
  const router = useRouter();
  const safeLang = (lang || router.query.lang || "en").toString();
  const backTo = useMemo(
    () => (router.asPath && router.asPath !== "" ? router.asPath : "/search"),
    [router.asPath]
  );

  const speak = (text) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    speechSynthesis.speak(u);
  };

  return (
    <ul className={styles.list}>
      {idioms.map(({ id, text, localization = {}, analogs = [] }) => {
        const slug = slugify(text || "");

        const href = id
          ? `/idioms/${encodeURIComponent(slug)}--${encodeURIComponent(id)}`
            + `?lang=${encodeURIComponent(safeLang)}&from=${encodeURIComponent(backTo)}`
          : `/search?q=${encodeURIComponent(text || "")}&lang=${encodeURIComponent(safeLang)}`;

        return (
          <li key={id || text} className={styles.idiomoitems}>
            <div className={styles.wrapperright}>
              <div className={styles.titleblock}>
                <Link prefetch={false} href={href} className={styles.titleLink} aria-label={`Open idiom ${text}`}>
                  <h3 className={styles.title}>{text}</h3>
                </Link>

                <button type="button" className={styles.button}
                        onClick={() => speak(text)} aria-label="reproduction of an idiom by voice">
                  <svg width="16" height="16"><use xlinkHref="/sprite.svg#sound" /></svg>
                </button>

                <button type="button" className={styles.button} aria-label="add to favorites">
                  <svg width="16" height="16"><use xlinkHref="/sprite.svg#bookmark" /></svg>
                </button>
              </div>

              <div className={styles.block}>
                <h4 className={styles.blocktitle}>Meaning</h4>
                <p>{localization?.meaning}</p>
              </div>

              {!!analogs?.length && (
                <div>
                  <h4 className={styles.blocktitle}>Analogs</h4>
                  <ul>
                    {analogs.map(({ id: aid, language, phrase }) => (
                      <li key={aid || `${language}-${phrase}`}>
                        <em className={styles.violet}>{language}:</em> “{phrase}”
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <Link prefetch={false} href={href} className={styles.readmore} aria-label={`Open idiom ${text}`}>
                Read more
                <svg width="16" height="16" aria-hidden><use xlinkHref="/sprite.svg#arrow" /></svg>
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
