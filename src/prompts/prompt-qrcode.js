import chalk from 'chalk';

export function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    try {
      new URL(`http://${value}`);
      return true;
    } catch {
      return false;
    }
  }
}

const promptQRCode = [
  {
    name: "link",
    description: chalk.yellow.bold("Digite o link para gerar o QR Code:"),
    conform: isValidUrl,
    message: chalk.red.italic("Digite um link válido"),
    required: true,
  },
  {
    name: "type",
    description: chalk.yellow("Escolha o tipo de QR Code: 1- Normal ou 2- Terminal"),
    pattern: /^[1-2]$/,
    message: chalk.red.italic("Escolha uma opção válida (1 ou 2)"),
    required: true,
  },
  {
    name: "save",
    description: chalk.yellow("Deseja salvar o QR Code como arquivo PNG? (s/n)"),
    pattern: /^[sn]$/i,
    message: chalk.red.italic("Responda com 's' ou 'n'"),
    required: true,
  },
];

export default promptQRCode;
