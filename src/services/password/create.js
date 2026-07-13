import chalk from 'chalk';
import handle from './handle.js';

async function createPassword(){
  try {
    const password = await handle();
    console.log(chalk.green("Senha gerada com sucesso!"));
    console.log(chalk.blue(password));
  } catch (err) {
    console.error(chalk.red("Erro ao gerar senha:"), err.message);
  }
}

export default createPassword;
