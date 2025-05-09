const BASE_API = Cypress.env('apiUrl') || 'https://api.club-administration.qa.qubika.com/api';

class CategoryApiService {
  
  interceptCreateCategoryRequest() {
    return cy.intercept('POST', `${BASE_API}/category-type/create`).as('postCategory');
  }

  waitForCategoryCreation(expectedName, isRoot = true) {
    cy.wait('@postCategory').then((interception) => {
      this.assertCategoryRequestPayload(interception, expectedName, isRoot);
      this.assertCategoryResponse(interception, expectedName, isRoot);
    });
  }

  assertCategoryRequestPayload(interception, expectedName, isRoot) {
    const { request } = interception;
    
    expect(request.body).to.deep.include({
      name: expectedName,
      root: isRoot,
      parentId: isRoot ? null : request.body.parentId,
    });
  }

  assertCategoryResponse(interception, expectedName, isRoot) {
    const { response } = interception;

    expect(response.statusCode).to.eq(200);
    expect(response.body).to.have.property('id').that.is.a('string');
    expect(response.body).to.deep.include({
      name: expectedName,
      root: isRoot,
    });

    if (isRoot) {
      expect(response.body.parentId).to.be.null;
    } else {
      expect(response.body.parentId).to.be.a('string');
    }
  }

  interceptCreateSubCategoryRequest() {
    return cy.intercept('POST', `${BASE_API}/subcategory/create`).as('postCategory');
  }

  waitForSubCategoryCreation(expectedName) {
    cy.wait('@postCategory').then((interception) => {
      this.assertSubCategoryRequestPayload(interception, expectedName);
      this.assertSubCategoryResponse(interception, expectedName);
    });
  }

  assertSubCategoryRequestPayload(interception, expectedName) {
    const { request } = interception;

    expect(request.body).to.deep.include({
      name: expectedName
    });
  }

  assertSubCategoryResponse(interception, expectedName) {
    const { response } = interception;

    expect(response.statusCode).to.eq(200);
    expect(response.body).to.have.property('id').that.is.a('string');
    expect(response.body).to.deep.include({
      name: expectedName
    });
  }
}



export default CategoryApiService;