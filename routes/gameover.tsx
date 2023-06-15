import { Handlers, PageProps } from "$fresh/server.ts";
import GameOver, { GameOverProps } from "../islands/GameOver.tsx";

export const handler: Handlers<GameOverProps | null> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const solution = url.searchParams.get("solution");
    if (!id || !solution) {
      return ctx.render(null);
    }
    return ctx.render({ id, solution });
  },
};

export default function Page({ data }: PageProps<GameOverProps | null>) {
  if (!data) {
    return <h1>No data!</h1>;
  }

  return (
    <div>
      <GameOver id={data.id} solution={data.solution} />
    </div>
  );
}