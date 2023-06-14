import { Handlers } from "$fresh/server.ts";
import db from "../../shared/db.ts";
import { Match, Problem } from "./get-matches.ts";

interface Solution{
    id: number;
    solution: string;
}

export const handler: Handlers = {
  async GET(_req) {
    //check if it's set the get parameter id and solutions
    const url = new URL(_req.url);
    const id = url.searchParams.get("id");
    const solutions = url.searchParams.get("solutions");
    const uuid = url.searchParams.get("uuid");
    if (!id) {
        return new Response("id is required", {
            status: 400,
        });
    }

    if (!solutions) {
        return new Response("solutions is required", {
            status: 400,
        });
    }

    if (!uuid) {
        return new Response("uuid is required", {
            status: 400,
        });
    }

    let solutionsValues: Solution[] = [];

    try {
        solutionsValues = JSON.parse(atob(solutions)) as Solution[];
    } catch (error) {
        console.error("Error parsing solutions:", error);
        return new Response("solutions is not valid", {
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

    // console.log(match);
    const matchValue: Match = JSON.parse(match.value);

    //check if the solutions are correct
    const correct = matchValue.problems.every((problem: Problem) => {
        //find solution in problem with the same id
        const solution = solutionsValues.find((solution) => solution.id === problem.id);
        // console.log(solution);
        if (!solution) {
            return false;
        } else {
            return solution.solution == problem.solution;
        }
    });

    if (!correct) {
        return new Response("solutions are not correct", {
            status: 400,
        });
    } else {
        if (typeof matchValue.first === "undefined" || matchValue.first === "") {
            matchValue.first = uuid;
            await db.set(["matches", parseInt(id, 10)], JSON.stringify(matchValue));
            return new Response(JSON.stringify({"success": true, "win": true}), {
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({"success": true, "win": false}), {
                headers: { "Content-Type": "application/json" },
            });
        }
    }
  },
};