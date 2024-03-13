const loginDataValid = require("../fixtures/login-valid.json");
const loginDataInvalid = require("../fixtures/login-invalid.json");

const accountPageElements = require("../fixtures/pages/accountPageSelectors.json");

describe("Test login form", () => {
  const baseUrl = Cypress.config("baseUrl");

  let adminToken;

  beforeEach(() => {
    cy.visit("/");
    cy.gotoLoginPage();
  });

  it("Happy path case", () => {
    cy.intercept("POST", "/api/authenticate").as("login");
    cy.login(loginDataValid.username, loginDataValid.password);

    // cy.clickElement('[data-cy="submit"]');
    cy.wait("@login").its("response.body.id_token").should("exist");

    cy.get(accountPageElements.entitiesLink).should("be.visible");
  });

  it("Sad path cases", () => {
    loginDataInvalid.forEach((user) => {
      cy.login(user.username, user.password);
      cy.checkElementVisible(`${user.message}`);
    });
  });
});
