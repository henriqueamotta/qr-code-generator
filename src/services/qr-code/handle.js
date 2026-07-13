import qr from "qrcode-terminal";
import QRCode from "qrcode";
import chalk from "chalk";
import { mkdir } from "node:fs/promises";
import path from "node:path";

// src/services/qr-code -> raiz do projeto
const PROJECT_ROOT = path.join(import.meta.dirname, "..", "..", "..");
export const OUTPUT_DIR = path.join(PROJECT_ROOT, "qrcodes");

export async function saveQRCodeFile(link) {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const filePath = path.join(OUTPUT_DIR, `qrcode-${Date.now()}.png`);
  await QRCode.toFile(filePath, link);
  return filePath;
}

async function handle (result) {
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
