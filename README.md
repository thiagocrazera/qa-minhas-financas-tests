# 🧪 QA Minhas Finanças — Teste Técnico

<p align="left">
  <img src="https://img.shields.io/badge/.NET-xUnit-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" />
  <img src="https://img.shields.io/badge/Playwright-E2E-45ba4b?style=for-the-badge&logo=playwright&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-required-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

> Repositório de testes para o sistema **Minhas Finanças**.
> Contém **apenas os testes** — sem o código-fonte da aplicação original.
> Bugs encontrados estão documentados na pasta `/bugs`.

---

## 📋 Índice

- [Objetivo](#-objetivo)
- [Pirâmide de Testes](#-pirâmide-de-testes)
- [Estrutura do Repositório](#-estrutura-do-repositório)
- [Como Executar](#-como-executar)
- [Bugs Encontrados](#-bugs-encontrados)
- [Justificativa das Escolhas](#-justificativa-das-escolhas)
- [Autor](#-autor)

---

## 🎯 Objetivo

Este repositório avalia a capacidade de:

- Entender regras de negócio a partir de um código existente
- Projetar e implementar uma pirâmide de testes adequada
- Identificar e documentar falhas de implementação por meio de testes
- Aplicar boas práticas de testes automatizados em **.NET** e **React/TypeScript**

As regras de negócio testadas giram em torno do sistema **Minhas Finanças**, que possui:

- CRUD de Pessoas
- Cadastro de Categorias e Transações
- Consultas de totais por pessoa
- **Regra 1:** Menor de idade não pode ter receitas
- **Regra 2:** Categoria só pode ser usada conforme sua finalidade (receita / despesa / ambas)
- Exclusão em cascata de transações ao excluir pessoa

---

## 🧪 Pirâmide de Testes

```
        /\
       /E2E\          ← Playwright (navegador real, fluxos completos)
      /------\
     /        \
    / Unitários \    ← xUnit (domínio C# / .NET)
   /-------------\
```

### 🔹 Testes Unitários — Backend (xUnit / .NET)

Validam a camada de domínio de forma isolada, sem dependências externas.

**PessoaTests.cs** — 5 testes:
- Retorna `false` para menor de idade
- Retorna `true` para maior de idade
- Retorna `true` para pessoa que faz 18 anos hoje (caso de borda)
- Retorna `false` para pessoa que faz 18 anos amanhã (caso de borda)
- Calcula a idade corretamente

**CategoriaTests.cs** — 6 testes:
- Categoria de Despesa permite apenas transação de Despesa
- Categoria de Despesa não permite transação de Receita
- Categoria de Receita permite apenas transação de Receita
- Categoria de Receita não permite transação de Despesa
- Categoria Ambas permite transação de Despesa
- Categoria Ambas permite transação de Receita

---

### 🔺 Testes End-to-End — Frontend (Playwright)

Validam o comportamento do sistema do ponto de vista do usuário final.

**abertura.spec.ts** — 5 testes:
- Exibe o texto Minhas Finanças na tela inicial
- Exibe o dashboard com os cards de resumo
- Navega para a tela de Transações
- Navega para a tela de Categorias
- Navega para a tela de Pessoas

**pessoa.spec.ts** — 5 testes:
- Exibe a tela de pessoas corretamente
- Não permite cadastrar pessoa sem nome
- Cadastra pessoa com dados válidos e exibe na lista
- Calcula corretamente a idade de uma pessoa maior de idade
- Permite deletar uma pessoa cadastrada

Executados nos navegadores:

| Navegador | Engine |
|-----------|--------|
| Chromium  | Blink  |
| Edge      | Blink  |

---

## 📁 Estrutura do Repositório

```
qa-minhas-financas-tests/
│
├── backend-tests/
│   └── MinhasFinancas.Tests/
│       ├── PessoaTests.cs        # Testes unitários de maioridade
│       └── CategoriaTests.cs     # Testes unitários de finalidade de categoria
│
├── tests/                        # Testes E2E com Playwright
│   ├── abertura.spec.ts          # Fluxo de abertura e navegação
│   └── pessoa.spec.ts            # Fluxo de cadastro e validação de pessoas
│
├── bugs/                         # Documentação de bugs encontrados
│   ├── BUG-001.md
│   ├── BUG-002.md
│   ├── BUG-003.md
│   ├── BUG-004.md
│   └── BUG-005.md
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

## 🚀 Como Executar

### ☁️ Pré-requisitos

- [.NET SDK](https://dotnet.microsoft.com/download) instalado
- [Node.js](https://nodejs.org/) instalado
- [Docker](https://www.docker.com/) instalado e em execução

---

### 🔷 Testes Unitários — Backend

```bash
# 1. Acessar o diretório
cd backend-tests/MinhasFinancas.Tests

# 2. Executar os testes
dotnet test
```

---

### 🟩 Testes End-to-End — Playwright

> ⚠️ A aplicação precisa estar rodando antes de executar os testes E2E.

```bash
# Passo 1 — Subir a aplicação (no diretório do projeto original)
cd CAMINHO_DO_PROJETO_ORIGINAL
docker compose up

# Passo 2 — Confirmar que a aplicação está no ar
# Acesse: http://localhost:5173

# Passo 3 — Voltar ao repositório de testes
cd CAMINHO_DO_REPOSITORIO_DE_TESTES

# Passo 4 — Instalar dependências
npm install

# Passo 5 — Instalar os browsers do Playwright (primeira vez)
npx playwright install

# Passo 6 — Executar os testes E2E
npx playwright test

# Passo 7 — Visualizar o relatório
npx playwright show-report
```

---

## 🐛 Bugs Encontrados

Os bugs estão documentados em detalhes na pasta [`/bugs`](./bugs/).

| ID      | Descrição                                                           |Severidade |
|---------|---------------------------------------------------------------------|-----------|
| BUG-001 | Dashboard não exibe Receitas do Mês corretamente                    | 🔴 Alta  |
| BUG-002 | Colunas Categoria e Pessoa vazias na listagem de Transações         | 🔴 Alta  |
| BUG-003 | Gráfico do Resumo Mensal não renderiza de forma consistente         | 🟡 Média |
| BUG-004 | Página detectada como inglês pelos navegadores                      | 🟢 Baixa |
| BUG-005 | Setters `internal` em `Transacao` impedem testes unitários externos | 🟡 Média |

> ℹ️ Nenhuma alteração foi feita no código da aplicação. Os bugs foram apenas identificados e documentados.

---

## 💡 Justificativa das Escolhas

### Por que xUnit no backend?
xUnit é o framework de testes mais adotado no ecossistema .NET moderno, com suporte nativo a injeção de dependências, paralelismo e integração com o SDK `dotnet test`. É a escolha natural para projetos em C#.

### Por que Playwright para E2E?
Playwright oferece suporte nativo a múltiplos navegadores com uma única API, geração automática de relatórios, screenshots e vídeos em caso de falha. Os testes foram executados em **Chromium** e **Edge**, cobrindo o motor de renderização mais utilizado no mercado. Possui suporte oficial a TypeScript e é o padrão da indústria para testes E2E modernos.

### Por que não foram feitos testes com Vitest?
O Vitest seria adequado para testes unitários de componentes React. No entanto, como o desafio não permite alteração do código da aplicação, não foi possível configurar o ambiente de testes de componentes sem modificar arquivos existentes. A validação do frontend foi realizada integralmente via testes E2E com Playwright.

### Foco nas regras de negócio
Seguindo o escopo do desafio, os testes priorizam as **regras de negócio críticas** (maioridade e finalidade da categoria) em vez de buscar cobertura de 100%. Os casos de borda foram incluídos nos testes de `Pessoa` para validar o comportamento exato no limite dos 18 anos.

---

## 👤 Autor

**Thiago Razera** — QA Engineer  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/thiagocrazera)
