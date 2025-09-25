import { useEffect, useMemo, useRef, useState } from "react";
import { useGetCategoriesQuery } from "@/store/api";
import styles from "./CategorySelect.module.css";

/**
 * value: string[]        // массив ID выбранных категорий
 * onChange: (ids: string[]) => void
 * language?: string      // если бэку нужен язык — пробрасывай, иначе можно не передавать
 */
function CategorySelect({ value = [], onChange, language }) {
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
            {c.name} <span className={styles.close}>×</span>
          </button>
        ))}

        <button
          ref={btnRef}
          type="button"
          className={styles.trigger}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          Choose a category +
        </button>
      </div>

      {open && (
        <div ref={menuRef} className={styles.menu} role="listbox" aria-multiselectable="true">
          <input
            className={styles.search}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search categories…"
            autoFocus
          />

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
  );
}

export default CategorySelect;
