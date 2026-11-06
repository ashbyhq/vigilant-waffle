import { Html, Head, Main, NextScript } from "next/document";
import { mediaStyles } from "../components/MediaQuery";
import { getCssText, globalStyles } from "../styles/stitches.config";

export default function Document() {
  globalStyles();

  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="192x192" />
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
        <style type="text/css" dangerouslySetInnerHTML={{ __html: mediaStyles }} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Playfair+Display:wght@900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="/fonts/tt_norms_pro_variable-subset.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          src={process.env.NEXT_PUBLIC_ASHBY_EMBED_URL ?? "https://jobs.ashbyhq.com/ashby/embed"}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
