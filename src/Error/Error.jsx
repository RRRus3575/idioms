import style from "./Error.module.css"

export default function ErrorContainer({title, text}) {
    return(
        <div className={style.notFound}>
          <div className={style.cross}>
            <svg className={style.image} width="40" height="40" aria-hidden>
              <use xlinkHref="/sprite.svg#close" className={style.crossimg} />
            </svg>
          </div>
          <div>
            <h2 className={style.errorname}>{title}</h2>
            <p>{text}</p>
          </div>
        </div>
    )
}