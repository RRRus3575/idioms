import React, { useState, useRef, useEffect } from "react";
import { useLogoutUserMutation } from '@/store/api';
import styles from "./header.module.css";
import FormHeader from "../Form-header/Form-header";
import Link from "next/link";
import Modal from "../Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";


const Header = ({ onFormSubmit = () => {} }) => {
  const [isActive, setIsActive] = useState(false);
  const [isSign, setIsSign] = useState(false)
  const [isRegister, setIsRegister]  = useState(false)

  const [logout, { isLoading }] = useLogoutUserMutation();

  console.log(isSign)
  console.log(isRegister)


  return (
    <header className={styles.header}>
      <nav>
        <Link  href="/">
          <svg className={styles.logo}>
            <use xlinkHref={`/sprite.svg#logo`} />
          </svg>
        </Link>
      </nav>
      <button aria-label="open search"
      onClick={()=>{
        setIsActive(true)
      }} className={`${styles.button} ${!isActive ? styles.active : styles.disactive}`}
      >
      <svg className={styles.openSearch} width={20} height={20}>
        <use xlinkHref="/sprite.svg#find" />
      </svg>

      </button>
      <div className={!isActive ? styles.disactive : styles.active}
>
      <FormHeader hidden="hidden" handleFormSubmit={onFormSubmit} />
      </div>
      
      <div>
          <button onClick={() => setIsSign(true)}>Log in</button>
          <button onClick={() => setIsRegister(true)}>Sign up</button>
      </div>
      <button onClick={() => logout()} disabled={isLoading}>
        Logout
      </button>
      {isSign && (<Modal close={() => setIsSign(false)} isOpen={isSign}>
        <LoginForm/>
 
      </Modal>)}

      {isRegister && (<Modal close={() => setIsRegister(false)} isOpen={isRegister}>
        <RegisterForm/> 
      </Modal>)}
    </header>
  );
}; 

export default Header;
