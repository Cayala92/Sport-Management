class AddCategoryModalPageSelectors {

  get addCategoryModal() {
    return cy.get('[role="dialog"]');
  }

  get categoryNameInputField() {
    return cy.get('#input-username'); 
  }

  get subCategoryNameInputField() {
    return cy.get('.ng-select-container .ng-input input');
  }

  get acceptButton() {
    return cy.get('button.btn-primary').contains('Aceptar');
  }

  get subcategoryCheckBox() {
    return cy.get('#customCheckMain');
  }
}
export default AddCategoryModalPageSelectors;
