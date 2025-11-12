import { useState } from "react";
import styles from "./StarRating.module.css";

export default function StarRating({
  value = 0,
  onChange,
  size = 24,
  readOnly = false,
  label = "Rate",
}) {
  const [hover, setHover] = useState(null);
  const display = hover ?? value;

  const setValue = (v) => {
    onChange?.(v);
    setHover(v); // чтобы сразу подсветить нужное количество
  };

  const handleKey = (e) => {
    if (readOnly || !onChange) return;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      const v = Math.min(5, (hover ?? value) + 1);
      setValue(v);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      const v = Math.max(1, (hover ?? value) - 1);
      setValue(v);
    } else if (e.key === "0") {
      e.preventDefault();
      setValue(0);
    } else if (e.key === "Enter" || e.key === " ") {
      // подтверждаем текущий hover/value, а затем убираем hover
      e.preventDefault();
      onChange?.(display);
      setHover(null);
    }
  };

  return (
    <div
      className={styles.stars}
      role="radiogroup"
      aria-label={label}
      onKeyDown={handleKey}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const active = display >= i;
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={value === i}
            className={`${styles.star} ${active ? styles.active : ""}`}
            onMouseEnter={() => !readOnly && setHover(i)}
            onMouseLeave={() => !readOnly && setHover(null)}
            onFocus={() => !readOnly && setHover(i)}   // ← фокус как hover
            onBlur={() => !readOnly && setHover(null)} // ← убираем подсветку
            onClick={() => !readOnly && setValue(i)}
            style={{ width: size, height: size }}
            disabled={readOnly}
          >
            <svg width={32} height={32} aria-hidden="true">
              <use xlinkHref="/sprite.svg#star" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
