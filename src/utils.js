// Import Node.js Dependencies
import path from "node:path";

// Import Third-party Dependencies
import { walkSync } from "@nodesecure/fs-walk";

// Import Internal Dependencies
import { CONFIGS_PATH } from "./constants.js";

export function availableConfigs() {
  return [
    ...walkSync(CONFIGS_PATH, {
      extensions: new Set([".json"])
    })
  ].flatMap(([dirent, file]) => (dirent.isFile() ? path.basename(file).slice(0, -5) : []));
}
