import LoginPage from '../pages/loginPage';
import CategoriesPage from '../pages/categoriesPage';
import DashboardPage from '../pages/dashboardPage';
import AddCategoryModalPage from '../pages/addCategoryModalPage';
import AddSubcategoryModalPage from '../pages/addSubcategoryModalPage';
import IndexSelectorPage from '../pages/indexSelectorPage';
import CreateAccountPage from '../pages/createAccountPage';

describe('Sport Management e2e', () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();
  const categoriesPage = new CategoriesPage();
  const createAccountPage = new CreateAccountPage();
  const addCategoryModalPage = new AddCategoryModalPage();
  const addSubcategoryModalPage = new AddSubcategoryModalPage();
  const indexSelectorPage = new IndexSelectorPage();
  
  const categoryName = Math.random().toString(36).substring(2, 10);
  const subcategoryName = Math.random().toString(36).substring(2, 10);
  const userEmail = `${Math.random().toString(36).substring(2, 15)}@example.com`;
  const userPassword ="Test@1234";

  it('Categories and subcategories creation', () => {
    // Create account
    createAccountPage.verifyAccountCreation(userEmail,userPassword).then((response) => {
      expect(response.status).to.eq(201);expect(response.body).to.have.property('email', userEmail);
      expect(response.body).to.have.property('id').that.is.a('string');
      expect(response.body).to.have.property('password');
      expect(response.body).to.have.property('roles');
    });

    //Sign in with account created
    loginPage.visit();
    loginPage.verifyLoginPage();
    loginPage.fillEmail(userEmail);
    loginPage.fillPassword(userPassword);
    loginPage.submitLogin();
    dashboardPage.verifyDashboardPage();    

    // Categories and subcategories creation
    dashboardPage.goToCategoriesPage();    
    categoriesPage.verifyCategoriesPage();    
    categoriesPage.clickAddButton();
    addCategoryModalPage.fillCategoryName(categoryName);
    addCategoryModalPage.interceptCategoryCreateRequest();
    addCategoryModalPage.clickAcceptButton();
    addCategoryModalPage.verifyCreateCategoryRequestStatus(categoryName);
    categoriesPage.clickAddButton();
    addSubcategoryModalPage.verifyModal();    
    addSubcategoryModalPage.interceptCategoryCreateRequest();
    addSubcategoryModalPage.fillCategoryName(subcategoryName);
    addSubcategoryModalPage.checkSubcategoryCheckbox();
    addSubcategoryModalPage.fillSubCategoryName(categoryName);
    addSubcategoryModalPage.clickAcceptButton();
    addSubcategoryModalPage.verifyCreateSubCategoryRequestStatus(subcategoryName);
    indexSelectorPage.goToTheLatestPage();
    indexSelectorPage.latestRecord.invoke('text').should('eq', categoryName);
  });
});