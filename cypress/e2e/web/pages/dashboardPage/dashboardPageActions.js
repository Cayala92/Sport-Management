import DashboardPageSelectors from './dashboardPageSelectors';

class DashboardPageActions {
  constructor() {
    this.modalPage = new DashboardPageSelectors();
  }

  goToCategoriesPage(){
    this.modalPage.categoryTypes.click();
  }
}

export default DashboardPageActions;

