import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.css";
import FormHeader from "../Form-header/Form-header";


const Header = ({ onFormSubmit }) => {
  const [isActive, setIsActive] = useState(false);



  return (
    <header className={styles.header}>
      <nav>
        <a href="#">
          <svg className={styles.logo}>
            <use xlinkHref={`/sprite.svg#logo`} />
          </svg>
        </a>
      </nav>
      <button aria-label="open search"
      onClick={()=>{
        setIsActive(true)
      }} className={`${styles.button} ${!isActive ? styles.active : styles.disactive}`}
      >
      <svg>
        <use xlinkHref="/sprite.svg#icon-name" />
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
