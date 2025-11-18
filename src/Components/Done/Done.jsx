import Button from "../Button/Button"
import styles from "./Done.module.css"

export default function Done ({title, text, buttonText}) {

    return(
         <div className={styles.done}>
                <svg className={styles.check}>
                    <use xlinkHref="/sprite.svg#checkbox" />
                </svg>
                <h3 className={styles.titledone}>{title}</h3>
                <p className={styles.text}>{text}</p>
                <Button
                    text={buttonText}
                    type="button"
                    onClick={onClick}
                    colored={true}
                    width={212}
                />
            </div>
    )
}