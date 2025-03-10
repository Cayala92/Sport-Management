class CreateAccountPage {
    constructor() {
      this.apiUrl = 'https://api.club-administration.qa.qubika.com/api/auth/register';
    }
  
    verifyAccountCreation(email, password) {
      const username = `user_${Math.random().toString(36).substring(2, 10)}`;
      const firstName = 'John';
      const lastName = 'Doe';
      const phone = Math.floor(Math.random() * 1000000000);
  
      const userData = {
        email: email,
        password: password,
        username: username,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      };
  
      //Consume account creation API
      return cy.request({
        method: 'POST',
        url: this.apiUrl,
        body: userData,
      })
    }
  }
  
  export default CreateAccountPage;
  