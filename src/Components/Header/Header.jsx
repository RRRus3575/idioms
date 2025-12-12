import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from '@/store/api';
import styles from "./header.module.css";
import FormHeader from "../Form-header/Form-header";
import Link from "next/link";
import Modal from "../Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm";

const Header = ({ onFormSubmit = () => {} }) => {
  const [isActive, setIsActive] = useState(false);
  const [isSign, setIsSign] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);


  const forgotPassword = () => {
    setIsForgotPassword(true)
    setIsRegister(false)
    setIsSign(false)
  }
  

  const { user, token } = useSelector((s) => s.auth);
  const isAuthed = Boolean(token); // можно Boolean(token && user)

  const [logout, { isLoading }] = useLogoutUserMutation();

  return (
    <header className={styles.header}>
      <nav>
        <Link href="/">
          <svg className={styles.logo}>
            <use xlinkHref={`/sprite.svg#logo`} />
          </svg>
        </Link>
      </nav>

      <button
        aria-label="open search"
        onClick={() => setIsActive(true)}
        className={`${styles.button} ${!isActive ? styles.active : styles.disactive}`}
      >
        <svg className={styles.openSearch} width={20} height={20}>
          <use xlinkHref="/sprite.svg#find" />
        </svg>
      </button>

      <div className={!isActive ? styles.disactive : styles.active}>
        <FormHeader hidden="hidden" handleFormSubmit={onFormSubmit} />
      </div>

      {/* --- AUTH BUTTONS --- */}
      {!isAuthed ? (
        <div>
          <button onClick={() => setIsSign(true)}>Log in</button>
          <button onClick={() => setIsRegister(true)}>Sign up</button>
        </div>
      ) : (
        <div>
          {/* опционально показать пользователя */}
          <span style={{ marginRight: 12 }}>{user?.email}</span>

          <button
            onClick={() => {
              // закрыть модалки на всякий
              setIsSign(false);
              setIsRegister(false);
              logout();
            }}
            disabled={isLoading}
          >
            Logout
          </button>
        </div>
      )}

      {/* Модалки показываем только если НЕ authed */}
      {!isAuthed && isSign && (
        <Modal close={() => setIsSign(false)} isOpen={isSign}>
          <LoginForm setIsForgotPassword={()=> setIsForgotPassword(true)}/>
        </Modal>
      )}

      {!isAuthed && isForgotPassword && (
        <Modal close={() => setIsForgotPassword(false)} isOpen={isForgotPassword}>
          <ForgotPasswordForm setIsForgotPassword={()=>forgotPassword()}/>
        </Modal>
      )}

      {!isAuthed && isRegister && (
        <Modal close={() => setIsRegister(false)} isOpen={isRegister}>
          <RegisterForm />
        </Modal>
      )}
    </header>
  );
};

export default Header;
