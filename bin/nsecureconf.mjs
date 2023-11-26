#!/usr/bin/env node

// Import Node.js Dependencies
import fs from "node:fs";
import path from "node:path";

// Import Third-party Dependencies
import meow from "meow";

// Import Internal Dependencies
import { CONFIGS_PATH } from "../src/constants.js";
import * as handlers from "../src/handlers/index.js";

if (!fs.existsSync(CONFIGS_PATH)) {
  try {
    fs.mkdirSync(CONFIGS_PATH);
  }
  catch (error) {
    throw new Error("Could not create nsecureconf directory", {
      cause: error
    });
  }

  const defaultConfigs = ["angular", "express", "prompts", "sharp"];
  for (const conf of defaultConfigs) {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    fs.copyFileSync(path.join(__dirname, `../src/configs/${conf}-result.json`), path.join(CONFIGS_PATH, `${conf}.json`));
  }
}

const cli = meow(`
  Usage
    $ nsecureconf <command>

  Commands
    save, s   \tSave a new configuration
    pick, p   \tPick a configuration
    list, l   \tList all configurations
    delete, d \tDelete a configuration

  Examples
    $ nsecureconf save
    $ nsecureconf pick
    $ nsecureconf l
    $ nsecureconf d
`, {
  importMeta: import.meta,
  allowUnknownFlags: false
});

const { input } = cli;

if (input.length > 1) {
  throw new Error("Expected only one command");
}

switch (input[0]) {
  case "save":
  case "s": {
    await handlers.save();
    break;
  }
  case "pick":
  case "p": {
    await handlers.pick();
    break;
  }
  case "list":
  case "l": {
    await handlers.list();
    break;
  }
  case "delete":
  case "d": {
    await handlers.del();
    break;
  }
  default: {
    throw new Error(`Invalid command ${input[0]}`);
  }
}
