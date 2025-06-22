import React from "react";
import FormCards from "../FormCards/FormCards";
import style from "./Card-section.module.css";

const CardSection = () => {
  return (
    <section className={style.section}>
      <h2 className="visually-hidden">Idioms Hub</h2>
      <div>
        <ul className={style.cardlist}>
          <li className={style.cardleft}>
            <svg className={style.image}>
              <use xlinkHref={`/sprite.svg#star`} />
            </svg>
            <h3 className={style.title}>Rate & Discuss idioms</h3>
            <p className={style.textup}>
              Write in comments if you don’t agree with any info we provided.
            </p>
            <p>Rate every idiom in terms of accuracy and topicality.</p>
          </li>
          <li className={style.cardright}>
            <svg className={style.image}>
              <use xlinkHref={`/sprite.svg#find`} /> 
            </svg>
            <h3 className={style.title}>Search idioms</h3>
            <p>
              Look for idioms and phrases + find their equivalents in different
              languages
            </p>
            <div className={style.form}>
              <div className={style.wrap}>
                <p>enter the desired phrase or idiom</p>
                <svg className={style.arrowup}>
                  <use xlinkHref={`/sprite.svg#drop`} />
                </svg>
              </div>
              <FormCards />
              <div className={style.wrapdown}>
                <p>select the language of idiom here and search the result</p>
                <svg className={style.arrowbottom}>
                  <use xlinkHref={`/sprite.svg#drop`} />
                </svg>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CardSection;
