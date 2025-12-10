import ErrorContainer from "@/Error/Error";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import CommentBlock from "../Comment/Comment";
import HelpSection from "../HelpSection/HelpSection";
import IdiomoDescribe from "../IdiomoDescribe/IdiomoDescribe";
import LoaderIdiomaPage from "../LoaderIdiomaPage/LoaderIdiomaPage";
import Outdated from "../Outdated/Outdated";
import styles from "./MainIdiomItem.module.css"
import { isYoungerThanNDays } from "@/utils/date";
import { canSpeak, speak } from "@/utils/speech";


const MainIdiomItem = ({isLoading, isError, idiom, backHref}) => {






    const recently = isYoungerThanNDays(idiom?.createdAt);


    return(
        <main className={styles.main}>
            <h1 className="visually-hidden">Idioma page</h1>
            <section>
                <div className={styles.container}>
                    <Breadcrumbs 
                        currentLabel={idiom?.text || "Idiom"}
                        backHref={backHref} 
                    />
                    {isError && (
                        <ErrorContainer title="Oops! Something went wrong" text="Try searching again — it might work next time"/>
                    )}
                    {isLoading && (<LoaderIdiomaPage/>)}
                    {idiom && <div className={styles.head} >
                        <div className={styles.headtext}>
                            <h2 className={styles.title} lang={idiom.language}>{idiom?.text}</h2>
                            <div className={styles.wraphead}>
                                {canSpeak() && (<button
                                    aria-label="reproduction of an idiom by voice"
                                    onClick={() => speak(idiom?.text, idiom?.language)} 
                                    className={styles.button}
                                    type="button"
                                    >
                                    <svg width="20" height="20">
                                        <use xlinkHref="/sprite.svg#sound" />
                                    </svg>
                                </button>)}

                                {/* <button className={styles.button} aria-label="add to favorites" type="button">
                                    <svg width="20" height="20">
                                        <use xlinkHref="/sprite.svg#bookmark" />
                                    </svg>
                                </button> */}
                            </div>                
                        </div>
                        {recently && (<div className={styles.recently} ><p>recently added</p></div>)}
                    </div>}
                    {idiom && <IdiomoDescribe idiom={idiom} />}
                </div>
            </section>

            {/* {idiom && (
                <section>
                    <div className={styles.container}>
                        <h2 className="visually-hidden">Feedback and comments</h2>
                            <div className={styles.wrap}>
                                <CommentBlock/>
                                <Outdated idiom={idiom} />
                            </div>
                        </div>
                </section>
            )} */}
            <HelpSection/>                  
        </main>

    )
}

export default MainIdiomItem;