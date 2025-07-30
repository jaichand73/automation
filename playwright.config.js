
const { defineConfig, devices } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  workers: 1,
  timeout: 120000, // Set a global timeout for tests
  use: {
    baseURL: 'https://stage.talentpecker.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    ignoreHTTPSErrors: true,
      headless: true, // Run tests in headful mode for debugging
    // Configure context options
    contextOptions: {
      viewport: { width: 1280, height: 720 }, // Set viewport size
      ignoreHTTPSErrors: true, // Ignore HTTPS errors
    },
  
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

  ],


});

