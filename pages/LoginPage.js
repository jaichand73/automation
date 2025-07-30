import { linkedInLocators } from '../Locators/loginLocators';

export class LoginPage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Navigate to LinkedIn login page
     */
    async navigateToLoginPage() {
        await this.page.goto('/login');
    }

    /**
     * Login with provided credentials
     * @param {string} username - LinkedIn username/email
     * @param {string} password - LinkedIn password
     */
    async login(username, password) {
        await this.page.fill(linkedInLocators.emailInput, username);
        await this.page.fill(linkedInLocators.passwordInput, password);
        await this.page.click(linkedInLocators.signInButton);
    }

    
}
