import { spawnSync } from "node:child_process";
import { loadTinaEnv } from "./tina-env.mjs";

loadTinaEnv();

const hasCloudCredentials = Boolean(process.env.TINA_CLIENT_ID && process.env.TINA_TOKEN);

if (!hasCloudCredentials) {
  console.log("[tina] Skipping `tinacms build` because TINA_CLIENT_ID/TINA_TOKEN are not configured.");
  process.exit(0);
}

const result = spawnSync("npx", ["tinacms", "build"], {
  stdio: "inherit"
});

process.exit(result.status ?? 1);
