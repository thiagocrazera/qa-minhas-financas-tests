import { test, expect } from '@playwright/test';

const sidebar = (page: any) => page.locator('ul');

test('deve exibir o texto Minhas Finanças na tela inicial', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await expect(page.getByText('Minhas Finanças').first()).toBeVisible();
});

test('deve exibir o dashboard com os cards de resumo', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await expect(page.getByText('Saldo Atual')).toBeVisible();
  await expect(page.getByText('Receitas do Mês')).toBeVisible();
  await expect(page.getByText('Despesas do Mês')).toBeVisible();
});

test('deve navegar para a tela de Transações', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await sidebar(page).getByRole('link', { name: 'Transações' }).click();

  await expect(page.getByRole('heading', { name: /transações/i })).toBeVisible();
});

test('deve navegar para a tela de Categorias', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await sidebar(page).getByRole('link', { name: 'Categorias' }).click();

  await expect(page.getByRole('heading', { name: /categorias/i })).toBeVisible();
});

test('deve navegar para a tela de Pessoas', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await sidebar(page).getByRole('link', { name: 'Pessoas' }).click();

  await expect(page.getByRole('heading', { name: /pessoas/i })).toBeVisible();
});