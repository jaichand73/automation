
Note: Always apply the Page Object Model (POM) pattern for maintainable and scalable test automation.


Note: Every file you create should have a meaningful name so users can directly understand its purpose.

Note: Every time, first run the code and verify it works correctly before writing further code.
Note: For every step, add a log (console.log) to know what we are doing.

Playwright POM Guidelines

1. Create one page class per page in 'pages/' (e.g., LoginPage.ts)

2. Keep locators and actions inside Page Object only

3. Use BasePage for common functions (click, wait, fill, etc.)

4. In test files, only call page methods – no direct locators
   (All functions and support code for interacting with the UI should be implemented in the page classes inside the pages/ folder. Test files should only use these page methods.)

5. Use clear names:
   - Methods: fillEmail(), clickLogin()
   - Locators: private emailInput

6. No assertions in Page classes – keep them in test files


7. Folder structure:
   - tests/  (All the .spec.js files should be placed here)
   - pages/
   - base/
   - utils/  (All credentials like id and password should be placed here in credentials.js)
   - Locators/  (All locators will be stored in this folder)

8. Before saving or committing:
   - Check all inputs (selectors, data, methods)
   - Debug and run – only save if everything works

Follow clean, reusable, and tested structure always.
