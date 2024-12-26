import React from "react";
import sprite from "../../sprite.svg";
import styles from "./header.module.css";
import FormHeader from "../Form-header/Form-header";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <a href="#">
          <svg className={styles.logo}>
            <use xlinkHref={`${sprite}#logo`} />
          </svg>
        </a>
      </nav>
      <FormHeader hidden="hidden" />
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
