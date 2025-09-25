import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { useGetCategoriesQuery, useGetIdiomsQuery } from "@/store/api";
import FormHero from "../FormHero/FormHero";
import FiltersBar from "../FiltersBar/FiltersBar";
import ButtonShowMore from "../ButtonShowMore/ButtonShowMore";
import Idioma from "../Idioma/Idioma";
import { toLangCode } from "@/utils/lang";
import style from "./MainIdioms.module.css";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const MainIdioms = () => {
  const router = useRouter();

  // 1) URL → состояние (lang всегда ISO-код, например 'en')
  const urlState = useMemo(() => {
    if (!router.isReady) return null;

    const q = (router.query.q || "").toString();
    const rawLang = (router.query.lang || "en").toString();
    const lang = toLangCode(rawLang, "en");        // ← код языка
    const sort = (router.query.sort || "az").toString();
    const page = Number(router.query.page || 1);
    const categoriesStr = (router.query.categories || "").toString();
    const categoryIds = categoriesStr ? categoriesStr.split(",") : [];
    const hideOutdated =
      router.query.hideOutdated === "1" ||
      router.query.hideOutdated === "true" ||
      router.query.hideOutdated === true;

    return { q, lang, sort, page, categoryIds, hideOutdated };
  }, [router.isReady, router.query]);

  // 2) Категории (если нужен язык на бэке)
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
      language: lang,           // ← код
      languageVersion: lang,    // ← код (а не 'english'/'german')
      categories: (categoryIds || []).join(","),              // слайс склеит в "1,2,3"
      sort,
      page,
      limit: 20,
      hideOutdated,             // boolean
    };
  }, [urlState]);

  // 4) Запрос идиом
  const { data, isLoading, isFetching, isError } =
    useGetIdiomsQuery(idiomsParams || {}, { skip: !idiomsParams });

  const items = data?.result || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || urlState?.page || 1;
  const canLoadMore = currentPage < totalPages;

  // 5) Обновление URL
  const updateQuery = (patch) => {
    const next = { ...router.query, ...patch };
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
      categories: "",
      sort: "az",
      hideOutdated: "0", // если хочешь хранить в URL как '0'/'1'
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
    updateQuery({ hideOutdated: urlState?.hideOutdated ? "0" : "1", page: "1" });
  };

  // Сабмит формы: кладём в URL уже КОД языка
  const handleFormSubmit = ({ idiom, language, categoryIds = [], sort = "az" }) => {
    const q = (idiom || "").trim();
    if (!q) return Promise.resolve();
    const lang = toLangCode(language, "en"); // ← нормализуем
    return router.push({
      pathname: "/search",
      query: {
        q,
        lang,
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
        <Breadcrumbs
          labelMap={{ "/": "Home", "/search": "Search", idioms: "Idioms" }}
          preserveQuery={false}
        />
        <FormHero onFormSubmit={handleFormSubmit} />
        <FiltersBar
          categories={urlState.categoryIds}
          onChangeCategories={handleChangeCategories}
          sort={urlState.sort}
          onChangeSort={handleChangeSort}
          hideOutdated={urlState.hideOutdated}
          onToggleOutdated={handleToggleOutdated}
          onClearAll={handleClearAll}
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
