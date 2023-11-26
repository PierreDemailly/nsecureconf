// Import Node.js Dependencies
import assert from "node:assert";
import { before, after, describe, it } from "node:test";
import fs from "node:fs";
import path from "node:path";

// Import Third-party Dependencies
import { PromptAgent } from "@topcli/prompts";

// Import Internal Dependencies
import { save } from "../src/handlers/index.js";
import * as utils from "../src/utils.js";
import { CONFIGS_PATH } from "../src/constants.js";

// CONSTANTS
const kPromptAgent = PromptAgent.agent();

describe("Saving config", () => {
  before(async() => {
    if (!fs.existsSync(CONFIGS_PATH)) {
      fs.mkdirSync(CONFIGS_PATH);
    }
  });

  after(async() => {
    fs.rmSync(path.join(CONFIGS_PATH, "test_runner.json"));
    fs.rmSync("nsecure-result.json");
  });

  it("should save foo-result.json", async() => {
    fs.writeFileSync("nsecure-result.json", JSON.stringify({
      id: "idd",
      rootDependencyName: "test_runner",
      scannerVersion: "4.0.0",
      vulnerabilityStrategy: "none",
      warnings: [],
      dependencies: {}
    }));
    kPromptAgent.nextAnswer("test_runner");

    await save();

    const config = fs.readFileSync(path.join(CONFIGS_PATH, "test_runner.json"));
    assert.deepStrictEqual(JSON.parse(config), {
      id: "idd",
      rootDependencyName: "test_runner",
      scannerVersion: "4.0.0",
      vulnerabilityStrategy: "none",
      warnings: [],
      dependencies: {}
    });
  });
});
