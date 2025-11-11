import React from "react";
import styles from "./IdiomsList.module.css"


const IdiomsList = ({ idioms }) => {


  return (
    <ul className={styles.list}>
      {idioms.map((item, index) => (
        <li key={index}>
          {item.idiom} - {item.language}
        </li>
      ))}
    </ul>
  );
};

export default IdiomsList;
