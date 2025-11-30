import { useEffect } from "react";
import Button from "../Button/Button"
import styles from "./Modal.module.css"

export default function Modal({ isOpen, close, children, width}){

    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = "hidden";

        // cleanup – сработает при размонтировании или когда isOpen станет false
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const wStyle =
    width !== undefined
      ? { maxWidth: typeof width === "number" ? `${width}px` : width }
      : {};
    return(
        <div className={styles.modal} id="exampleModal" aria-hidden="true">
            <div className={styles.backdrop} data-modal-close></div>

            <div style={{ ...wStyle }}  className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="modalTitle">


                    <button className={styles.close} type="button" data-modal-close onClick={close}>
                        <svg width={20} height={20} className={`${styles.icon} ${styles.dark}`}>
                            <use xlinkHref="/sprite.svg#plus"/>
                        </svg>
                    </button>

                    {children}

            </div>
        </div>
    )
}