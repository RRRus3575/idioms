import { useState } from "react";
import Button from "../Button/Button"
import styles from "./AddIdiom.module.css"
import LanguageSelectWithSearch from "../LanguageSelectWithSearch/LanguageSelectWithSearch";
import { LABELS } from "@/utils/lang";
import Done from "../Done/Done";
import ErrorContainer from "@/Error/Error";


export default function AddIdiom ({onClick, isLoading, error, done, handleAddIdiom, setError}) {


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

    const backToForm = () =>{
        setError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await handleAddIdiom(formData);
            if(result){ setFormData(initialForm);} // сюда попадём только если всё ок
        } catch (e) {
            // ошибка уже обработана родителем или можно здесь что-то показать
        }
    }

    return(
        <>

        {!done && !error && (<div className={styles.idiomo}>
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
                        text={isLoading ? "Loading..." :  "Add idiom"}
                        colored={!isLoading}
                        type="submit"
                        disabled={isLoading}
                    />
                </div>
                
                
            </form>

        </div>)}
        {done && (
            <Done
                title="Thanks for your help!"
                text="We’ll verify the information and notify you about the result!"
                buttonText="Back to Idiomo"
                onClick={onClick}
                iconId="checkbox"
            />
        )}

        {error && (
            <div className={styles.error}>
                <ErrorContainer
                    title="Something went wrong"
                    text="We couldn’t save your idiom. Please try again in a moment. If the problem persists, let us know"
                />
                <Button
                    text="Back to idiom"
                    colored={true}
                    onClick={backToForm}
                />
            </div>
            
        )}
        </>
    )
}