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

  createCategory(name) {
    this.fillCategoryName(name);
    this.clickAcceptButton();
  }

  createSubCategory(categoryName, subcategoryName) {
    this.fillCategoryName(subcategoryName);
    this.checkSubcategoryCheckbox();
    this.fillSubCategoryName(categoryName +'{enter}');
    this.clickAcceptButton();
  }
}

export default AddCategoryModalPageActions;

