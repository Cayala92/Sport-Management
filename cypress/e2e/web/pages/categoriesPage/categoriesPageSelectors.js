class CategoriesPageSelectors {
    get addCategory(){
        return cy.contains('button', 'Adicionar');
    }

    get currentUrl(){
        return cy.url();
    }    

  }
  
  export default CategoriesPageSelectors;

  
  
  