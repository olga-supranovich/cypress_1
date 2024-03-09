const loginDataValid = require("../fixtures/login-valid.json");
const loginDataInvalid = require("../fixtures/login-invalid.json");

describe("Test login form", () => {
  const baseUrl = Cypress.config("baseUrl");
  const adminUsername = Cypress.env("adminUsername");
  const adminPassword = Cypress.env("adminPassword");
  const usernameField = '[data-cy="username"]';

  const passwordField = '[data-cy="password"]';

  const invalidFeedback = ".invalid-feedback";

  let adminToken;

  beforeEach(() => {
    cy.visit("/");
    cy.clickMenu("Account");
    cy.clickMenu("Sign in");
  });

  it("Happy path case", () => {
    cy.enterText(usernameField, loginDataValid.username);
    cy.enterText(passwordField, loginDataValid.password);

    cy.intercept("POST", "/api/authenticate").as("login");
    cy.clickElement('[data-cy="submit"]');
    cy.wait("@login").its("response.body.id_token").should("exist");
    cy.checkElementVisible("Account");
  });

  it("Sad path cases", () => {
    loginDataInvalid.forEach((user) => {
      cy.enterText(usernameField, user.username);
      cy.enterText(passwordField, user.password);
      cy.clickElement('[data-cy="submit"]');

      cy.checkElementVisible(`${user.message}`);
    });
  });
});
