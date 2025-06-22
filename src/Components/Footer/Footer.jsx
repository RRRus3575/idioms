import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
    return(
        <footer className={styles.footer}>
        <div className={styles.wrap}>
        <a href="#">
          <svg className={styles.logo}>
            <use xlinkHref={`/sprite.svg#logo`} />
          </svg>
        </a>
        <ul className={styles.wrapperpriv}>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of use </a></li>
        </ul>
        </div>
           
        <div className={styles.wrapper}>
            <p>All rights reserved</p>
            <p>Copyright 2024 - Aris Team. </p>
        </div>
        </footer>
    )
}


export default Footer