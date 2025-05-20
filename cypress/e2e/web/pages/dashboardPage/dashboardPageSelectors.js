class DashboardPageSelectors {
//Locators
    get categoryTypes(){
        return cy.get('a.nav-link[href="#/category-type"]'); 
    }

  }
  
  
export default DashboardPageSelectors;