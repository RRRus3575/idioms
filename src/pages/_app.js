import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Head from "next/head";
import { store } from "../store/store";
import "@/styles/globals.css";
import localFont from "next/font/local";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;


const openSans = localFont({
  src: [
    { path: "../fonts/OpenSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/OpenSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/OpenSans-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/OpenSans-Italic.ttf", weight: "400", style: "italic" },
  ],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  const title =
    "Idiomoland — English Idioms Explained with Examples, Meanings & Translations";
  const description =
    "Idiomoland is the easiest way to learn English idioms with clear meanings, real-life examples, translations, audio pronunciation and categories.";
  const url = "https://idiomoland.com";
  const image = `${url}/og-image.png`;
  return (
    <>
      <Head>
        {/* Basic SEO t*/}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="idiomoland, english idioms, idioms with meanings, idioms examples, learn english idioms, idioms dictionary, idioms translator, idiomatic expressions"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="Idiomoland" />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>
      <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
          <div className={openSans.className}>
            <Component {...pageProps} />
          </div>
        </Provider>
      </GoogleOAuthProvider>
      
    </>

  );
}
