const accountPageElements = require("../fixtures/pages/accountPageSelectors.json");

Cypress.Commands.add("gotoPasswordPage", () => {
  cy.get(accountPageElements.accountLink).click();
  cy.get(accountPageElements.passwordLink).click();
});

Cypress.Commands.add("gotoLogout", () => {
  cy.get(accountPageElements.accountLink).click();
  cy.get(accountPageElements.signoutLink).click();
});

Cypress.Commands.add("gotoTask", () => {
  cy.get(accountPageElements.entitiesLink).click();
  cy.get(accountPageElements.taskLink).click();
});

Cypress.Commands.add("gotoUserTask", () => {
  cy.get(accountPageElements.entitiesLink).click();
  cy.get(accountPageElements.userTaskLink).click();
});

Cypress.Commands.add("gotoAPI", () => {
  cy.get(accountPageElements.swaggerLink).click();
  cy.get(accountPageElements.apiLink).click();
});

Cypress.Commands.add("gotoSettings", () => {
  cy.get(accountPageElements.accountLink).click();
  cy.get(accountPageElements.settingsLink).click();
});

Cypress.Commands.add("goHome", () => {
  cy.contains(accountPageElements.homeLink).click();
});
