import Link from "next/link"
import styles from "./IdiomoDescribe.module.css"

export default function IdiomoDescribe({idiom}){

    return(
        <div>
            <div className={styles.block}>
                <h3 className={styles.title}>Meaning</h3>
                <p>{idiom.localization.meaning}</p>
            </div>

            <div className={styles.block}>
                <h3 className={styles.title}>Analogs</h3>
                {idiom.analogs.length > 0 ? (
                    <ul className={styles.list}>
                        {idiom.analogs.map((item)=>(
                            <li key ={item.id} className={styles.item} lang={item.language}>
                                <strong>{item.language}: </strong>{item.phrase}
                            </li>
                        ))}
                    </ul>
                ) : (<p>No equivalent found yet</p>)} 
            </div>

            <div className={styles.block}> 
                <h3 className={styles.title}>Examples</h3>
                {idiom.examples.length > 0 ? (
                    <ul className={styles.list}>
                        {idiom.examples.map((item)=>(
                            <li key ={item.id} className={styles.item}>
                                {item.phrase}
                            </li>
                        ))}
                    </ul>
                ) : (<p>No equivalent found yet</p>)} 
            </div>

            <div className={styles.block}>
                <h3 className={styles.title}>Origin</h3>
                <p>{idiom.localization.origin}</p>
            </div>

            <div className={styles.block}>
                <h3 className={styles.title}>Synonyms</h3>
                {idiom.synonyms.length > 0 ? (
                    <ul className={styles.list}>
                        {idiom.synonyms.map((item) => {
                            const href = `/idioms/${encodeURIComponent(item.slug)}--${encodeURIComponent(item.id)}`

                            return (
                            <li key={item.id} className={`${styles.item} ${styles.violet}`}>
                                <Link href={href} className={styles.link}>{item.text}</Link>
                            </li>
                            )
                        })}
                    </ul>
                ) : (<p>No equivalent found yet</p>)} 
            </div>

            <div className={styles.block}>
                <h3 className={styles.title}>Antonyms</h3>
                {idiom.antonyms.length > 0 ? (
                    <ul className={styles.list}>
                        {idiom.antonyms.map((item) => {
                            const href = `/idioms/${encodeURIComponent(item.slug)}--${encodeURIComponent(item.id)}`

                            return (
                            <li key={item.id} className={`${styles.item} ${styles.violet}`}>
                                <Link href={href} className={styles.link}>{item.text}</Link>
                            </li>
                            )
                        })}
                    </ul>
                ) : (<p>No equivalent found yet</p>)} 
            </div>
        </div>
    )
}