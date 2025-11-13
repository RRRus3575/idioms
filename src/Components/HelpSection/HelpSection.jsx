import Button from "../Button/Button"
import  styles from "./HelpSection.module.css"

export default function HelpSection() {

    return(
        <section>
            <div className={styles.container}>

            <h2>Help us</h2>
            <div className={styles.card}>
                <svg width={28} height={28} className={`${styles.icon} ${styles.dark}`}>
                    <use  xlinkHref="/sprite.svg#plus"/>
                </svg>
                <h3 className={styles.title}>Add idioms in your language</h3>
                <p className={styles.text}>Add idioms in your native language to help learners all over the world.</p>
                <Button
                    text="Add idiom"
                    type="button"
                />
            </div>

            <div className={styles.card}>
                <svg width={28} height={28} className={`${styles.icon} ${styles.dark}`}>
                    <use/>
                </svg>
                <h3 className={styles.title}>Add idioms in your language</h3>
                <p className={styles.text}>Add idioms in your native language to help learners all over the world.</p>
                <Button
                    text="Add idiom"
                    type="button"
                    colored={true}
                />
            </div>

            <div className={styles.card} >
                <svg width={28} height={28} className={`${styles.icon} ${styles.dark}`}>
                    <use/>
                </svg>
                <h3 className={styles.title}>Add idioms in your language</h3>
                <p className={styles.text}>Add idioms in your native language to help learners all over the world.</p>
                <Button
                    text="Add idiom"
                    type="button"
                />
            </div>
            </div>
        </section>
    )
}