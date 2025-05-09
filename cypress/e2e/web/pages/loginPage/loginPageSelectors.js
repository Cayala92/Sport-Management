class LoginPageSelectors {

    get emailField() {
      return cy.get('[formControlName="email"]');
    }
  
    get passwordField() {
      return cy.get('[formControlName="password"]');
    }
  
    get submitButton() {
      return cy.get('button[type="submit"]');
    }
    
  }
  export default LoginPageSelectors;