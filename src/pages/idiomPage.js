import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import MainIdioms from "@/Components/MainIdioms/MainIdioms";
import { useElementSize } from "@/hooks/useElementSize";
import { useMemo } from "react";

const Search = () => {
  const { refCallback: headerRef, height: headerH } = useElementSize();
  const { refCallback: footerRef, height: footerH } = useElementSize();

  const mainStyle = useMemo(
    () => ({
      minHeight: `calc(100vh - ${headerH}px - ${footerH}px)`,
      overflow: "auto"
    }),
    [headerH, footerH]
  );

  return (
    <div className="page-container">
      <div ref={headerRef}><Header /></div>

      <div style={mainStyle}>
        <MainIdioms />
      </div>

      <div ref={footerRef}><Footer /></div>
    </div>
  );
};

export default Search;