# QR Code Generator

Kit de utilidades de linha de comando (CLI) para gerar QR Codes e senhas, feito em Node.js. Este projeto roda apenas no terminal, sem interface web.

## Funcionalidades

- **Gerar QR Code** a partir de um link, com exibição no terminal (modo normal ou compacto) e opção de salvar como arquivo PNG.
- **Gerar senha** aleatória, com tamanho e conjuntos de caracteres (maiúsculas, minúsculas, números, símbolos) configuráveis via `.env`.

O menu principal roda em loop: após concluir uma operação, você volta para a tela de escolha até optar por sair.

## Pré-requisitos

- Node.js **20.11 ou superior** (o projeto usa `--env-file` e `import.meta.dirname`, ambos recursos nativos dessa versão em diante).

## Instalação e configuração

```bash
npm install
cp .env.example .env
```

⚠️ **O passo `cp .env.example .env` é obrigatório.** O arquivo `.env` não é versionado no Git (é ignorado de propósito, por boas práticas de segurança), então cada ambiente precisa criar o seu localmente a partir do `.env.example`. Sem esse arquivo, a aplicação falha ao gerar senha com o erro:

```
Erro ao gerar senha: PASSWORD_LENGTH deve ser um número inteiro maior que zero
```

Depois de criado, edite o `.env` livremente para ajustar as opções de senha — ele nunca será commitado.

## Variáveis de ambiente

| Variável              | Descrição                                              | Exemplo |
|-----------------------|----------------------------------------------------------|---------|
| `PASSWORD_LENGTH`     | Quantidade de caracteres da senha gerada                 | `8`     |
| `UPPERCASE_LETTERS`   | Inclui letras maiúsculas (`A-Z`)                          | `true`  |
| `LOWERCASE_LETTERS`   | Inclui letras minúsculas (`a-z`)                          | `true`  |
| `NUMBERS`             | Inclui números (`0-9`)                                    | `true`  |
| `SPECIAL_CHARACTERS`  | Inclui caracteres especiais (`!@#$%^&*()_+{}[]:;<>,.?/~\`-=`) | `true`  |

Pelo menos uma das quatro flags de conjunto de caracteres precisa estar `true`, senão a geração de senha falha com um erro explicativo.

## Como executar

```bash
npm start
```

Esse comando roda `node --env-file=.env src/index.js`, garantindo que o `.env` seja carregado. **Não** execute `node src/index.js` diretamente sem a flag `--env-file=.env` — o Node não carrega variáveis de ambiente de arquivos `.env` por conta própria, e a aplicação vai falhar por falta de configuração.

## Como testar

```bash
npm test
```

Executa a suíte de testes com o test runner nativo do Node (`node --test`), cobrindo a geração de senha, a validação de link e o salvamento do QR Code em arquivo.

## Estrutura do projeto

```
src/
├── index.js                  # ponto de entrada: loop do menu principal
├── prompts/
│   ├── prompt-main.js        # schema do menu principal (prompt lib)
│   └── prompt-qrcode.js      # schema do fluxo de QR Code + validação de URL
└── services/
    ├── qr-code/
    │   ├── create.js         # orquestra o prompt do QR Code
    │   └── handle.js         # gera o QR Code (terminal e/ou arquivo PNG)
    └── password/
        ├── create.js         # orquestra a exibição da senha gerada
        └── handle.js         # monta o alfabeto e sorteia a senha
```

## Licença

ISC
