// Import Node.js Dependencies
import assert from "node:assert";
import { before, after, describe, it } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Import Third-party Dependencies
import { PromptAgent } from "@topcli/prompts";

// Import Internal Dependencies
import { pick } from "../src/handlers/index.js";
import * as utils from "../src/utils.js";
import { CONFIGS_PATH } from "../src/constants.js";

// CONSTANTS
const kPromptAgent = PromptAgent.agent();

describe("Picking config", () => {
  before(async() => {
    if (!fs.existsSync(CONFIGS_PATH)) {
      fs.mkdirSync(CONFIGS_PATH);
    }

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    fs.copyFileSync(path.join(__dirname, `../src/configs/sharp-result.json`), path.join(CONFIGS_PATH, "sharp-result.json"));
  });

  after(async() => {
    fs.rmSync("nsecure-result.json");
  });

  it("should create nsecure-result.json", async() => {
    kPromptAgent.nextAnswer("sharp-result");

    assert.equal(fs.existsSync("nsecure-result.json"), false);

    await pick();

    assert.equal(fs.existsSync("nsecure-result.json"), true);
  });
});
