// pages/legal.tsx  (Next.js, pages router)
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import { useGetPolicyQuery } from "@/store/api";
import { useElementSize } from "@/hooks/useElementSize";
import { useMemo } from "react";
import { useRouter } from "next/router";

const titleMap = {
  terms: "Terms of Service",
  privacy: "Privacy Policy",
  cookies: "Cookies Policy",
} as const;

type LegalType = keyof typeof titleMap;

export default function LegalPage() {
  const router = useRouter();
  const { type = "terms" } = router.query;

  // приводим к строго типизированному виду
  const legalType: LegalType =
    type === "privacy" || type === "cookies" ? (type as LegalType) : "terms";

  const { refCallback: headerRef, height: headerH } = useElementSize();
  const { refCallback: footerRef, height: footerH } = useElementSize();

  const mainStyle = useMemo(
    () => ({
      minHeight: `calc(100vh - ${headerH}px - ${footerH}px)`,
      overflow: "auto",
    }),
    [headerH, footerH]
  );

  const { data, isLoading, isError } = useGetPolicyQuery({
    type: legalType,
    locale: "en", // тут можно взять язык из i18n/стора
  });

  return (
    <div className="pagecontainer">
      <div ref={headerRef}>
        <Header />
      </div>

      <main style={mainStyle}>
        <div className="legal-wrapper">
          <h1>{titleMap[legalType]}</h1>

          {isLoading && <p>Loading…</p>}
          {isError && <p>Something went wrong. Try again later.</p>}

          {data?.html && (
            <div
              className="legal-content"
              dangerouslySetInnerHTML={{ __html: data.html }}
            />
          )}

          {data?.url && !data.html && (
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
