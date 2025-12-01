// pages/idioms/[slugId].js
import { useMemo } from "react";
import { useRouter } from "next/router";
import { skipToken } from "@reduxjs/toolkit/query";
import Header from "@/Components/Header/Header";
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

  return (
    <div key={router.asPath} className="page-container">
      <div ref={headerRef}><Header /></div>
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
