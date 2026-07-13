import prompt from 'prompt';
import chalk from 'chalk';
import promptQRCode from '../../prompts/prompt-qrcode.js';
import handle from './handle.js';

async function createQRCode() {
  prompt.start();
  try {
    const result = await new Promise((resolve, reject) => {
      prompt.get(promptQRCode, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });

    await handle(result);
  } catch (err) {
    console.error(chalk.red("Erro ao gerar QR Code:"), err.message);
  }
}

export default createQRCode;
