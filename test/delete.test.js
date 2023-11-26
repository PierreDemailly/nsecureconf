// Import Node.js Dependencies
import assert from "node:assert";
import { before, describe, it } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Import Third-party Dependencies
import { PromptAgent } from "@topcli/prompts";

// Import Internal Dependencies
import { del } from "../src/handlers/index.js";
import * as utils from "../src/utils.js";
import { CONFIGS_PATH } from "../src/constants.js";

// CONSTANTS
const kPromptAgent = PromptAgent.agent();

describe("Deleting config", () => {
  before(async() => {
    if (!fs.existsSync(CONFIGS_PATH)) {
      fs.mkdirSync(CONFIGS_PATH);
    }
  });

  it("should delete foo", async() => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    fs.copyFileSync(
      path.join(__dirname, "../src/configs/sharp-result.json"),
      path.join(CONFIGS_PATH, "sharp-result.json")
    );
    assert.equal(fs.existsSync(path.join(CONFIGS_PATH, "sharp-result.json")), true);

    kPromptAgent.nextAnswer(new Set(["sharp-result"]));
    await del();

    assert.equal(fs.existsSync(path.join(CONFIGS_PATH, "sharp-result.json")), false);
  });
});
