import { randomInt } from "node:crypto";

async function handle() {
  let characters = [];
  let password = "";

  const passwordLength = Number(process.env.PASSWORD_LENGTH);

  if (!Number.isInteger(passwordLength) || passwordLength <= 0) {
    throw new Error("PASSWORD_LENGTH deve ser um número inteiro maior que zero");
  }

  if(process.env.UPPERCASE_LETTERS === "true") {
    characters.push(... "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  }

  if(process.env.LOWERCASE_LETTERS === "true") {
    characters.push(... "abcdefghijklmnopqrstuvwxyz");
  }

  if(process.env.NUMBERS === "true") {
    characters.push(... "0123456789");
  }

  if(process.env.SPECIAL_CHARACTERS === "true") {
    characters.push(... "!@#$%^&*()_+{}[]:;<>,.?/~`-=");
  }

  if (characters.length === 0) {
    throw new Error("Nenhum tipo de caractere habilitado no .env (UPPERCASE_LETTERS, LOWERCASE_LETTERS, NUMBERS ou SPECIAL_CHARACTERS)");
  }

  for(let i = 0; i < passwordLength; i++) {
    const randomIndex = randomInt(characters.length);
    password += characters[randomIndex];
  }
  return password;
}

export default handle;
