import { useState } from "react";
import Button from "../Button/Button"
import styles from "./AddIdiom.module.css"
import LanguageSelectWithSearch from "../LanguageSelectWithSearch/LanguageSelectWithSearch";
import { LABELS } from "@/utils/lang";
import Done from "../Done/Done";
import ErrorContainer from "@/Error/Error";
import Input from "../Input/Input";


export default function AddIdiom ({ isLoading, error, done, handleAddIdiom, setError}) {

    const [validationErrors, setValidationErrors] = useState({});

    const initialForm = {
        text: "",
        language: "",
        meaning: "",
        examples: "",
        otherInfo: "",
    };

    const validateForm = (data) => {
        const newErrors = {};

        if (!data.text.trim()) {
            newErrors.text = "This field is required";
        }

        if (!data.language) {
            newErrors.language = "This field is required";
        }

        return newErrors;
    };




    const clearLanguage = () => {
        setFormData((prev) => ({ ...prev, language: "" }));
    };


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
        setValidationErrors((prev) => ({
            ...prev,
            [name]: undefined,
        }));
    }

    const backToForm = () =>{
        setError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm(formData);
        console.log(validationErrors)
        if (Object.keys(validationErrors).length > 0) {
            setValidationErrors(validationErrors);
            return; // не отправляем форму
        }

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
                    <Input
                        label="Idiom*"
                        name="text"
                        onChange={handleChange}
                        value={formData.text || ""}
                        error={validationErrors}
                    />
                    <label className={styles.label}>
                        Language*
                    <LanguageSelectWithSearch
                        options={languageOptions}
                        value={formData.language}   
                        onChange={(lang) => {
                            setFormData((prev) => ({ ...prev, language: lang }));
                            setValidationErrors((prev) => ({
                                ...prev,
                                language: undefined,
                            }));
                        }}
                        clear={clearLanguage}   
                        validationErrors={validationErrors}
                        />
                    </label>
                </div>

                    <Input
                        label="Meaning"
                        sup="(optional)"
                        name="meaning"
                        onChange={handleChange}
                        value={formData.meaning || ""}
                    />

                    <Input
                        label="Examples of usage"
                        sup="(optional)"
                        name="examples"
                        onChange={handleChange}
                        value={formData.examples || ""}
                    />


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


        {error && (
            <div className={styles.error}>
                <ErrorContainer
                    title="Ops... Something went wrong."
                    text="Check your connection and reload the page."
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