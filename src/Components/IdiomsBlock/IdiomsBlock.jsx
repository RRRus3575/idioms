import { useEffect, useState } from "react";
import style from "./IdiomsBlock.module.css";
import Idioma from "../Idioma/Idioma";
import { useGetIdiomsQuery } from "@/store/api";

const IdiomsBlock = () => {
  const [activeTab, setActiveTab] = useState("popular");

  const { data, isLoading, isError, error } = useGetIdiomsQuery();

  useEffect(() => {
    console.log("Ответ API:", data);
  }, [data]);

  // 🔥 Пока грузится — показываем лоадер
  if (isLoading) return <p>Loading idioms...</p>;

  // 🔥 Если ошибка — показываем её
  if (isError) {
    console.error("API error:", error);
    return <p>Failed to load idioms</p>;
  }

  // 🔥 Безопасно достаём данные
  const idiomsArray = data?.result || [];
  const totalPages = data?.totalPages || 0;
  const totalIdioms = data?.totalIdioms || 0;
  const currentPage = data?.currentPage || 1;

  return (
    <section className={style.section}>
      <h2 className={style.title}>Idioms</h2>
      <p>Total idioms: {totalIdioms} (Page {currentPage} of {totalPages})</p>

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
        <Idioma idioms={idiomsArray} />
      </div>

      {/* Пагинация */}
      {totalPages > 1 && <button className={style.more}>Show more</button>}
    </section>
  );
};

export default IdiomsBlock;
