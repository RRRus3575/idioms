import styles from "./Comment.module.css"

export default function CommentBlock() {

    return(
            <div>
                <h3 className={styles.title}>Was it correct?</h3>
                <p className={styles.text}>Rate the accuracy and actuality of information provided and/or let us know if we missed something.</p>
                <form className={styles.form}>
                    <label className={styles.label}>Rate the idiom accuracy *</label>
                    <label className={styles.label}>
                    Add a comment for more details
                    <textarea className={styles.label} placeholder="Enter your message here" className={styles.texarea}></textarea>
                    </label>

                </form>

            </div>
    )
}