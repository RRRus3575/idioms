import { useEffect, useMemo, useRef, useState } from "react";
import { useGetCategoriesQuery } from "@/store/api";
import styles from "./CategorySelect.module.css";


function CategorySelect({ value = [], onChange, language, onClearAll }) {
  const { data: rawCats = [], isLoading, isError } =
    useGetCategoriesQuery(language ? { language } : undefined);

  // нормализация выбранных
  const selectedIds = useMemo(
    () => [...new Set((Array.isArray(value) ? value : []).filter(Boolean).map(String))],
    [value]
  );

  // нормализация категорий
  const cats = useMemo(() => {
    return rawCats.map((c) =>
      typeof c === "string" ? { id: c, name: c } : { id: String(c.id), name: c.name }
    );
  }, [rawCats]);

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // выбранные / доступные
  const selected = useMemo(
    () => cats.filter((c) => selectedIds.includes(c.id)),
    [cats, selectedIds]
  );

  const available = useMemo(() => {
    const lower = q.trim().toLowerCase();
    const base = cats.filter((c) => !selectedIds.includes(c.id));
    return lower ? base.filter((c) => c.name.toLowerCase().includes(lower)) : base;
  }, [cats, selectedIds, q]);

  // ▼ КЛЮЧЕВАЯ ЛОГИКА
  const allSelected = cats.length > 0 && selectedIds.length >= cats.length;
  const isSearching = q.trim().length > 0;
  const showTrigger = !allSelected || isSearching;     // показывать кнопку
  const showMenu    = open && (!allSelected || isSearching); // показывать меню

  // click-outside
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (!btnRef.current || !menuRef.current) return;
      if (!btnRef.current.contains(e.target) && !menuRef.current.contains(e.target)) {
        setOpen(false);
        setQ(""); // очистим поиск при явном закрытии
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // добавить категорию (не чистим поиск, если этим выбором добиваем "всё выбрано")
  const add = (id) => {
    if (!id || selectedIds.includes(id)) return;
    const next = [...selectedIds, id];
    onChange(next);
    const willBeAllSelected = next.length >= cats.length && cats.length > 0;
    if (!willBeAllSelected) setQ("");
  };

  const remove = (id) => onChange(selectedIds.filter((v) => v !== id));

  if (isLoading) return <p>Loading categories…</p>;
  if (isError) return <p>Failed to load categories</p>;

  return (
    <div className={styles.wrap}>
      <div className={styles.chips}>
        {selected.map((c) => (
          <button
            key={c.id}
            type="button"
            className={styles.chip}
            onClick={() => remove(c.id)}
            title="Remove"
          >
            {c.name}
            <span className={styles.close}>
              <svg className={styles.cross} width="16" height="16" aria-hidden>
                <use xlinkHref="/sprite.svg#plus" />
              </svg>
            </span>
          </button>
        ))}

        <div className={styles.triggerWrap}>
          {showTrigger && (
            <button
              ref={btnRef}
              type="button"
              className={`${styles.trigger} ${open ? styles.active : ""}`}
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-haspopup="listbox"
            >
              Choose a category
              <svg className={styles.image} width="16" height="16" aria-hidden>
                <use xlinkHref="/sprite.svg#plus" />
              </svg>
            </button>
          )}

          {showMenu && (
            <div
              ref={menuRef}
              className={styles.menu}
              role="listbox"
              aria-multiselectable="true"
            >
              <label className={styles.inputLabel}>
                <svg className={styles.search} width="16" height="16" aria-hidden>
                  <use xlinkHref="/sprite.svg#find" />
                </svg>
                <input
                  className={styles.input}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search categories…"
                  autoFocus
                />
              </label>

              <ul className={styles.list}>
                {available.length === 0 && (
                  <li className={styles.empty}>No categories</li>
                )}
                {available.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      className={styles.item}
                      onClick={() => add(c.id)}
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {value.length > 0 && (
          <button type="button" onClick={onClearAll} className={styles.clear}>
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}

export default CategorySelect;
