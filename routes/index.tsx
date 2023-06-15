import { Head } from "$fresh/runtime.ts";
import LinkButton from "../components/LinkButton.tsx";
import Counter from "../islands/Counter.tsx";
import SetUser from "../islands/SetUser.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <SetUser />
      <div class="bg-green-300 h-screen">
        <div class="flex justify-center pt-20">
          <img
            src="/logo.svg"
            width="128"
            height="128"
            alt="the fresh logo: a sliced lemon dripping with juice"
          />
        </div>
        <div class="flex justify-center p-20">
          <LinkButton>Prossima Sfida</LinkButton>
        </div>
      </div>
    </>
  );
}
