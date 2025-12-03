import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.css";
import FormHeader from "../Form-header/Form-header";
import Link from "next/link";


const Header = ({ onFormSubmit = () => {} }) => {
  const [isActive, setIsActive] = useState(false);



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
      
      <ul className="hidden">
        <li>
          <a>Log in</a>
        </li>
        <li>
          <a>Sign up</a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
