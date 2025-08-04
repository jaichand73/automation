const { personalDetailsLocators } = require('../Locators/personalDetailsLocators');

class PersonalDetailsPage {
    constructor(page) {
        this.page = page;
    }

    async waitForField(selector, timeout = 50000) {
        try {
            await this.page.waitForSelector(selector, { timeout });
            return true;
        } catch (error) {
            console.log(`Failed to find selector: ${selector}`);
            // Take a screenshot for debugging
            await this.page.screenshot({ path: `debug-${Date.now()}.png` });
            throw error;
        }
    }

    async fillField(selector, value, fieldName) {
        try {
            await this.waitForField(selector);
            await this.page.fill(selector, value);
            console.log(`Filled ${fieldName} with: ${value}`);
        } catch (error) {
            console.error(`Failed to fill ${fieldName}: ${error.message}`);
            throw error;
        }
    }

    async fillPersonalDetails(userDetails) {
        console.log('Starting to fill personal details form...');
        await this.page.waitForLoadState('networkidle');
        await this.page.screenshot({ path: 'form-initial-state.png' });

        // Fill Full Name
        await this.fillField('input[placeholder="Enter your full name"]', userDetails.fullName, 'Full Name');
        // Fill Mobile Number
        await this.fillField('input[placeholder="Enter your mobile number"]', userDetails.mobileNumber, 'Mobile Number');
        // Select Gender
        if (userDetails.gender) {
            await this.waitForField('select');
            await this.page.selectOption('select', { label: userDetails.gender });
            console.log(`Selected gender by label: ${userDetails.gender}`);
        }
        // Fill Current Location
        if (userDetails.currentLocation) {
            await this.fillField('input[placeholder="Enter your current location"]', userDetails.currentLocation, 'Current Location');
        }
        // Fill Preferred Locations (multi-entry)
        if (userDetails.preferredLocations) {
            const locations = Array.isArray(userDetails.preferredLocations)
                ? userDetails.preferredLocations
                : userDetails.preferredLocations.split(',').map(l => l.trim());
            for (const loc of locations) {
                await this.fillField('[class="relative"] [type="text"]', loc, 'Preferred Locations');
                await this.page.keyboard.press('Enter');
                console.log(`Added preferred location: ${loc}`);
            }
        }
        // Fill Github Link
        if (userDetails.githubLink) {
            await this.fillField('input[placeholder="Enter your github link"]', userDetails.githubLink, 'Github Link');
        }
        // Fill LinkedIn Link
        if (userDetails.linkedinLink) {
            await this.fillField('input[placeholder="Enter your linkedin link"]', userDetails.linkedinLink, 'LinkedIn Link');
        }

        console.log('Completed filling personal details form');
        await this.page.screenshot({ path: 'form-filled-state.png' });
    }

    async clickNext() {
        console.log('Clicking Next button...');
        await this.page.click(personalDetailsLocators.nextButton);
        console.log('Clicked Next button');
    }

    async isPersonalDetailsPage() {
        return await this.page.url().includes('/personal-details');
    }

    async getFormErrors() {
        const errors = await this.page.$$(personalDetailsLocators.formError);
        return await Promise.all(errors.map(error => error.textContent()));
    }

    async getRequiredFieldsCount() {
        return await this.page.$$(personalDetailsLocators.requiredFields).length;
    }
}

module.exports = { PersonalDetailsPage };
