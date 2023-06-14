import { Head } from "$fresh/runtime.ts";
import LinkButton from "../components/LinkButton.tsx";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div>
        <img
          src="/logo.svg"
          width="128"
          height="128"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p>
          Welcome to `fresh`. Try updating this message in the
          ./routes/index.tsx file, and refresh.
        </p>
        <Counter start={3} />
        <LinkButton>Prossima Sfida</LinkButton>
      </div>
    </>
  );
}
