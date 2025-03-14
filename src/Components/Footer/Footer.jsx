import React from "react";
import sprite from "../../sprite.svg";
import styles from "./Footer.module.css";

const Footer = () => {
    return(
        <footer className={styles.footer}>
        <div className={styles.wrap}>
        <a href="#">
          <svg className={styles.logo}>
            <use xlinkHref={`${sprite}#logo`} />
          </svg>
        </a>
        <ul className={styles.wrpper}>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of use </a></li>
        </ul>
        </div>
           
        <div className={styles.wrpper}>
            <p>All rights reserved</p>
            <p>Copyright 2024 - Aris Team. </p>
        </div>
        </footer>
    )
}


export default Footer