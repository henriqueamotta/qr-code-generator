import chalk from 'chalk';

const promptQRCode = [
  {
    name: "link",
    description: chalk.yellow.bold("Digite o link para gerar o QR Code:"),
    pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
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
];

export default promptQRCode;
