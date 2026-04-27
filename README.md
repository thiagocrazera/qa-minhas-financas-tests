# QA Minhas Finanças Tests

## 📌 Objetivo

Este repositório contém a implementação da pirâmide de testes para o sistema **Minhas Finanças**, com foco nas regras de negócio descritas no desafio técnico.

O repositório contém **apenas os testes**, conforme solicitado, sem o código-fonte da aplicação original.

---

## 🧪 Estrutura da Pirâmide de Testes

A estratégia de testes foi organizada priorizando regras de negócio críticas:

### 🔹 Testes Unitários (xUnit / .NET)

Validação direta da lógica de domínio:

- Verificação de maioridade da pessoa;
- Regras de finalidade da categoria em relação ao tipo de transação.

Esses testes garantem consistência das regras sem dependência de interface ou infraestrutura.

---

### 🔹 Testes End-to-End (Playwright)

Validação dos fluxos completos do sistema do ponto de vista do usuário:

- Abertura da aplicação;
- Navegação entre telas;
- Cadastro de pessoa com dados válidos;
- Validação de campos obrigatórios;
- Validação de regras de negócio na interface.

Os testes são executados em múltiplos browsers:

- Chromium
- Firefox
- WebKit

---

## 🚀 Como executar os testes

### 🔸 1. Testes Unitários (Backend)

```bash
cd backend-tests/MinhasFinancas.Tests
dotnet test
