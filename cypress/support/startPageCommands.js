const startPageElements = require("../fixtures/pages/startPageSelectors.json");

Cypress.Commands.add("gotoLoginPage", () => {
  cy.get(startPageElements.accountLink).click();
  cy.get(startPageElements.signinLink).click();
});

Cypress.Commands.add("gotoRegisterPage", () => {
  cy.get(startPageElements.accountLink).click();
  cy.get(startPageElements.registerLink).click();
});
