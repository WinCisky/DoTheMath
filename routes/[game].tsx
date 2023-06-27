import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import Game from "../islands/Game.tsx";

export default function game(props: PageProps) {
  return (
    <>
      <div class="bg-blue-400 h-screen">
        <Game id={props.params.game} />
      </div>

      <div></div>
    </>
  );
}
