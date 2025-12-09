import Head from "next/head";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import MainIdioms from "@/Components/MainIdioms/MainIdioms";
import { useElementSize } from "@/hooks/useElementSize";
import { useMemo, useState } from "react";

const Search = () => {
  const { refCallback: headerRef, height: headerH } = useElementSize();
  const { refCallback: footerRef, height: footerH } = useElementSize();

  const [externalSearch, setExternalSearch] = useState({
    q: "",
    lang: "english",
    categories: "",      // строка "id1,id2"
    sort: "az",
    hideOutdated: "0",
    __ts: 0,             // метка времени для явного триггера
  });
  const mainStyle = useMemo(
    () => ({
      minHeight: `calc(100vh - ${headerH}px - ${footerH}px)`,
      overflow: "auto"
    }),
    [headerH, footerH]
  );

  const handleFormSubmit = ({ idiom, language, categoryIds = [], sort = "az" }) => {
    setExternalSearch({
      q: idiom || "",
      lang: (language || "english").toLowerCase(),
      categories: categoryIds.join(","),
      sort,
      hideOutdated: "0",
      __ts: Date.now(), // гарантируем, что useEffect в Main сработает
    });
  };

  return (
    <>
      <Head>
        <title>Search English idioms – Idiomo</title>
        <meta
          name="description"
          content="Search English idioms by meaning, translation, and topic. Use filters, sorting, and up-to-date usage examples."
        />

        {/* Uncomment this if you don't want search engines to index search results */}
        {/* <meta name="robots" content="noindex,follow" /> */}

        {/* Open Graph */}
        <meta property="og:title" content="Search English idioms – Idiomo" />
        <meta
          property="og:description"
          content="Find the right English idiom by keywords, categories, and language."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://idiomoland.com/search" />
        {/* <meta property="og:image" content="https://idiomoland.com/og-image-search.png" /> */}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Search English idioms – Idiomo" />
        <meta
          name="twitter:description"
          content="Fast search and filtering for English idioms."
        />
        {/* <meta name="twitter:image" content="https://idiomoland.com/og-image-search.png" /> */}

        <link rel="canonical" href="https://idiomoland.com/search" />
      </Head>

    <div className="pagecontainer">
      <div ref={headerRef}><Header onFormSubmit={handleFormSubmit} /></div>

      <div style={mainStyle}>
        <MainIdioms externalSearch={externalSearch}/>
      </div>

      <div ref={footerRef}><Footer /></div>
    </div>
    </>

  );
};

export default Search;