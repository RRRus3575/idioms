import React, { useState, useRef, useEffect } from "react";
import sprite from "../../sprite.svg";
import styles from "./Header.module.css";
import FormHeader from "../Form-header/Form-header";


const Header = ({ onFormSubmit }) => {
  const [isActive, setIsActive] = useState(false);
 


  return (
    <header className={styles.header}>
      <nav>
        <a href="#">
          <svg className={styles.logo}>
            <use xlinkHref={`${sprite}#logo`} />
          </svg>
        </a>
      </nav>
      <button onClick={()=>{
        setIsActive(true)
      }} className={`${styles.button} ${!isActive ? styles.active : `${styles.disactive} visually-hidden`}`}
      >
      <svg className={styles.search} width="16px" height="16px">
          <use xlinkHref={`${sprite}#find`} />
        </svg>
      </button>
      <div className={`${styles.button} ${!isActive ? `${styles.disactive} visually-hidden`  : styles.active}`}
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
