import prompt from "prompt";
import chalk from "chalk";
import mainPrompt from "./prompts/prompt-main.js";
import createQRCode from "./services/qr-code/create.js";
import createPassword from "./services/password/create.js";

function askMainChoice() {
  return new Promise((resolve) => {
    prompt.get(mainPrompt, (err, choice) => {
      if (err) {
        resolve(null);
        return;
      }
      resolve(choice.select);
    });
  });
}

async function main() {
  prompt.start();

  let select;
  do {
    select = await askMainChoice();

    if (select == null) break;
    if (select === "1") await createQRCode();
    if (select === "2") await createPassword();
  } while (select !== "0");

  console.log(chalk.cyan("Até logo!"));
}

main();
