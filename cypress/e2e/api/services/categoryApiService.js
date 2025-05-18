const BASE_API = Cypress.env('apiUrl') || 'https://api.club-administration.qa.qubika.com/api';

class CategoryApiService {
  interceptCreateCategoryRequest() {
    return cy.intercept('POST', `${BASE_API}/category-type/create`).as('postCategory');
  }

  waitForCategoryCreation(expectedName, isRoot = true) {
    return cy.wait('@postCategory').then((interception) => {
      this.assertCategoryRequestPayload(interception, expectedName, isRoot);
      this.assertCategoryResponse(interception, expectedName, isRoot);
      return interception;
    });
  }

  assertCategoryRequestPayload(interception, expectedName, isRoot) {
    const { request } = interception;
    expect(request.body, 'Request payload debe tener los datos correctos').to.deep.include({
      name: expectedName,
      root: isRoot,
      parentId: isRoot ? null : request.body.parentId,
    });
  }

  assertCategoryResponse(interception, expectedName, isRoot) {
    const { response } = interception;
    expect(response.statusCode, 'El status code debe ser 200').to.eq(200);
    expect(response.body, 'El body debe tener un id').to.have.property('id').that.is.a('string');
    expect(response.body, 'El body debe tener los datos correctos').to.deep.include({
      name: expectedName,
      root: isRoot,
    });
    if (isRoot) {
      expect(response.body.parentId, 'parentId debe ser null para root').to.be.null;
    } else {
      expect(response.body.parentId, 'parentId debe ser string para subcategoría').to.be.a('string');
    }
  }
}

export default CategoryApiService;