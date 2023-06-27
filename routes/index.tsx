import { Head } from "$fresh/runtime.ts";
import LinkButton from "../components/LinkButton.tsx";
import Counter from "../islands/Counter.tsx";
import SetUser from "../islands/SetUser.tsx";
import QueueJoin from "../islands/QueueJoin.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title> Do the Math</title>
      </Head>
      <SetUser />
      <div class="bg-blue-400 h-screen">
        <div class="flex justify-center text-7xl  font-bold pt-20  ">
          <h1 class="  text-blue-800   text-center       ">Do The Math</h1>
        </div>
        <div class=" flex justify-center pt-20 ">
          <img
            class="rounded-full bg-gray-50 p-10 "
            src="/logo.svg"
            width="256"
            height="256"
            alt="the fresh logo: a sliced lemon dripping with juice"
          />
        </div>
        <div class="flex justify-center p-20">
          <QueueJoin />
        </div>
      </div>
    </>
  );
}
