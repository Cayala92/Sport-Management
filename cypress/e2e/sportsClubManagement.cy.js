import LoginPageActions from './web/pages/loginPage/loginPageActions';
import CategoriesPageActions from './web/pages/categoriesPage/categoriesPageActions';
import DashboardPageActions from './web/pages/dashboardPage/dashboardPageActions';
import AddCategoryModalPageActions from './web/pages/addCategoryModalPage/addCategoryModalPageActions';
import IndexSelectorPageActions from './web/pages/indexSelectorPage/indexSelectorPageActions';
import AccountApiService from './api/services/accountApiService';
import CategoryApiService from './api/services/categoryApiService';

import {
  generateRandomCategory,
  generateRandomSubcategory,
  generateRandomUser
} from './helpers/dataFactory';


describe('Sport Management e2e', () => {
  const loginPage = new LoginPageActions();
  const dashboardPage = new DashboardPageActions();
  const categoriesPage = new CategoriesPageActions();
  const accountApiService = new AccountApiService();
  const categoryApiService = new CategoryApiService();
  const addCategoryModalPage = new AddCategoryModalPageActions();
  const indexSelectorPage = new IndexSelectorPageActions();
  const category = generateRandomCategory();
  const subcategory = generateRandomSubcategory();
  const user = generateRandomUser();

  it('Categories and subcategories creation', () => {
    accountApiService.register(user).then((response) => {
      expect(response).to.have.property('email', user.email);
      expect(response).to.have.property('id');
      expect(response).to.have.property('roles');
    });
    
    cy.visit(Cypress.env('loginPage'));
    verifyLoginModal(loginPage);
    loginPage.fillEmail(user.email);
    loginPage.fillPassword(user.password);
    loginPage.submitLogin();
    assertDasboardPageCategoriesIsVisible(dashboardPage);
    dashboardPage.goToCategoriesPage();
    categoriesPage.clickAddButton();

    assertAddCategoryModalVisible(addCategoryModalPage);
    addCategoryModalPage.fillCategoryName(category.name);
    categoryApiService.interceptCreateCategoryRequest();
    addCategoryModalPage.clickAcceptButton();
    categoryApiService.waitForCategoryCreation(category.name);
    categoriesPage.clickAddButton();
    assertAddCategoryModalVisible(addCategoryModalPage);
    addCategoryModalPage.fillCategoryName(subcategory.name);
    addCategoryModalPage.checkSubcategoryCheckbox();
    addCategoryModalPage.fillSubCategoryName(category.name+'{enter}');
    categoryApiService.interceptCreateSubCategoryRequest();
    addCategoryModalPage.clickAcceptButton();
    categoryApiService.waitForSubCategoryCreation(subcategory.name);
    indexSelectorPage.goToTheLatestPage();
    indexSelectorPage.modalPage.latestRecord.invoke('text').should('eq', category.name);
  });
});

function assertAddCategoryModalVisible(page) {
  page.modalPage.addCategoryModal.should('be.visible');
  page.modalPage.categoryNameInputField.should('be.visible');
  page.modalPage.acceptButton.should('be.visible');
}

function assertDasboardPageCategoriesIsVisible(page){
  cy.url().should('include', '/dashboard');
  page.modalPage.categoryTypes.should('be.visible');
}

function verifyLoginModal(page) {
  page.modalPage.emailField.should('be.visible');
  page.modalPage.passwordField.should('be.visible');
  page.modalPage.submitButton.should('be.visible');
}