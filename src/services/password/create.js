import chalk from 'chalk';
import handle from './handle.js';

async function createPassword(){
  console.log(chalk.green("Senha gerada com sucesso!"));
  const password = await handle();
  console.log(chalk.blue(password));
}

export default createPassword;
