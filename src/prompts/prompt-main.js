import chalk from "chalk";

const mainPrompt = [
  {
    name: "select",
    description: chalk.yellow.bold("Escolha a ferramenta: [1] Gerar QR Code ou [2] Gerar Senha"),
    pattern: /^[1-2]$/,
    message: chalk.red.italic("Escolha uma opção válida (1 ou 2)"),
    required: true,
  },
];

export default mainPrompt;
