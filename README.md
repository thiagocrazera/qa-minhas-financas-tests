# QA Minhas Finanças Tests

## 📌 Objetivo

Este repositório contém a implementação da pirâmide de testes para o sistema **Minhas Finanças**, com foco nas regras de negócio descritas no desafio técnico.

Conforme solicitado, o repositório contém apenas os testes, sem o código-fonte da aplicação original.

---

## 🧪 Estrutura da Pirâmide de Testes

A estratégia de testes foi organizada priorizando a validação das regras de negócio mais críticas do sistema.

### 🔹 Testes Unitários (xUnit / .NET)

Os testes unitários foram implementados diretamente sobre a camada de domínio, garantindo a validação isolada das regras de negócio:

- Verificação de maioridade da pessoa;
- Validação da finalidade da categoria em relação ao tipo da transação.

### 🔹 Testes End-to-End (Playwright)

Os testes end-to-end validam o comportamento do sistema do ponto de vista do usuário final, cobrindo fluxos completos da aplicação:

- Abertura do sistema;
- Navegação entre telas;
- Cadastro de pessoa com dados válidos;
- Validação de campos obrigatórios;
- Validação de regras de negócio diretamente na interface.

Os testes são executados nos seguintes navegadores:

| Navegador  |
|------------|
| Chromium   |
| Firefox    |
| WebKit     |

---

## 🚀 Como Executar os Testes

### 🔸 Testes Unitários (Backend)

**Passo 1 — Acessar o diretório de testes**

```bash
cd backend-tests/MinhasFinancas.Tests
```

**Passo 2 — Executar os testes**

```bash
dotnet test
```

---

### 🔸 Testes End-to-End (Frontend)

#### 📋 Pré-requisitos

- Docker instalado
- Docker em execução

**Passo 1 — Acessar o projeto original**

```bash
cd CAMINHO_DO_PROJETO_ORIGINAL
```

**Passo 2 — Subir a aplicação com Docker**

```bash
docker compose up
```

**Passo 3 — Verificar se a aplicação está rodando**

A aplicação deve estar disponível em:

```
http://localhost:5173
```

**Passo 4 — Acessar o repositório de testes**

```bash
cd CAMINHO_DO_REPOSITORIO_DE_TESTES
```

**Passo 5 — Instalar dependências**

```bash
npm install
```

**Passo 6 — Executar os testes**

```bash
npx playwright test
```

**Passo 7 — Visualizar relatório**

```bash
npx playwright show-report
```
