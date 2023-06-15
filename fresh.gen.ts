// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[game].tsx";
import * as $1 from "./routes/api/get-match.ts";
import * as $2 from "./routes/api/get-matches.ts";
import * as $3 from "./routes/api/joke.ts";
import * as $4 from "./routes/api/random-uuid.ts";
import * as $5 from "./routes/api/submit-solutions.ts";
import * as $6 from "./routes/gameover.tsx";
import * as $7 from "./routes/index.tsx";
import * as $8 from "./routes/test.tsx";
import * as $9 from "./routes/username.tsx";
import * as $$0 from "./islands/Counter.tsx";
import * as $$1 from "./islands/Game.tsx";
import * as $$2 from "./islands/GameOver.tsx";
import * as $$3 from "./islands/SetUser.tsx";
import * as $$4 from "./islands/Timer2.tsx";

const manifest = {
  routes: {
    "./routes/[game].tsx": $0,
    "./routes/api/get-match.ts": $1,
    "./routes/api/get-matches.ts": $2,
    "./routes/api/joke.ts": $3,
    "./routes/api/random-uuid.ts": $4,
    "./routes/api/submit-solutions.ts": $5,
    "./routes/gameover.tsx": $6,
    "./routes/index.tsx": $7,
    "./routes/test.tsx": $8,
    "./routes/username.tsx": $9,
  },
  islands: {
    "./islands/Counter.tsx": $$0,
    "./islands/Game.tsx": $$1,
    "./islands/GameOver.tsx": $$2,
    "./islands/SetUser.tsx": $$3,
    "./islands/Timer2.tsx": $$4,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
