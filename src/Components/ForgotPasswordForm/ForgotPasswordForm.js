import { useForgotPasswordMutation } from "@/store/api";
import Input from "../Input/Input";
import ForgotPasswordForm from './ForgotPasswordForm';
import { useState } from 'react';
import Button from "../Button/Button";



export default function PasswordRecovery () {
    const [form, setForm] = useState({ email: ''});
    const [passwordRecovery, { isLoading, error }] = useForgotPasswordMutation();
    
    const onChange = (e) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        await passwordRecovery(form).unwrap();
    };

    return(
        <form onSubmit={onSubmit}>
        <h3>Forgot password</h3>
            <Input
                name="email"
                value={form.email}
                onChange={onChange}
            />
            <Button
                type="submit"
                text="Reset password"
            />
        </form>
    )
}