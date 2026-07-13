import qr from "qrcode-terminal";
import QRCode from "qrcode";
import chalk from "chalk";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUTPUT_DIR = path.join(process.cwd(), "qrcodes");

async function saveQRCodeFile(link) {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const filePath = path.join(OUTPUT_DIR, `qrcode-${Date.now()}.png`);
  await QRCode.toFile(filePath, link);
  return filePath;
}

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

  if (result.save.toLowerCase() === "s") {
    const filePath = await saveQRCodeFile(result.link);
    console.log(chalk.green(`Arquivo salvo em: ${filePath}`));
  }
}

export default handle;
