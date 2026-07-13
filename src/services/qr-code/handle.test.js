import { test, after } from "node:test";
import assert from "node:assert/strict";
import { access, rm } from "node:fs/promises";
import { saveQRCodeFile, OUTPUT_DIR } from "./handle.js";

after(async () => {
  await rm(OUTPUT_DIR, { recursive: true, force: true });
});

test("salva o QR Code como PNG dentro de OUTPUT_DIR", async () => {
  const filePath = await saveQRCodeFile("https://example.com");

  assert.ok(filePath.startsWith(OUTPUT_DIR));
  assert.match(filePath, /\.png$/);
  await assert.doesNotReject(() => access(filePath));
});
