import LoginPageActions from '../../pages/loginPage/loginPageActions';
import CategoriesPageActions from '../../pages/categoriesPage/categoriesPageActions';
import DashboardPageActions from '../../pages/dashboardPage/dashboardPageActions';
import AddCategoryModalPageActions from '../../pages/addCategoryModalPage/addCategoryModalPageActions';
import IndexSelectorPageActions from '../../pages/indexSelectorPage/indexSelectorPageActions';
import AccountApiService from '../../../api/services/accountApiService';
import CategoryApiService from '../../../api/services/categoryApiService';

import {
  generateRandomCategory,
  generateRandomSubcategory,
  generateRandomUser
} from '../../../helpers/dataFactory';


describe('Categories And Subcategories Creation e2e', () => {
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
    cy.signIn(user.email, user.password);
    assertUserIsAuthenticated(dashboardPage);
    dashboardPage.goToCategoriesPage();

    //openCategoriesModal
    categoriesPage.clickAddButton();
    assertAddCategoryModalVisible(addCategoryModalPage);
    
    //create category
    categoryApiService.interceptCreateCategoryRequest();
    addCategoryModalPage.createCategory(category.name);
    categoryApiService.waitForCategoryCreation(category.name);

    //Open categories modal and craetes subcategory
    categoriesPage.clickAddButton();
    assertAddCategoryModalVisible(addCategoryModalPage);

    categoryApiService.interceptCreateCategoryRequest();
    addCategoryModalPage.createSubCategory(category.name, subcategory.name);
    categoryApiService.waitForCategoryCreation(subcategory.name, false);

    //verifySubcategoryIsListed  
    verifySubcategoryIsListed(indexSelectorPage, subcategory.name, category.name);
  });
});

function assertAddCategoryModalVisible(page) {
  page.modalPage.addCategoryModal.should('be.visible');
  page.modalPage.categoryNameInputField.should('be.visible');
  page.modalPage.acceptButton.should('be.visible');
}

function assertUserIsAuthenticated(page){
  cy.url().should('include', '/dashboard','User should be redirected to dashboard');
  page.modalPage.categoryTypes.should('be.visible');
}

function verifyLoginModal(page) {
  page.modalPage.emailField.should('be.visible');
  page.modalPage.passwordField.should('be.visible');
  page.modalPage.submitButton.should('be.visible');
}

function verifySubcategoryIsListed(indexSelectorPage, expectedSubcategory, expectedCategory) {
  indexSelectorPage.goToTheLatestPage();
  indexSelectorPage.modalPage.latestRecordCategory.invoke('text').should('eq', expectedSubcategory);
  indexSelectorPage.modalPage.latestRecordParentCategory.invoke('text').should('eq', expectedCategory);
}