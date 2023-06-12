import Head from "next/head";
import Container from "@jokejunction/layout/Container/Container";
import Page from "@jokejunction/layout/Page";
import LoginView from "@jokejunction/views/LoginView/LoginView";

export default function Home() {
  return (
    <>
      <Head>
        <title>JokeJunction Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <main>
          <Container>
            <LoginView />
          </Container>
        </main>
      </Page>
    </>
  );
}
