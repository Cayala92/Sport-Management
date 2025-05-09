import AddCategoryModalPageSelectors from './addCategoryModalPageSelectors';

class AddCategoryModalPageActions {
  constructor() {
    this.modalPage = new AddCategoryModalPageSelectors();
  }

  fillSubCategoryName(name) {
    
    this.modalPage.subCategoryNameInputField.type(name);
  }
  
  fillCategoryName(name) {
    this.modalPage.categoryNameInputField.type(name);
  }
  
  clickAcceptButton() {
    this.modalPage.acceptButton.click();
  }
  
  checkSubcategoryCheckbox() {
    this.modalPage.subcategoryCheckBox.check({ force: true });
  }
}

export default AddCategoryModalPageActions;

