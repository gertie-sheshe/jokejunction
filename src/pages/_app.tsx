import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useUser from "@jokejunction/hooks/useUser";

import type { AppProps } from "next/app";
import Header from "@jokejunction/layout/Header/Header";
import { Albert_Sans } from "next/font/google";

const albertSans = Albert_Sans({
  subsets: ["latin"],
});

import "@jokejunction/styles/globals.css";
import "@jokejunction/styles/theme.scss";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) setUser("user"); //sync across tabs
    if (!token && router.pathname !== "/") {
      router.push("/");
    }
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <div className={albertSans.className}>
          <Header />
          <Component {...pageProps} />
        </div>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
