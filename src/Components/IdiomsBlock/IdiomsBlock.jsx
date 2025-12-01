import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import style from "./IdiomsBlock.module.css";
import ListIdioms from "../ListIdioms/listIdioms";
import { useGetIdiomsQuery } from "@/store/api";
import ButtonShowMore from "../ButtonShowMore/ButtonShowMore";
import LoaderIdioms from "../LoaderIdioms/LoaderIdioms";

const PAGE_SIZE = 20;

const IdiomsBlock = () => {
  const router = useRouter();
  const lang = (router.query.lang || "en").toString();

  const [activeTab, setActiveTab] = useState("popular"); // "popular" | "searched"
  const [page, setPage] = useState(1);

  // при смене вкладки — на первую страницу
  useEffect(() => { setPage(1); }, [activeTab]);

  // сортировка по вкладкам
  const sort = activeTab === "popular" ? "popular" : "last_searched";

  // параметры запроса
  const params = useMemo(() => ({
    page,
    limit: PAGE_SIZE,
    language: lang,
    languageVersion: lang,
    sort,
  }), [page, lang, sort]);

  // один хук на всё — RTK Query сам склеит страницы (если у тебя стоит merge в api-слайсе)
  const { data, isLoading, isFetching, isError, error } = useGetIdiomsQuery(params);

  // метаданные
  const items       = data?.result ?? [];
  const totalPages  = data?.totalPages ?? 1;
  const currentPage = data?.currentPage ?? page;
  const canLoadMore = currentPage < totalPages;
  console.log("items", items)
  const showInitialSkeleton =
  (isLoading && page === 1) ||
  (isFetching && page === 1 && items.length === 0);

  const handleLoadMore = () => {
    if (!canLoadMore || isFetching) return;
    setPage(p => p + 1);
  };

  return (
    <section className={style.section}>
      <h2 className={style.title}>Idioms</h2>

      <div className={style.tabButtons}>
        <button
          className={`${style.tabButton} ${activeTab === "popular" ? style.active : ""}`}
          onClick={() => setActiveTab("popular")}
        >
          Most popular
        </button>
        <button
          className={`${style.tabButton} ${activeTab === "last_searched" ? style.active : ""}`}
          onClick={() => setActiveTab("last_searched")}
        >
          Recent search
        </button>
      </div>

      {showInitialSkeleton && currentPage === 1 && <LoaderIdioms/>}
      {isError && <p>Failed to load idioms</p>}

      {!showInitialSkeleton && !isError && items.length > 0 && (
        <>
          <div>
            <ListIdioms idioms={items} />
          </div>

          {totalPages > 1 && currentPage !== totalPages && (
            <ButtonShowMore isFetching={isFetching} canLoadMore={canLoadMore} handleLoadMore={handleLoadMore} />
          )}
        </>
      )}
    </section>
  );
};

export default IdiomsBlock;
