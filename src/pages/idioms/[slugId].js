// pages/idioms/[slugId].js
import { useMemo } from "react";
import { useRouter } from "next/router";
import { skipToken } from "@reduxjs/toolkit/query";
import Header from "@/Components/Header/Header";
import Head from "next/head";              // ← вот этого не хватает
import Footer from "@/Components/Footer/Footer";
import { useElementSize } from "@/hooks/useElementSize";
import { useGetIdiomByIdQuery } from "@/store/api";
import MainIdiomItem from "@/Components/MainIdiomItem/MainIdiomItem";

const parseId = (slugId = "") => {
  const parts = String(slugId).split("--");
  return parts.length > 1 ? parts.pop() : parts[0];
};

export default function IdiomPage() {
  const router = useRouter();
  const { slugId, lang = "en", from } = router.query;

  const id = useMemo(() => parseId(slugId || ""), [slugId]);

  const { refCallback: headerRef, height: headerH } = useElementSize();
  const { refCallback: footerRef, height: footerH } = useElementSize();
  const mainStyle = useMemo(
    () => ({ minHeight: `calc(100vh - ${headerH}px - ${footerH}px)`, overflow: "auto" }),
    [headerH, footerH]
  );

  const {
    data: idiom,
    isLoading,
    isError,
    isFetching,
  } = useGetIdiomByIdQuery(
    id ? { id, language: String(lang) } : skipToken,
    { refetchOnMountOrArgChange: true }
  );

  const isTransitionBetweenIdioms = Boolean(id && idiom && idiom.id !== id);

  const showLoader =
    isLoading ||                 // первый заход на страницу
    (isFetching && isTransitionBetweenIdioms); // переход к другой идиоме

  const idiomForRender = showLoader ? null : idiom;

  const backHref = typeof from === "string" && from.startsWith("/search") ? from : null;

  const handleFormSubmit = ({ idiom, language, categoryIds = [], sort = "az" }) => {
    router.push({
      pathname: "/search",
      query: {
        q: idiom || "",
        lang: language || "english",
        categories: categoryIds.join(","), 
        sort,                              
        hideOutdated: "0",                 
      },
    });
  };

    // ====== SEO meta ======
  const baseUrl = "https://idiomoland.com"; // вынеси в конфиг, если нужно
  const idiomText = idiomForRender?.text || idiomForRender?.title || "English idiom";
  const meaning =
    idiomForRender?.meaning ||
    idiomForRender?.translation ||
    "Learn the meaning, usage and translation of this English idiom.";
  const pageTitle = `${idiomText} – English idiom meaning | Idiomo`;

  const canonicalUrl = `${baseUrl}${router.asPath.split("?")[0]}`;
  const ogImage = idiomForRender?.imageUrl || `${baseUrl}/og-image-idiom.png`;

  return (
    <div key={router.asPath} className="page-container">
    <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={meaning} />

        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={meaning} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={meaning} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <div ref={headerRef}><Header onFormSubmit={handleFormSubmit}/></div>
      <div style={mainStyle}>
        <MainIdiomItem
          key={id}
          isLoading={showLoader}
          isError={isError}
          idiom={idiomForRender}     
          backHref={backHref}
        />
      </div>
      <div ref={footerRef}><Footer /></div>
    </div>
  );
}
