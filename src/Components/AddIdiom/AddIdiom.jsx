import { useState } from "react";
import Button from "../Button/Button"
import styles from "./AddIdiom.module.css"
import LanguageSelectWithSearch from "../LanguageSelectWithSearch/LanguageSelectWithSearch";
import { LABELS } from "@/utils/lang";

export default function AddIdiom ({onClick}) {

    const [isLoading, setIsLoading] = useState(false)
    const [done, setDone] = useState(true)


    const initialForm = {
        text: "",
        language: "",
        meaning: "",
        examples: "",
        otherInfo: "",
    };

    const clearLanguage = () => {
        setFormData.language = ""
    }

    const [formData, setFormData] = useState(initialForm)

    const languageOptions = Object.entries(LABELS).map(([value, label]) => ({
        value,
        label,
    }));

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        setFormData(initialForm); 
    }

    return(
        <>

        {!done && (<div className={styles.idiomo}>
            <h2 className={styles.title}>Add idiom</h2>
            <p className={styles.text}>Fill in the form and wait till the idiom appears on the platform.</p>
            <form className={styles.form} onSubmit={handleSubmit} >
                <div className={styles.wrap}>
                    <label className={styles.label}>
                        Idiom*
                        <input 
                            name="text"
                            onChange={handleChange}
                            value={formData.text || ""}
                        />
                    </label>
                    <label className={styles.label}>
                        Language*
                    <LanguageSelectWithSearch
                        options={languageOptions}
                        value={formData.language}   
                        onChange={(lang) =>
                            setFormData((prev) => ({ ...prev, language: lang }))
                            }  
                        clear={clearLanguage}             
                        />
                    </label>
                </div>

                <label className={styles.label}>
                    <span>Meaning <sup className={styles.sup}>(optional)</sup> </span>
                    <input 
                        name="meaning"
                        onChange={handleChange}
                        value={formData.meaning || ""}
                    />
                </label>

                <label className={styles.label}>
                    <span>Examples of usage <sup className={styles.sup}>(optional)</sup> </span>
                    <input 
                        name="examples" 
                        onChange={handleChange}
                        value={formData.examples || ""}
                    />
                </label>

                <label className={styles.label}>
                    <span>Other information <sup className={styles.sup}>(optional)</sup> </span>
                    <textarea 
                        className={styles.textarea} 
                        name="otherInfo" 
                        onChange={handleChange}
                        value={formData.otherInfo || ""}
                    />
                </label>
                <div className={styles.button}>
                    <Button
                        text="Add idiom"
                        colored={true}
                        type="Submit"
                    />
                </div>
                
                
            </form>

        </div>)}
        {done && (
            <div className={styles.done}>
                <svg className={styles.check}>
                    <use xlinkHref="/sprite.svg#checkbox" />
                </svg>
                <h3 className={styles.titledone}>Thanks for your help!</h3>
                <p className={styles.text}>We’ll verify the information and notify you about the result!</p>
                <Button
                    text="Back to Idiomo"
                    type="button"
                    onClick={onClick}
                    colored={true}
                    width={212}
                />
            </div>
        )}
        </>
    )
}