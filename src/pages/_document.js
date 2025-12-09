// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Светлая иконка */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon_light_theme.svg"
          media="(prefers-color-scheme: light)"
        />
        {/* Тёмная иконка */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon_dark_theme.svg"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
