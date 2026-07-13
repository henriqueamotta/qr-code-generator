import chalk from "chalk";

const mainPrompt = [
  {
    name: "select",
    description: chalk.yellow.bold("Escolha a ferramenta: [1] Gerar QR Code, [2] Gerar Senha ou [0] Sair"),
    pattern: /^[0-2]$/,
    message: chalk.red.italic("Escolha uma opção válida (0, 1 ou 2)"),
    required: true,
  },
];

export default mainPrompt;
