import { useState } from "react"
import Button from "../Button/Button"
import  styles from "./HelpSection.module.css"
import Modal from "../Modal/Modal"

export default function HelpSection() {
    const [isOpen, setIsOpen] = useState(false)
    const [addIdiom, setAddIdiom] = useState(false)
    const [donate, setDonate] = useState(false)
    const [improve, setImprove] = useState(false)

    const isOpenToggle = () =>{
        setIsOpen((prev) => !prev);
    }
    const toggleAddIdiom = () =>{
        isOpenToggle()
        setAddIdiom((prev) => !prev);
    }

    const toggleDonate = () =>{
        setIsOpen((prev) => !prev);
        setDonate((prev) => !prev);
    }

    const toggleImprove = () =>{
        setIsOpen((prev) => !prev);
        setImprove((prev) => !prev);
    }

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
                    onClick={toggleAddIdiom}
                />
            </div>

            <div className={styles.card}>
                <svg width={28} height={28} className={`${styles.icon} ${styles.dark}`}>
                    <use xlinkHref="/sprite.svg#support"/>
                </svg>
                <h3 className={styles.title}>Donate</h3>
                <p className={styles.text}>As money doesn’t grow on trees and platforms cannot function without finances, we will always appreciate your support of Idiomo</p>
                <Button
                    text="Support the project"
                    type="button"
                    colored={true}
                    onClick={toggleDonate}
                />
            </div>

            <div className={styles.card} >
                <svg width={28} height={28} className={`${styles.icon} ${styles.dark}`}>
                    <use xlinkHref="/sprite.svg#chat"/>
                </svg>
                <h3 className={styles.title}>Help us to improve Idiomo</h3>
                <div className={styles.text}>
                    <p>Do you have any offers or suggestions for the platform?</p>
                    <p>Press the button below and share your ideas.</p>

                </div>
                    <Button
                        text="I have an offer  "
                        type="button"
                        onClick={toggleImprove}
                    />
            </div>
            </div>
            {isOpen && addIdiom && (
                <Modal
                    close={toggleAddIdiom}
                    >
                        <div>ADD</div>

                    </Modal>
               )}

               {isOpen && donate && (
                <Modal
                    close={toggleDonate}
                    >
                        <div>donate</div>

                    </Modal>
               )}

               {isOpen && improve && (
                <Modal
                    close={toggleImprove}
                    >
                        <div>improve</div>

                    </Modal>
               )}
        </section>
    )
}