// Import Node.js Dependencies
import assert from "node:assert";
import { describe, before, it } from "node:test";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

// Import Third-party Dependencies
import { PromptAgent } from "@topcli/prompts";
import stripAnsi from "strip-ansi";

// Import Internal Dependencies
import { list } from "../src/handlers/index.js";
import * as utils from "../src/utils.js";
import { CONFIGS_PATH } from "../src/constants.js";

// CONSTANTS
const kPromptAgent = PromptAgent.agent();

describe("Listing configs", () => {
  before(async() => {
    if (!fs.existsSync(CONFIGS_PATH)) {
      fs.mkdirSync(CONFIGS_PATH);
    }
  });

  const logs = [];
  console.log = (str) => {
    logs.push(stripAnsi(str));
    process.stdout.write(str + os.EOL);
  };

  it("should not list if there is no config", async() => {
    for (const file of fs.readdirSync(CONFIGS_PATH)) {
      fs.rmSync(path.join(CONFIGS_PATH, file), { force: true });
    }

    await list();
    assert.equal(logs.length, 1);
    assert.equal(logs[0], "No configs available!");
  });

  it("should list configs", async() => {
    while (logs.length) {
      logs.shift();
    }

    const defaultConfigs = ["angular", "express", "prompts", "sharp"];
    for (const conf of defaultConfigs) {
      const __dirname = path.dirname(new URL(import.meta.url).pathname);
      fs.copyFileSync(path.join(__dirname, `../src/configs/${conf}-result.json`), path.join(CONFIGS_PATH, `${conf}.json`));
    }
    await list();

    assert.equal(logs.length, 1);
    assert.equal(logs[0], `Available configs:${os.EOL}${defaultConfigs.join(os.EOL)}`);
  });
});
