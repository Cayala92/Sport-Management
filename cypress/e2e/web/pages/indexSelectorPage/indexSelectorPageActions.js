import IndexSelectorPageSelectors from "./indexSelectorPageSelectors"; 

class IndexSelectorPageActions {
  constructor() {
    this.modalPage = new IndexSelectorPageSelectors();
  }

  goToTheLatestPage(){
    this.modalPage.latestPage.click();
  }
}

export default IndexSelectorPageActions;

