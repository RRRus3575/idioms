import style from "./Idioma.module.css"
import React from "react";

const Idioma = ({idioms}) =>{
    

      const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        speechSynthesis.speak(utterance);
      };
      
    return(
        <ul className={style}>
      {idioms && idioms.map(({text, meaning, analogs}, index) => (
        <li key={index} className={style.idiomoitems}>
            <div className={style.wrapperright}>
                <div className={style.titleblock}>
                    <h3 className={style.title}>{text}</h3>
                    <button aria-label="reproduction of an idiom by voice" onClick={() => speak(title)} className={style.button}>
                        <svg width="16" height="16">
                            <use xlinkHref={`/sprite.svg#sound`}/>
                        </svg>
                    </button>
                    <button className={style.button} aria-label="add to favorites">
                        <svg width="16" height="16">
                            <use xlinkHref={`/sprite.svg#bookmark`}/>
                        </svg>
                    </button>
                </div>
                <div className={style.block}>
                    <h4 className={style.blocktitle}>Meaning</h4>
                    <p>{meaning}</p>
                </div>
                {analogs && analogs.length > 0 && <div>
                    <h4 className={style.blocktitle}>Analogs</h4>
                    <ul>
                        {Array.isArray(analogs) && analogs.map(({id, language, phrase})=>(
                            <li key={id}>
                                <em className={style.violet}>{language}:</em> “{phrase}”
                            </li>
                        ))}
                    </ul>
                </div>}
            </div>
            <div>
                <button className={style.readmore}>Read more <svg width="16" height="16">
                    <use xlinkHref={`/sprite.svg#arrow`} />
                    </svg>
                </button>
            </div>
        </li>
      ))}
    </ul>
        
    )
}

export default Idioma;