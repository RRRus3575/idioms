import ErrorContainer from "@/Error/Error"
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs"
import styles from "./MainTerms.module.css"
import LoaderTerms from "../LoaderTerms/LoaderTerms"

export default function MainTerms ({isLoading, isError, data, type}) {

    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <Breadcrumbs labelMap={{ "/": "Home"}} currentLabel={type?.charAt(0).toUpperCase() + type?.slice(1) || "Type of terms"}/>
                {isLoading && <LoaderTerms />}
                {isError && <ErrorContainer 
                                title="Unable to Load Document" 
                                text="An error occurred while loading the Terms of Service or Privacy Policy. Please refresh the page or try again later."
                                />}
                {data && <div dangerouslySetInnerHTML={{ __html: data.html }} />}
            </section>
        </main>
    )
}