import AddCategoryModalPage from './addCategoryModalPage';

class AddSubCategoryModalPage extends AddCategoryModalPage {

  //Locatos
  get subCategoryNameInputField() {
    return cy.get('.ng-select-container .ng-input input'); 
  }

  //Actions

  fillSubCategoryName(subCategoryName) {
    this.subCategoryNameInputField.type(subCategoryName)
    .should('have.length.greaterThan', 0).type('{enter}');
  }

  verifyCreateSubCategoryRequestStatus(subCategoryName) {
    return cy.wait('@postCategory').then((interception) => {
      // Assert the request payload for subcategory
      const payload = interception.request.body;
      expect(payload).to.have.property('name', subCategoryName);
      expect(payload).to.have.property('root', false);  // Subcategory should not be a root
      expect(payload).to.have.property('parentId');  // Ensure that parentId is present for subcategory

      // Assert the response status code
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property('id');
      expect(responseBody).to.have.property('name', subCategoryName);
      expect(responseBody).to.have.property('root', false);
      expect(responseBody).to.have.property('parentId').to.not.be.null;;
    });
  }
}

export default AddSubCategoryModalPage;
