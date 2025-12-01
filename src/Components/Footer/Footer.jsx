import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";


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
            <li><Link href="/legal/privacy" className={styles.link}>Privacy Policy</Link></li>
            <li><Link href="/legal/terms" className={styles.link}>Terms of use </Link></li>
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