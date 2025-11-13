import styles from "./Button.module.css"

export default function Button ({text, width, type, disabled, colored}){
    const wStyle =
    width !== undefined
      ? { width: typeof width === "number" ? `${width}px` : width }
      : {};
    return(
        <button 
        style={{ ...wStyle }}  
        type={type} 
        disabled={disabled} 
        className={`${styles.button} ${disabled ? styles.inactive : ""} ${colored ? styles.colored : ""}`}>
            {text}
        </button>
    )
}