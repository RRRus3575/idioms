import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./LanguageSelectWithSearch.module.css";

export default function LanguageSelectWithSearch({
  options = [],                     // [{ value, label }, ...]
  value = "",                       // выбранное значение, например "en"
  onChange,
  placeholder = "Search language of the idiom…",
  clear,                            // необязательный проп: внешняя очистка, если нужен
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapRef = useRef(null);

  // синхронизируем текст в инпуте с выбранным значением
  useEffect(() => {
    const current = options.find((o) => o.value === value);
    setSearch(current ? current.label : "");
  }, [value, options]);

  // клик вне компонента — закрываем список
  useEffect(() => {
    const handler = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, search]);

  const handleSelect = (option) => {
    onChange?.(option.value);
    setOpen(false);
  };

  const handleClear = () => {
    // если родитель передал свой clear — даём ему сработать
    if (clear) {
      clear();
    } else {
      // иначе просто сбрасываем значение через onChange("")
      onChange?.("");
    }
    setSearch("");
    setOpen(false);
  };

  return (
      
        <div className={styles.inputWrap} onClick={() => setOpen(true)}>
          <svg className={styles.search} width="16" height="16" aria-hidden>
            <use xlinkHref="/sprite.svg#find" />
          </svg>

          <input
            className={styles.input}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (!open) setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
          />

          {/* кнопка очистки, показываем только если что-то выбрано */}
          {value && (
            <button
              type="button"
              className={styles.clear}
              onClick={handleClear}
              aria-label="Clear language"
            >
              <svg className={styles.clearIcon} width="16" height="16" aria-hidden>
                <use xlinkHref="/sprite.svg#plus" />
              </svg>
            </button>
          )}

          {open && (
            <ul className={styles.list}>
              {filtered.length === 0 && (
                <li className={styles.empty}>Nothing found</li>
              )}
              {filtered.map((opt) => (
                <li
                  key={opt.value}
                  className={styles.item}
                  onClick={() => handleSelect(opt)}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>

  );
}
