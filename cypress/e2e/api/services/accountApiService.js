class AccountApiService {
    constructor() {
      this.apiUrl = Cypress.env('accountApiUrl');
    }
  
    register(userData) {
        return cy.request({
          method: 'POST',
          url: this.apiUrl,
          body: userData,
        }).then((res) => {
          expect(res.status).to.eq(201);
          return res.body;
        });
      }
    
  }
  
  export default AccountApiService;
  