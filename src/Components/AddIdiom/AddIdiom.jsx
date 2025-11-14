import Button from "../Button/Button"
import styles from "./AddIdiom.module.css"

export default function AddIdiom () {

    return(
        <div className={styles.idiomo}>
            <h2 className={styles.title}>Add idiom</h2>
            <p className={styles.text}>Fill in the form and wait till the idiom appears on the platform.</p>
            <form className={styles.form}>
                <div className={styles.wrap}>
                    <label className={styles.label}>
                        Idiom*
                        <input/>
                    </label>
                    <label className={styles.label}>
                        Language*
                        <input/>
                    </label>
                </div>

                <label className={styles.label}>
                    <span>Meaning <sup className={styles.sup}>(optional)</sup> </span>
                    <input/>
                </label>

                <label className={styles.label}>
                    <span>Examples of usage <sup className={styles.sup}>(optional)</sup> </span>
                    <input/>
                </label>

                <label className={styles.label}>
                    <span>Other information <sup className={styles.sup}>(optional)</sup> </span>
                    <textarea className={styles.textarea} />
                </label>
                <div className={styles.button}>
                    <Button
                        text="Add idiom"
                        colored={true}
                    />
                </div>
                
                
            </form>

        </div>
    )
}