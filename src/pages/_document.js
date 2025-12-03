import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Idiomoland — English Idioms Explained with Examples, Meanings & Translations</title>

        <meta name="description" content="Idiomoland is the easiest way to learn English idioms with clear meanings, real-life examples, translations, audio pronunciation and categories. Search, discover and master idioms the smart way." />

        <meta name="keywords" content="idiomoland, english idioms, idioms with meanings, idioms examples, learn english idioms, idioms dictionary, idioms translator, idiomatic expressions" />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Idiomoland — English Idioms Explained with Examples" />
        <meta property="og:description" content="Learn English idioms with clear meanings, examples, translations and audio pronunciation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://idiomoland.com/" />
        {/* <meta property="og:image" content="https://idiomoland.com/og-image.png" /> */}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Idiomoland — English Idioms Explained" />
        <meta name="twitter:description" content="The best way to learn English idioms with meanings, examples and translations." />

        {/* <link rel="icon" type="image/png" href="/favicon.png" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
