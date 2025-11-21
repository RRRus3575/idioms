import styles from "./Checkbox.module.css";

export default function Checkbox({ checked, onChange }) {
  return (
    <>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`${styles.checkboxInput} visually-hidden`}
        id="checkbox-id"
      />
      <label htmlFor="checkbox-id" className={styles.checkboxCustom}>
        <svg
          className={styles.checkboxIcon}
          width="16"
          height="16"
          aria-hidden="true"
        >
          <use xlinkHref="/sprite.svg#checkbox" />
        </svg>
      </label>
    </>
  );
}
