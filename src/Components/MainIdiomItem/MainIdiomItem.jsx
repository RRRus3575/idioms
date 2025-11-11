import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import IdiomoDescribe from "../IdiomoDescribe/IdiomoDescribe";
import LoaderIdiomaPage from "../LoaderIdiomaPage/LoaderIdiomaPage";
import styles from "./MainIdiomItem.module.css"
import { isYoungerThanNDays } from "@/utils/date";


const MainIdiomItem = ({isLoading, isError, idiom, backHref}) => {
    console.log(idiom)

    const recently = isYoungerThanNDays(idiom?.createdAt);

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        speechSynthesis.speak(utterance);
    };

    return(
        <main className={styles.main}>
            <h1 className="visually-hidden">Idioma page</h1>
            <section>
                <div className={styles.container}>
                    <Breadcrumbs 
                        currentLabel={idiom?.text || "Idiom"}
                        backHref={backHref} 
                    />
                    {isLoading && (<LoaderIdiomaPage/>)}
                        <div className={styles.head} >
                            <div className={styles.headtext}>
                                <h2 className={styles.title} >{idiom?.text}</h2>
                                <div className={styles.wraphead}>
                                    <button
                                        aria-label="reproduction of an idiom by voice"
                                        onClick={() => speak(idiom.text)}
                                        className={styles.button}
                                        type="button"
                                        >
                                        <svg width="20" height="20">
                                            <use xlinkHref="/sprite.svg#sound" />
                                        </svg>
                                    </button>

                                    <button className={styles.button} aria-label="add to favorites" type="button">
                                        <svg width="20" height="20">
                                            <use xlinkHref="/sprite.svg#bookmark" />
                                        </svg>
                                    </button>
                                </div>                
                            </div>
                            {recently && (<div className={styles.recently} ><p>recently added</p></div>)}
                        </div>
                        {idiom && <IdiomoDescribe idiom={idiom} />}
                    </div>
                </section>

                
                

            
            
        </main>

    )
}

export default MainIdiomItem;