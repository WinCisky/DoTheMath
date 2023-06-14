import { Handlers } from "$fresh/server.ts";
import db from "../../shared/db.ts";
import { Match } from "./get-matches.ts";

export const handler: Handlers = {
  async GET(_req) {
    //check if it's set the get parameter id
    const url = new URL(_req.url);
    const id = url.searchParams.get("id");
    if (!id) {
        return new Response("id is required", {
            status: 400,
        });
    }

    //get the match from the database
    const match = await db.get<Match | null>(["matches", parseInt(id, 10)]);
    if (!match) {
        return new Response("match not found", {
            status: 404,
        });
    }

    //return the match
    return new Response(JSON.stringify(match), {
        headers: { "Content-Type": "application/json" },
    });
  },
};