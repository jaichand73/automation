const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { PersonalDetailsPage } = require('../pages/PersonalDetailsPage');
const { credentials } = require('../utils/credentials');

test('Fill Personal Details after LinkedIn login', async ({ page }) => {
    // Login first
    console.log('Starting LinkedIn login...');
    const loginPage = new LoginPage(page);
    await page.goto('https://stage.talentpecker.com/login');
    await page.click('button:has-text("Sign in with LinkedIn")');
    await loginPage.login(credentials.linkedin.email, credentials.linkedin.password);
    
    // Verify redirect to personal details page
    console.log('Verifying redirect to personal details page...');
    await expect(page).toHaveURL('https://stage.talentpecker.com/personal-details');
    
    // Fill personal details
    const personalDetailsPage = new PersonalDetailsPage(page);
    
    // Verify we're on the personal details page
    expect(await personalDetailsPage.isPersonalDetailsPage()).toBeTruthy();
    
    console.log('Successfully reached personal details page');
    
    const userDetails = {
        fullName: 'Jaichand Verma',
        mobileNumber: '9876543210',
        gender: 'Male', // Use the value attribute from the dropdown if needed
        currentLocation: 'Shimla',
        preferredLocations: ['Dehradun', 'Delhi', 'Mumbai'], // or as a comma-separated string: 'Dehradun, Delhi, Mumbai'
        githubLink: 'https://github.com/jaichand73',
        linkedinLink: 'https://linkedin.com/in/jaichand73'

    };

    await personalDetailsPage.fillPersonalDetails(userDetails);

    // Validate required fields: Full Name and Mobile Number
    console.log('Validating required fields...');
    const fullNameValue = await page.inputValue('input[placeholder="Enter your full name"]');
    expect(fullNameValue).toBe(userDetails.fullName);
    const mobileValue = await page.inputValue('input[placeholder="Enter your mobile number"]');
    expect(mobileValue).toBe(userDetails.mobileNumber);
    // Optionally, check that error messages are not visible
    const fullNameError = await page.isVisible('text=Full name is required');
    expect(fullNameError).toBeFalsy();
    const mobileError = await page.isVisible('text=Mobile number must be 10 digits');
    expect(mobileError).toBeFalsy();
    
    // Verify form is filled
    console.log('Verifying form completion...');
    const errorCount = await personalDetailsPage.getFormErrors();
    expect(errorCount.length).toBe(0);
    
    // Click next and verify navigation
    await personalDetailsPage.clickNext();
    
    // Add verification for the next page URL (replace with actual next page URL pattern)
    console.log('Verifying navigation to next page...');
    await expect(page).toHaveURL("https://stage.talentpecker.com/personal-details");
});
