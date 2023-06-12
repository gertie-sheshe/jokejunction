import type { AppProps } from "next/app";
import Header from "@jokejunction/layout/Header/Header";
import { Albert_Sans } from "next/font/google";

const albertSans = Albert_Sans({
  subsets: ["latin"],
});

import "@jokejunction/styles/globals.css";
import "@jokejunction/styles/theme.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={albertSans.className}>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
