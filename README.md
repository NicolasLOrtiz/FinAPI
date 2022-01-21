# FinAPI - Financeira

API financeira feita com NodeJS usando TypeScript

---

## Tecnologias utilizadas

- Express
- Typescript
- ThuderClient (Extensão do VS Code para teste da API)
  - O arquivo com as requisições da API é o thuder-client-finapi.json (Para importar clique em Collections > Menu > Import)

---

## Como utilizar o projeto?

1. Tenha o Node e o NPM instalado
2. Clone o projeto
3. Instale as dependências
   - yarn
   - npm install
4. Rode o ambiente
   - yarn dev
   - npm run dev

---

## Requisitos

- [x] Deve ser possível criar uma conta
- [x] Deve ser possível buscar o extrato bancário do cliente
- [x] Deve ser possível realizar um depósito
- [x] Deve ser possível realizar um saque
- [x] Deve ser possível buscar o extrato bancário do cliente por data
- [x] Deve ser possível atualizar dados da conta do cliente
- [x] Deve ser possível obter dados da conta do cliente
- [x] Deve ser possível deletar uma conta
- [x] Deve ser possível retornar o balance

---

## Regras de negócio

- [x] Não deve ser possível cadastrar uma conta com CPF já existente
- [x] Não deve ser possível buscar extrato em uma conta não existente
- [x] Não deve ser possível fazer depósito em uma conta não existente
- [x] Não deve ser possível fazer saque em uma conta não existente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente
- [x] Não deve ser possível excluir uma conta não existente
