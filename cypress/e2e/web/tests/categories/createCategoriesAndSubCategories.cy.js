import LoginPageActions from '../../pages/loginPage/loginPageActions';
import CategoriesPageActions from '../../pages/categoriesPage/categoriesPageActions';
import DashboardPageActions from '../../pages/dashboardPage/dashboardPageActions';
import AddCategoryModalPageActions from '../../pages/addCategoryModalPage/addCategoryModalPageActions';
import IndexSelectorPageActions from '../../pages/indexSelectorPage/indexSelectorPageActions';
import AccountApiService from '../../../api/services/accountApiService';
import CategoryApiService from '../../../api/services/categoryApiService';

import {
  randomString,
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
  const category = `category_${Date.now()}_${randomString(4)}`;
  const subcategory = `subcategory${Date.now()}_${randomString(4)}`;
  const user = generateRandomUser();

  before(() => {
    accountApiService.register(user).then((response) => {
      expect(response).to.have.property('email', user.email);
      expect(response).to.have.property('id');
      expect(response).to.have.property('roles');
    });
  });

  beforeEach(() => {
    cy.visit(Cypress.env('loginPage'));
    verifyLoginModal(loginPage);
    cy.signIn(user.email, user.password);
    assertUserIsAuthenticated(dashboardPage);
    dashboardPage.goToCategoriesPage();
  });

  it('should create a category and a subcategory', () => {
    //openCategoriesModal
    categoriesPage.clickAddButton();
    assertAddCategoryModalVisible(addCategoryModalPage);
    
    //create category
    categoryApiService.interceptCreateCategoryRequest();
    addCategoryModalPage.createCategory(category);
    categoryApiService.waitForCategoryCreation(category);

    //Open categories modal and craetes subcategory
    categoriesPage.clickAddButton();
    assertAddCategoryModalVisible(addCategoryModalPage);

    categoryApiService.interceptCreateCategoryRequest();
    addCategoryModalPage.createSubCategory(category, subcategory);
    categoryApiService.waitForSubcategoryCreation(subcategory);

    //verifySubcategoryIsListed  
    verifySubcategoryIsListed(indexSelectorPage, subcategory, category);
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