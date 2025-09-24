import style from "./ButtonShowMore.module.css"

const ButtonShowMore = ({isFetching, canLoadMore, handleLoadMore}) => {
    return(
        <button
            className={style.more}
            onClick={handleLoadMore}
            disabled={!canLoadMore || isFetching}
            >
            {isFetching ? "Loading..." : "Show more"}
        </button>
    )
}

export default ButtonShowMore;