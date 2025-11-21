import { useState } from "react"
import styles from "./HelpsUs.module.css"
import Button from "../Button/Button"
import Checkbox from "../Checkbox/Checkbox"


export default function HelpUs ({isLoading, error, handleSendSupport}) {

    const initialForm = {
        name: "",
        email: "",
        suggestions: "",
        agreePrivacyPolicy: false,
        agreeMarketing: false,
    };

    const [formData, setFormData] = useState(initialForm)

    const [errors, setErrors] = useState({});

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeCheckbox = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // тут отправка на сервер / RTK Query и т.д.
        console.log("FORM DATA:", formData);
        handleSendSupport()

    };



    const [registred, setRegistred] = useState(false)

    
    const toggleCheckbox = () =>{

    }

    return(
        <>
        {!registred && (<div className={styles.container}>
            <h3 className={styles.title}>Help us to get better</h3>
            <p className={styles.text}>Share your ideas in the form below 😉</p>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formcontainer}>
                    <div className={styles.formitem}>
                        <label className={styles.label} >
                            Your name*
                            <input 
                            onChange={handleChangeInput} 
                            value={formData.name} 
                            name="name"
                            />
                        </label>
                        <label className={styles.label}>
                            Email*
                            <input 
                            onChange={handleChangeInput} 
                            value={formData.email}
                            name="email"
                            />
                        </label>
                    </div>
                    <label className={`${styles.label} ${styles.textareablock}`}>
                        Your suggestions
                        <textarea 
                        onChange={handleChangeInput} 
                        value={formData.suggestions}
                        name="suggestions"
                        />
                    </label>

                </div>
                <div className={styles.formcontainer}>
                    <div className={styles.terms}>
                        <label className={styles.termslabel}>
                        <Checkbox name="agreePrivacyPolicy" onChange={handleChangeCheckbox}/>
                            I agree with Idiomo’s <span className={styles.termslink}>Privacy Policy</span><span className={styles.red}>*</span>
                        </label>
                        <label className={styles.termslabel}>
                            <Checkbox name="agreeMarketing" onChange={handleChangeCheckbox}/>
                            I agree to receive occasional updates from Idiomo.
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
        
    )
}