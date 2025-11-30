import styles from "./Input.module.css"

export default function Input ({onChange, error, label, value, name, sup}) {
    const fieldError = error?.[name];
    console.log("error :", fieldError)

    return(
        <label className={styles.label}>
            <span>{label} {sup && <sup className={styles.sup}>{sup}</sup>}</span>
            <input
                onChange={onChange}
                className={`${styles.input} ${fieldError ? styles.inputError : ""}`}
                value={value}
                name={name}
            />
            {fieldError && <p className={styles.errorText}>{fieldError}</p>}
        </label>
    )
}