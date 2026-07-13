import { test } from "node:test";
import assert from "node:assert/strict";
import { isValidUrl } from "./prompt-qrcode.js";

test("aceita URLs com protocolo explícito", () => {
  assert.equal(isValidUrl("https://example.com"), true);
  assert.equal(isValidUrl("http://example.com/path?x=1"), true);
});

test("aceita URLs sem protocolo, assumindo http", () => {
  assert.equal(isValidUrl("example.com"), true);
  assert.equal(isValidUrl("localhost:3000"), true);
});

test("aceita IPs e portas", () => {
  assert.equal(isValidUrl("192.168.0.1:8080/path"), true);
});

test("rejeita valores que não são URLs", () => {
  assert.equal(isValidUrl("not a url"), false);
  assert.equal(isValidUrl(""), false);
});
