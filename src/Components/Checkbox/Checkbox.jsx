import styles from "./Checkbox.module.css";
import { useId } from "react";

export default function Checkbox({ name, checked, onChange }) {


  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`${styles.checkboxInput} visually-hidden`}
        name={name}
      />
      <span className={styles.checkboxCustom}>
        <svg
          className={styles.checkboxIcon}
          width="15"
          height="15"
          aria-hidden="true"
        >
          <use xlinkHref="/sprite.svg#checkbox" />
        </svg>
      </span>
    </div>
  );
}
