import styles from "./Input.module.css"

export default function Input ({onChange, error, label, value, name, sup, placeholder, data}) {
    const fieldError = error?.[name];


    const clearIdiom = () => {
        if (!onChange) return;

        onChange({
            target: {
            name,
            value: "",
            },
        });
    };

    return(
        <label className={styles.label}>
            <span>{label} {sup && <sup className={styles.sup}>{sup}</sup>}</span>
            
            <div className={styles.inputContainer}>
                {value.length > 0 && (
                    <button
                        type="button"
                        className={styles.clear}
                        onClick={clearIdiom}
                        aria-label="Clear search"
                    >
                        <svg className={styles.image} width="16" height="16" aria-hidden>
                        <use xlinkHref="/sprite.svg#plus" />
                        </svg>
                    </button>
                )}
                <input
                    onChange={onChange}
                    className={`${styles.input} ${fieldError ? styles.inputError : ""}`}
                    value={value}
                    name={name}
                    placeholder={placeholder}
                />
            </div>
           
            {fieldError && <p className={styles.errorText}>{fieldError}</p>}
        </label>
    )
}