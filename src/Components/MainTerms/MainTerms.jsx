import Breadcrumbs from "../Breadcrumbs/Breadcrumbs"
import styles from "./MainTerms.module.css"

export default function MainTerms ({isLoading, isError, data, type}) {

    return(
        <main className={styles.main}>
            {isLoading && <p>Loading…</p>}
            {isError && <p>Something went wrong. Try again later.</p>}
            {data && (<section>
                <Breadcrumbs labelMap={{ "/": "Home"}} currentLabel={type.charAt(0).toUpperCase() + type.slice(1)}/>
                <div dangerouslySetInnerHTML={{ __html: data.html }} />
            </section>)}
        </main>
    )
}