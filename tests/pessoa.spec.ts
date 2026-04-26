import { test, expect } from '@playwright/test';

test('não deve permitir cadastrar pessoa sem nome', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.getByText('Pessoas').click();
  await page.getByText('Adicionar Pessoa').click();

  await page.getByRole('button', { name: /salvar/i }).click();

  await expect(page).toHaveURL(/pessoas/i);
});

test('deve cadastrar pessoa com dados válidos', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const nome = `Pessoa Teste ${Date.now()}`;

  await page.getByText('Pessoas').click();
  await page.getByText('Adicionar Pessoa').click();

  await page.getByLabel(/nome/i).fill(nome);
  await page.getByLabel(/data/i).fill('2000-01-01');

  await page.getByRole('button', { name: /salvar/i }).click();

  // valida que o modal fechou
  await expect(page.getByRole('button', { name: /salvar/i })).not.toBeVisible();
});