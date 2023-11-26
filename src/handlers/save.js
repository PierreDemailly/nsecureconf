// Import Node.js Dependencies
import fs from "node:fs";
import path from "node:path";

// Import Third-party Dependencies
import { question, multiselect, confirm } from "@topcli/prompts";
import { green } from "kleur/colors";

// Import Internal Dependencies
import * as utils from "../utils.js";
import { CONFIGS_PATH } from "../constants.js";

export async function save() {
  const conf = JSON.parse(fs.readFileSync("nsecure-result.json", { encoding: "utf-8" }));

  const configName = await question("Name of the configuration", {
    defaultValue: conf.rootDependencyName.replace("@", "").replace("/", "-")
  });

  if (fs.existsSync(path.join(CONFIGS_PATH, `${configName}.json`))) {
    const force = await confirm("A config with the same name already exists, replace ?", { initial: false });
    if (!force) {
      return;
    }
  }

  fs.writeFileSync(path.join(CONFIGS_PATH, `${configName}.json`), JSON.stringify(conf, null, 2));

  console.log(green(`Configuration ${configName} saved!`));
}
