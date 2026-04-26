import { test, expect } from '@playwright/test';

test('deve abrir o sistema Minhas Finanças', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // valida se carregou a tela principal
  await expect(page.locator('text=Minhas Finanças')).toBeVisible();
});