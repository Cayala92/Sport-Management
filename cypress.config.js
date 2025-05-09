const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      accountApiUrl: 'https://api.club-administration.qa.qubika.com/api/auth/register',
      baseApiUrl: 'https://api.club-administration.qa.qubika.com/api',
      loginPage: 'https://club-administration.qa.qubika.com/#/auth/login'
    },
  },
});