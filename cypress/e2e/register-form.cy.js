const registerDataValid = require("../fixtures/register-valid.json");
const registerDataInvalid = require("../fixtures/register-invalid.json");

describe("Check Register form", () => {
  const baseUrl = Cypress.config("baseUrl");
  const adminUsername = Cypress.env("adminUsername");
  const adminPassword = Cypress.env("adminPassword");
  const usernameField = '[data-cy="username"]';
  const emailField = '[data-cy="email"]';
  const passwordField = '[data-cy="firstPassword"]';
  const passwordConfirmField = '[data-cy="secondPassword"]';
  const invalidFeedback = ".invalid-feedback";

  let adminToken;

  beforeEach(() => {
    cy.visit("/");
    cy.clickMenu("Account");
    cy.clickMenu("Register");

    cy.request("POST", "/api/authenticate", {
      username: `${adminUsername}`,
      password: `${adminPassword}`,
      rememberMe: true,
    }).then((response) => {
      adminToken = response.body.id_token;
    });
  });

  after(() => {
    //delete all created users
    registerDataValid.forEach((user) => {
      cy.request({
        method: "DELETE",
        url: `/api/admin/users/${user.username}`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
    });
  });

  it("Happy path", () => {
    registerDataValid.forEach((user) => {
      cy.enterText(usernameField, user.username);
      cy.enterText(emailField, user.email);
      cy.enterText(passwordField, user.password);
      cy.enterText(passwordConfirmField, user.passwordConfirm);

      //check status code as there is no message user has been created
      cy.intercept("POST", "/api/register").as("register");
      cy.clickElement('[data-cy="submit"]');
      cy.wait("@register").its("response.statusCode").should("eq", 201);
    });

    //check via GET request user added and can be found
    registerDataValid.forEach((user) => {
      cy.request({
        url: `/api/admin/users/${user.username}`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }).then((response) => {
        expect(response.body.login).equal(`${user.username}`);
      });
    });
  });

  it("Sad path", () => {
    registerDataInvalid.forEach((user) => {
      cy.enterText(usernameField, user.username);
      cy.enterText(emailField, user.email);
      cy.enterText(passwordField, user.password);
      cy.enterText(passwordConfirmField, user.passwordConfirm);
      cy.clickElement('[data-cy="submit"]');
      cy.checkElementVisible(`${user.message}`);
    });
  });
});
