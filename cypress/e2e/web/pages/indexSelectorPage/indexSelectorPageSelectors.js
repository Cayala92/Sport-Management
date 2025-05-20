class IndexSelectorPageSelectors {
  
  get latestPage() {
    return cy.get('.page-item').eq(-2);
  }

  get latestRecordCategory(){
    return cy.get('tr:last-child').find('td:nth-child(1');
  }

  get latestRecordParentCategory(){
    return cy.get('tr:last-child').find('td:nth-child(2');
  }
  
}
  
export default IndexSelectorPageSelectors;
  