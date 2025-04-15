import style from "./Idioma.module.css"
import sprite from "../../sprite.svg";
import React from "react";

const Idioma = ({idioms}) =>{
    

      const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        speechSynthesis.speak(utterance);
      };
      
    return(
        <ul className={style}>
      {idioms.map(({title, meaning, analogs}, index) => (
        <li key={index} className={style.idiomoitems}>
            <div>
                <div className={style.titleblock}>
                    <h3 className={style.title}>{title}</h3>
                    <button onClick={() => speak(title)} className={style.button}>
                        <svg width="16" height="16">
                            <use xlinkHref={`${sprite}#sound`}/>
                        </svg>
                    </button>
                    <button className={style.button}>
                        <svg width="16" height="16">
                            <use xlinkHref={`${sprite}#bookmark`}/>
                        </svg>
                    </button>
                </div>
                <div>
                    <h4>Meaning</h4>
                    <p>{meaning}</p>
                </div>
                <div>
                    <h4>Analogs</h4>
                    <ul>
                        {Array.isArray(analogs) && analogs.map(({lang, text})=>(
                            <li key={lang}>
                                <em>{lang}:</em> “{text}”
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <button>Read more <svg>
                    <use xlinkHref={`${sprite}#arrow`}/>
                    </svg>
                </button>
            </div>
        </li>
      ))}
    </ul>
        
    )
}

export default Idioma