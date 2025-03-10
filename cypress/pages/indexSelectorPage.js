class IndexSelectorPage {
  //Locators
  get latestPage() {
    return cy.get('.page-item').eq(-2);
  }

  get latestRecord(){
    return cy.get('tr:last-child').find('td:nth-child(2)');
  }
  
  //actions  
  goToTheLatestPage(){
    this.latestPage.click();
  }
}
  
export default IndexSelectorPage;
  