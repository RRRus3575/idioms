import { useEffect, useMemo, useRef, useState } from "react";
import { useGetCategoriesQuery } from "@/store/api";
import styles from "./CategorySelect.module.css";

/**
 * value: string[]        // массив ID выбранных категорий
 * onChange: (ids: string[]) => void
 * language?: string      // если бэку нужен язык — пробрасывай, иначе можно не передавать
 */
function CategorySelect({ value = [], onChange, language, onClearAll }) {
  // если твоему эндпоинту нужны категории для конкретного языка — пробрось language
  const { data: rawCats = [], isLoading, isError } =
    useGetCategoriesQuery(language ? { language } : undefined);

  // ⚙️ Санация выбранных: убираем пустые, приводим к строкам, удаляем дубликаты
  const selectedIds = useMemo(
    () => [...new Set((Array.isArray(value) ? value : []).filter(Boolean).map(String))],
    [value]
  );

  // Нормализуем категории: поддержка и объектов {id,name}, и простых строк
  const cats = useMemo(() => {
    return rawCats.map((c) =>
      typeof c === "string" ? { id: c, name: c } : { id: String(c.id), name: c.name }
    );
  }, [rawCats]);

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // Выбранные для чипсов
  const selected = useMemo(
    () => cats.filter((c) => selectedIds.includes(c.id)),
    [cats, selectedIds]
  );

  // Доступные к выбору + фильтр по поиску (исключаем выбранные)
  const available = useMemo(() => {
    const lower = q.trim().toLowerCase();
    const base = cats.filter((c) => !selectedIds.includes(c.id));
    return lower ? base.filter((c) => c.name.toLowerCase().includes(lower)) : base;
  }, [cats, selectedIds, q]);

  // Клик вне — закрыть меню
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (!btnRef.current || !menuRef.current) return;
      if (!btnRef.current.contains(e.target) && !menuRef.current.contains(e.target)) {
        setOpen(false);
        setQ("");
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // Добавить категорию → сразу триггерим onChange; меню оставляем открытым
  const add = (id) => {
    if (!id || selectedIds.includes(id)) return;
    const next = [...selectedIds, id];
    onChange(next); // родитель сделает updateQuery({ categories: next.join(","), page:"1" })
    setQ("");       // очистим поиск — визуально видно, что опция «исчезла»
  };

  // Удалить категорию (по клику на чип)
  const remove = (id) => {
    const next = selectedIds.filter((v) => v !== id);
    onChange(next);
  };

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
            {c.name} <span className={styles.close}>
              <svg className={styles.cross} width="16" height="16" aria-hidden>
                <use xlinkHref="/sprite.svg#close" />
              </svg>
            </span>
          </button>
        ))}
        <div className={styles.triggerWrap}>
          <button
              ref={btnRef}
              type="button"
              className={`${styles.trigger} ${open ? styles.active : ""}`}
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-haspopup="listbox"
            >
              Choose a category <svg className={styles.image} width="16" height="16" aria-hidden>
                  <use xlinkHref="/sprite.svg#plus" />
                </svg>
            </button>
            {open && (
            <div ref={menuRef} className={styles.menu} role="listbox" aria-multiselectable="true">
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
        
        {value.length>0 && (<button type="button" onClick={onClearAll} className={styles.clear} >Clear all</button>)}
      </div>


    </div>
  );
}

export default CategorySelect;
