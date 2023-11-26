// Import Node.js Dependencies
import fs from "node:fs";
import path from "node:path";

// Import Third-party Dependencies
import { multiselect } from "@topcli/prompts";
import { green, red } from "kleur/colors";

// Import Internal Dependencies
import * as utils from "../utils.js";
import { CONFIGS_PATH } from "../constants.js";

export async function del() {
  const configsToDelete = await multiselect("Choose configs to delete", {
    choices: utils.availableConfigs()
  });


  for (const config of configsToDelete) {
    fs.rmSync(path.join(CONFIGS_PATH, `${config}.json`));

    console.log(green(`Successfully deleted the config ${config}!`));
  }
}
