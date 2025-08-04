exports.personalDetailsLocators = {
    // Personal Information
    firstName: 'input[name="firstName"]',
    lastName: 'input[name="lastName"]',
    currentDesignation: 'input[name="currentDesignation"]',
    totalExperience: 'select[name="totalExperience"]',
    country: 'select[name="country"]',
    state: 'select[name="state"]',
    city: 'input[name="city"]',
    address: 'textarea[name="address"]',
    pincode: 'input[name="pincode"]',
    
    // Navigation
    nextButton: 'button:has-text("Next")',
    
    // Form validation
    formError: '.error-message',
    requiredFields: '[aria-required="true"]'
};
