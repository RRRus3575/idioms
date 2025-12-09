// pages/legal.tsx  (Next.js, pages router)
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import { useGetTermsQuery } from "@/store/api";
import { useElementSize } from "@/hooks/useElementSize";
import { useMemo } from "react";
import { useRouter } from "next/router";
import MainTerms from "@/Components/MainTerms/MainTerms";


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
  
  const baseUrl = "https://idiomoland.com";

  const configByType = {
    "privacy-policy": {
      title: "Privacy Policy – Idiomo",
      description:
        "Learn how Idiomo collects, uses, and protects your data when you use our idioms dictionary and learning tools.",
      path: "/legal/privacy-policy",
    },
    "terms-of-use": {
      title: "Terms of Use – Idiomo",
      description:
        "Read the terms and conditions for using Idiomo, our idioms dictionary, and related services.",
      path: "/legal/terms-of-use",
    },
  };

  const current = configByType[type] || {
    title: "Legal – Idiomo",
    description: "Legal information about using Idiomo.",
    path: `/legal/${type || ""}`,
  };

  const canonicalUrl = `${baseUrl}${current.path}`;

  return (
    <div className="pagecontainer">
      <Head>
        <title>{current.title}</title>
        <meta name="description" content={current.description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={current.title} />
        <meta property="og:description" content={current.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={current.title} />
        <meta name="twitter:description" content={current.description} />
      </Head>
      <div ref={headerRef}>
        <Header />
      </div>

      <main style={mainStyle}>
        <div>



            <MainTerms 
                data={data}
                isLoading={isLoading}
                isError={isError}
                type={type}
            />
              

        </div>
      </main>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}
