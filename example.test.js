import { test, expect } from '@playwright/test';

// Common login function
const login = async (page, username = 'standard_user', password = 'secret_sauce') => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');
};

test('1. Successful Login', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('2. Invalid Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'invalid_user');
  await page.waitForTimeout(3000);
  await page.fill('#password', 'wrong_password');
  await page.click('#login-button');
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('3. Add Item to Cart', async ({ page }) => {
  await login(page);
  await page.click('#add-to-cart-sauce-labs-backpack');
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');
});

test('4. Remove Item from Cart', async ({ page }) => {
  await login(page);
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('#remove-sauce-labs-backpack');
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect.soft(cartBadge).toHaveCount(0);
});

test('5. Complete Checkout Process', async ({ page }) => {
  await login(page);
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  await page.fill('#first-name', 'Jiad');
  await page.fill('#last-name', 'Khandakar');
  await page.fill('#postal-code', '1209');
  await page.click('[data-test="continue"]');
  await page.click('[data-test="finish"]');
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});