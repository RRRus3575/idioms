import styles from "./Input.module.css"

export default function Input ({onChange, error, label, value, name, sup}) {

    return(
        <label className={styles.label}>
            {label} {sup && <sup className={styles.sup}>{sup}</sup>}
            <input
                onChange={onChange}
                className={`${styles.input} ${error?.text ? styles.inputError : ""}`}
                value={value}
                name={name}
            />
            {error?.text &&<p className={styles.errorText}>{error.text}</p>}
        </label>
    )
}