import style from "./SortSelect.module.css"
import { useEffect, useId, useMemo, useRef, useState } from "react";


const OPTIONS = [
  { value: "az",     label: "A–Z" },
  { value: "za",     label: "Z–A" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];
function SortSelect({ value = "az", onChange }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(
    Math.max(0, OPTIONS.findIndex(o => o.value === value))
  );
  const btnRef = useRef(null);
  const listRef = useRef(null);
  const listboxId = useId();

  const current = useMemo(
    () => OPTIONS.find(o => o.value === value) ?? OPTIONS[0],
    [value]
  );

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (!btnRef.current || !listRef.current) return;
      if (!btnRef.current.contains(e.target) && !listRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useEffect(() => {
    if (open) {
      const idx = Math.max(0, OPTIONS.findIndex(o => o.value === value));
      setActive(idx);
      setTimeout(() => {
        listRef.current?.querySelector(`[data-index="${idx}"]`)?.focus();
      }, 0);
    }
  }, [open, value]);

  const choose = (idx) => {
    const opt = OPTIONS[idx];
    if (!opt) return;
    onChange?.(opt.value);
    setOpen(false);
    btnRef.current?.focus();
  };

  const onButtonKey = (e) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onListKey = (e) => {
    if (e.key === "Escape") {
      e.preventDefault(); setOpen(false); btnRef.current?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); choose(active);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(OPTIONS.length - 1, i + 1));
      listRef.current?.querySelector(`[data-index="${Math.min(OPTIONS.length - 1, active + 1)}"]`)?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
      listRef.current?.querySelector(`[data-index="${Math.max(0, active - 1)}"]`)?.focus();
    } else if (e.key === "Home") {
      e.preventDefault(); setActive(0);
      listRef.current?.querySelector(`[data-index="0"]`)?.focus();
    } else if (e.key === "End") {
      e.preventDefault(); setActive(OPTIONS.length - 1);
      listRef.current?.querySelector(`[data-index="${OPTIONS.length - 1}"]`)?.focus();
    }
  };

  return (
    <div className={style.sortWrap}>
      <span className={style.sortPrefix}>Sort by:</span>
      <button
        ref={btnRef}
        type="button"
        className={style.sortBtn}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen(o => !o)}
        onKeyDown={onButtonKey}
      >
        <span className={style.sortValue}>{current.label}</span>
        <span className={`${style.sortChevron} ${open ? style.sortChevronOpen : ""}`} aria-hidden>▴</span>
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          className={style.sortMenu}
          onKeyDown={onListKey}
        >
          {OPTIONS.map((opt, idx) => {
            const selected = opt.value === value;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`${style.sortItem} ${selected ? style.sortItemSelected : ""}`}
                  data-index={idx}
                  onClick={() => choose(idx)}
                >
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}



export default SortSelect;