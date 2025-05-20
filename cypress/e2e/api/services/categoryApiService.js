const BASE_API = Cypress.env('apiUrl') || 'https://api.club-administration.qa.qubika.com/api';

class CategoryApiService {
  interceptCreateCategoryRequest() {
    return cy.intercept('POST', `${BASE_API}/category-type/create`).as('postCategory');
  }

  waitForCategoryCreation(expectedName) {
    return cy.wait('@postCategory').then((interception) => {
      this.assertCategoryRequestPayload(interception, expectedName);
      this.assertCategoryResponse(interception, expectedName);
      return interception;
    });
  }

  assertCategoryRequestPayload(interception, expectedName) {
    const { request } = interception;
    expect(request.body, 'Request payload should have expected data').to.deep.include({
      name: expectedName,
      root: true,
      parentId:  null,
    });
  }

  assertCategoryResponse(interception, expectedName) {
    const { response } = interception;
    expect(response.statusCode, 'Status code should be 200').to.eq(200);
    expect(response.body, 'Response body should have the attribute id').to.have.property('id').that.is.a('string');
    expect(response.body, 'Response body should have the expected data').to.deep.include({
      name: expectedName,
      root: true,
    });
    expect(response.body.parentId, 'parentId should be null when is root').to.be.null;  
  }


 waitForSubcategoryCreation(expectedName) {
    return cy.wait('@postCategory').then((interception) => {
      this.assertSubcategoryRequestPayload(interception, expectedName);
      this.assertSubcategoryResponse(interception, expectedName);
      return interception;
    });
  }

  assertSubcategoryRequestPayload(interception, expectedName) {
    const { request } = interception;
    expect(request.body, 'Request payload should have expected data').to.deep.include({
      name: expectedName,
      root: false,
      parentId: request.body.parentId,
    });
  }
  
  assertSubcategoryResponse(interception, expectedName, parentId) {
    const { response } = interception;
    expect(response.statusCode, 'Status code should be 200').to.eq(200);
    expect(response.body, 'Response body should have the attribute id').to.have.property('id').that.is.a('string');
    expect(response.body, 'Response body should have the expected data').to.deep.include({
      name: expectedName,
      root: false,
    });
    expect(response.body.parentId, 'parentId should be an string when it is a subcategory ').to.be.a('string');
  }
}

export default CategoryApiService;