import Button from "../Button/Button"
import styles from "./Outdated.module.css"

export default function Outdated() {
    return(
        <div className={styles.container}>
            <h3 className={styles.title}>Is idiom out of use?</h3>
            <p className={styles.text}>If the idiom is outdated and not widely used anymore, let us know here.</p>
            <div className={styles.tv}>
                <svg width={180} height={180}>
                    <use xlinkHref="/sprite.svg#tv"/>
                </svg>
            </div>
            
            <Button
                text="This idiom is outdated"
                type="button"
            />
        </div>
    )
}