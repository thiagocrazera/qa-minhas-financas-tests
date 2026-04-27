import { test, expect, Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

const sidebar = (page: Page) => page.locator('ul');

async function irParaUltimaPagina(page: Page) {
  while (true) {
    const proximo = page.getByRole('button', { name: 'Próximo' });

    await expect(proximo).toBeVisible();

    const desabilitado = await proximo.isDisabled();

    if (desabilitado) break;

    await proximo.click();
    await page.waitForLoadState('networkidle');
  }
}

function calcularIdade(dataNascimento: string) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);

  let idade = hoje.getFullYear() - nascimento.getFullYear();

  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();
  const mesNascimento = nascimento.getMonth();
  const diaNascimento = nascimento.getDate();

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && diaAtual < diaNascimento)
  ) {
    idade--;
  }

  return idade;
}

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');

  await sidebar(page).getByRole('link', { name: 'Pessoas' }).click();

  await expect(page.getByRole('heading', { name: /pessoas/i })).toBeVisible();
});

test('deve exibir a tela de pessoas corretamente', async ({ page }) => {
  await expect(
    page.getByRole('button', { name: /adicionar pessoa/i })
  ).toBeVisible();
});

test('não deve permitir cadastrar pessoa sem nome', async ({ page }) => {
  await page.getByRole('button', { name: /adicionar pessoa/i }).click();

  await page.getByRole('button', { name: /salvar/i }).click();

  await expect(page.getByText(/nome é obrigatório/i)).toBeVisible();
});

test('deve cadastrar pessoa com dados válidos e exibir na lista', async ({ page }) => {
  const nome = `Pessoa Teste ${Date.now()}`;

  await page.getByRole('button', { name: /adicionar pessoa/i }).click();

  await page.getByLabel(/nome/i).fill(nome);
  await page.getByLabel(/data de nascimento/i).fill('1990-01-01');

  await page.getByRole('button', { name: /salvar/i }).click();

  await expect(
    page.getByRole('button', { name: /salvar/i })
  ).not.toBeVisible();

  await expect(page.getByText(nome)).toBeVisible({ timeout: 10000 });
});

test('deve calcular corretamente a idade de uma pessoa maior de idade', async ({ page }) => {
  const dataNascimento = '2000-04-27';
  const idadeEsperada = calcularIdade(dataNascimento);
  const nome = `Maior Idade ${Date.now()}`;

  await page.getByRole('button', { name: /adicionar pessoa/i }).click();

  await page.getByLabel(/nome/i).fill(nome);
  await page.getByLabel(/data de nascimento/i).fill(dataNascimento);

  await page.getByRole('button', { name: /salvar/i }).click();

  await expect(
    page.getByRole('button', { name: /salvar/i })
  ).not.toBeVisible();
 
  const linha = page.getByRole('row').filter({ hasText: nome });

  await expect(linha).toBeVisible({ timeout: 10000 });
  await expect(
  linha.getByRole('cell', { name: String(idadeEsperada), exact: true })
).toBeVisible();
});

test('deve permitir deletar uma pessoa cadastrada', async ({ page }) => {
  const nome = `Deletar Teste ${Date.now()}`;

  await page.getByRole('button', { name: /adicionar pessoa/i }).click();

  await page.getByLabel(/nome/i).fill(nome);
  await page.getByLabel(/data de nascimento/i).fill('1990-01-01');

  await page.getByRole('button', { name: /salvar/i }).click();

  await expect(page.getByRole('button', { name: /salvar/i })).not.toBeVisible();

  await expect(page.getByText(nome)).toBeVisible({ timeout: 10000 });

  const linha = page.getByRole('row').filter({ hasText: nome });

  await linha.getByRole('button', { name: /deletar/i }).click();

  await page.getByRole('button', { name: /confirmar/i }).click();

  await expect(linha).not.toBeVisible({ timeout: 10000 });
});