import { Handlers } from "$fresh/server.ts";
import db from "../../shared/db.ts";

export interface Problem {
    id: number;
    description: string;
    choices: string[];
    solution: string;
}

export interface Match {
    id: number;
    problems: Problem[];
    first: string;
}

interface MathProblem {
  operand1: number;
  operand2: number;
  operator: string;
  answer: number;
}

const MAX_MATCHES = 5;
// 30 seconds
const MATCHES_INTERVAL = 30 * 1000;
const CHOICES_COUNT = 4;
const MUTLIPLIER = 10; //hard -> 100, medium -> 50

function createMathProblem(): MathProblem {
  const operators = ["+", "-", "*", "/"];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  let operand1 = Math.floor(Math.random() * MUTLIPLIER);
  let operand2 = Math.floor(Math.random() * MUTLIPLIER);
  let answer = 0;
  switch (operator) {
    case "+":
      answer = operand1 + operand2;
      break;
    case "-":
      answer = operand1 - operand2;
      break;
    case "*":
      answer = operand1 * operand2;
      break;
    case "/":
      operand2 = Math.floor(Math.random() * 10) + 1;
      operand1 = operand2 * Math.floor(Math.random() * 10);
      answer = operand1 / operand2;
      break;
  }
  return { operand1, operand2, operator, answer };
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createProblem(id: number): Problem {
  const { operand1, operand2, operator, answer } = createMathProblem();
  const description = `${operand1} ${operator} ${operand2}`;
  const solution = answer.toString();
  let choices = [answer.toString(), "0", "0", "0"];

  for (let i = 1; i < CHOICES_COUNT; i++) {
    choices[i] = createMathProblem().answer.toString();
  }

  //randomize order
  choices = shuffleArray(choices);
  
  return {
    id,
    description,
    choices,
    solution,
  };

}

export const handler: Handlers = {
  async GET(_req) {
    const timestamp = Date.now();

    // //remove past matches
    // for await (const entry of db.list({ prefix: ["matches"], end: ["matches", timestamp] })) {
    //   await db.delete(entry.key);
    // }

    // get all future matches
    const matches = [];
    for await (const entry of db.list({ prefix: ["matches"], start: ["matches", timestamp] })) {
      console.log(entry);
        matches.push(JSON.parse(entry.value) as Match);
    }

    const matchesLeft = MAX_MATCHES - matches.length;
    const previousMatchTimestamp = matches.length > 0 ? matches[matches.length - 1].id : timestamp;
    for (let i = 0; i < matchesLeft; i++) {
        const newMatchTimestamp = previousMatchTimestamp + ((i + 1) * MATCHES_INTERVAL);
        const match: Match = {
            id: newMatchTimestamp,
            problems: [],
            first: ""
        };
        for (let j = 0; j < MAX_MATCHES; j++) {
            const problem = createProblem(j);
            match.problems.push(problem);
        }
        matches.push(match);
        await db.set(["matches", newMatchTimestamp], JSON.stringify(match));
    }

    // get all future matches ids
    const matchIds = matches.map((match) => match.id);
    // console.log(matches);

    return new Response(JSON.stringify(matchIds), {
      headers: { "Content-Type": "application/json" },
    });
  },
};