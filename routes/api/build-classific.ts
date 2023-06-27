import { Handlers } from "$fresh/server.ts";
import db from "../../shared/db.ts";
import { Match } from "./get-matches.ts";

// should be a one time operation
export const handler: Handlers = {
  async GET(_req) {
    //check if it's set the get parameter id
    const url = new URL(_req.url);
    const key = url.searchParams.get("key");
    if (!key || key !== Deno.env.get("KEY")) {
      return new Response("invalid key", {
        status: 400,
      });
    }

    let logs = "";

    // count users victories
    const users: { [key: string]: number } = {};

    // get all matches
    const matches = await db.list<Match>({
      prefix: ["matches"],
      batchSize: 100000,
    });
    let count = 0;
    let total = 0;
    for await (const match of matches) {
      total++;
      const matchValue: Match = JSON.parse(match.value);
      if (
        matchValue.first && matchValue.first != "" &&
        matchValue.first.length == 36
      ) {
        count++;
        if (users[matchValue.first] == undefined) {
          users[matchValue.first] = 1;
        } else {
          users[matchValue.first]++;
        }
      }
    }

    logs += `total matches: ${total}\n`;
    logs += `total matches with first: ${count}\n`;

    //json encoded array of uuids
    const classific: { [key: number]: string } = {};

    // set users victories in db
    for (const user in users) {
      logs += `user: ${user} victories: ${users[user]}\n`;
      // get user from db
      const userValue = await db.get<string | null>(["users", user]);
      if (
        !userValue || userValue.value == null
      ) {
        //create the user
        await db.set(
          ["users", user],
          JSON.stringify({
            victories: users[user],
          }),
        );
      } else {
        // console.log(userValue.value);
        const userValueParsed = JSON.parse(userValue.value);
        userValueParsed.victories = users[user];
        await db.set(["users", user], JSON.stringify(userValueParsed));

        // update classific
        if (classific[userValueParsed.victories] == undefined) {
          classific[userValueParsed.victories] = JSON.stringify([user]);
        } else {
          const classificParsed = JSON.parse(
            classific[userValueParsed.victories],
          );
          classificParsed.push(user);
          classific[userValueParsed.victories] = JSON.stringify(
            classificParsed,
          );
        }
      }
    }

    // console.log(classific);
    // logs += `classific: ${JSON.stringify(classific)}\n`;
    for (const victories in classific) {
        // console.log(victories);
        // console.log(classific[victories]);
        logs += `victories: ${victories} users: ${classific[victories]}\n`;
        await db.set(
            ["classific", victories],
            classific[victories],
        );
    }

    //return the match
    return new Response(logs, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
