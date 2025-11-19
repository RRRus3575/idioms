
import { useVoteOutdatedMutation } from "@/store/api";
import Button from "../Button/Button"
import styles from "./Outdated.module.css"
import Modal from "../Modal/Modal";
import { useState } from "react";
import ErrorContainer from "@/Error/Error";

export default function Outdated({idiom}) {

    const [isOpen, setIsOpen] = useState(false)
    const [isDone, setIsDone] = useState(false)
    const [error, setError] = useState(null)


    const toggleOpen = () =>{
        setIsOpen((prev)=> !prev)
        if (!isOpen){
            setIsDone(false)
            setError(null)
        }
    }



    const [voteOutdated, { isLoading }] = useVoteOutdatedMutation();
    const handleOutdated = async () => {
        try {
            await voteOutdated({ id: idiom.id }).unwrap();
            setIsDone(true);          // показать "успешно"
            // setIsOpen(false);      // или сразу закрыть модалку, если нужно
        } catch (e) {
            console.error(e);
            setError(e)
        }
    };


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
                text={isLoading ? "Loading" : "This idiom is outdated"}
                type="button"
                onClick={toggleOpen}
            />

            {isOpen &&(
                <Modal close={toggleOpen} width={846}>
                    {!isDone && !error && (<div className={styles.modal}>
                        <h3>Are you sure, that idiom <br /> <span>"{idiom.text}"</span><br /> is outdated?</h3>
                        <div className={styles.modalwrap}>
                            <Button
                                text="No, it is still used"
                                onClick={toggleOpen}
                                width={373}

                            />
                            <Button
                                colored={true}
                                text={isLoading ? "loading" : "Yes, it is not used widely any more"}
                                onClick={handleOutdated}
                                width={373}
                            />
                        </div>
                    </div>)}

                    {isDone && (
                        <div>

                        </div>
                    )}

                    {error && (
                        <div className={styles.error}>
                            <ErrorContainer 
                                title="Something went wrong"
                                text="We couldn’t submit your report that this idiom is outdated. Please try again in a moment."
                            />
                        </div>
                         )}
                        
                    

                </Modal>
            )}
        </div>
    )
}