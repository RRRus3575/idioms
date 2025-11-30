import { useState } from "react"
import styles from "./HelpsUs.module.css"
import Button from "../Button/Button"
import Checkbox from "../Checkbox/Checkbox"
import ErrorContainer from "@/Error/Error";
import Done from "../Done/Done";
import Input from "../Input/Input";


export default function HelpUs ({onClick, isLoading, error, handleSendSupport, done, setError}) {
    const [validationErrors, setValidationErrors] = useState({});

    const initialForm = {
        name: "",
        email: "",
        message: "",
        agreePrivacyPolicy: false,
        agreeMarketing: false,
    };

    const [formData, setFormData] = useState(initialForm)

    const validateForm = (data) => {
        const newErrors = {};

        if (!data.name.trim()) {
            newErrors.name = "This field is required";
        }

        if (!data.email.trim()) {
            newErrors.email = "This field is required";
        }

        if (!data.agreePrivacyPolicy) {
            newErrors.agreePrivacyPolicy = "This field is required";
        }

        return newErrors;
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        setValidationErrors((prev) => {
            const { [name]: _, ...rest } = prev;
            return rest;
        });
    };

    const handleChangeCheckbox = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));

        setValidationErrors((prev) => {
            const { [name]: _, ...rest } = prev;
            return rest;
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setValidationErrors(validationErrors);
            return; // не отправляем форму
        }

        try{
            const result = await handleSendSupport(formData)
            if(result) {setFormData(initialForm)}
        } catch (e){ }
    };

    const backToForm = () =>{
        setError(null)
    }



    const [registred, setRegistred] = useState(false)

    

    return(
        <>
        {!done && !error && (
            <>
            {!registred && (<div className={styles.container}>
            <h3 className={styles.title}>Help us to get better</h3>
            <p className={styles.text}>Share your ideas in the form below 😉</p>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formcontainer}>
                    <div className={styles.formitem}>
                        <Input
                            label="Your name*"
                            name="name"
                            onChange={handleChangeInput}
                            value={formData.name || ""}
                            error={validationErrors}
                        />

                        <Input
                            label="Email*"
                            name="email"
                            onChange={handleChangeInput}
                            value={formData.email || ""}
                            error={validationErrors}
                        />
                    </div>
                    <label className={`${styles.label} ${styles.textareablock}`}>
                        Your suggestions
                        <textarea 
                        onChange={handleChangeInput} 
                        value={formData.message}
                        name="message"
                        />
                    </label>

                </div>
                <div className={styles.formcontainer}>
                    <div className={styles.terms}>
                        <label >
                            <div className={styles.termslabel}>
                                <Checkbox name="agreePrivacyPolicy" onChange={handleChangeCheckbox} error={validationErrors}/>
                                <div className={styles.agreeblock}>
                                    <p>I agree with Idiomo’s <span className={styles.termslink}>Privacy Policy</span><span className={styles.red}>*</span></p>
                                    {validationErrors.agreePrivacyPolicy &&<p className={styles.errorValidate}>{validationErrors.agreePrivacyPolicy}</p>}
                                </div>
                            </div>
                        
                            
                        </label>
                        <label className={styles.termslabel}>
                            <Checkbox name="agreeMarketing" onChange={handleChangeCheckbox}/>
                            <p>I agree to receive occasional updates from Idiomo.</p>
                        </label>
                    </div>
                    <Button
                        type="submit"
                        colored={true}
                        text={isLoading ? "Loading" : "Send"}
                        disabled={isLoading}
                    />
                </div>
                
            </form>
        </div>)}
        </>
        )}

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
                    title="Ops... Something went wrong."
                    text="Check your connection and reload the page."
                />
                <Button
                    text="Back to your message"
                    colored={true}
                    onClick={backToForm}
                />
            </div>
            
        )}

        </>
        
    )
}