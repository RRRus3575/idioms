import Button from "../Button/Button"
import  styles from "./HelpSection.module.css"

export default function HelpSection() {

    return(
        <section>
            <h2>Help us</h2>
            <div className={styles.card}>
                <svg width={28} height={28}>
                    <use/>
                </svg>
                <h3>Add idioms in your language</h3>
                <p>Add idioms in your native language to help learners all over the world.</p>
                <Button
                    text="Add idiom"
                    type="button"
                />
            </div>

            <div className={styles.card}>
                <svg width={28} height={28}>
                    <use/>
                </svg>
                <h3>Add idioms in your language</h3>
                <p>Add idioms in your native language to help learners all over the world.</p>
                <Button
                    text="Add idiom"
                    type="button"
                    colored={true}
                />
            </div>

            <div className={styles.card}>
                <svg width={28} height={28}>
                    <use/>
                </svg>
                <h3>Add idioms in your language</h3>
                <p>Add idioms in your native language to help learners all over the world.</p>
                <Button
                    text="Add idiom"
                    type="button"
                />
            </div>
        </section>
    )
}