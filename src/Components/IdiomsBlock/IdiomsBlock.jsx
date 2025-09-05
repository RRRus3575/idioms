import { useEffect, useState } from "react";
import style from "./IdiomsBlock.module.css";
import Idioma from "../Idioma/Idioma";
import { useGetIdiomsQuery } from "@/store/api";

const PAGE_SIZE = 20; // при желании поменяй

const IdiomsBlock = () => {
  const [activeTab, setActiveTab] = useState("popular");

  // 🔹 Пагинация
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);

  // ⚠️ Предполагаем, что useGetIdiomsQuery принимает { page, limit }
  const { data, isLoading, isFetching, isError, error } = useGetIdiomsQuery({
    page,
    limit: PAGE_SIZE,
  });

  // Лог
  useEffect(() => {
    console.log("Ответ API:", data);
  }, [data]);

  // 🔹 На первую страницу — заменяем, на последующие — доклеиваем без дублей
  useEffect(() => {
    if (!data?.result) return;

    if (page === 1) {
      setItems(data.result);
    } else {
      setItems(prev => {
        const seen = new Set(prev.map(i => i.id));
        const incoming = data.result.filter(i => !seen.has(i.id));
        return [...prev, ...incoming];
      });
    }
  }, [data, page]);

  // 🔥 Пока грузится — показываем лоадер
  if (isLoading && page === 1) return <p>Loading idioms...</p>;

  // 🔥 Если ошибка — показываем её
  if (isError) {
    console.error("API error:", error);
    return <p>Failed to load idioms</p>;
  }

  // 🔥 Метаданные
  const totalPages  = data?.totalPages || 0;
  const totalIdioms = data?.totalIdioms || items.length;
  const currentPage = data?.currentPage || page;
  const canLoadMore = currentPage < totalPages;

  // 🔹 Обработчик "Show more"
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
          className={`${style.tabButton} ${activeTab === "searched" ? style.active : ""}`}
          onClick={() => setActiveTab("searched")}
        >
          Recent search
        </button>
      </div>

      {/* ✅ Передаём массив идиом */}
      <div>
        <Idioma idioms={items} />
      </div>

      {/* Пагинация */}
      {totalPages > 1 && page !== totalPages && (
        <button
          className={style.more}
          onClick={handleLoadMore}
          disabled={!canLoadMore || isFetching}
        >
          {isFetching ? "Loading..." : "Show more"}
        </button>
      )}
    </section>
  );
};

export default IdiomsBlock;
