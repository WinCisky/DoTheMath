import { Handlers } from "$fresh/server.ts";
import db from "../../shared/db.ts";

export const handler: Handlers = {
  async GET(_req) {
    //get the match from the database
    const top10 = [];
    const classific = db.list<string>({ prefix: ["classific"] }, {
      reverse: true,
      limit: 10,
    });

    // only get first 10, multiple users can have the same score
    for await (const match of classific) {
      //console.log(match);
      const users = JSON.parse(match.value);
      for (const user of users) {
        top10.push({ victories: match.key[1], user: user });
      }
      if (top10.length == 10) break;
    }

    if (!classific) {
      return new Response("classific not found", {
        status: 404,
      });
    }

    //return the match
    return new Response(JSON.stringify(top10), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
