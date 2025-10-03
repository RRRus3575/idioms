import React, { useMemo, useEffect, useRef, useState } from "react";
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



  // URL → состояние
  const urlState = useMemo(() => {
    if (!router.isReady) return null;

    const q = (router.query.q || "").toString();
    const rawLang = (router.query.lang || "en").toString();
    const lang = toLangCode(rawLang, "en");
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

  // вспомогалки для URL
  const submitWithCurrentFilters = (patch = {}) => {
    const { categoryIds = [], sort = "az", hideOutdated = false } = urlState || {};
    const next = {
      categories: (categoryIds || []).join(","),
      sort,
      hideOutdated: hideOutdated ? "1" : "0",
      page: "1",
      ...patch,
    };
    Object.keys(next).forEach((k) => {
      if (next[k] === "" || next[k] == null) delete next[k];
    });
    return router.push({ pathname: "/search", query: next });
  };

  const updateQuery = (patch) => {
    const next = { ...router.query, ...patch };
    Object.keys(next).forEach((k) => {
      if (next[k] === "" || next[k] == null) delete next[k];
    });
    router.replace({ pathname: "/search", query: next }, undefined, { shallow: true });
  };

  const handleClearSearch = () =>
    submitWithCurrentFilters({ q: "", lang: urlState?.lang });

  // данные
  const { data: categories = [], isLoading: catsLoading } =
    useGetCategoriesQuery(urlState ? { language: urlState.lang } : undefined, {
      skip: !urlState,
    });

  const idiomsParams = useMemo(() => {
    if (!urlState) return null;
    const { q, lang, sort, page, categoryIds, hideOutdated } = urlState;
    return {
      query: q,
      language: lang,
      languageVersion: lang,
      categories: (categoryIds || []).join(","),
      sort,
      page,
      limit: 20,
      hideOutdated,
    };
  }, [urlState]);

  const { data, isLoading, isFetching, isError } =
    useGetIdiomsQuery(idiomsParams || {}, { skip: !idiomsParams });

  const items = data?.result || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || urlState?.page || 1;
  const canLoadMore = currentPage < totalPages;

  // хендлеры фильтров
  const handleLoadMore = () => {
    if (!canLoadMore || isFetching) return;
    const nextPage = String(Number(router.query.page || 1) + 1);
    updateQuery({ page: nextPage });
  };

  const handleClearAll = () => {
    updateQuery({
      q: urlState?.q || "",
      categories: "",
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
    updateQuery({ hideOutdated: urlState?.hideOutdated ? "0" : "1", page: "1" });
  };

  const handleFormSubmit = ({ idiom, language }) => {
    const q = (idiom || "").trim();
    if (!q) return Promise.resolve();
    const lang = toLangCode(language, "en");
    return submitWithCurrentFilters({ q, lang });
  };

  if (!urlState) return null;

  return (
    <main className={style.main}>
      <div>
        <Breadcrumbs
          labelMap={{ "/": "Home", "/search": "Search", idioms: "Idioms" }}
          preserveQuery={false}
        />

        <FormHero
          onFormSubmit={handleFormSubmit}
          onClear={handleClearSearch}
          initialIdiom={urlState.q}
          initialLanguage={urlState.lang}
        />


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

      {!isLoading && !isError && items.length < 1 && (
        <div className={style.notFound}>
          <div className={style.cross}>
            <svg className={style.image} width="40" height="40" aria-hidden>
              <use xlinkHref="/sprite.svg#close" className={style.crossimg} />
            </svg>
          </div>
          <div>
            <h2 className={style.errorname}>Nothing is found</h2>
            <p>Try to change the filter categories, language or keywords</p>
          </div>
        </div>
      )}

      {!isLoading && !isError && items.length > 0 && (
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
