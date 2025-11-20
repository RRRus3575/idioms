import { useState } from "react"
import styles from "./HelpsUs.module.css"
import Button from "../Button/Button"

export default function HelpUs () {
    const [registred, setRegistred] = useState(false)

    return(
        <>
        {!registred && (<div>
            <h3>Help us to get better</h3>
            <p>Share your ideas in the form below 😉</p>
            <form className={styles.form}>
                <div className={styles.formcontainer}>
                    <div className={styles.formitem}>
                        <label className={styles.label}>
                            Your name*
                            <input/>
                        </label>
                        <label className={styles.label}>
                            Email*
                            <input/>
                        </label>
                    </div>
                    <label className={`${styles.label} ${styles.formitem}`}>
                        Your suggestions
                        <textarea/>
                    </label>

                </div>

                <div className={styles.formcontainer}>
                    <label className={styles.label}>
                        I agree with Idiomo’s <span>Privacy Policy</span><span>*</span>
                    </label>
                    <label>
                        I agree to receive occasional updates from Idiomo.
                    </label>
                </div>
                <Button
                    type="submit"
                    colored={true}
                    text="Send"
                />
            </form>
        </div>)}

        </>
        
    )
}