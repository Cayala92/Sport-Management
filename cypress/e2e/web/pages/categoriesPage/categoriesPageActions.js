import CategoriesPageSelectors from './categoriesPageSelectors';

class CategoriesPageActions {
  constructor() {
    this.modalPage = new CategoriesPageSelectors();
  }

  clickAddButton(){
    this.modalPage.addCategory.click();
  }
}

export default CategoriesPageActions;
