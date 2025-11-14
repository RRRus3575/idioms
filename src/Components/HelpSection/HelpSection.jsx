import { useEffect, useState } from "react"
import Button from "../Button/Button"
import  styles from "./HelpSection.module.css"
import Modal from "../Modal/Modal"
import AddIdiom from "../AddIdiom/AddIdiom"

export default function HelpSection() {
    const [isOpen, setIsOpen] = useState(false)
    const [addIdiom, setAddIdiom] = useState(false)
    const [donate, setDonate] = useState(false)
    const [improve, setImprove] = useState(false)

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                closeModal()
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen]);

    const isOpenToggle = () =>{
        setIsOpen(prev => {
            const next = !prev;

            if (next) {
           // открыто — блокируем скролл
            document.body.style.overflow = 'hidden';
            } else {
            // закрыто — возвращаем как было
            document.body.style.overflow = '';
            }

            return next;
        });
    }

    const closeModal = () => {
        setIsOpen(false);
        setAddIdiom(false);
        setDonate(false);
        setImprove(false);
        document.body.style.overflow = '';
    };


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
                    width={630}
                    >
                        <AddIdiom/>

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