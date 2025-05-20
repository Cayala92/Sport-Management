// ***********************************************
// Custom Commands for User Creation
// ***********************************************
import LoginPageSelectors from '../e2e/web/pages/loginPage/loginPageSelectors'

Cypress.Commands.add('signIn', (email, password) => {
  const loginPage = new LoginPageSelectors();
  loginPage.emailField.should('be.visible').clear().type(email);
  loginPage.passwordField.should('be.visible').clear().type(password);
  loginPage.submitButton.should('be.visible').click();
});