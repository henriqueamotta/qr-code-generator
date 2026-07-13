import qr from "qrcode-terminal";
import chalk from "chalk";

async function handle (err, result) {
  if (err) {
    console.error(chalk.red("Erro na aplicação:"), err.message ?? err);
    return;
  }

  const isSmall = result.type == 2;
  await new Promise((resolve) => {
    qr.generate(result.link, { small: isSmall }, (qrcode) => {
      console.log(chalk.green.bold("QR Code gerado com sucesso!\n"));
      console.log(qrcode);
      resolve();
    });
  });
}

export default handle;
