const loginPageElements = require("../fixtures/pages/loginPageselectors.json");

Cypress.Commands.add("login", (username, password) => {
  cy.get(loginPageElements.usernameField).clear().type(username);
  cy.get(loginPageElements.passwordField).clear().type(password);
  cy.get(loginPageElements.submitButton).click();
});
