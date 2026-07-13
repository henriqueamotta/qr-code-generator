import prompt from 'prompt';
import promptQRCode from '../../prompts/prompt-qrcode.js';
import handle from './handle.js';

async function createQRCode() {
  prompt.start();
  await new Promise((resolve) => {
    prompt.get(promptQRCode, async (err, result) => {
      await handle(err, result);
      resolve();
    });
  });
}

export default createQRCode;
