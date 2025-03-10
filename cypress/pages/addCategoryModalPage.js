class AddCategoryModalPage {

    get addCategoryModal(){
        return cy.get('[role="dialog"]');
    }

    get categoryNameInputField(){
        return cy.get('#input-username');
    }

    get acceptButton(){
        return cy.get('button.btn-primary').contains('Aceptar');
    }

    get subcategoryCheckBox(){
        return cy.get('#customCheckMain');
    }
     
  
    verifyModal() {
        this.addCategoryModal.should('be.visible');
        this.categoryNameInputField.should('be.visible');
        this.acceptButton.should('be.visible');
    }

    clickAcceptButton(){
        this.acceptButton.click();
    }

    fillCategoryName(categoryName){
        this.categoryNameInputField.type(categoryName);
    }

    interceptCategoryCreateRequest(){
        return cy.intercept('POST', 'https://api.club-administration.qa.qubika.com/api/category-type/create').as('postCategory');
    }

    checkSubcategoryCheckbox(){
        this.subcategoryCheckBox.check({force: true});
    }

    verifyCreateCategoryRequestStatus(categoryName){
        return cy.wait('@postCategory').then((interception) => {
            
            // Assert the request payload
            const payload = interception.request.body;
            expect(payload).to.have.property('name', categoryName);
            expect(payload).to.have.property('root', true);
            expect(payload).to.have.property('parentId', null);
      
            // Assert the response status code
            expect(interception.response.statusCode).to.eq(200);
      
            // Assert the response body matches the expected format
            const responseBody = interception.response.body;
            expect(responseBody).to.have.property('id');
            expect(responseBody).to.have.property('name', categoryName);
            expect(responseBody).to.have.property('root', true);
            expect(responseBody).to.have.property('parentId', null);
          });
    }

  }
  
 
  export default AddCategoryModalPage;