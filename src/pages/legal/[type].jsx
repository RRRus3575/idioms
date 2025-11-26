// pages/legal.tsx  (Next.js, pages router)
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import { useGetTermsQuery } from "@/store/api";
import { useElementSize } from "@/hooks/useElementSize";
import { useMemo } from "react";
import { useRouter } from "next/router";


export default function LegalPage() {
  const router = useRouter();
  const { type } = router.query;

  const legalType =
    type === "privacy" || type === "cookies" ? type  : "terms";

  const { refCallback: headerRef, height: headerH } = useElementSize();
  const { refCallback: footerRef, height: footerH } = useElementSize();

  const mainStyle = useMemo(
    () => ({
      minHeight: `calc(100vh - ${headerH}px - ${footerH}px)`,
      overflow: "auto",
    }),
    [headerH, footerH]
  );

  const { data, isLoading, isError } = useGetTermsQuery({
    type: legalType,
    locale: "en", // тут можно взять язык из i18n/стора
  });
  
  console.log(data)

  return (
    <div className="pagecontainer">
      <div ref={headerRef}>
        <Header />
      </div>

      <main style={mainStyle}>
        <div className="legal-wrapper">

          {isLoading && <p>Loading…</p>}
          {isError && <p>Something went wrong. Try again later.</p>}

          {data?.url && (
            <iframe
                src={data.url}
                style={{
                width: "100%",
                height: "80vh",
                border: "none",
                background: "transparent",
                }}
                loading="lazy"
            />
            )}
        </div>
      </main>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}
