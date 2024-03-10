import { test, expect } from '@playwright/test';

test('Видим ошибку заполнени телефона при отправке пустой формы!', async ({ page }) => {
  await page.goto('https://name.chinim-avto.ru/zapisatsya');
  await page.getByRole('button', { name: 'Отправить' }).click();
  await expect(page.getByText('Телефон не заполнен!')).toBeVisible();
  await expect(page.locator('.input-contact__error-icon')).toBeVisible();
  await expect(page.locator('.input-contact._error[type=tel]')).toBeVisible();
});



test('Видим ошибку несогласия с политикой при отправке формы с заполненным телефоном!', async ({ page }) => {
  await page.goto('https://name.chinim-avto.ru/zapisatsya');
  await page.getByPlaceholder('+7 (___) ___-__-__').click();
  await page.getByPlaceholder('+7 (___) ___-__-__').fill('+7 (111) 111-11-111');
  await page.getByRole('button', { name: 'Отправить' }).click();
  await expect(page.locator('.input-checkbox._error').filter({ hasText: 'Даю согласие на обработку своих персональных данных' })).toBeVisible();
});



test('Видим успешную отправку фомры при заполнении телефона и согласии с политикой обработки личной информации!', async ({ page }) => {
  await page.goto('https://name.chinim-avto.ru/zapisatsya');
  await page.getByPlaceholder('+7 (___) ___-__-__').click();
  await page.getByPlaceholder('+7 (___) ___-__-__').fill('+7 (111) 111-11-111');
  await page.locator('.input-checkbox__box').click();
  await page.getByRole('button', { name: 'Отправить' }).click();
  await expect(page.getByRole('button', { name: 'Отправлено!' })).toBeVisible();
  await expect(page.locator('.button-ui._success')).toBeVisible();
  await expect(page.locator('.loader-ui._success')).toBeVisible();
});