const loginDataValid = require("../fixtures/login-valid.json");
const loginDataInvalid = require("../fixtures/login-invalid.json");

import { AccountPage } from "../pages/accountPage.js";
import { LoginPage } from "../pages/loginPage.js";
import { StartPage } from "../pages/startPage.js";

describe("Test login form", () => {
  const baseUrl = Cypress.config("baseUrl");

  let accountPage = new AccountPage();
  let loginPage = new LoginPage();
  let startPage = new StartPage();

  let adminToken;

  beforeEach(() => {
    cy.visit("/");
    startPage.gotoLoginPage();
  });

  it("Happy path case", () => {
    cy.intercept("POST", "/api/authenticate").as("login");
    loginPage.login(loginDataValid.username, loginDataValid.password);

    
    // cy.clickElement('[data-cy="submit"]');
    cy.wait("@login").its("response.body.id_token").should("exist");
   
    accountPage.elements.entitiesLink().should("be.visible");
  });

  it("Sad path cases", () => {
    loginDataInvalid.forEach((user) => {
      loginPage.login(user.username, user.password);
      cy.checkElementVisible(`${user.message}`);
    });
  });
});
