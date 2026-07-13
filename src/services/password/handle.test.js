import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import handle from "./handle.js";

const ENV_KEYS = [
  "PASSWORD_LENGTH",
  "UPPERCASE_LETTERS",
  "LOWERCASE_LETTERS",
  "NUMBERS",
  "SPECIAL_CHARACTERS",
];

beforeEach(() => {
  for (const key of ENV_KEYS) delete process.env[key];
});

test("gera senha com o tamanho definido em PASSWORD_LENGTH", async () => {
  process.env.PASSWORD_LENGTH = "12";
  process.env.LOWERCASE_LETTERS = "true";

  const password = await handle();

  assert.equal(password.length, 12);
});

test("usa apenas os conjuntos de caracteres habilitados", async () => {
  process.env.PASSWORD_LENGTH = "50";
  process.env.NUMBERS = "true";

  const password = await handle();

  assert.match(password, /^[0-9]+$/);
});

test("combina múltiplos conjuntos de caracteres quando habilitados", async () => {
  process.env.PASSWORD_LENGTH = "50";
  process.env.UPPERCASE_LETTERS = "true";
  process.env.NUMBERS = "true";

  const password = await handle();

  assert.match(password, /^[A-Z0-9]+$/);
});

test("lança erro quando PASSWORD_LENGTH não é um inteiro positivo", async () => {
  process.env.PASSWORD_LENGTH = "abc";
  process.env.LOWERCASE_LETTERS = "true";

  await assert.rejects(() => handle(), /PASSWORD_LENGTH/);
});

test("lança erro quando PASSWORD_LENGTH é zero ou negativo", async () => {
  process.env.PASSWORD_LENGTH = "0";
  process.env.LOWERCASE_LETTERS = "true";

  await assert.rejects(() => handle(), /PASSWORD_LENGTH/);
});

test("lança erro quando nenhum conjunto de caracteres está habilitado", async () => {
  process.env.PASSWORD_LENGTH = "8";

  await assert.rejects(() => handle(), /Nenhum tipo de caractere/);
});
