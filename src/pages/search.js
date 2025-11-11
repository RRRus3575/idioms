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
    <div className="pagecontainer">
      <div ref={headerRef}><Header onFormSubmit={handleFormSubmit} /></div>

      <div style={mainStyle}>
        <MainIdioms externalSearch={externalSearch}/>
      </div>

      <div ref={footerRef}><Footer /></div>
    </div>
  );
};

export default Search;