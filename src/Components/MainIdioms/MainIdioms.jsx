import React, { useMemo } from "react";
import { useRouter } from "next/router"; // Pages Router
import { useGetCategoriesQuery, useGetIdiomsQuery } from "@/store/api";
import FormHero from "../Form-hero/Form-hero";
import FiltersBar from "../FiltersBar/FiltersBar";
import ButtonShowMore from "../ButtonShowMore/ButtonShowMore";
import Idioma from "../Idioma/Idioma";
import { toLangCode } from "@/utils/lang";
import style from "./MainIdioms.module.css"

// Если у тебя форма поиска отдельным компонентом:

const MainIdioms = () => {
  const router = useRouter();

  // 1) Собираем состояние из URL
  const urlState = useMemo(() => {
    if (!router.isReady) return null;

    const q = (router.query.q || "").toString();
    const rawLang  = (router.query.lang || "english").toString();
    const langCode = toLangCode(rawLang, "en");
    const sort = (router.query.sort || "az").toString();
    const page = Number(router.query.page || 1);
    const categoriesStr = (router.query.categories || "").toString(); // "1,2,3"
    const categoryIds = categoriesStr ? categoriesStr.split(",") : [];
    const hideOutdated = router.query.hideOutdated === "1";

    return { q, language: langCode, sort, page, categoryIds, hideOutdated };
  }, [router.isReady, router.query]);

  // 2) Запрос категорий (если нужно показывать список на фронте)
  const { data: categories = [], isLoading: catsLoading } =
    useGetCategoriesQuery(urlState ? { language: urlState.lang } : undefined, {
      skip: !urlState,
    });

  // 3) Параметры для идиом
  const idiomsParams = useMemo(() => {
    if (!urlState) return null;

    const { q, lang, sort, page, categoryIds, hideOutdated } = urlState;

    return {
      query: q,
      language: lang,
      categoryIds,
      sort,
      page,
      limit: 20,
      hideOutdated,
      // если бэку нужна languageVersion — выстави по своим правилам:
      languageVersion: lang === "english" ? "en" : "de",
    };
  }, [urlState]);

  // 4) Запрос идиом
  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetIdiomsQuery(idiomsParams || {}, { skip: !idiomsParams });

  const items = data?.result || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || urlState?.page || 1;
  const canLoadMore = currentPage < totalPages;

  // 5) Обработчики — меняем URL (shallow), RTK Query сам перефетчит
  const updateQuery = (patch) => {
    const next = { ...router.query, ...patch };
    // чистим пустые значения
    Object.keys(next).forEach((k) => {
      if (next[k] === "" || next[k] == null) delete next[k];
    });
    router.replace({ pathname: "/search", query: next }, undefined, { shallow: true });
  };

  const handleLoadMore = () => {
    if (!canLoadMore || isFetching) return;
    const nextPage = String((Number(router.query.page || 1)) + 1);
    updateQuery({ page: nextPage });
  };

  const handleClearAll = () => {
    updateQuery({
      q: urlState?.q || "",
      categories: "",   // очистим мульти-выбор
      sort: "az",
      hideOutdated: "0",
      page: "1",
    });
  };

  const handleChangeCategories = (ids) => {
    updateQuery({ categories: (ids || []).join(","), page: "1" });
  };

  const handleChangeSort = (value) => {
    updateQuery({ sort: value, page: "1" });
  };

  const handleToggleOutdated = () => {
    const next = urlState?.hideOutdated ? "0" : "1";
    updateQuery({ hideOutdated: next, page: "1" });
  };

  // (Опционально) если форма поиска на этой странице должна менять URL:
  const handleFormSubmit = ({ idiom, language, categoryIds = [], sort = "az" }) => {
    const q = (idiom || "").trim();
    if (!q) return Promise.resolve(); // чтобы не падать без текста

    return router.push({
        pathname: "/search",
        query: {
        q,
        lang: language || "english",
        categories: (categoryIds || []).join(","),
        sort,
        page: "1",
        },
    });
    };

  if (!urlState) return null;

  return (
    <main className={style.main}>
      <div>
        <FormHero
            onFormSubmit={handleFormSubmit}
        // если хочешь сразу контролировать инпут через URL, можно расширить FormHero пропсами value/onChange
        />

        <FiltersBar
            categories={urlState.categoryIds}
            onChangeCategories={handleChangeCategories}
            sort={urlState.sort}
            onChangeSort={handleChangeSort}
            hideOutdated={urlState.hideOutdated}
            onToggleOutdated={handleToggleOutdated}
            onClearAll={handleClearAll}
        // можешь пробросить список доступных категорий, если нужно для выпадашки
            allCategories={categories}
            categoriesLoading={catsLoading}
        />
      </div>


      {isLoading && currentPage === 1 && <p>Loading idioms…</p>}
      {isError && <p>Failed to load idioms</p>}

      {!isLoading && !isError && (
        <>
          <div>
            <Idioma idioms={items} />
          </div>

          {totalPages > 1 && currentPage !== totalPages && (
            <ButtonShowMore
              isFetching={isFetching}
              canLoadMore={canLoadMore}
              handleLoadMore={handleLoadMore}
            />
          )}
        </>
      )}
    </main>
  );
};

export default MainIdioms;
