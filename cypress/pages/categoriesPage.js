class CategoriesPage {
    //locators
    get addCategory(){
        return cy.contains('button', 'Adicionar');
    }

    get currentUrl(){
        return cy.url();
    }
     
    //Actions
    verifyCategoriesPage() {
        this.currentUrl.should('include', '/#/category-type');
        this.addCategory.should('be.visible');

    }

    clickAddButton(){
        this.addCategory.click();
    }

  }
  
  export default CategoriesPage;