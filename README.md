# QA Minhas Finanças Tests

## Objetivo

Este repositório contém a solução de testes automatizados para o sistema Minhas Finanças, com foco nas regras de negócio descritas no desafio técnico.

O repositório contém apenas os testes, sem o código-fonte da aplicação original.

## Pirâmide de testes

A estratégia foi organizada em duas camadas principais:

### Testes unitários

Implementados em .NET com xUnit, focando regras de domínio:

- cálculo de maioridade da pessoa;
- validação da finalidade da categoria conforme o tipo da transação.

### Testes end-to-end

Implementados com Playwright, validando fluxos reais da aplicação pela interface:

- abertura do sistema;
- validação de cadastro de pessoa sem nome;
- cadastro de pessoa com dados válidos.

## Como rodar os testes unitários

Na raiz do repositório:

```bash
cd backend-tests/MinhasFinancas.Tests
dotnet test
