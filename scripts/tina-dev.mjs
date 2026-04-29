import { spawnSync } from "node:child_process";
import { loadTinaEnv } from "./tina-env.mjs";

loadTinaEnv();

const result = spawnSync("npx", ["tinacms", "dev", "-c", "astro dev"], {
  stdio: "inherit"
});

process.exit(result.status ?? 1);
