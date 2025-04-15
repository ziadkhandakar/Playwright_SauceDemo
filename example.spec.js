import { test, expect } from '@playwright/test';
test ('1. Navigate test', async ({page}) => 
{
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);
});

test ('2. Username field Available', async({page}) =>
{
    await page.goto('https://www.saucedemo.com/');
    const usernameField = page.locator('#user-name');
    await expect(usernameField).toBeVisible();
});
test('3. Password Field Available', async({page}) =>
{
    await page.goto('https://www.saucedemo.com/');
    const pwField= page.locator('#password');
    await expect(pwField).toBeVisible(); 
});
test('4. Login Button available', async({page})=>
{
    await page.goto('https://www.saucedemo.com/');
    const loginBtn= page.locator('#login-button');
    await expect(loginBtn).toBeVisible();
});
test('5. login with valid credentials', async({page})=> 
{
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name','standard_user');
    await page.fill('#password','secret_sauce');
    await page.click('#login-button');
    console.log('Current URL:', await page.url());
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('6. login with invalid credentials', async({page})=> 
{
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name','wrong_user');
    await page.fill('#password','secret_sauce');
    await page.click('#login-button');
    const errorMsg= page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText('Epic sadface: Username and password do not match any user in this service');

});
test('7. login with blank input', async({page})=> 
    {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name','');
        await page.fill('#password','');
        await page.click('#login-button');
        const errorMsg= page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toHaveText('Epic sadface: Username is required');
    
    });

    test('8. Verify 6 products are displayed', async({page})=> 
        {
            await page.goto('https://www.saucedemo.com/');
            await page.fill('#user-name','standard_user');
            await page.fill('#password','secret_sauce');
            await page.click('#login-button');
            const products= page.locator('.inventory_item');
            await expect(products).toHaveCount(6);
        
        });

        test('9. Add to cart', async({page}) => 
            {
            await page.goto('https://www.saucedemo.com/');
            await page.fill('#user-name','standard_user');
            await page.fill('#password','secret_sauce');
            await page.click('#login-button');
            const product3= page.locator('.inventory_item').nth(2);
            await product3.locator('button').click();
            await expect(product3.locator('button')).toHaveText('Remove');
            await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
            }
    );
