const accountPageElements = require("../fixtures/pages/accountPageSelectors.json");

Cypress.Commands.add("gotoPasswordPage", () => {
  cy.get(accountPageElements.accountLink).click();
  cy.get(accountPageElements.passwordLink).click();
});

Cypress.Commands.add("gotoLogout", () => {
  cy.get(accountPageElements.accountLink).click();
  cy.get(accountPageElements.signoutLink).click();
});
