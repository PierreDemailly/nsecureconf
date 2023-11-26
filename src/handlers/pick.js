// Import Node.js Dependencies
import fs from "node:fs";
import path from "node:path";

// Import Third-party Dependencies
import { question, confirm, select } from "@topcli/prompts";
import { green } from "kleur/colors";

// Import Internal Dependencies
import * as utils from "../utils.js";
import { CONFIGS_PATH } from "../constants.js";

export async function pick() {
  // verify a nsecure-result.json does not already exists
  try {
    const dotenv = fs.readFileSync("nsecure-result.json", { encoding: "utf-8" });
    const force = await confirm("A nsecure-result.json file already exists, replace ?", { initial: false });
    if (!force) {
      return;
    }
  }
  catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  const configName = await select("Choose the config you wanna pick", {
    choices: utils.availableConfigs()
  });

  fs.copyFileSync(path.join(CONFIGS_PATH, `${configName}.json`), "nsecure-result.json");

  console.log(green("Successfully picked the config!"));
}
