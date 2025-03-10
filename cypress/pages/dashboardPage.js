class DashboardPage {
//Locators
    get categoryTypes(){
        return cy.get('a.nav-link[href="#/category-type"]'); 
    }
     
//Actions  
    verifyDashboardPage() {
        cy.url().should('include', '/dashboard');
        this.categoryTypes.should('be.visible');
    }

    goToCategoriesPage(){
        this.categoryTypes.click();
    }

  }
  
export default DashboardPage;