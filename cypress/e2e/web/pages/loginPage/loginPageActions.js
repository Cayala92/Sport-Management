import LoginPageSelectors from './loginPageSelectors';

class LoginPageActions {
  constructor() {
    this.modalPage = new LoginPageSelectors();
  }

  fillEmail(email) {
    this.modalPage.emailField.type(email);
  }

  fillPassword(password) {
    this.modalPage.passwordField.type(password);
  }

  submitLogin() {
    this.modalPage.submitButton.click();
  }
}

export default LoginPageActions;