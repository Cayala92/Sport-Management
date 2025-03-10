class LoginPage {
    // Locators
    get emailField() {
      return cy.get('[formControlName="email"]');
    }
  
    get passwordField() {
      return cy.get('[formControlName="password"]');
    }
  
    get submitButton() {
      return cy.get('button[type="submit"]');
    }
  
    //Actions
    visit() {
      cy.visit('https://club-administration.qa.qubika.com/#/auth/login');
    }
  
    fillEmail(email) {
      this.emailField.type(email);
    }
  
    fillPassword(password) {
      this.passwordField.type(password);
    }
  
    submitLogin() {
      this.submitButton.click();
    }
  
    verifyLoginPage() {
      this.emailField.should('be.visible');
      this.passwordField.should('be.visible');
      this.submitButton.should('be.visible');
    }
  }
  
  export default LoginPage;
  