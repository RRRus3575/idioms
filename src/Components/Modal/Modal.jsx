import Button from "../Button/Button"
import styles from "./Modal.module.css"

export default function ({buttonText, close, children}){
    return(
        <div className={styles.modal} id="exampleModal" aria-hidden="true">
            <div className={styles.backdrop} data-modal-close></div>

            <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="modalTitle">


                    <button className={styles.close} type="button" data-modal-close onClick={close}>
                        &times;
                    </button>
                    {children}

            </div>
        </div>
    )
}