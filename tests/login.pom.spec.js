const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { credentials } = require('../utils/credentials');

test('LinkedIn login works (POM)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://stage.talentpecker.com/login');
  await page.click('button:has-text("Sign in with LinkedIn")');
  await loginPage.login(credentials.linkedin.email, credentials.linkedin.password);  
  // Verify URL redirects to personal details page
  await expect(page).toHaveURL(/.*\/personal-details$/);
});


